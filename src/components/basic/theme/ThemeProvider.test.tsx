import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeProvider';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
const createMatchMediaMock = (matches: boolean) => {
  const listeners: ((e: MediaQueryListEvent) => void)[] = [];
  const removeEventListenerMock = vi.fn((_, handler) => {
    const idx = listeners.indexOf(handler);
    if (idx > -1) listeners.splice(idx, 1);
  });
  
  const mockFn = vi.fn().mockImplementation(() => ({
    matches,
    media: '(prefers-color-scheme: dark)',
    addEventListener: vi.fn((_, handler) => listeners.push(handler)),
    removeEventListener: removeEventListenerMock,
  }));

  // Attach helpers to the mock function
  return Object.assign(mockFn, {
    _triggerChange: (newMatches: boolean) => {
      listeners.forEach((listener) =>
        listener({ matches: newMatches } as MediaQueryListEvent)
      );
    },
    _removeEventListenerMock: removeEventListenerMock,
  });
};

// Helper to set matchMedia mock
const setMatchMedia = (mock: ReturnType<typeof createMatchMediaMock>) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: mock,
  });
};

// Test component that uses the hook
function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    document.documentElement.removeAttribute('data-theme');
    setMatchMedia(createMatchMediaMock(false));
  });

  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <ThemeProvider>
          <div data-testid="child">Hello</div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('child')).toHaveTextContent('Hello');
    });

    it('has correct displayName', () => {
      expect(ThemeProvider.displayName).toBe('ThemeProvider');
    });
  });

  describe('Default Theme', () => {
    it('defaults to system theme', () => {
      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme')).toHaveTextContent('system');
    });

    it('respects defaultTheme prop', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('loads theme from localStorage if present', () => {
      localStorageMock.setItem('ui-theme', 'dark');
      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('uses custom storageKey', () => {
      localStorageMock.setItem('custom-key', 'dark');
      render(
        <ThemeProvider storageKey="custom-key">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });
  });

  describe('Resolved Theme', () => {
    it('resolves light theme correctly', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('resolved')).toHaveTextContent('light');
    });

    it('resolves dark theme correctly', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    });

    it('resolves system theme to light when system prefers light', () => {
      setMatchMedia(createMatchMediaMock(false));
      render(
        <ThemeProvider defaultTheme="system">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('resolved')).toHaveTextContent('light');
    });

    it('resolves system theme to dark when system prefers dark', () => {
      setMatchMedia(createMatchMediaMock(true));
      render(
        <ThemeProvider defaultTheme="system">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    });
  });

  describe('DOM Attribute', () => {
    it('sets data-theme="dark" when theme is dark', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('removes data-theme when theme is light', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    });
  });

  describe('setTheme', () => {
    it('updates theme when setTheme is called', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      await user.click(screen.getByRole('button', { name: 'Dark' }));
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('persists theme to localStorage', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );

      await user.click(screen.getByRole('button', { name: 'Dark' }));
      expect(localStorageMock.setItem).toHaveBeenCalledWith('ui-theme', 'dark');
    });

    it('uses custom storageKey when persisting', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider storageKey="custom-key">
          <ThemeConsumer />
        </ThemeProvider>
      );

      await user.click(screen.getByRole('button', { name: 'Dark' }));
      expect(localStorageMock.setItem).toHaveBeenCalledWith('custom-key', 'dark');
    });

    it('updates DOM attribute when theme changes', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(document.documentElement.getAttribute('data-theme')).toBeNull();
      await user.click(screen.getByRole('button', { name: 'Dark' }));
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('System Theme Changes', () => {
    it('responds to system theme changes when set to system', () => {
      const matchMediaMock = createMatchMediaMock(false);
      setMatchMedia(matchMediaMock);

      render(
        <ThemeProvider defaultTheme="system">
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('resolved')).toHaveTextContent('light');

      // Simulate system theme change using the helper attached to the mock
      act(() => {
        matchMediaMock._triggerChange(true);
      });

      expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    });

    it('cleans up media query listener on unmount', () => {
      const matchMediaMock = createMatchMediaMock(false);
      setMatchMedia(matchMediaMock);

      const { unmount } = render(
        <ThemeProvider defaultTheme="system">
          <ThemeConsumer />
        </ThemeProvider>
      );

      unmount();

      // Check the shared removeEventListener mock was called
      expect(matchMediaMock._removeEventListenerMock).toHaveBeenCalled();
    });
  });

  describe('useTheme Hook', () => {
    it('throws error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => render(<ThemeConsumer />)).toThrow(
        'useTheme must be used within a ThemeProvider'
      );

      spy.mockRestore();
    });

    it('returns theme context value', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    });
  });
});

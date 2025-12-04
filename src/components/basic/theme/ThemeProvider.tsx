import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/** Available theme options */
export type Theme = 'light' | 'dark' | 'system';

/** Resolved theme after system preference is applied */
export type ResolvedTheme = 'light' | 'dark';

/** Context value provided by ThemeProvider */
export interface ThemeContextValue {
  /** Current theme setting (may be 'system') */
  theme: Theme;
  /** Actual applied theme (resolves 'system' to 'light' or 'dark') */
  resolvedTheme: ResolvedTheme;
  /** Function to update the theme */
  setTheme: (theme: Theme) => void;
}

/** Props for ThemeProvider component */
export interface ThemeProviderProps {
  /** Child components to wrap */
  children: ReactNode;
  /** Initial theme setting @default 'system' */
  defaultTheme?: Theme;
  /** localStorage key for persistence @default 'ui-theme' */
  storageKey?: string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Helper to get initial resolved theme for SSR-safe initialization
 */
function getInitialResolvedTheme(theme: Theme): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

/**
 * ThemeProvider component for managing light/dark mode theming.
 *
 * Features:
 * - Supports 'light', 'dark', or 'system' (auto-detect) themes
 * - Persists user preference to localStorage
 * - Listens to system preference changes when set to 'system'
 * - Sets `data-theme="dark"` on document root for CSS targeting
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 *
 * // Access theme in components
 * function ThemeToggle() {
 *   const { theme, setTheme, resolvedTheme } = useTheme();
 *   return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />;
 * }
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    getInitialResolvedTheme(theme)
  );

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (newTheme: 'light' | 'dark') => {
      setResolvedTheme(newTheme);
      if (newTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches ? 'dark' : 'light');

      const handler = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    },
    [storageKey]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.displayName = 'ThemeProvider';

/**
 * Hook to access the current theme context.
 *
 * @returns Theme context value with theme, resolvedTheme, and setTheme
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, resolvedTheme, setTheme } = useTheme();
 *   return <button onClick={() => setTheme('dark')}>Dark Mode</button>;
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeContext };

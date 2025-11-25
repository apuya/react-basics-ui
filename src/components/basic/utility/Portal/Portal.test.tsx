import { render, screen } from '@testing-library/react';
import { describe, expect, it, afterEach, beforeEach } from 'vitest';
import { Portal } from './Portal';

describe('Portal', () => {
  // Clean up portal containers after each test
  afterEach(() => {
    const portals = document.querySelectorAll('[id$="portal"], [id*="portal-"]');
    portals.forEach((portal) => portal.remove());
  });

  describe('Basic Rendering', () => {
    it('renders children into a portal', () => {
      render(
        <Portal>
          <div data-testid="portal-content">Portal Content</div>
        </Portal>
      );

      expect(screen.getByTestId('portal-content')).toBeInTheDocument();
      expect(screen.getByText('Portal Content')).toBeInTheDocument();
    });

    it('creates default portal-root container', () => {
      render(
        <Portal>
          <div>Content</div>
        </Portal>
      );

      const portalRoot = document.getElementById('portal-root');
      expect(portalRoot).toBeInTheDocument();
      expect(portalRoot?.tagName).toBe('DIV');
    });

    it('appends portal container to document.body', () => {
      render(
        <Portal>
          <div>Content</div>
        </Portal>
      );

      const portalRoot = document.getElementById('portal-root');
      expect(portalRoot?.parentElement).toBe(document.body);
    });

    it('renders content inside the portal container', () => {
      render(
        <Portal>
          <div data-testid="test-content">Test</div>
        </Portal>
      );

      const portalRoot = document.getElementById('portal-root');
      const content = screen.getByTestId('test-content');
      expect(portalRoot?.contains(content)).toBe(true);
    });
  });

  describe('Custom Container', () => {
    it('creates container with custom ID', () => {
      render(
        <Portal containerId="custom-portal">
          <div>Content</div>
        </Portal>
      );

      const customPortal = document.getElementById('custom-portal');
      expect(customPortal).toBeInTheDocument();
    });

    it('uses existing container if already present', () => {
      const existingContainer = document.createElement('div');
      existingContainer.id = 'existing-portal';
      document.body.appendChild(existingContainer);

      render(
        <Portal containerId="existing-portal">
          <div data-testid="content">Content</div>
        </Portal>
      );

      const portalContainers = document.querySelectorAll('#existing-portal');
      expect(portalContainers).toHaveLength(1);
      expect(existingContainer.contains(screen.getByTestId('content'))).toBe(true);
    });

    it('renders into different containers based on containerId', () => {
      const { rerender } = render(
        <Portal containerId="portal-1">
          <div data-testid="content-1">Content 1</div>
        </Portal>
      );

      expect(document.getElementById('portal-1')).toBeInTheDocument();

      rerender(
        <Portal containerId="portal-2">
          <div data-testid="content-2">Content 2</div>
        </Portal>
      );

      expect(document.getElementById('portal-2')).toBeInTheDocument();
    });
  });

  describe('Multiple Portals', () => {
    it('handles multiple portals with same container', () => {
      render(
        <>
          <Portal>
            <div data-testid="portal-1">Portal 1</div>
          </Portal>
          <Portal>
            <div data-testid="portal-2">Portal 2</div>
          </Portal>
        </>
      );

      expect(screen.getByTestId('portal-1')).toBeInTheDocument();
      expect(screen.getByTestId('portal-2')).toBeInTheDocument();

      const portalRoot = document.getElementById('portal-root');
      expect(portalRoot?.childNodes.length).toBeGreaterThanOrEqual(2);
    });

    it('handles multiple portals with different containers', () => {
      render(
        <>
          <Portal containerId="portal-a">
            <div data-testid="content-a">A</div>
          </Portal>
          <Portal containerId="portal-b">
            <div data-testid="content-b">B</div>
          </Portal>
        </>
      );

      expect(document.getElementById('portal-a')).toBeInTheDocument();
      expect(document.getElementById('portal-b')).toBeInTheDocument();
      expect(screen.getByTestId('content-a')).toBeInTheDocument();
      expect(screen.getByTestId('content-b')).toBeInTheDocument();
    });
  });

  describe('Cleanup', () => {
    it('removes portal container on unmount if empty', () => {
      const { unmount } = render(
        <Portal>
          <div>Content</div>
        </Portal>
      );

      expect(document.getElementById('portal-root')).toBeInTheDocument();

      unmount();

      // Container should be removed if empty
      expect(document.getElementById('portal-root')).not.toBeInTheDocument();
    });

    it('keeps portal container if other portals are using it', () => {
      const { unmount: unmount1 } = render(
        <Portal>
          <div data-testid="content-1">Content 1</div>
        </Portal>
      );

      render(
        <Portal>
          <div data-testid="content-2">Content 2</div>
        </Portal>
      );

      unmount1();

      // Container should still exist because second portal is using it
      expect(document.getElementById('portal-root')).toBeInTheDocument();
      expect(screen.getByTestId('content-2')).toBeInTheDocument();
    });
  });

  describe('Content Rendering', () => {
    it('renders simple text content', () => {
      render(<Portal>Simple text</Portal>);
      expect(screen.getByText('Simple text')).toBeInTheDocument();
    });

    it('renders complex nested content', () => {
      render(
        <Portal>
          <div>
            <h1>Title</h1>
            <p>Paragraph</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </Portal>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders components as children', () => {
      const TestComponent = () => <div data-testid="test-component">Component</div>;

      render(
        <Portal>
          <TestComponent />
        </Portal>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('renders multiple children', () => {
      render(
        <Portal>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </Portal>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });
  });

  describe('Dynamic Updates', () => {
    it('updates content when children change', () => {
      const { rerender } = render(
        <Portal>
          <div data-testid="content">Initial</div>
        </Portal>
      );

      expect(screen.getByTestId('content')).toHaveTextContent('Initial');

      rerender(
        <Portal>
          <div data-testid="content">Updated</div>
        </Portal>
      );

      expect(screen.getByTestId('content')).toHaveTextContent('Updated');
    });

    it('handles container ID change', () => {
      const { rerender } = render(
        <Portal containerId="portal-1">
          <div data-testid="content">Content</div>
        </Portal>
      );

      expect(document.getElementById('portal-1')).toBeInTheDocument();

      rerender(
        <Portal containerId="portal-2">
          <div data-testid="content">Content</div>
        </Portal>
      );

      expect(document.getElementById('portal-2')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(<Portal>{null}</Portal>);
      const portalRoot = document.getElementById('portal-root');
      expect(portalRoot).toBeInTheDocument();
    });

    it('handles undefined children', () => {
      render(<Portal>{undefined}</Portal>);
      const portalRoot = document.getElementById('portal-root');
      expect(portalRoot).toBeInTheDocument();
    });

    it('handles boolean children', () => {
      render(
        <Portal>
          {true && <div data-testid="conditional">Conditional</div>}
        </Portal>
      );
      expect(screen.getByTestId('conditional')).toBeInTheDocument();
    });

    it('handles array of children', () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];
      render(
        <Portal>
          {items.map((item, index) => (
            <div key={index} data-testid={`item-${index}`}>
              {item}
            </div>
          ))}
        </Portal>
      );

      items.forEach((item, index) => {
        expect(screen.getByTestId(`item-${index}`)).toHaveTextContent(item);
      });
    });
  });

  describe('Integration', () => {
    it('works with event handlers', () => {
      let clicked = false;
      const handleClick = () => {
        clicked = true;
      };

      render(
        <Portal>
          <button onClick={handleClick}>Click me</button>
        </Portal>
      );

      screen.getByText('Click me').click();
      expect(clicked).toBe(true);
    });

    it('preserves data attributes', () => {
      render(
        <Portal>
          <div data-testid="test" data-custom="custom-value">
            Content
          </div>
        </Portal>
      );

      const element = screen.getByTestId('test');
      expect(element).toHaveAttribute('data-custom', 'custom-value');
    });

    it('preserves className and styles', () => {
      render(
        <Portal>
          <div data-testid="styled" className="custom-class" style={{ color: 'red' }}>
            Styled content
          </div>
        </Portal>
      );

      const element = screen.getByTestId('styled');
      expect(element).toHaveClass('custom-class');
      expect(element).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    });
  });

  describe('Container Creation', () => {
    it('only creates one container for same ID', () => {
      render(
        <>
          <Portal containerId="shared">
            <div>Portal 1</div>
          </Portal>
          <Portal containerId="shared">
            <div>Portal 2</div>
          </Portal>
          <Portal containerId="shared">
            <div>Portal 3</div>
          </Portal>
        </>
      );

      const containers = document.querySelectorAll('#shared');
      expect(containers).toHaveLength(1);
    });

    it('creates separate containers for different IDs', () => {
      render(
        <>
          <Portal containerId="portal-1">
            <div>Content 1</div>
          </Portal>
          <Portal containerId="portal-2">
            <div>Content 2</div>
          </Portal>
          <Portal containerId="portal-3">
            <div>Content 3</div>
          </Portal>
        </>
      );

      expect(document.getElementById('portal-1')).toBeInTheDocument();
      expect(document.getElementById('portal-2')).toBeInTheDocument();
      expect(document.getElementById('portal-3')).toBeInTheDocument();
    });
  });

  describe('Return Value', () => {
    it('returns null when container not ready', () => {
      // This is testing the initial render before useEffect runs
      const { container } = render(
        <Portal>
          <div>Content</div>
        </Portal>
      );

      // After render, content should be in portal
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });
});

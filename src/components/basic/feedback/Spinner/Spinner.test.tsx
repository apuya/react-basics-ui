import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<Spinner />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('has correct role for accessibility', () => {
      const { container } = render(<Spinner />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('role', 'status');
    });

    it('has default aria-label', () => {
      const { container } = render(<Spinner />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('aria-label', 'Loading...');
    });

    it('accepts custom aria-label', () => {
      const { container } = render(<Spinner label="Processing..." />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('aria-label', 'Processing...');
    });

    it('includes sr-only text for screen readers', () => {
      const { container } = render(<Spinner label="Loading data" />);
      const srOnly = container.querySelector('.sr-only');
      expect(srOnly).toBeInTheDocument();
      expect(srOnly).toHaveTextContent('Loading data');
    });
  });

  describe('Size Variants', () => {
    it('applies data-size attribute for xs', () => {
      const { container } = render(<Spinner size="xs" />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('data-size', 'xs');
    });

    it('applies data-size attribute for sm', () => {
      const { container } = render(<Spinner size="sm" />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('data-size', 'sm');
    });

    it('applies default size (md)', () => {
      const { container } = render(<Spinner />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('data-size', 'md');
    });

    it('applies data-size attribute for lg', () => {
      const { container } = render(<Spinner size="lg" />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('data-size', 'lg');
    });

    it('applies data-size attribute for xl', () => {
      const { container } = render(<Spinner size="xl" />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('data-size', 'xl');
    });

    it('applies token-based size styles', () => {
      const { container } = render(<Spinner size="md" />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveStyle({ width: 'var(--component-spinner-size-md)' });
      expect(spinner).toHaveStyle({ height: 'var(--component-spinner-size-md)' });
    });

    it('applies token-based border width styles', () => {
      const { container } = render(<Spinner size="md" />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveStyle({ borderWidth: 'var(--component-spinner-border-width-md)' });
    });
  });

  describe('Color Variants', () => {
    it('applies default color', () => {
      const { container } = render(<Spinner />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('data-color', 'default');
    });

    it('applies inverse color', () => {
      const { container } = render(<Spinner color="inverse" />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('data-color', 'inverse');
    });

    it('applies inherit color', () => {
      const { container } = render(<Spinner color="inherit" />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('data-color', 'inherit');
    });

    it('applies token-based color styles for default', () => {
      const { container } = render(<Spinner color="default" />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveStyle({ borderTopColor: 'var(--component-spinner-color-default)' });
    });
  });

  describe('Animation', () => {
    it('has rounded-full class', () => {
      const { container } = render(<Spinner />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveClass('rounded-full');
    });

    it('applies token-based animation duration', () => {
      const { container } = render(<Spinner />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveStyle({ animationDuration: 'var(--component-spinner-duration)' });
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(<Spinner className="custom-class" />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveClass('custom-class');
    });

    it('merges custom style with spinner styles', () => {
      const { container } = render(<Spinner style={{ margin: '10px' }} />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveStyle({ margin: '10px' });
    });

    it('passes through additional HTML attributes', () => {
      const { container } = render(<Spinner data-testid="spinner" />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveAttribute('data-testid', 'spinner');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('All Variants', () => {
    it('renders all sizes without errors', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      sizes.forEach((size) => {
        const { unmount } = render(<Spinner size={size} />);
        unmount();
      });
    });

    it('renders all colors without errors', () => {
      const colors = ['default', 'inverse', 'inherit'] as const;
      colors.forEach((color) => {
        const { unmount } = render(<Spinner color={color} />);
        unmount();
      });
    });
  });
});

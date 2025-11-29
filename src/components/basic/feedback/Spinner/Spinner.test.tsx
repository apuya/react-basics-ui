import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
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

  it('applies default size (md)', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('size-6');
  });

  it('applies xs size', () => {
    const { container } = render(<Spinner size="xs" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('size-3');
  });

  it('applies sm size', () => {
    const { container } = render(<Spinner size="sm" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('size-4');
  });

  it('applies lg size', () => {
    const { container } = render(<Spinner size="lg" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('size-8');
  });

  it('applies xl size', () => {
    const { container } = render(<Spinner size="xl" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('size-12');
  });

  it('applies default color', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('border-gray-200');
    expect(spinner).toHaveClass('border-t-blue-600');
  });

  it('applies inverse color', () => {
    const { container } = render(<Spinner color="inverse" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('border-white/30');
    expect(spinner).toHaveClass('border-t-white');
  });

  it('applies inherit color', () => {
    const { container } = render(<Spinner color="inherit" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('border-current/30');
    expect(spinner).toHaveClass('border-t-current');
  });

  it('has animate-spin class', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('animate-spin');
  });

  it('has rounded-full class', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('rounded-full');
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="custom-class" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('passes through additional HTML attributes', () => {
    const { container } = render(<Spinner data-testid="spinner" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveAttribute('data-testid', 'spinner');
  });

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

  it('applies appropriate border width for each size', () => {
    const { container: xsContainer } = render(<Spinner size="xs" />);
    expect(xsContainer.firstChild).toHaveClass('border');

    const { container: mdContainer } = render(<Spinner size="md" />);
    expect(mdContainer.firstChild).toHaveClass('border-2');

    const { container: xlContainer } = render(<Spinner size="xl" />);
    expect(xlContainer.firstChild).toHaveClass('border-4');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { BiPlus, BiSearch } from 'react-icons/bi';

describe('Button', () => {
  it('renders without crashing', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children content', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('renders as button element by default', () => {
    const { container } = render(<Button>Click</Button>);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('has type="button" by default', () => {
    const { container } = render(<Button>Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('allows custom type attribute', () => {
    const { container } = render(<Button type="submit">Submit</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders as anchor when as="a"', () => {
    const { container } = render(<Button as="a" href="/test">Link</Button>);
    const anchor = container.querySelector('a');
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('href', '/test');
  });

  it('does not apply type to non-button elements', () => {
    const { container } = render(<Button as="a" href="/test">Link</Button>);
    const anchor = container.querySelector('a');
    expect(anchor).not.toHaveAttribute('type');
  });

  it('applies primary variant by default', () => {
    const { container } = render(<Button>Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-variant', 'primary');
  });

  it('applies secondary variant', () => {
    const { container } = render(<Button variant="secondary">Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-variant', 'secondary');
  });

  it('applies tertiary variant', () => {
    const { container } = render(<Button variant="tertiary">Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-variant', 'tertiary');
  });

  it('applies ghost variant', () => {
    const { container } = render(<Button variant="ghost">Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-variant', 'ghost');
  });

  it('applies destructive variant', () => {
    const { container } = render(<Button variant="destructive">Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-variant', 'destructive');
  });

  it('applies tabs variant', () => {
    const { container } = render(<Button variant="tabs">Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-variant', 'tabs');
  });

  it('applies default size by default', () => {
    const { container } = render(<Button>Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-size', 'default');
  });

  it('applies small size', () => {
    const { container } = render(<Button size="small">Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-size', 'small');
  });

  it('applies large size', () => {
    const { container } = render(<Button size="large">Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-size', 'large');
  });

  it('disables button when disabled prop is true', () => {
    const { container } = render(<Button disabled>Click</Button>);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('disables button when isLoading is true', () => {
    const { container } = render(<Button isLoading>Loading</Button>);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('sets aria-busy when loading', () => {
    const { container } = render(<Button isLoading>Loading</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('sets data-loading when loading', () => {
    const { container } = render(<Button isLoading>Loading</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-loading', 'true');
  });

  it('shows spinner when loading', () => {
    const { container } = render(<Button isLoading>Loading</Button>);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders leading icon', () => {
    const { container } = render(<Button leadingIcon={<BiPlus data-testid="icon" />}>Add</Button>);
    expect(container.querySelector('[data-testid="icon"]')).toBeInTheDocument();
  });

  it('renders trailing icon', () => {
    const { container } = render(<Button trailingIcon={<BiSearch data-testid="icon" />}>Search</Button>);
    expect(container.querySelector('[data-testid="icon"]')).toBeInTheDocument();
  });

  it('hides icons when loading', () => {
    const { container } = render(
      <Button isLoading leadingIcon={<BiPlus data-testid="leading" />} trailingIcon={<BiSearch data-testid="trailing" />}>
        Loading
      </Button>
    );
    expect(container.querySelector('[data-testid="leading"]')).not.toBeInTheDocument();
    expect(container.querySelector('[data-testid="trailing"]')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button disabled onClick={onClick}>Click</Button>);
    fireEvent.click(getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button isLoading onClick={onClick}>Click</Button>);
    fireEvent.click(getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    let refValue: HTMLButtonElement | null = null;
    render(<Button ref={(el) => { refValue = el; }}>Click</Button>);
    expect(refValue).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards ref for anchor element', () => {
    let refValue: HTMLAnchorElement | null = null;
    render(<Button as="a" href="#" ref={(el) => { refValue = el as HTMLAnchorElement; }}>Link</Button>);
    expect(refValue).toBeInstanceOf(HTMLAnchorElement);
  });

  it('passes through additional HTML attributes', () => {
    const { container } = render(<Button data-testid="test-button">Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-testid', 'test-button');
  });

  it('applies inline padding styles based on size', () => {
    const { container } = render(<Button size="small">Click</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveStyle({ paddingInline: 'var(--component-button-padding-inline-small)' });
  });

  it('renders icon-only button without children', () => {
    const { container } = render(<Button leadingIcon={<BiSearch />} aria-label="Search" />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Search');
  });

  it('renders all variants without errors', () => {
    const variants = ['primary', 'secondary', 'tertiary', 'ghost', 'destructive', 'tabs'] as const;
    variants.forEach((variant) => {
      const { container, unmount } = render(<Button variant={variant}>Test</Button>);
      expect(container.querySelector('button')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders all sizes without errors', () => {
    const sizes = ['small', 'default', 'large'] as const;
    sizes.forEach((size) => {
      const { container, unmount } = render(<Button size={size}>Test</Button>);
      expect(container.querySelector('button')).toBeInTheDocument();
      unmount();
    });
  });
});

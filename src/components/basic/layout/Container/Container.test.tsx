import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('renders without crashing', () => {
    const { container } = render(<Container>Content</Container>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Container>Test Content</Container>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default size (xl)', () => {
    const { container } = render(<Container>Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('max-w-[1280px]');
  });

  it('applies small size', () => {
    const { container } = render(<Container size="sm">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('max-w-[640px]');
  });

  it('applies medium size', () => {
    const { container } = render(<Container size="md">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('max-w-[768px]');
  });

  it('applies large size', () => {
    const { container } = render(<Container size="lg">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('max-w-[1024px]');
  });

  it('applies extra large size', () => {
    const { container } = render(<Container size="xl">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('max-w-[1280px]');
  });

  it('applies 2xl size', () => {
    const { container } = render(<Container size="2xl">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('max-w-[1536px]');
  });

  it('applies full size', () => {
    const { container } = render(<Container size="full">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('max-w-full');
  });

  it('applies prose size', () => {
    const { container } = render(<Container size="prose">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('max-w-[65ch]');
  });

  it('applies default padding (md)', () => {
    const { container } = render(<Container>Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('px-[length:var(--semantic-space-default)]');
  });

  it('applies no padding', () => {
    const { container } = render(<Container padding="none">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('px-0');
  });

  it('applies small padding', () => {
    const { container } = render(<Container padding="sm">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('px-[length:var(--semantic-space-compact)]');
  });

  it('applies medium padding', () => {
    const { container } = render(<Container padding="md">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('px-[length:var(--semantic-space-default)]');
  });

  it('applies large padding', () => {
    const { container } = render(<Container padding="lg">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('px-[length:var(--semantic-space-comfortable)]');
  });

  it('applies extra large padding', () => {
    const { container } = render(<Container padding="xl">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('px-[length:var(--semantic-space-loose)]');
  });

  it('centers content by default', () => {
    const { container } = render(<Container>Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('mx-auto');
  });

  it('does not center when centered is false', () => {
    const { container } = render(<Container centered={false}>Content</Container>);
    const element = container.firstChild;
    expect(element).not.toHaveClass('mx-auto');
    expect(element).toHaveClass('w-full');
  });

  it('applies custom className', () => {
    const { container } = render(<Container className="custom-class">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Container ref={ref}>Content</Container>);
    expect(ref).toHaveBeenCalled();
  });

  it('passes through additional HTML attributes', () => {
    render(<Container data-testid="container" aria-label="Main content">Content</Container>);
    const element = screen.getByTestId('container');
    expect(element).toHaveAttribute('aria-label', 'Main content');
  });

  it('handles id attribute', () => {
    const { container } = render(<Container id="main-container">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveAttribute('id', 'main-container');
  });

  it('renders with all props combined', () => {
    const { container } = render(
      <Container size="lg" padding="sm" centered={true} className="custom">
        Content
      </Container>
    );
    const element = container.firstChild;
    expect(element).toHaveClass('max-w-[1024px]');
    expect(element).toHaveClass('px-[length:var(--semantic-space-compact)]');
    expect(element).toHaveClass('mx-auto');
    expect(element).toHaveClass('custom');
  });

  it('renders all sizes without errors', () => {
    const { container, rerender } = render(<Container size="sm">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Container size="md">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Container size="lg">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Container size="xl">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Container size="2xl">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Container size="full">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Container size="prose">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders all padding sizes without errors', () => {
    const { container, rerender } = render(<Container padding="none">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Container padding="sm">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Container padding="md">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Container padding="lg">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Container padding="xl">Content</Container>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders as a div element', () => {
    const { container } = render(<Container>Content</Container>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('handles nested containers', () => {
    render(
      <Container size="2xl">
        Outer
        <Container size="sm">Inner</Container>
      </Container>
    );
    expect(screen.getByText('Outer')).toBeInTheDocument();
    expect(screen.getByText('Inner')).toBeInTheDocument();
  });

  it('applies width class when centered', () => {
    const { container } = render(<Container centered={true}>Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveClass('w-full');
  });

  it('combines size and padding correctly', () => {
    const { container } = render(
      <Container size="prose" padding="xl">
        Content
      </Container>
    );
    const element = container.firstChild;
    expect(element).toHaveClass('max-w-[65ch]');
    expect(element).toHaveClass('px-[length:var(--semantic-space-loose)]');
  });

  it('handles onClick event', () => {
    const handleClick = vi.fn();
    render(<Container onClick={handleClick}>Content</Container>);
    const element = screen.getByText('Content');
    element.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies role attribute', () => {
    const { container } = render(<Container role="main">Content</Container>);
    const element = container.firstChild;
    expect(element).toHaveAttribute('role', 'main');
  });

  it('handles complex children', () => {
    render(
      <Container>
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </Container>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('memoizes correctly', () => {
    const { rerender } = render(<Container>Content</Container>);
    const firstRender = screen.getByText('Content');
    
    // Rerender with same props
    rerender(<Container>Content</Container>);
    const secondRender = screen.getByText('Content');
    
    expect(firstRender).toBe(secondRender);
  });
});

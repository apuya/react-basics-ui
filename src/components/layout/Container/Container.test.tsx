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

  describe('Size Variants', () => {
    it('applies default size (xl)', () => {
      render(<Container data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-size', 'xl');
    });

    it('applies small size', () => {
      render(<Container size="sm" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-size', 'sm');
    });

    it('applies medium size', () => {
      render(<Container size="md" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-size', 'md');
    });

    it('applies large size', () => {
      render(<Container size="lg" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-size', 'lg');
    });

    it('applies extra large size', () => {
      render(<Container size="xl" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-size', 'xl');
    });

    it('applies 2xl size', () => {
      render(<Container size="2xl" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-size', '2xl');
    });

    it('applies full size', () => {
      render(<Container size="full" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-size', 'full');
    });

    it('applies prose size', () => {
      const { container } = render(<Container size="prose" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-size', 'prose');
      expect(container.firstChild).toHaveClass('max-w-prose');
    });
  });

  describe('Padding Variants', () => {
    it('applies default padding (md)', () => {
      render(<Container data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-padding', 'md');
    });

    it('applies no padding', () => {
      const { container } = render(<Container padding="none" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-padding', 'none');
      expect(container.firstChild).toHaveClass('px-0');
    });

    it('applies small padding', () => {
      render(<Container padding="sm" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-padding', 'sm');
    });

    it('applies medium padding', () => {
      render(<Container padding="md" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-padding', 'md');
    });

    it('applies large padding', () => {
      render(<Container padding="lg" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-padding', 'lg');
    });

    it('applies extra large padding', () => {
      render(<Container padding="xl" data-testid="container">Content</Container>);
      expect(screen.getByTestId('container')).toHaveAttribute('data-padding', 'xl');
    });
  });

  describe('Centered', () => {
    it('centers content by default', () => {
      const { container } = render(<Container data-testid="container">Content</Container>);
      expect(container.firstChild).toHaveClass('mx-auto');
      expect(screen.getByTestId('container')).toHaveAttribute('data-centered');
    });

    it('does not center when centered is false', () => {
      const { container } = render(<Container centered={false} data-testid="container">Content</Container>);
      expect(container.firstChild).not.toHaveClass('mx-auto');
      expect(container.firstChild).toHaveClass('w-full');
      expect(screen.getByTestId('container')).not.toHaveAttribute('data-centered');
    });
  });

  it('applies custom className', () => {
    const { container } = render(<Container className="custom-class">Content</Container>);
    expect(container.firstChild).toHaveClass('custom-class');
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
    expect(container.firstChild).toHaveAttribute('id', 'main-container');
  });

  it('renders with all props combined', () => {
    render(
      <Container size="lg" padding="sm" centered={true} className="custom" data-testid="container">
        Content
      </Container>
    );
    const element = screen.getByTestId('container');
    expect(element).toHaveAttribute('data-size', 'lg');
    expect(element).toHaveAttribute('data-padding', 'sm');
    expect(element).toHaveAttribute('data-centered');
    expect(element).toHaveClass('mx-auto');
    expect(element).toHaveClass('custom');
  });

  it('renders all sizes without errors', () => {
    const { rerender } = render(<Container size="sm" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();

    rerender(<Container size="md" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();

    rerender(<Container size="lg" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();

    rerender(<Container size="xl" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();

    rerender(<Container size="2xl" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();

    rerender(<Container size="full" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();

    rerender(<Container size="prose" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  it('renders all padding sizes without errors', () => {
    const { rerender } = render(<Container padding="none" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();

    rerender(<Container padding="sm" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();

    rerender(<Container padding="md" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();

    rerender(<Container padding="lg" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();

    rerender(<Container padding="xl" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();
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
    expect(container.firstChild).toHaveClass('w-full');
  });

  it('combines size and padding correctly', () => {
    render(
      <Container size="prose" padding="xl" data-testid="container">
        Content
      </Container>
    );
    const element = screen.getByTestId('container');
    expect(element).toHaveAttribute('data-size', 'prose');
    expect(element).toHaveAttribute('data-padding', 'xl');
    expect(element).toHaveClass('max-w-prose');
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
    expect(container.firstChild).toHaveAttribute('role', 'main');
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

  describe('DisplayName', () => {
    it('has correct displayName', () => {
      expect(Container.displayName).toBe('Container');
    });
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies default variant (rectangle)', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('rounded-none');
  });

  it('applies circle variant', () => {
    const { container } = render(<Skeleton variant="circle" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('rounded-full');
  });

  it('applies rounded variant', () => {
    const { container } = render(<Skeleton variant="rounded" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('rounded-[var(--semantic-border-radius-md)]');
  });

  it('applies text variant', () => {
    const { container } = render(<Skeleton variant="text" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('h-[1em]');
  });

  it('applies pulse animation by default', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('applies wave animation', () => {
    const { container } = render(<Skeleton animation="wave" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton.className).toContain('before:animate-[wave_2s_infinite]');
  });

  it('applies no animation when animation is false', () => {
    const { container } = render(<Skeleton animation={false} />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).not.toHaveClass('animate-pulse');
  });

  it('applies custom width as number', () => {
    const { container } = render(<Skeleton width={200} />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ width: '200px' });
  });

  it('applies custom width as string', () => {
    const { container } = render(<Skeleton width="50%" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ width: '50%' });
  });

  it('applies custom height as number', () => {
    const { container } = render(<Skeleton height={100} />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ height: '100px' });
  });

  it('applies custom height as string', () => {
    const { container } = render(<Skeleton height="5rem" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ height: '5rem' });
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('custom-class');
  });

  it('renders single text line by default', () => {
    const { container } = render(<Skeleton variant="text" />);
    expect(container.querySelectorAll('[aria-busy="true"]')).toHaveLength(1);
  });

  it('renders multiple text lines when count is specified', () => {
    const { container } = render(<Skeleton variant="text" count={3} />);
    const wrapper = container.firstChild as HTMLElement;
    const lines = wrapper.querySelectorAll('[aria-busy="true"]');
    expect(lines).toHaveLength(3);
  });

  it('makes last text line shorter (80%) when count > 1', () => {
    const { container } = render(<Skeleton variant="text" count={3} width="100%" />);
    const wrapper = container.firstChild as HTMLElement;
    const lines = wrapper.querySelectorAll('[aria-busy="true"]');
    const lastLine = lines[lines.length - 1] as HTMLElement;
    expect(lastLine).toHaveStyle({ width: '80%' });
  });

  it('has proper ARIA attributes', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).toHaveAttribute('aria-live', 'polite');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through additional HTML attributes', () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveAttribute('data-testid', 'skeleton');
  });

  it('combines custom style with width/height props', () => {
    const { container } = render(
      <Skeleton width={200} height={100} style={{ margin: '10px' }} />
    );
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({
      width: '200px',
      height: '100px',
      margin: '10px',
    });
  });

  it('renders all variants without errors', () => {
    const variants = ['rectangle', 'rounded', 'circle', 'text'] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Skeleton variant={variant} />);
      unmount();
    });
  });

  it('renders all animations without errors', () => {
    const animations = ['pulse', 'wave', 'none', false] as const;
    animations.forEach((animation) => {
      const { unmount } = render(<Skeleton animation={animation} />);
      unmount();
    });
  });
});

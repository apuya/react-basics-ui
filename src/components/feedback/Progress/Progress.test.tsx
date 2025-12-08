/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  describe('Rendering', () => {
    it('should render with a value', () => {
      const { container } = render(<Progress value={50} />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toBeInTheDocument();
    });

    it('should display percentage when showValue is true', () => {
      render(<Progress value={50} showValue />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('should not display percentage when showValue is false', () => {
      render(<Progress value={50} showValue={false} />);
      expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });

    it('should not display percentage by default', () => {
      render(<Progress value={50} />);
      expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });
  });

  describe('Value handling', () => {
    it('should clamp value to 0 when negative', () => {
      const { container } = render(<Progress value={-10} />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    });

    it('should clamp value to max when exceeding max', () => {
      const { container } = render(<Progress value={150} max={100} />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    });

    it('should handle custom max value', () => {
      const { container } = render(<Progress value={30} max={50} />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveAttribute('aria-valuenow', '30');
      expect(progressBar).toHaveAttribute('aria-valuemax', '50');
    });

    it('should calculate percentage correctly with custom max', () => {
      render(<Progress value={25} max={50} showValue />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('should show 0% when value is 0', () => {
      render(<Progress value={0} showValue />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('should show 100% when value equals max', () => {
      render(<Progress value={100} showValue />);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply default size by default', () => {
      const { container } = render(<Progress value={50} />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveClass('h-2');
    });

    it('should apply small size', () => {
      const { container } = render(<Progress value={50} size="sm" />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveClass('h-1');
    });

    it('should apply large size', () => {
      const { container } = render(<Progress value={50} size="lg" />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveClass('h-3');
    });

    it('should set data-size attribute', () => {
      const { container } = render(<Progress value={50} size="lg" />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Variants', () => {
    it('should apply default variant by default', () => {
      const { container } = render(<Progress value={50} />);
      const fill = container.querySelector('[role="progressbar"] > div');
      expect(fill).toHaveClass('bg-[color:var(--component-progress-bg-fill)]');
    });

    it('should apply success variant', () => {
      const { container } = render(<Progress value={50} variant="success" />);
      const fill = container.querySelector('[role="progressbar"] > div');
      expect(fill).toHaveClass('bg-[color:var(--component-progress-fill-success)]');
    });

    it('should apply warning variant', () => {
      const { container } = render(<Progress value={50} variant="warning" />);
      const fill = container.querySelector('[role="progressbar"] > div');
      expect(fill).toHaveClass('bg-[color:var(--component-progress-fill-warning)]');
    });

    it('should apply error variant', () => {
      const { container } = render(<Progress value={50} variant="error" />);
      const fill = container.querySelector('[role="progressbar"] > div');
      expect(fill).toHaveClass('bg-[color:var(--component-progress-fill-error)]');
    });

    it('should set data-variant attribute', () => {
      const { container } = render(<Progress value={50} variant="success" />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveAttribute('data-variant', 'success');
    });
  });

  describe('Fill width', () => {
    it('should set fill width to 0% when value is 0', () => {
      const { container } = render(<Progress value={0} />);
      const fill = container.querySelector('[role="progressbar"] > div');
      expect(fill).toHaveStyle({ width: '0%' });
    });

    it('should set fill width to 50% when value is 50', () => {
      const { container } = render(<Progress value={50} />);
      const fill = container.querySelector('[role="progressbar"] > div');
      expect(fill).toHaveStyle({ width: '50%' });
    });

    it('should set fill width to 100% when value is 100', () => {
      const { container } = render(<Progress value={100} />);
      const fill = container.querySelector('[role="progressbar"] > div');
      expect(fill).toHaveStyle({ width: '100%' });
    });

    it('should calculate fill width correctly with custom max', () => {
      const { container } = render(<Progress value={25} max={50} />);
      const fill = container.querySelector('[role="progressbar"] > div');
      expect(fill).toHaveStyle({ width: '50%' });
    });
  });

  describe('Accessibility', () => {
    it('should have role="progressbar"', () => {
      const { container } = render(<Progress value={50} />);
      expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
    });

    it('should set aria-valuenow to current value', () => {
      const { container } = render(<Progress value={75} />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    });

    it('should set aria-valuemin to 0', () => {
      const { container } = render(<Progress value={50} />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    });

    it('should set aria-valuemax to max value', () => {
      const { container } = render(<Progress value={50} max={100} />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });

    it('should set aria-label when label prop is provided', () => {
      const { container } = render(<Progress value={50} label="Upload progress" />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveAttribute('aria-label', 'Upload progress');
    });

    it('should have aria-hidden on percentage text', () => {
      render(<Progress value={50} showValue />);
      const percentageSpan = screen.getByText('50%');
      expect(percentageSpan).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to the progress bar element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Progress ref={ref} value={50} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'progressbar');
    });
  });

  describe('Custom props', () => {
    it('should merge custom className with default classes', () => {
      const { container } = render(
        <Progress value={50} className="custom-class" />
      );
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveClass('custom-class');
      expect(progressBar).toHaveClass('w-full');
    });

    it('should pass through additional HTML attributes', () => {
      render(
        <Progress
          value={50}
          data-testid="custom-progress"
          id="progress-1"
        />
      );
      const progressBar = screen.getByTestId('custom-progress');
      expect(progressBar).toHaveAttribute('id', 'progress-1');
    });
  });

  describe('Styling', () => {
    it('should apply base track classes', () => {
      const { container } = render(<Progress value={50} />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toHaveClass('w-full');
      expect(progressBar).toHaveClass('overflow-hidden');
      expect(progressBar).toHaveClass('rounded-full');
      expect(progressBar).toHaveClass('bg-[color:var(--component-progress-bg-track)]');
    });

    it('should apply base fill classes', () => {
      const { container } = render(<Progress value={50} />);
      const fill = container.querySelector('[role="progressbar"] > div');
      expect(fill).toHaveClass('h-full');
      expect(fill).toHaveClass('transition-all');
      expect(fill).toHaveClass('duration-300');
      expect(fill).toHaveClass('ease-in-out');
      expect(fill).toHaveClass('rounded-full');
    });
  });

  describe('Edge cases', () => {
    it('should handle fractional values correctly', () => {
      render(<Progress value={33.33} showValue />);
      expect(screen.getByText('33%')).toBeInTheDocument();
    });

    it('should handle very small values', () => {
      const { container } = render(<Progress value={0.5} showValue />);
      const fill = container.querySelector('[role="progressbar"] > div');
      expect(fill).toHaveStyle({ width: '0.5%' });
    });

    it('should round percentage display to nearest integer', () => {
      render(<Progress value={66.66} showValue />);
      expect(screen.getByText('67%')).toBeInTheDocument();
    });
  });
});

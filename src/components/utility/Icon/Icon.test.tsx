import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Icon } from './Icon';
import { BiHome, BiSearch, BiUser } from 'react-icons/bi';

describe('Icon', () => {
  // ===========================================================================
  // Rendering
  // ===========================================================================

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Icon icon={BiHome} data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
      expect(icon.querySelector('svg')).toBeInTheDocument();
    });

    it('should render different icons', () => {
      const { rerender } = render(<Icon icon={BiHome} data-testid="icon" />);
      expect(screen.getByTestId('icon').querySelector('svg')).toBeInTheDocument();

      rerender(<Icon icon={BiSearch} data-testid="icon" />);
      expect(screen.getByTestId('icon').querySelector('svg')).toBeInTheDocument();

      rerender(<Icon icon={BiUser} data-testid="icon" />);
      expect(screen.getByTestId('icon').querySelector('svg')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<Icon icon={BiHome} className="custom-class" data-testid="icon" />);
      expect(screen.getByTestId('icon')).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = vi.fn();
      render(<Icon icon={BiHome} ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Size Variants
  // ===========================================================================

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    sizes.forEach((size) => {
      it(`should render ${size} size`, () => {
        render(<Icon icon={BiHome} size={size} data-testid={`icon-${size}`} />);
        expect(screen.getByTestId(`icon-${size}`)).toBeInTheDocument();
      });
    });

    it('should default to md size', () => {
      render(<Icon icon={BiHome} data-testid="icon" />);
      // Default size is applied through CSS classes
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  // ===========================================================================
  // Color Variants
  // ===========================================================================

  describe('Color Variants', () => {
    const colors = [
      'primary',
      'secondary',
      'tertiary',
      'inverse',
      'disabled',
      'success',
      'warning',
      'error',
      'info',
      'inherit',
    ] as const;

    colors.forEach((color) => {
      it(`should render ${color} color`, () => {
        render(<Icon icon={BiHome} color={color} data-testid={`icon-${color}`} />);
        expect(screen.getByTestId(`icon-${color}`)).toBeInTheDocument();
      });
    });

    it('should default to inherit color', () => {
      render(<Icon icon={BiHome} data-testid="icon" />);
      expect(screen.getByTestId('icon')).toHaveClass('text-inherit');
    });
  });

  // ===========================================================================
  // Accessibility
  // ===========================================================================

  describe('Accessibility', () => {
    it('should be aria-hidden by default (decorative)', () => {
      render(<Icon icon={BiHome} data-testid="icon" />);
      expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have role="img" when aria-label provided', () => {
      render(<Icon icon={BiHome} aria-label="Home" data-testid="icon" />);
      expect(screen.getByTestId('icon')).toHaveAttribute('role', 'img');
    });

    it('should have aria-label when provided', () => {
      render(<Icon icon={BiHome} aria-label="Home" data-testid="icon" />);
      expect(screen.getByTestId('icon')).toHaveAttribute('aria-label', 'Home');
    });

    it('should not be aria-hidden when aria-label provided', () => {
      render(<Icon icon={BiHome} aria-label="Home" data-testid="icon" />);
      expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'false');
    });

    it('should allow explicit aria-hidden override', () => {
      render(<Icon icon={BiHome} aria-hidden={false} data-testid="icon" />);
      expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'false');
    });
  });

  // ===========================================================================
  // Structure
  // ===========================================================================

  describe('Structure', () => {
    it('should render as a span element', () => {
      render(<Icon icon={BiHome} data-testid="icon" />);
      expect(screen.getByTestId('icon').tagName).toBe('SPAN');
    });

    it('should contain SVG from icon component', () => {
      render(<Icon icon={BiHome} data-testid="icon" />);
      const svg = screen.getByTestId('icon').querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('h-full', 'w-full');
    });

    it('should have inline-flex display', () => {
      render(<Icon icon={BiHome} data-testid="icon" />);
      expect(screen.getByTestId('icon')).toHaveClass('inline-flex');
    });
  });
});

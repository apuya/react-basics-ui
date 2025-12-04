import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Divider data-testid="divider" />);
      expect(screen.getByTestId('divider')).toBeInTheDocument();
    });

    it('renders as hr element by default', () => {
      render(<Divider data-testid="divider" />);
      expect(screen.getByTestId('divider').tagName).toBe('HR');
    });

    it('has separator role', () => {
      render(<Divider data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('role', 'separator');
    });
  });

  describe('Orientation', () => {
    it('defaults to horizontal orientation', () => {
      render(<Divider data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveAttribute('data-orientation', 'horizontal');
      expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('applies horizontal orientation', () => {
      render(<Divider orientation="horizontal" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveClass('w-full');
      expect(divider).toHaveClass('h-px');
    });

    it('applies vertical orientation', () => {
      render(<Divider orientation="vertical" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveClass('h-full');
      expect(divider).toHaveClass('w-px');
      expect(divider).toHaveAttribute('data-orientation', 'vertical');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Variant', () => {
    it('defaults to solid variant', () => {
      render(<Divider data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('data-variant', 'solid');
    });

    it('applies solid variant', () => {
      render(<Divider variant="solid" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('data-variant', 'solid');
    });

    it('applies dashed variant', () => {
      render(<Divider variant="dashed" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('data-variant', 'dashed');
    });

    it('applies dotted variant', () => {
      render(<Divider variant="dotted" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('data-variant', 'dotted');
    });
  });

  describe('Spacing', () => {
    it('defaults to md spacing', () => {
      render(<Divider data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('data-spacing', 'md');
    });

    it('applies none spacing', () => {
      render(<Divider spacing="none" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('data-spacing', 'none');
    });

    it('applies xs spacing', () => {
      render(<Divider spacing="xs" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('data-spacing', 'xs');
    });

    it('applies sm spacing', () => {
      render(<Divider spacing="sm" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('data-spacing', 'sm');
    });

    it('applies md spacing', () => {
      render(<Divider spacing="md" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('data-spacing', 'md');
    });

    it('applies lg spacing', () => {
      render(<Divider spacing="lg" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('data-spacing', 'lg');
    });

    it('applies xl spacing', () => {
      render(<Divider spacing="xl" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('data-spacing', 'xl');
    });
  });

  describe('Label', () => {
    it('renders without label by default', () => {
      render(<Divider data-testid="divider" />);
      expect(screen.getByTestId('divider').tagName).toBe('HR');
    });

    it('renders with text label', () => {
      render(<Divider label="OR" data-testid="divider" />);
      expect(screen.getByText('OR')).toBeInTheDocument();
    });

    it('renders as div wrapper when label is provided', () => {
      render(<Divider label="OR" data-testid="divider" />);
      const wrappers = screen.getAllByRole('separator');
      // First separator is the wrapper div
      expect(wrappers[0].tagName).toBe('DIV');
    });

    it('maintains data attributes on labeled divider', () => {
      render(<Divider label="OR" data-testid="divider" />);
      const wrappers = screen.getAllByRole('separator');
      // First separator is the wrapper div
      expect(wrappers[0]).toHaveAttribute('data-orientation', 'horizontal');
      expect(wrappers[0]).toHaveAttribute('data-variant', 'solid');
      expect(wrappers[0]).toHaveAttribute('data-spacing', 'md');
    });

    it('renders with React node as label', () => {
      render(
        <Divider
          label={<span data-testid="custom-label">Custom</span>}
          data-testid="divider"
        />
      );
      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    });
  });

  describe('Label Position', () => {
    it('defaults to center label position', () => {
      render(<Divider label="OR" />);
      // When centered, both left and right hr elements should exist
      const hrs = document.querySelectorAll('hr');
      expect(hrs.length).toBe(2);
    });

    it('applies left label position', () => {
      render(<Divider label="OR" labelPosition="left" />);
      // When left, only right hr exists
      const hrs = document.querySelectorAll('hr');
      expect(hrs.length).toBe(1);
    });

    it('applies right label position', () => {
      render(<Divider label="OR" labelPosition="right" />);
      // When right, only left hr exists
      const hrs = document.querySelectorAll('hr');
      expect(hrs.length).toBe(1);
    });

    it('ignores labelPosition when no label is provided', () => {
      render(<Divider labelPosition="left" data-testid="divider" />);
      expect(screen.getByTestId('divider').tagName).toBe('HR');
    });

    it('ignores label for vertical orientation', () => {
      render(<Divider orientation="vertical" label="OR" data-testid="divider" />);
      // Vertical dividers don't support labels
      expect(screen.getByTestId('divider').tagName).toBe('HR');
    });
  });

  describe('Custom className', () => {
    it('applies custom className to standard divider', () => {
      render(<Divider className="custom-class" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveClass('custom-class');
    });

    it('applies custom className to labeled divider wrapper', () => {
      render(<Divider label="OR" className="custom-class" />);
      const wrappers = screen.getAllByRole('separator');
      // First separator is the wrapper div
      expect(wrappers[0]).toHaveClass('custom-class');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to hr element', () => {
      let refValue: HTMLHRElement | null = null;
      render(
        <Divider
          ref={(el) => {
            refValue = el;
          }}
        />
      );
      expect(refValue).toBeInstanceOf(HTMLHRElement);
    });

    it('does not forward ref when label is provided (wrapper is div)', () => {
      let refValue: HTMLHRElement | null = null;
      render(
        <Divider
          label="OR"
          ref={(el) => {
            refValue = el;
          }}
        />
      );
      // When label is provided, ref doesn't get attached to the wrapper div
      expect(refValue).toBeNull();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional HTML attributes', () => {
      render(<Divider data-custom="value" data-testid="divider" aria-label="Section divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveAttribute('data-custom', 'value');
      expect(divider).toHaveAttribute('aria-label', 'Section divider');
    });
  });

  describe('Combined Props', () => {
    it('combines multiple props correctly', () => {
      render(
        <Divider
          orientation="horizontal"
          variant="dashed"
          spacing="lg"
          data-testid="divider"
        />
      );
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveAttribute('data-orientation', 'horizontal');
      expect(divider).toHaveAttribute('data-variant', 'dashed');
      expect(divider).toHaveAttribute('data-spacing', 'lg');
    });
  });

  describe('DisplayName', () => {
    it('has correct displayName', () => {
      expect(Divider.displayName).toBe('Divider');
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-orientation for horizontal', () => {
      render(<Divider orientation="horizontal" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('has correct aria-orientation for vertical', () => {
      render(<Divider orientation="vertical" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('has separator role', () => {
      render(<Divider data-testid="divider" />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });
});

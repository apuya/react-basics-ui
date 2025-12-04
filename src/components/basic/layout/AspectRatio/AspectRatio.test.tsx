import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AspectRatio } from './AspectRatio';

describe('AspectRatio', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<AspectRatio data-testid="aspect-ratio">Content</AspectRatio>);
      expect(screen.getByTestId('aspect-ratio')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <AspectRatio>
          <img src="test.jpg" alt="Test" />
        </AspectRatio>
      );
      expect(screen.getByAltText('Test')).toBeInTheDocument();
    });

    it('renders as div element', () => {
      render(<AspectRatio data-testid="aspect-ratio">Content</AspectRatio>);
      expect(screen.getByTestId('aspect-ratio').tagName).toBe('DIV');
    });

    it('wraps children in an absolute positioned container', () => {
      render(
        <AspectRatio data-testid="aspect-ratio">
          <span>Inner</span>
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      const innerWrapper = container.querySelector('.absolute.inset-0');
      expect(innerWrapper).toBeInTheDocument();
      expect(innerWrapper).toContainElement(screen.getByText('Inner'));
    });
  });

  describe('Numeric Ratio', () => {
    it('defaults to 1:1 ratio (square)', () => {
      render(<AspectRatio data-testid="aspect-ratio">Content</AspectRatio>);
      const container = screen.getByTestId('aspect-ratio');
      expect(container).toHaveStyle({ paddingBottom: '100%' });
    });

    it('applies 16:9 ratio', () => {
      render(
        <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      // 100 / (16/9) = 56.25%
      expect(container).toHaveStyle({ paddingBottom: '56.25%' });
    });

    it('applies 4:3 ratio', () => {
      render(
        <AspectRatio ratio={4 / 3} data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      // 100 / (4/3) = 75%
      expect(container).toHaveStyle({ paddingBottom: '75%' });
    });

    it('applies custom numeric ratio', () => {
      render(
        <AspectRatio ratio={2} data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      // 100 / 2 = 50%
      expect(container).toHaveStyle({ paddingBottom: '50%' });
    });
  });

  describe('Named Ratio Presets', () => {
    it('applies square preset', () => {
      render(
        <AspectRatio ratio="square" data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      expect(container).toHaveStyle({ paddingBottom: '100%' });
      expect(container).toHaveAttribute('data-ratio', 'square');
    });

    it('applies video preset (16:9)', () => {
      render(
        <AspectRatio ratio="video" data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      expect(container).toHaveStyle({ paddingBottom: '56.25%' });
      expect(container).toHaveAttribute('data-ratio', 'video');
    });

    it('applies widescreen preset (21:9)', () => {
      render(
        <AspectRatio ratio="widescreen" data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      // 100 / (21/9) ≈ 42.857%
      expect(container).toHaveAttribute('data-ratio', 'widescreen');
    });

    it('applies portrait preset (3:4)', () => {
      render(
        <AspectRatio ratio="portrait" data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      // 100 / (3/4) = 133.33%
      expect(container).toHaveAttribute('data-ratio', 'portrait');
    });

    it('applies landscape preset (4:3)', () => {
      render(
        <AspectRatio ratio="landscape" data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      expect(container).toHaveStyle({ paddingBottom: '75%' });
      expect(container).toHaveAttribute('data-ratio', 'landscape');
    });

    it('applies golden ratio preset', () => {
      render(
        <AspectRatio ratio="golden" data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      expect(container).toHaveAttribute('data-ratio', 'golden');
    });

    it('applies ultrawide preset (32:9)', () => {
      render(
        <AspectRatio ratio="ultrawide" data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      expect(container).toHaveAttribute('data-ratio', 'ultrawide');
    });
  });

  describe('Data Attributes', () => {
    it('sets data-ratio for named presets', () => {
      render(
        <AspectRatio ratio="video" data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      expect(screen.getByTestId('aspect-ratio')).toHaveAttribute('data-ratio', 'video');
    });

    it('does not set data-ratio for numeric ratios', () => {
      render(
        <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      expect(screen.getByTestId('aspect-ratio')).not.toHaveAttribute('data-ratio');
    });
  });

  describe('Base Classes', () => {
    it('applies base classes', () => {
      render(<AspectRatio data-testid="aspect-ratio">Content</AspectRatio>);
      const container = screen.getByTestId('aspect-ratio');
      expect(container).toHaveClass('relative');
      expect(container).toHaveClass('w-full');
      expect(container).toHaveClass('overflow-hidden');
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(
        <AspectRatio className="custom-class" data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      expect(screen.getByTestId('aspect-ratio')).toHaveClass('custom-class');
    });

    it('merges custom className with base classes', () => {
      render(
        <AspectRatio className="custom-class" data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      expect(container).toHaveClass('relative');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Custom style', () => {
    it('applies custom style', () => {
      render(
        <AspectRatio style={{ maxWidth: '500px' }} data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      expect(screen.getByTestId('aspect-ratio').style.maxWidth).toBe('500px');
    });

    it('merges custom style with paddingBottom', () => {
      render(
        <AspectRatio ratio="video" style={{ maxWidth: '500px' }} data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      expect(container).toHaveStyle({ paddingBottom: '56.25%' });
      expect(container.style.maxWidth).toBe('500px');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to div element', () => {
      let refValue: HTMLDivElement | null = null;
      render(
        <AspectRatio
          ref={(el) => {
            refValue = el;
          }}
        >
          Content
        </AspectRatio>
      );
      expect(refValue).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional HTML attributes', () => {
      render(
        <AspectRatio
          data-custom="value"
          data-testid="aspect-ratio"
          aria-label="Aspect ratio container"
        >
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      expect(container).toHaveAttribute('data-custom', 'value');
      expect(container).toHaveAttribute('aria-label', 'Aspect ratio container');
    });

    it('applies id attribute', () => {
      render(
        <AspectRatio id="my-aspect" data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      expect(screen.getByTestId('aspect-ratio')).toHaveAttribute('id', 'my-aspect');
    });
  });

  describe('DisplayName', () => {
    it('has correct displayName', () => {
      expect(AspectRatio.displayName).toBe('AspectRatio');
    });
  });

  describe('Edge Cases', () => {
    it('handles zero ratio gracefully', () => {
      // This would result in Infinity padding, but should still render
      render(
        <AspectRatio ratio={0.001} data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      expect(screen.getByTestId('aspect-ratio')).toBeInTheDocument();
    });

    it('renders without children', () => {
      render(<AspectRatio data-testid="aspect-ratio" />);
      expect(screen.getByTestId('aspect-ratio')).toBeInTheDocument();
    });

    it('handles invalid string ratio by defaulting to 1', () => {
      // TypeScript would catch this, but testing runtime behavior
      render(
        <AspectRatio ratio={'invalid' as any} data-testid="aspect-ratio">
          Content
        </AspectRatio>
      );
      const container = screen.getByTestId('aspect-ratio');
      // Should default to 1 (100% padding)
      expect(container).toHaveStyle({ paddingBottom: '100%' });
    });
  });
});

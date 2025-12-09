/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  describe('Rendering', () => {
    it('should render text content', () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should render as span by default', () => {
      render(<Text>Default Element</Text>);
      const element = screen.getByText('Default Element');
      expect(element.tagName).toBe('SPAN');
    });

    it('should render as specified element with "as" prop', () => {
      const { rerender } = render(<Text as="p">Paragraph</Text>);
      expect(screen.getByText('Paragraph').tagName).toBe('P');

      rerender(<Text as="label">Label</Text>);
      expect(screen.getByText('Label').tagName).toBe('LABEL');

      rerender(<Text as="div">Div</Text>);
      expect(screen.getByText('Div').tagName).toBe('DIV');

      rerender(<Text as="strong">Strong</Text>);
      expect(screen.getByText('Strong').tagName).toBe('STRONG');

      rerender(<Text as="em">Emphasis</Text>);
      expect(screen.getByText('Emphasis').tagName).toBe('EM');

      rerender(<Text as="small">Small</Text>);
      expect(screen.getByText('Small').tagName).toBe('SMALL');
    });
  });

  describe('Size Variants', () => {
    it('should apply caption size styles', () => {
      render(<Text size="caption">Caption Text</Text>);
      const element = screen.getByText('Caption Text');
      expect(element).toHaveClass('text-xs');
    });

    it('should apply small size styles', () => {
      render(<Text size="small">Small Text</Text>);
      const element = screen.getByText('Small Text');
      expect(element).toHaveClass('text-sm');
    });

    it('should apply body size styles by default', () => {
      render(<Text>Body Text</Text>);
      const element = screen.getByText('Body Text');
      expect(element).toHaveClass('text-base');
    });

    it('should apply subtitle size styles', () => {
      render(<Text size="subtitle">Subtitle Text</Text>);
      const element = screen.getByText('Subtitle Text');
      expect(element).toHaveClass('text-lg');
    });
  });

  describe('Weight Variants', () => {
    it('should apply regular weight by default', () => {
      render(<Text>Regular Text</Text>);
      const element = screen.getByText('Regular Text');
      expect(element).toHaveClass('font-normal');
    });

    it('should apply light weight', () => {
      render(<Text weight="light">Light Text</Text>);
      const element = screen.getByText('Light Text');
      expect(element).toHaveClass('font-light');
    });

    it('should apply medium weight', () => {
      render(<Text weight="medium">Medium Text</Text>);
      const element = screen.getByText('Medium Text');
      expect(element).toHaveClass('font-medium');
    });

    it('should apply semibold weight', () => {
      render(<Text weight="semibold">Semibold Text</Text>);
      const element = screen.getByText('Semibold Text');
      expect(element).toHaveClass('font-semibold');
    });

    it('should apply bold weight', () => {
      render(<Text weight="bold">Bold Text</Text>);
      const element = screen.getByText('Bold Text');
      expect(element).toHaveClass('font-bold');
    });
  });

  describe('Color Variants', () => {
    it('should apply primary color by default', () => {
      render(<Text>Primary Color</Text>);
      const element = screen.getByText('Primary Color');
      expect(element).toHaveClass('text-[color:var(--component-text-color-primary)]');
    });

    it('should apply secondary color', () => {
      render(<Text color="secondary">Secondary Color</Text>);
      const element = screen.getByText('Secondary Color');
      expect(element).toHaveClass('text-[color:var(--component-text-color-secondary)]');
    });

    it('should apply error color', () => {
      render(<Text color="error">Error Color</Text>);
      const element = screen.getByText('Error Color');
      expect(element).toHaveClass('text-[color:var(--component-text-color-error)]');
    });

    it('should apply success color', () => {
      render(<Text color="success">Success Color</Text>);
      const element = screen.getByText('Success Color');
      expect(element).toHaveClass('text-[color:var(--component-text-color-success)]');
    });

    it('should apply warning color', () => {
      render(<Text color="warning">Warning Color</Text>);
      const element = screen.getByText('Warning Color');
      expect(element).toHaveClass('text-[color:var(--component-text-color-warning)]');
    });

    it('should apply inherit color', () => {
      render(<Text color="inherit">Inherit Color</Text>);
      const element = screen.getByText('Inherit Color');
      expect(element).toHaveClass('text-inherit');
    });
  });

  describe('Line Height Variants', () => {
    it('should apply normal line height by default', () => {
      render(<Text>Normal Line Height</Text>);
      const element = screen.getByText('Normal Line Height');
      expect(element).toHaveClass('leading-normal');
    });

    it('should apply tight line height', () => {
      render(<Text lineHeight="tight">Tight Line Height</Text>);
      const element = screen.getByText('Tight Line Height');
      expect(element).toHaveClass('leading-tight');
    });

    it('should apply relaxed line height', () => {
      render(<Text lineHeight="relaxed">Relaxed Line Height</Text>);
      const element = screen.getByText('Relaxed Line Height');
      expect(element).toHaveClass('leading-relaxed');
    });
  });

  describe('Alignment', () => {
    it('should not apply alignment by default', () => {
      render(<Text>No Alignment</Text>);
      const element = screen.getByText('No Alignment');
      expect(element).not.toHaveClass('text-left');
      expect(element).not.toHaveClass('text-center');
      expect(element).not.toHaveClass('text-right');
    });

    it('should apply left alignment', () => {
      render(<Text align="left">Left Aligned</Text>);
      const element = screen.getByText('Left Aligned');
      expect(element).toHaveClass('text-left');
    });

    it('should apply center alignment', () => {
      render(<Text align="center">Center Aligned</Text>);
      const element = screen.getByText('Center Aligned');
      expect(element).toHaveClass('text-center');
    });

    it('should apply right alignment', () => {
      render(<Text align="right">Right Aligned</Text>);
      const element = screen.getByText('Right Aligned');
      expect(element).toHaveClass('text-right');
    });
  });

  describe('Font Family', () => {
    it('should apply body font family by default', () => {
      render(<Text>Body Font</Text>);
      const element = screen.getByText('Body Font');
      expect(element).toHaveClass('font-[family-name:var(--component-text-font-family)]');
    });

    it('should apply mono font family', () => {
      render(<Text fontFamily="mono">Mono Font</Text>);
      const element = screen.getByText('Mono Font');
      expect(element).toHaveClass('font-[family-name:var(--component-text-font-family-mono)]');
    });
  });

  describe('Truncate', () => {
    it('should not truncate by default', () => {
      render(<Text>Not Truncated</Text>);
      const element = screen.getByText('Not Truncated');
      expect(element).not.toHaveClass('truncate');
    });

    it('should apply truncate class when enabled', () => {
      render(<Text truncate>Truncated Text</Text>);
      const element = screen.getByText('Truncated Text');
      expect(element).toHaveClass('truncate');
    });
  });

  describe('Custom ClassName', () => {
    it('should merge custom className with default classes', () => {
      render(<Text className="custom-class">Custom Class</Text>);
      const element = screen.getByText('Custom Class');
      expect(element).toHaveClass('custom-class');
      expect(element).toHaveClass('text-base');
    });

    it('should allow Tailwind class override', () => {
      render(<Text className="text-red-500">Override Color</Text>);
      const element = screen.getByText('Override Color');
      expect(element).toHaveClass('text-red-500');
    });
  });

  describe('HTML Attributes', () => {
    it('should support htmlFor attribute when rendered as label', () => {
      render(
        <Text as="label" htmlFor="test-input">
          Label Text
        </Text>
      );
      const element = screen.getByText('Label Text');
      expect(element).toHaveAttribute('for', 'test-input');
    });

    it('should support data attributes', () => {
      render(<Text data-testid="custom-test-id">Data Attribute</Text>);
      expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
    });

    it('should support aria attributes', () => {
      render(<Text aria-label="Accessible Text">ARIA Text</Text>);
      const element = screen.getByText('ARIA Text');
      expect(element).toHaveAttribute('aria-label', 'Accessible Text');
    });

    it('should support onClick handler', () => {
      let clicked = false;
      render(<Text onClick={() => (clicked = true)}>Clickable</Text>);
      const element = screen.getByText('Clickable');
      element.click();
      expect(clicked).toBe(true);
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to the rendered element', () => {
      const ref = createRef<HTMLElement>();
      render(<Text ref={ref}>Ref Text</Text>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('SPAN');
    });

    it('should forward ref with different "as" prop', () => {
      const ref = createRef<HTMLElement>();
      render(
        <Text as="p" ref={ref}>
          Paragraph Ref
        </Text>
      );
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
      expect(ref.current?.tagName).toBe('P');
    });
  });

  describe('Combined Props', () => {
    it('should apply multiple style props together', () => {
      render(
        <Text
          size="subtitle"
          weight="bold"
          color="error"
          lineHeight="tight"
          align="center"
          fontFamily="mono"
          truncate
        >
          Combined Props
        </Text>
      );
      const element = screen.getByText('Combined Props');
      expect(element).toHaveClass('text-lg');
      expect(element).toHaveClass('font-bold');
      expect(element).toHaveClass('text-[color:var(--component-text-color-error)]');
      expect(element).toHaveClass('leading-tight');
      expect(element).toHaveClass('text-center');
      expect(element).toHaveClass('font-[family-name:var(--component-text-font-family-mono)]');
      expect(element).toHaveClass('truncate');
    });
  });

  describe('Display Name', () => {
    it('should have correct display name for debugging', () => {
      expect(Text.displayName).toBe('Text');
    });
  });
});

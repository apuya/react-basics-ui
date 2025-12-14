/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
  // =============================================================================
  // RENDERING
  // =============================================================================

  describe('Rendering', () => {
    it('should render heading content', () => {
      render(<Heading>Hello World</Heading>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should render as h2 by default', () => {
      render(<Heading>Default Heading</Heading>);
      const element = screen.getByText('Default Heading');
      expect(element.tagName).toBe('H2');
    });

    it('should render as specified element with "as" prop', () => {
      const { rerender } = render(<Heading as="h1">Heading 1</Heading>);
      expect(screen.getByText('Heading 1').tagName).toBe('H1');

      rerender(<Heading as="h2">Heading 2</Heading>);
      expect(screen.getByText('Heading 2').tagName).toBe('H2');

      rerender(<Heading as="h3">Heading 3</Heading>);
      expect(screen.getByText('Heading 3').tagName).toBe('H3');

      rerender(<Heading as="h4">Heading 4</Heading>);
      expect(screen.getByText('Heading 4').tagName).toBe('H4');

      rerender(<Heading as="h5">Heading 5</Heading>);
      expect(screen.getByText('Heading 5').tagName).toBe('H5');

      rerender(<Heading as="h6">Heading 6</Heading>);
      expect(screen.getByText('Heading 6').tagName).toBe('H6');
    });

    it('should use level prop for element when as is not specified', () => {
      render(<Heading level="h3">Level Heading</Heading>);
      expect(screen.getByText('Level Heading').tagName).toBe('H3');
    });

    it('should prefer as prop over level for element', () => {
      render(
        <Heading as="h1" level="h3">
          Mixed Props
        </Heading>
      );
      expect(screen.getByText('Mixed Props').tagName).toBe('H1');
    });
  });

  // =============================================================================
  // LEVEL STYLES
  // =============================================================================

  describe('Level Styles', () => {
    it('should apply h1 level styles', () => {
      render(<Heading as="h1">H1 Heading</Heading>);
      const element = screen.getByText('H1 Heading');
      expect(element).toHaveClass('text-[length:var(--component-heading-font-size-h1)]');
      expect(element).toHaveClass('font-[number:var(--component-heading-font-weight-h1)]');
      expect(element).toHaveClass('leading-[var(--component-heading-line-height-h1)]');
    });

    it('should apply h2 level styles by default', () => {
      render(<Heading>H2 Heading</Heading>);
      const element = screen.getByText('H2 Heading');
      expect(element).toHaveClass('text-[length:var(--component-heading-font-size-h2)]');
      expect(element).toHaveClass('font-[number:var(--component-heading-font-weight-h2)]');
      expect(element).toHaveClass('leading-[var(--component-heading-line-height-h2)]');
    });

    it('should apply h3 level styles', () => {
      render(<Heading as="h3">H3 Heading</Heading>);
      const element = screen.getByText('H3 Heading');
      expect(element).toHaveClass('text-[length:var(--component-heading-font-size-h3)]');
    });

    it('should apply h4 level styles', () => {
      render(<Heading as="h4">H4 Heading</Heading>);
      const element = screen.getByText('H4 Heading');
      expect(element).toHaveClass('text-[length:var(--component-heading-font-size-h4)]');
    });

    it('should apply h5 level styles', () => {
      render(<Heading as="h5">H5 Heading</Heading>);
      const element = screen.getByText('H5 Heading');
      expect(element).toHaveClass('text-[length:var(--component-heading-font-size-h5)]');
    });

    it('should apply h6 level styles', () => {
      render(<Heading as="h6">H6 Heading</Heading>);
      const element = screen.getByText('H6 Heading');
      expect(element).toHaveClass('text-[length:var(--component-heading-font-size-h6)]');
    });

    it('should apply visual level styles independent of semantic element', () => {
      render(
        <Heading as="h2" level="h1">
          Visual H1
        </Heading>
      );
      const element = screen.getByText('Visual H1');
      // Should have h1 visual styles but be an h2 element
      expect(element.tagName).toBe('H2');
      expect(element).toHaveClass('text-[length:var(--component-heading-font-size-h1)]');
    });
  });

  // =============================================================================
  // COLOR VARIANTS
  // =============================================================================

  describe('Color Variants', () => {
    it('should apply primary color by default', () => {
      render(<Heading>Primary Heading</Heading>);
      const element = screen.getByText('Primary Heading');
      expect(element).toHaveClass('text-[color:var(--component-heading-color-primary)]');
    });

    it('should apply secondary color', () => {
      render(<Heading color="secondary">Secondary Heading</Heading>);
      const element = screen.getByText('Secondary Heading');
      expect(element).toHaveClass('text-[color:var(--component-heading-color-secondary)]');
    });

    it('should apply tertiary color', () => {
      render(<Heading color="tertiary">Tertiary Heading</Heading>);
      const element = screen.getByText('Tertiary Heading');
      expect(element).toHaveClass('text-[color:var(--component-heading-color-tertiary)]');
    });

    it('should apply inverse color', () => {
      render(<Heading color="inverse">Inverse Heading</Heading>);
      const element = screen.getByText('Inverse Heading');
      expect(element).toHaveClass('text-[color:var(--component-heading-color-inverse)]');
    });

    it('should apply inherit color', () => {
      render(<Heading color="inherit">Inherit Heading</Heading>);
      const element = screen.getByText('Inherit Heading');
      expect(element).toHaveClass('text-inherit');
    });
  });

  // =============================================================================
  // ALIGNMENT
  // =============================================================================

  describe('Alignment', () => {
    it('should not apply alignment by default', () => {
      render(<Heading>No Alignment</Heading>);
      const element = screen.getByText('No Alignment');
      expect(element).not.toHaveClass('text-left');
      expect(element).not.toHaveClass('text-center');
      expect(element).not.toHaveClass('text-right');
    });

    it('should apply left alignment', () => {
      render(<Heading align="left">Left Aligned</Heading>);
      const element = screen.getByText('Left Aligned');
      expect(element).toHaveClass('text-left');
    });

    it('should apply center alignment', () => {
      render(<Heading align="center">Center Aligned</Heading>);
      const element = screen.getByText('Center Aligned');
      expect(element).toHaveClass('text-center');
    });

    it('should apply right alignment', () => {
      render(<Heading align="right">Right Aligned</Heading>);
      const element = screen.getByText('Right Aligned');
      expect(element).toHaveClass('text-right');
    });
  });

  // =============================================================================
  // FONT FAMILY
  // =============================================================================

  describe('Font Family', () => {
    it('should apply heading font family by default', () => {
      render(<Heading>Heading Font</Heading>);
      const element = screen.getByText('Heading Font');
      expect(element).toHaveClass('font-[family-name:var(--component-heading-font-family)]');
    });

    it('should apply body font family', () => {
      render(<Heading fontFamily="body">Body Font</Heading>);
      const element = screen.getByText('Body Font');
      expect(element).toHaveClass('font-[family-name:var(--component-text-font-family)]');
    });

    it('should apply mono font family', () => {
      render(<Heading fontFamily="mono">Mono Font</Heading>);
      const element = screen.getByText('Mono Font');
      expect(element).toHaveClass('font-[family-name:var(--component-text-font-family-mono)]');
    });
  });

  // =============================================================================
  // TRUNCATE
  // =============================================================================

  describe('Truncate', () => {
    it('should not truncate by default', () => {
      render(<Heading>Not Truncated</Heading>);
      const element = screen.getByText('Not Truncated');
      expect(element).not.toHaveClass('truncate');
    });

    it('should apply truncate class when enabled', () => {
      render(<Heading truncate>Truncated Heading</Heading>);
      const element = screen.getByText('Truncated Heading');
      expect(element).toHaveClass('truncate');
    });
  });

  // =============================================================================
  // CUSTOM CLASSNAME
  // =============================================================================

  describe('Custom ClassName', () => {
    it('should apply custom className', () => {
      render(<Heading className="custom-class">Custom Heading</Heading>);
      const element = screen.getByText('Custom Heading');
      expect(element).toHaveClass('custom-class');
    });

    it('should merge custom className with default styles', () => {
      render(<Heading className="custom-class">Merged Styles</Heading>);
      const element = screen.getByText('Merged Styles');
      expect(element).toHaveClass('custom-class');
      expect(element).toHaveClass('text-[length:var(--component-heading-font-size-h2)]');
    });
  });

  // =============================================================================
  // DATA ATTRIBUTES
  // =============================================================================

  describe('Data Attributes', () => {
    it('should render correct heading element for as prop', () => {
      render(<Heading as="h1">H1 Heading</Heading>);
      const element = screen.getByText('H1 Heading');
      expect(element.tagName).toBe('H1');
    });

    it('should render correct element when level differs from as', () => {
      render(
        <Heading as="h2" level="h1">
          Level Heading
        </Heading>
      );
      const element = screen.getByText('Level Heading');
      expect(element.tagName).toBe('H2');
    });

    it('should support color prop', () => {
      render(<Heading color="secondary">Color Heading</Heading>);
      const element = screen.getByText('Color Heading');
      expect(element).toBeInTheDocument();
    });

    it('should render with default props', () => {
      render(<Heading>Default Heading</Heading>);
      const element = screen.getByText('Default Heading');
      expect(element.tagName).toBe('H2');
    });
  });

  // =============================================================================
  // REF FORWARDING
  // =============================================================================

  describe('Ref Forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<Heading ref={ref}>Ref Heading</Heading>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
      expect(ref.current?.tagName).toBe('H2');
    });

    it('should forward ref for different heading levels', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(
        <Heading ref={ref} as="h1">
          H1 Ref
        </Heading>
      );
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
      expect(ref.current?.tagName).toBe('H1');
    });
  });

  // =============================================================================
  // ADDITIONAL PROPS
  // =============================================================================

  describe('Additional Props', () => {
    it('should pass through additional HTML attributes', () => {
      render(
        <Heading id="test-heading" data-testid="custom-heading">
          Extra Props
        </Heading>
      );
      const element = screen.getByText('Extra Props');
      expect(element).toHaveAttribute('id', 'test-heading');
      expect(element).toHaveAttribute('data-testid', 'custom-heading');
    });
  });
});

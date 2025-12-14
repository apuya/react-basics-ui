import type { ComponentPropsWithoutRef, ElementType } from 'react';

// =============================================================================
// Polymorphic Types
// =============================================================================

/** Props that can be passed to any element type */
type PolymorphicProps<E extends ElementType> = ComponentPropsWithoutRef<E> & {
  /** The element type to render as */
  as?: E;
};

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Box component.
 * A polymorphic primitive building block for layouts.
 *
 * @template E - The element type to render as (default: 'div')
 */
export type BoxProps<E extends ElementType = 'div'> = PolymorphicProps<E> & {
  /** Padding - all sides */
  p?: string | number;
  /** Padding - horizontal (left and right) */
  px?: string | number;
  /** Padding - vertical (top and bottom) */
  py?: string | number;
  /** Padding - top */
  pt?: string | number;
  /** Padding - right */
  pr?: string | number;
  /** Padding - bottom */
  pb?: string | number;
  /** Padding - left */
  pl?: string | number;

  /** Margin - all sides */
  m?: string | number;
  /** Margin - horizontal (left and right) */
  mx?: string | number;
  /** Margin - vertical (top and bottom) */
  my?: string | number;
  /** Margin - top */
  mt?: string | number;
  /** Margin - right */
  mr?: string | number;
  /** Margin - bottom */
  mb?: string | number;
  /** Margin - left */
  ml?: string | number;

  /** Width */
  w?: string | number;
  /** Height */
  h?: string | number;
  /** Min width */
  minW?: string | number;
  /** Min height */
  minH?: string | number;
  /** Max width */
  maxW?: string | number;
  /** Max height */
  maxH?: string | number;

  /** Background color */
  bg?: string;
  /** Text color */
  color?: string;
  /** Border width */
  borderWidth?: string | number;
  /** Border color */
  borderColor?: string;
  /** Border radius */
  borderRadius?: string | number;

  /** Display property */
  display?:
    | 'block'
    | 'inline'
    | 'inline-block'
    | 'flex'
    | 'inline-flex'
    | 'grid'
    | 'inline-grid'
    | 'none';
  /** Position property */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  /** Overflow property */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';

  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right' | 'justify';
};

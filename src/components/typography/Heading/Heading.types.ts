import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// =============================================================================
// Level & Variant Types
// =============================================================================

/** Available heading levels from h1 to h6 */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/** Available heading color variants */
export type HeadingColor = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'inherit';

/** Available heading text alignments */
export type HeadingAlign = 'left' | 'center' | 'right';

/** Available heading font families */
export type HeadingFontFamily = 'heading' | 'body' | 'mono';

// =============================================================================
// Props
// =============================================================================

/**
 * Props for the Heading component.
 */
export interface HeadingProps extends Omit<ComponentPropsWithoutRef<'h2'>, 'ref'> {
  /**
   * HTML element to render.
   * @default 'h2'
   */
  as?: HeadingLevel;
  /**
   * Visual styling level (independent of HTML element).
   * Allows semantic and visual hierarchy to differ.
   */
  level?: HeadingLevel;
  /**
   * Color variant of the heading.
   * @default 'primary'
   */
  color?: HeadingColor;
  /**
   * Text alignment.
   */
  align?: HeadingAlign;
  /**
   * Font family to use.
   * @default 'heading'
   */
  fontFamily?: HeadingFontFamily;
  /**
   * Whether to truncate text with ellipsis.
   * @default false
   */
  truncate?: boolean;
  /**
   * Heading content.
   */
  children: ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
}

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

// =============================================================================
// Size & Variant Types
// =============================================================================

/**
 * Semantic text sizes - unified across all typography components
 */
export type TextSize =
  // Body text sizes
  | 'caption'   // Extra small (helper text, fine print)
  | 'small'     // Small (labels, secondary text)
  | 'body'      // Base body text
  | 'subtitle'  // Large (subtitles, emphasized)
  // Heading sizes
  | 'h6'        // Heading level 6
  | 'h5'        // Heading level 5
  | 'h4'        // Heading level 4
  | 'h3'        // Heading level 3
  | 'h2'        // Heading level 2
  | 'h1';       // Heading level 1

/**
 * Semantic text weights
 */
export type TextWeight = 
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold';

/**
 * Semantic text colors - unified across all components
 */
export type TextColor =
  | 'primary'     // Main text color
  | 'secondary'   // Secondary/muted text
  | 'tertiary'    // Tertiary/placeholder
  | 'inverse'     // Inverse (on dark backgrounds)
  | 'disabled'    // Disabled state
  | 'link'        // Link color
  | 'error'       // Error state
  | 'warning'     // Warning state
  | 'success'     // Success state
  | 'info'        // Info state
  | 'inherit';    // Inherit from parent

/**
 * Line height options
 */
export type TextLineHeight = 'none' | 'tight' | 'normal' | 'relaxed' | 'loose';

/**
 * Text alignment
 */
export type TextAlign = 'left' | 'center' | 'right';

/**
 * Font family
 */
export type TextFontFamily = 'sans' | 'serif' | 'mono' | 'heading' | 'body';

/**
 * Typography variant - determines which color token set to use
 */
export type TextVariant = 'text' | 'heading';

// =============================================================================
// Props
// =============================================================================

/**
 * Props for the BaseText component.
 */
export interface BaseTextProps extends Omit<ComponentPropsWithoutRef<'span'>, 'color'> {
  /**
   * The HTML element to render.
   * @default 'span'
   */
  as?: ElementType;
  /**
   * Typography variant - 'heading' uses heading-specific color tokens.
   * @default 'text'
   */
  variant?: TextVariant;
  /**
   * Text size.
   */
  size?: TextSize;
  /**
   * Font weight (ignored for heading sizes h1-h6 which have built-in weights).
   */
  weight?: TextWeight;
  /**
   * Text color.
   */
  color?: TextColor;
  /**
   * Line height (ignored for heading sizes h1-h6 which have built-in line-heights).
   */
  lineHeight?: TextLineHeight;
  /**
   * Text alignment.
   */
  align?: TextAlign;
  /**
   * Font family.
   */
  fontFamily?: TextFontFamily;
  /**
   * Truncate with ellipsis.
   * @default false
   */
  truncate?: boolean;
  /**
   * Content.
   */
  children?: ReactNode;
}

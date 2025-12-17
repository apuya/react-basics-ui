import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// =============================================================================
// Size & Variant Types
// =============================================================================

/** Available text size variants */
export type TextSize = 'caption' | 'small' | 'body' | 'subtitle';

/** Available text weight variants */
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

/** Available text color variants */
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'disabled'
  | 'link'
  | 'error'
  | 'warning'
  | 'success'
  | 'inherit';

/** Available text line height variants */
export type TextLineHeight = 'tight' | 'normal' | 'relaxed';

/** Available text alignment options */
export type TextAlign = 'left' | 'center' | 'right';

/** Available text font family variants */
export type TextFontFamily = 'body' | 'mono';

/** Available HTML elements for Text component */
export type TextElement = 'span' | 'p' | 'label' | 'div' | 'strong' | 'em' | 'small' | 'legend';

// =============================================================================
// Props
// =============================================================================

/**
 * Props for the Text component.
 */
export interface TextProps extends Omit<ComponentPropsWithoutRef<'span'>, 'ref'> {
  /**
   * The HTML element to render as.
   * @default 'span'
   */
  as?: TextElement;
  /**
   * The font size variant.
   * @default 'body'
   */
  size?: TextSize;
  /**
   * The font weight variant.
   * @default 'normal'
   */
  weight?: TextWeight;
  /**
   * The text color variant.
   * @default 'primary'
   */
  color?: TextColor;
  /**
   * The line height variant.
   * @default 'normal'
   */
  lineHeight?: TextLineHeight;
  /**
   * The text alignment.
   */
  align?: TextAlign;
  /**
   * The font family variant.
   * @default 'body'
   */
  fontFamily?: TextFontFamily;
  /**
   * Whether to truncate text with ellipsis.
   * @default false
   */
  truncate?: boolean;
  /**
   * The content to display.
   */
  children: ReactNode;
  /**
   * Additional CSS classes to apply.
   */
  className?: string;
  /**
   * The ID of a form element (only applicable when as="label").
   */
  htmlFor?: string;
}

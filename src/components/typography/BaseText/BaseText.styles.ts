import type {
  TextSize,
  TextWeight,
  TextColor,
  TextLineHeight,
  TextAlign,
  TextFontFamily,
} from './BaseText.types';

// =============================================================================
// Style Mappings - Single Source of Truth
// Uses component-level tokens from global.css
// =============================================================================

export const TEXT_SIZE_STYLES: Record<TextSize, string> = {
  // Body text sizes
  caption: 'text-[length:var(--component-text-font-size-caption)]',
  small: 'text-[length:var(--component-text-font-size-small)]',
  body: 'text-[length:var(--component-text-font-size-body)]',
  subtitle: 'text-[length:var(--component-text-font-size-subtitle)]',
  // Heading sizes - includes weight and line-height for each level
  h6: 'text-[length:var(--component-heading-font-size-h6)] font-[number:var(--component-heading-font-weight-h6)] leading-[var(--component-heading-line-height-h6)]',
  h5: 'text-[length:var(--component-heading-font-size-h5)] font-[number:var(--component-heading-font-weight-h5)] leading-[var(--component-heading-line-height-h5)]',
  h4: 'text-[length:var(--component-heading-font-size-h4)] font-[number:var(--component-heading-font-weight-h4)] leading-[var(--component-heading-line-height-h4)]',
  h3: 'text-[length:var(--component-heading-font-size-h3)] font-[number:var(--component-heading-font-weight-h3)] leading-[var(--component-heading-line-height-h3)]',
  h2: 'text-[length:var(--component-heading-font-size-h2)] font-[number:var(--component-heading-font-weight-h2)] leading-[var(--component-heading-line-height-h2)]',
  h1: 'text-[length:var(--component-heading-font-size-h1)] font-[number:var(--component-heading-font-weight-h1)] leading-[var(--component-heading-line-height-h1)]',
} as const;

export const TEXT_WEIGHT_STYLES: Record<TextWeight, string> = {
  light: 'font-[number:var(--component-text-font-weight-light)]',
  normal: 'font-[number:var(--component-text-font-weight-regular)]',
  medium: 'font-[number:var(--component-text-font-weight-medium)]',
  semibold: 'font-[number:var(--component-text-font-weight-semibold)]',
  bold: 'font-[number:var(--component-text-font-weight-bold)]',
} as const;

/** Heading-specific color tokens */
export const HEADING_COLOR_STYLES: Record<string, string> = {
  primary: 'text-[color:var(--component-heading-color-primary)]',
  secondary: 'text-[color:var(--component-heading-color-secondary)]',
  tertiary: 'text-[color:var(--component-heading-color-tertiary)]',
  inverse: 'text-[color:var(--component-heading-color-inverse)]',
  inherit: 'text-inherit',
} as const;

export const TEXT_COLOR_STYLES: Record<TextColor, string> = {
  primary: 'text-[color:var(--component-text-color-primary)]',
  secondary: 'text-[color:var(--component-text-color-secondary)]',
  tertiary: 'text-[color:var(--component-text-color-tertiary)]',
  inverse: 'text-[color:var(--component-text-color-inverse)]',
  disabled: 'text-[color:var(--component-text-color-disabled)]',
  link: 'text-[color:var(--component-text-color-link)]',
  error: 'text-[color:var(--component-text-color-error)]',
  warning: 'text-[color:var(--component-text-color-warning)]',
  success: 'text-[color:var(--component-text-color-success)]',
  info: 'text-[color:var(--component-text-color-success)]', // maps to success (no separate info token)
  inherit: 'text-inherit',
} as const;

export const TEXT_LINE_HEIGHT_STYLES: Record<TextLineHeight, string> = {
  none: 'leading-none',
  tight: 'leading-[var(--component-text-line-height-tight)]',
  normal: 'leading-[var(--component-text-line-height-normal)]',
  relaxed: 'leading-[var(--component-text-line-height-relaxed)]',
  loose: 'leading-loose',
} as const;

export const TEXT_ALIGN_STYLES: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export const TEXT_FONT_FAMILY_STYLES: Record<TextFontFamily, string> = {
  sans: 'font-[family-name:var(--component-text-font-family)]',
  serif: 'font-[family-name:var(--component-text-font-family)]',
  mono: 'font-[family-name:var(--component-text-font-family-mono)]',
  heading: 'font-[family-name:var(--component-heading-font-family)]',
  body: 'font-[family-name:var(--component-text-font-family)]',
} as const;

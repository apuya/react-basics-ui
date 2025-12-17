/**
 * Base classes for the Progress track (background)
 */
export const TRACK_BASE_CLASSES =
  'w-full overflow-hidden rounded-[length:var(--component-progress-radius)] bg-[color:var(--component-progress-bg-track)]';

/**
 * Base classes for the Progress fill (bar)
 */
export const FILL_BASE_CLASSES =
  'h-full transition-all duration-[var(--component-progress-transition)] ease-in-out rounded-[length:var(--component-progress-radius)]';

/**
 * Classes for the Progress value text display
 */
export const VALUE_TEXT_CLASSES =
  'mt-[length:var(--component-progress-value-gap)] text-[length:var(--component-progress-value-size)] text-[color:var(--component-progress-value-color)] text-right';

/**
 * Size styles for the Progress component
 */
export const SIZE_STYLES = {
  sm: 'h-[length:var(--component-progress-height-sm)]',
  default: 'h-[length:var(--component-progress-height)]',
  lg: 'h-[length:var(--component-progress-height-lg)]',
} as const;

/**
 * Variant styles for the Progress fill color
 */
export const VARIANT_STYLES = {
  default: 'bg-[color:var(--component-progress-bg-fill)]',
  success: 'bg-[color:var(--component-progress-fill-success)]',
  warning: 'bg-[color:var(--component-progress-fill-warning)]',
  error: 'bg-[color:var(--component-progress-fill-error)]',
} as const;

/**
 * Progress size type derived from SIZE_STYLES keys
 */
export type ProgressSize = keyof typeof SIZE_STYLES;

/**
 * Progress variant type derived from VARIANT_STYLES keys
 */
export type ProgressVariant = keyof typeof VARIANT_STYLES;

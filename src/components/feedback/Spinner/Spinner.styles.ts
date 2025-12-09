import type { SpinnerSize, SpinnerColor } from './Spinner';

/**
 * Base classes for the Spinner component
 */
export const BASE_CLASSES = 'inline-block rounded-full animate-spin';

/**
 * Size-specific classes using Tailwind scales
 */
export const SIZE_CLASSES: Record<SpinnerSize, string> = {
  xs: 'size-3 border',
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-8 border-[3px]',
  xl: 'size-12 border-4',
} as const;

/**
 * Color-specific classes using design tokens
 */
export const COLOR_CLASSES: Record<SpinnerColor, string> = {
  default: 'border-[color:var(--component-spinner-track-default)] border-t-[color:var(--component-spinner-color-default)]',
  inverse: 'border-[color:var(--component-spinner-track-inverse)] border-t-[color:var(--component-spinner-color-inverse)]',
  inherit: 'border-current/30 border-t-current',
} as const;

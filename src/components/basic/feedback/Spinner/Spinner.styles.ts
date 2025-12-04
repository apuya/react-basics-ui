import type { SpinnerSize, SpinnerColor } from './Spinner';

/**
 * Base classes for the Spinner component
 */
export const BASE_CLASSES = 'inline-block rounded-full';

/**
 * Size-specific styles using design tokens (applied via inline styles)
 */
export const SIZE_STYLES: Record<SpinnerSize, React.CSSProperties> = {
  xs: {
    width: 'var(--component-spinner-size-xs)',
    height: 'var(--component-spinner-size-xs)',
    borderWidth: 'var(--component-spinner-border-width-xs)',
  },
  sm: {
    width: 'var(--component-spinner-size-sm)',
    height: 'var(--component-spinner-size-sm)',
    borderWidth: 'var(--component-spinner-border-width-sm)',
  },
  md: {
    width: 'var(--component-spinner-size-md)',
    height: 'var(--component-spinner-size-md)',
    borderWidth: 'var(--component-spinner-border-width-md)',
  },
  lg: {
    width: 'var(--component-spinner-size-lg)',
    height: 'var(--component-spinner-size-lg)',
    borderWidth: 'var(--component-spinner-border-width-lg)',
  },
  xl: {
    width: 'var(--component-spinner-size-xl)',
    height: 'var(--component-spinner-size-xl)',
    borderWidth: 'var(--component-spinner-border-width-xl)',
  },
} as const;

/**
 * Color-specific styles using design tokens (applied via inline styles)
 */
export const COLOR_STYLES: Record<SpinnerColor, React.CSSProperties> = {
  default: {
    borderColor: 'var(--component-spinner-track-default)',
    borderTopColor: 'var(--component-spinner-color-default)',
  },
  inverse: {
    borderColor: 'var(--component-spinner-track-inverse)',
    borderTopColor: 'var(--component-spinner-color-inverse)',
  },
  inherit: {
    borderColor: 'color-mix(in srgb, currentColor 30%, transparent)',
    borderTopColor: 'currentColor',
  },
} as const;

/**
 * Animation styles using design tokens
 */
export const ANIMATION_STYLE: React.CSSProperties = {
  animationName: 'spin',
  animationDuration: 'var(--component-spinner-duration)',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
} as const;

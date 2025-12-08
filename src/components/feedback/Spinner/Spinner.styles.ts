import type { SpinnerSize, SpinnerColor } from './Spinner';

/**
 * Base classes for the Spinner component
 */
export const BASE_CLASSES = 'inline-block rounded-full';

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

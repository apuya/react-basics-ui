export type SkeletonVariant = 'rectangle' | 'circle' | 'text' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

/**
 * Base classes for the Skeleton component
 */
export const BASE_CLASSES = 'block relative overflow-hidden';

/**
 * Variant-specific styles using design tokens
 */
export const VARIANT_STYLES: Record<SkeletonVariant, React.CSSProperties> = {
  rectangle: {
    borderRadius: 'var(--component-skeleton-radius-none)',
  },
  rounded: {
    borderRadius: 'var(--component-skeleton-radius-md)',
  },
  circle: {
    borderRadius: 'var(--component-skeleton-radius-full)',
    aspectRatio: '1',
  },
  text: {
    borderRadius: 'var(--component-skeleton-radius-sm)',
    height: '1em',
    width: '100%',
  },
} as const;

/**
 * Animation classes - pulse uses Tailwind, wave uses custom keyframes
 */
export const ANIMATION_CLASSES: Record<SkeletonAnimation, string> = {
  pulse: 'animate-pulse',
  wave: 'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
  none: '',
} as const;

/**
 * Container style for text variant with multiple lines
 */
export const TEXT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--component-skeleton-text-gap)',
} as const;

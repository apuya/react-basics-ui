export type SkeletonVariant = 'rectangle' | 'circle' | 'text' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

/**
 * Base classes for the Skeleton component
 */
export const BASE_CLASSES = 'block relative overflow-hidden';

/**
 * Variant-specific classes using Tailwind scales
 */
export const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  rectangle: 'rounded-none',
  rounded: 'rounded-md',
  circle: 'rounded-full aspect-square',
  text: 'rounded-sm h-[1em] w-full',
} as const;

/**
 * Animation classes - pulse uses Tailwind, wave uses custom keyframes
 */
export const ANIMATION_CLASSES: Record<SkeletonAnimation, string> = {
  pulse: 'animate-pulse',
  wave: 'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer',
  none: '',
} as const;

/**
 * Container classes for text variant with multiple lines
 */
export const TEXT_CONTAINER_CLASSES = 'flex flex-col gap-2';

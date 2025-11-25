export type SkeletonVariant = 'rectangle' | 'circle' | 'text' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export const BASE_CLASSES =
  'bg-[var(--semantic-color-bg-tertiary)] relative overflow-hidden';

export const VARIANT_STYLES: Record<SkeletonVariant, string> = {
  rectangle: 'rounded-none',
  rounded: 'rounded-[var(--semantic-border-radius-md)]',
  circle: 'rounded-full',
  text: 'rounded-[var(--semantic-border-radius-sm)] h-[1em]',
};

export const ANIMATION_STYLES: Record<SkeletonAnimation, string> = {
  pulse: 'animate-pulse',
  wave: 'before:absolute before:inset-0 before:-translate-x-full before:animate-[wave_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
  none: '',
};

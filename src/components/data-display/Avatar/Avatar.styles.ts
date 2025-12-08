// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES =
  'relative inline-flex items-center justify-center overflow-hidden flex-shrink-0';

// =============================================================================
// SHAPE VARIANTS
// =============================================================================

export const SHAPE_STYLES = {
  circular: 'rounded-full',
  square: 'rounded-lg',
} as const;

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const SIZE_STYLES = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-16',
  '2xl': 'size-20',
} as const;

// =============================================================================
// IMAGE STYLES
// =============================================================================

export const IMAGE_CLASSES = 'absolute inset-0 h-full w-full object-cover';

// =============================================================================
// FALLBACK STYLES
// =============================================================================

export const FALLBACK_CLASSES =
  'flex h-full w-full items-center justify-center bg-[color:var(--component-avatar-bg-fallback)] text-[color:var(--component-avatar-text-fallback)]';

export const FALLBACK_TEXT_SIZE = {
  xs: 'text-xs font-medium',
  sm: 'text-sm font-medium',
  md: 'text-base font-medium',
  lg: 'text-lg font-medium',
  xl: 'text-xl font-medium',
  '2xl': 'text-2xl font-medium',
} as const;

// =============================================================================
// TYPES
// =============================================================================

export type AvatarShape = keyof typeof SHAPE_STYLES;
export type AvatarSize = keyof typeof SIZE_STYLES;

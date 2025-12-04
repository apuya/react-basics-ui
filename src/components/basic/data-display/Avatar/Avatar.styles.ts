// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES =
  'relative inline-flex items-center justify-center overflow-hidden flex-shrink-0';

// =============================================================================
// SHAPE VARIANTS
// =============================================================================

export const SHAPE_STYLES = {
  circular: 'rounded-[length:var(--component-avatar-radius-circular)]',
  square: 'rounded-[length:var(--component-avatar-radius-square)]',
} as const;

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const SIZE_STYLES = {
  xs: 'h-[length:var(--component-avatar-size-xs)] w-[length:var(--component-avatar-size-xs)]',
  sm: 'h-[length:var(--component-avatar-size-sm)] w-[length:var(--component-avatar-size-sm)]',
  md: 'h-[length:var(--component-avatar-size-md)] w-[length:var(--component-avatar-size-md)]',
  lg: 'h-[length:var(--component-avatar-size-lg)] w-[length:var(--component-avatar-size-lg)]',
  xl: 'h-[length:var(--component-avatar-size-xl)] w-[length:var(--component-avatar-size-xl)]',
  '2xl': 'h-[length:var(--component-avatar-size-2xl)] w-[length:var(--component-avatar-size-2xl)]',
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
  xs: 'text-[length:var(--component-avatar-text-size-xs)] font-[number:var(--component-avatar-text-weight)]',
  sm: 'text-[length:var(--component-avatar-text-size-sm)] font-[number:var(--component-avatar-text-weight)]',
  md: 'text-[length:var(--component-avatar-text-size-md)] font-[number:var(--component-avatar-text-weight)]',
  lg: 'text-[length:var(--component-avatar-text-size-lg)] font-[number:var(--component-avatar-text-weight)]',
  xl: 'text-[length:var(--component-avatar-text-size-xl)] font-[number:var(--component-avatar-text-weight)]',
  '2xl': 'text-[length:var(--component-avatar-text-size-2xl)] font-[number:var(--component-avatar-text-weight)]',
} as const;

// =============================================================================
// TYPES
// =============================================================================

export type AvatarShape = keyof typeof SHAPE_STYLES;
export type AvatarSize = keyof typeof SIZE_STYLES;

// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES =
  'relative inline-flex items-center justify-center overflow-hidden flex-shrink-0';

// =============================================================================
// SHAPE VARIANTS
// =============================================================================

export const SHAPE_STYLES = {
  circular: 'rounded-[var(--component-avatar-radius-circular)]',
  square: 'rounded-[var(--component-avatar-radius-square)]',
} as const;

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const SIZE_STYLES = {
  xs: 'h-[var(--component-avatar-size-xs)] w-[var(--component-avatar-size-xs)]',
  sm: 'h-[var(--component-avatar-size-sm)] w-[var(--component-avatar-size-sm)]',
  md: 'h-[var(--component-avatar-size-md)] w-[var(--component-avatar-size-md)]',
  lg: 'h-[var(--component-avatar-size-lg)] w-[var(--component-avatar-size-lg)]',
  xl: 'h-[var(--component-avatar-size-xl)] w-[var(--component-avatar-size-xl)]',
  '2xl': 'h-[var(--component-avatar-size-2xl)] w-[var(--component-avatar-size-2xl)]',
} as const;

// =============================================================================
// IMAGE STYLES
// =============================================================================

export const IMAGE_CLASSES = 'absolute inset-0 h-full w-full object-cover';

// =============================================================================
// FALLBACK STYLES
// =============================================================================

export const FALLBACK_CLASSES =
  'flex h-full w-full items-center justify-center bg-[var(--component-avatar-bg-fallback)] text-[var(--component-avatar-text-fallback)]';

export const FALLBACK_TEXT_SIZE = {
  xs: 'text-[length:var(--component-avatar-text-size-xs)] font-[var(--component-avatar-text-weight)]',
  sm: 'text-[length:var(--component-avatar-text-size-sm)] font-[var(--component-avatar-text-weight)]',
  md: 'text-[length:var(--component-avatar-text-size-md)] font-[var(--component-avatar-text-weight)]',
  lg: 'text-[length:var(--component-avatar-text-size-lg)] font-[var(--component-avatar-text-weight)]',
  xl: 'text-[length:var(--component-avatar-text-size-xl)] font-[var(--component-avatar-text-weight)]',
  '2xl': 'text-[length:var(--component-avatar-text-size-2xl)] font-[var(--component-avatar-text-weight)]',
} as const;

// =============================================================================
// TYPES
// =============================================================================

export type AvatarShape = keyof typeof SHAPE_STYLES;
export type AvatarSize = keyof typeof SIZE_STYLES;

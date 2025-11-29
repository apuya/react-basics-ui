// =============================================================================
// CONFIRM DIALOG VARIANT TYPE
// =============================================================================

export type ConfirmDialogVariant = 'default' | 'destructive' | 'warning' | 'info';

// Icon color type from Icon component
export type IconColorType = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'disabled' | 'success' | 'warning' | 'error' | 'info' | 'inherit';

// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CONTENT_CLASSES = 'flex-1 min-w-0';

export const ICON_WRAPPER_CLASSES = 'flex-shrink-0';

/**
 * Header content wrapper with icon and title
 */
export const HEADER_CONTENT_CLASSES = 'flex items-start w-full';

/**
 * Header content gap style - applied inline to use CSS variable
 */
export const HEADER_CONTENT_STYLES = {
  gap: 'var(--semantic-space-compact)',
} as const;

// =============================================================================
// STYLE OBJECTS (Design Token Based - Matches Card Spacing)
// =============================================================================

/**
 * Override Modal.Content's padding to 0 since Header/Footer have their own padding.
 * This prevents double padding (Content + Header/Footer).
 */
export const CONTENT_WRAPPER_STYLES = {
  paddingBlock: '0',
  paddingInline: '0',
} as const;

/**
 * 16px padding for Header and Footer sections
 */
export const SECTION_PADDING_STYLES = {
  paddingBlock: 'var(--semantic-space-default)',
  paddingInline: 'var(--semantic-space-default)',
} as const;

/**
 * Remove Modal's default divider borders for ConfirmDialog
 */
export const NO_BORDER_STYLES = {
  border: 'none',
} as const;

/**
 * Description area padding - 16px horizontal to match header/footer,
 * no vertical padding as it sits between header and footer
 */
export const DESCRIPTION_WRAPPER_STYLES = {
  paddingInline: 'var(--semantic-space-default)',
} as const;

// =============================================================================
// VARIANT ICON COLOR STYLES (Maps to Icon component color prop)
// =============================================================================

export const VARIANT_ICON_COLORS: Record<ConfirmDialogVariant, IconColorType> = {
  default: 'info',
  destructive: 'error',
  warning: 'warning',
  info: 'info',
} as const;

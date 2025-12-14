import type { ConfirmDialogVariant } from './ConfirmDialog';

// =============================================================================
// BASE STYLES
// =============================================================================

/**
 * Flex container for title content
 */
export const TITLE_WRAPPER_CLASSES = 'flex-1 min-w-0';

/**
 * Icon wrapper - prevents shrinking
 */
export const ICON_CLASSES = 'flex-shrink-0';

/**
 * Description wrapper with left padding when icon is shown
 */
export const DESCRIPTION_WITH_ICON_CLASSES = 'pl-11';

// =============================================================================
// VARIANT ICON STYLES
// =============================================================================

export const VARIANT_ICON_CLASSES: Record<ConfirmDialogVariant, string> = {
  default: 'text-[color:var(--component-confirm-dialog-icon-color-default)]',
  destructive: 'text-[color:var(--component-confirm-dialog-icon-color-destructive)]',
  warning: 'text-[color:var(--component-confirm-dialog-icon-color-warning)]',
  info: 'text-[color:var(--component-confirm-dialog-icon-color-info)]',
};

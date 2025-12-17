import type { ConfirmDialogVariant } from './ConfirmDialog';

// =============================================================================
// VARIANT ICON STYLES
// =============================================================================

export const VARIANT_ICON_CLASSES: Record<ConfirmDialogVariant, string> = {
  default: 'text-[color:var(--component-confirm-dialog-icon-color-default)]',
  destructive: 'text-[color:var(--component-confirm-dialog-icon-color-destructive)]',
  warning: 'text-[color:var(--component-confirm-dialog-icon-color-warning)]',
  info: 'text-[color:var(--component-confirm-dialog-icon-color-info)]',
};

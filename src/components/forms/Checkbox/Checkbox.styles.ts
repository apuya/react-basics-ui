// =============================================================================
// Checkbox Styles
// =============================================================================

// -----------------------------------------------------------------------------
// Wrapper
// -----------------------------------------------------------------------------

/** Outer label wrapper containing checkbox and label text */
export const WRAPPER_BASE_CLASSES =
  'inline-flex items-center gap-[length:var(--component-checkbox-gap)] cursor-pointer';

// -----------------------------------------------------------------------------
// Checkbox Box
// -----------------------------------------------------------------------------

/** Visual checkbox box with state-based styling (checked, indeterminate, disabled, error) */
export const CHECKBOX_BASE_CLASSES =
  'relative inline-flex items-center justify-center rounded-[var(--component-checkbox-radius)] border-[length:var(--component-checkbox-border-width)] border-[color:var(--component-checkbox-border-default)] bg-[color:var(--component-checkbox-bg-default)] transition-all duration-[var(--component-checkbox-transition-duration)] hover:border-[color:var(--component-checkbox-border-hover)] hover:bg-[color:var(--component-checkbox-bg-hover)] has-[:checked]:border-[color:var(--component-checkbox-border-checked)] has-[:checked]:bg-[color:var(--component-checkbox-bg-checked)] has-[:indeterminate]:border-[color:var(--component-checkbox-border-indeterminate)] has-[:indeterminate]:bg-[color:var(--component-checkbox-bg-indeterminate)] has-[:disabled]:cursor-not-allowed has-[:disabled]:border-[color:var(--component-checkbox-border-disabled)] has-[:disabled]:bg-[color:var(--component-checkbox-bg-disabled)] has-[:checked:disabled]:border-[color:var(--component-checkbox-border-disabled)] has-[:checked:disabled]:bg-[color:var(--component-checkbox-bg-disabled)] has-[:indeterminate:disabled]:border-[color:var(--component-checkbox-border-disabled)] has-[:indeterminate:disabled]:bg-[color:var(--component-checkbox-bg-disabled)] has-[:disabled]:hover:border-[color:var(--component-checkbox-border-disabled)] has-[:disabled]:hover:bg-[color:var(--component-checkbox-bg-disabled)] has-[:focus-visible]:ring-[length:var(--component-checkbox-focus-ring-width)] has-[:focus-visible]:ring-offset-[length:var(--component-checkbox-focus-ring-offset)] has-[:focus-visible]:ring-[color:var(--component-checkbox-border-focus)] data-[error=true]:border-[color:var(--component-checkbox-border-error)]';

// -----------------------------------------------------------------------------
// Input & Icons
// -----------------------------------------------------------------------------

/** Hidden native input positioned over checkbox for accessibility */
export const HIDDEN_INPUT_CLASSES = 'absolute inset-0 opacity-0 cursor-pointer';

/** Container for check/indeterminate icons with peer-based visibility */
export const CHECK_ICON_CLASSES =
  'absolute inset-0 flex items-center justify-center text-[color:var(--component-checkbox-check-default)] opacity-[var(--component-checkbox-check-opacity-hidden)] transition-opacity peer-checked:opacity-[var(--component-checkbox-check-opacity-visible)] peer-indeterminate:opacity-[var(--component-checkbox-check-opacity-visible)] peer-disabled:text-[color:var(--component-checkbox-check-disabled)] data-[disabled]:peer-checked:text-[color:var(--component-checkbox-check-disabled)] data-[disabled]:peer-indeterminate:text-[color:var(--component-checkbox-check-disabled)]';

/** SVG icon sizing */
export const ICON_CLASSES = 'h-[var(--component-checkbox-icon-size)] w-[var(--component-checkbox-icon-size)]';

// -----------------------------------------------------------------------------
// Size Variants
// -----------------------------------------------------------------------------

/** Inline styles for checkbox size variants - only width/height vary by size */
export const CHECKBOX_SIZE_STYLES = {
  small: {
    width: 'var(--component-checkbox-size-small)',
    height: 'var(--component-checkbox-size-small)',
  },
  default: {
    width: 'var(--component-checkbox-size-default)',
    height: 'var(--component-checkbox-size-default)',
  },
  large: {
    width: 'var(--component-checkbox-size-large)',
    height: 'var(--component-checkbox-size-large)',
  },
} as const satisfies Record<string, React.CSSProperties>;

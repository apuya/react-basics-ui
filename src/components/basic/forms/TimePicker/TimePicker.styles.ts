export type TimePickerSize = 'small' | 'default' | 'large';

// ============================================================================
// Trigger Button Styles
// ============================================================================

export const TRIGGER_BASE_CLASSES =
  'w-full flex items-center appearance-none rounded-[length:var(--component-input-radius)] border bg-[color:var(--component-timepicker-bg-default)] text-[color:var(--component-timepicker-text-default)] transition-colors duration-[var(--component-input-transition-duration)] focus:outline-none focus-visible:ring-[length:var(--component-timepicker-focus-ring-width)] focus-visible:ring-offset-[length:var(--component-timepicker-focus-ring-offset)] focus-visible:ring-[color:var(--component-timepicker-focus-ring-color)] disabled:cursor-not-allowed disabled:bg-[color:var(--component-timepicker-bg-disabled)] disabled:text-[color:var(--component-timepicker-text-disabled)] disabled:opacity-[var(--component-timepicker-disabled-opacity)]';

export const TRIGGER_SIZE_STYLES = {
  small: 'text-[length:var(--component-input-font-size-small)]',
  default: 'text-[length:var(--component-input-font-size-default)]',
  large: 'text-[length:var(--component-input-font-size-large)]',
} as const;

export const TRIGGER_STATE_STYLES = {
  default:
    'border-[color:var(--component-timepicker-border-default)] hover:border-[color:var(--component-timepicker-border-hover)] hover:bg-[color:var(--component-timepicker-bg-hover)] active:bg-[color:var(--component-timepicker-bg-active)] focus:border-[color:var(--component-timepicker-border-focus)]',
  error:
    'border-[color:var(--component-timepicker-border-error)] hover:bg-[color:var(--component-timepicker-bg-hover)] active:bg-[color:var(--component-timepicker-bg-active)] focus:border-[color:var(--component-timepicker-border-error)]',
  open:
    'border-[color:var(--component-timepicker-border-focus)]',
} as const;

// ============================================================================
// Menu Styles
// ============================================================================

export const MENU_BASE_CLASSES =
  'absolute bg-[color:var(--component-dropdown-bg)] border-[length:var(--component-dropdown-border-width)] border-[color:var(--component-dropdown-border)] rounded-[length:var(--component-dropdown-radius)] shadow-[shadow:var(--component-dropdown-shadow)] z-[number:var(--component-dropdown-z-index)] w-full overflow-hidden opacity-0 pointer-events-none transition-opacity duration-[var(--component-dropdown-transition-duration)]';

export const MENU_VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

// ============================================================================
// Label & Helper Text Styles
// ============================================================================

export const LABEL_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-timepicker-label-default)] mb-[length:var(--component-input-gap-compact)]';

export const LABEL_ERROR_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-timepicker-label-error)] mb-[length:var(--component-input-gap-compact)]';

export const HELPER_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-timepicker-helper-default)]';

export const HELPER_ERROR_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-timepicker-helper-error)]';

// ============================================================================
// Placeholder Styles
// ============================================================================

export const PLACEHOLDER_CLASSES = 'text-[color:var(--component-timepicker-text-placeholder)]';

// ============================================================================
// Option Styles
// ============================================================================

export const OPTION_BASE_CLASSES =
  'w-full flex items-center justify-between text-[length:var(--component-dropdown-font-size)] font-[number:var(--component-dropdown-font-weight)] transition-colors duration-[var(--component-dropdown-transition-duration)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-[var(--component-timepicker-disabled-opacity)]';

export const OPTION_STATE_STYLES = {
  default:
    'bg-[color:var(--component-dropdown-bg)] text-[color:var(--component-dropdown-text)]',
  hover:
    'bg-[color:var(--component-dropdown-item-bg-hover)] text-[color:var(--component-dropdown-text)]',
  selected:
    'bg-[color:var(--component-dropdown-item-bg-selected)] text-[color:var(--component-dropdown-item-text-selected)] font-[number:var(--component-dropdown-item-font-weight-selected)]',
} as const;


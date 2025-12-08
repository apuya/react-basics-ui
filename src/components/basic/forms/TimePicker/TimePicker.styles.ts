export type TimePickerSize = 'small' | 'default' | 'large';

// ============================================================================
// Trigger Button Styles
// ============================================================================

export const TRIGGER_BASE_CLASSES =
  'w-full flex items-center appearance-none rounded-md border bg-[color:var(--component-timepicker-bg-default)] text-[color:var(--component-timepicker-text-default)] transition-colors duration-200 focus:outline-none focus-visible:ring-focus focus-visible:ring-offset-focus focus-visible:ring-ring-focus disabled:cursor-not-allowed disabled:bg-[color:var(--component-timepicker-bg-disabled)] disabled:text-[color:var(--component-timepicker-text-disabled)] disabled:opacity-disabled';

export const TRIGGER_SIZE_STYLES = {
  small: 'h-8 px-3 text-sm',
  default: 'h-10 px-3 text-sm',
  large: 'h-12 px-4 text-base',
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
  'absolute bg-[color:var(--component-dropdown-bg)] border border-[color:var(--component-dropdown-border)] rounded-lg shadow-lg z-50 w-full overflow-hidden opacity-0 pointer-events-none transition-opacity duration-200';

export const MENU_VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

// ============================================================================
// Label & Helper Text Styles
// ============================================================================

export const LABEL_CLASSES =
  'block text-sm font-medium text-[color:var(--component-timepicker-label-default)] mb-1';

export const LABEL_ERROR_CLASSES =
  'block text-sm font-medium text-[color:var(--component-timepicker-label-error)] mb-1';

export const HELPER_CLASSES =
  'mt-1 text-xs font-normal text-[color:var(--component-timepicker-helper-default)]';

export const HELPER_ERROR_CLASSES =
  'mt-1 text-xs font-normal text-[color:var(--component-timepicker-helper-error)]';

// ============================================================================
// Placeholder Styles
// ============================================================================

export const PLACEHOLDER_CLASSES = 'text-[color:var(--component-timepicker-text-placeholder)]';

// ============================================================================
// Option Styles
// ============================================================================

export const OPTION_BASE_CLASSES =
  'w-full flex items-center justify-between px-3 py-2 text-sm font-normal transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-disabled';

export const OPTION_STATE_STYLES = {
  default:
    'bg-[color:var(--component-dropdown-bg)] text-[color:var(--component-dropdown-text)]',
  hover:
    'bg-[color:var(--component-dropdown-item-bg-hover)] text-[color:var(--component-dropdown-text)]',
  selected:
    'bg-[color:var(--component-dropdown-item-bg-selected)] text-[color:var(--component-dropdown-item-text-selected)] font-[number:var(--component-dropdown-item-font-weight-selected)]',
} as const;


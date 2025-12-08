export type SelectSize = 'small' | 'default' | 'large';

// Trigger button styles
export const TRIGGER_BASE_CLASSES =
  'w-full flex items-center justify-between appearance-none rounded-md border bg-[color:var(--component-select-bg-default)] text-[color:var(--component-select-text-default)] transition-colors duration-200 focus:outline-none focus-visible:ring-focus focus-visible:ring-offset-focus focus-visible:ring-ring-focus disabled:cursor-not-allowed disabled:bg-[color:var(--component-select-bg-disabled)] disabled:text-[color:var(--component-select-text-disabled)] disabled:opacity-disabled';

export const TRIGGER_SIZE_STYLES = {
  small: 'h-8 px-3 text-sm',
  default: 'h-10 px-3 text-sm',
  large: 'h-12 px-4 text-base',
} as const;

export const TRIGGER_STATE_STYLES = {
  default:
    'border-[color:var(--component-select-border-default)] hover:border-[color:var(--component-input-border-hover)] focus:border-[color:var(--component-select-border-focus)]',
  error:
    'border-[color:var(--component-select-border-error)] focus:border-[color:var(--component-select-border-error)]',
  open:
    'border-[color:var(--component-select-border-focus)]',
} as const;

// Menu styles
export const MENU_BASE_CLASSES =
  'absolute bg-[color:var(--component-dropdown-bg)] border border-[color:var(--component-dropdown-border)] rounded-lg shadow-lg z-50 w-full opacity-0 pointer-events-none transition-opacity duration-200';

export const MENU_VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

export const MENU_WRAPPER_CLASSES = 'flex flex-col';

// Option styles
export const OPTION_BASE_CLASSES =
  'flex items-center px-3 py-2 text-sm font-normal leading-normal rounded cursor-pointer transition-colors outline-none';

export const OPTION_STATE_STYLES = {
  default: 'bg-[color:var(--component-dropdown-item-bg-default)] text-[color:var(--component-dropdown-item-text-default)]',
  hover: 'bg-[color:var(--component-dropdown-item-bg-hover)] text-[color:var(--component-dropdown-item-text-hover)]',
  selected: 'bg-[color:var(--component-dropdown-item-bg-active)] text-[color:var(--component-dropdown-item-text-active)]',
  disabled: 'bg-[color:var(--component-dropdown-item-bg-disabled)] text-[color:var(--component-dropdown-item-text-disabled)] cursor-not-allowed opacity-50',
} as const;

// Label and helper text
export const LABEL_BASE_CLASSES =
  'block text-sm font-medium';

export const LABEL_STATE_STYLES = {
  default: 'text-[color:var(--component-select-label-default)]',
  error: 'text-[color:var(--component-select-label-error)]',
} as const;

export const HELPER_BASE_CLASSES =
  'text-xs font-normal';

export const HELPER_STATE_STYLES = {
  default: 'text-[color:var(--component-select-helper-default)]',
  error: 'text-[color:var(--component-select-helper-error)]',
} as const;

// Icon styles
export const ICON_BASE_CLASSES =
  'size-5 shrink-0';

export const ICON_STATE_STYLES = {
  default: 'text-[color:var(--component-select-icon-default)] transition-transform duration-200',
  disabled: 'text-[color:var(--component-select-icon-disabled)]',
} as const;

export const ICON_OPEN_CLASSES = 'rotate-180';

// Placeholder text
export const PLACEHOLDER_CLASSES = 'text-[color:var(--component-select-text-placeholder)]';

// Wrapper
export const WRAPPER_CLASSES = 'relative w-full';

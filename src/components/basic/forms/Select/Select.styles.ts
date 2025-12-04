export type SelectSize = 'small' | 'default' | 'large';

// Trigger button styles
export const TRIGGER_BASE_CLASSES =
  'w-full flex items-center justify-between appearance-none rounded-[length:var(--component-input-radius)] border bg-[color:var(--component-select-bg-default)] text-[color:var(--component-select-text-default)] transition-colors duration-[var(--component-input-transition-duration)] focus:outline-none focus-visible:ring-[length:var(--component-select-focus-ring-width)] focus-visible:ring-offset-[length:var(--component-select-focus-ring-offset)] focus-visible:ring-[color:var(--component-select-focus-ring-color)] disabled:cursor-not-allowed disabled:bg-[color:var(--component-select-bg-disabled)] disabled:text-[color:var(--component-select-text-disabled)] disabled:opacity-[number:var(--component-select-disabled-opacity)]';

export const TRIGGER_SIZE_STYLES = {
  small: 'text-[length:var(--component-input-font-size-small)]',
  default: 'text-[length:var(--component-input-font-size-default)]',
  large: 'text-[length:var(--component-input-font-size-large)]',
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
  'absolute bg-[color:var(--component-dropdown-bg)] border-[length:var(--component-dropdown-border-width)] border-[color:var(--component-dropdown-border)] rounded-[length:var(--component-dropdown-radius)] shadow-[shadow:var(--component-dropdown-shadow)] z-[number:var(--component-dropdown-z-index)] w-full opacity-0 pointer-events-none transition-opacity duration-[var(--component-dropdown-transition-duration)]';

export const MENU_VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

export const MENU_WRAPPER_CLASSES = 'flex flex-col';

// Option styles
export const OPTION_BASE_CLASSES =
  'flex items-center text-[length:var(--component-dropdown-item-font-size)] font-[number:var(--component-dropdown-item-font-weight)] leading-[number:var(--component-dropdown-item-line-height)] rounded-[length:var(--component-dropdown-item-radius)] cursor-pointer transition-colors outline-none';

export const OPTION_STATE_STYLES = {
  default: 'bg-[color:var(--component-dropdown-item-bg-default)] text-[color:var(--component-dropdown-item-text-default)]',
  hover: 'bg-[color:var(--component-dropdown-item-bg-hover)] text-[color:var(--component-dropdown-item-text-hover)]',
  selected: 'bg-[color:var(--component-dropdown-item-bg-active)] text-[color:var(--component-dropdown-item-text-active)]',
  disabled: 'bg-[color:var(--component-dropdown-item-bg-disabled)] text-[color:var(--component-dropdown-item-text-disabled)] cursor-not-allowed opacity-50',
} as const;

// Label and helper text
export const LABEL_BASE_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)]';

export const LABEL_STATE_STYLES = {
  default: 'text-[color:var(--component-select-label-default)]',
  error: 'text-[color:var(--component-select-label-error)]',
} as const;

export const HELPER_BASE_CLASSES =
  'text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)]';

export const HELPER_STATE_STYLES = {
  default: 'text-[color:var(--component-select-helper-default)]',
  error: 'text-[color:var(--component-select-helper-error)]',
} as const;

// Icon styles
export const ICON_BASE_CLASSES =
  'w-[length:var(--component-input-icon-size-default)] h-[length:var(--component-input-icon-size-default)] shrink-0';

export const ICON_STATE_STYLES = {
  default: 'text-[color:var(--component-select-icon-default)] transition-transform duration-200',
  disabled: 'text-[color:var(--component-select-icon-disabled)]',
} as const;

export const ICON_OPEN_CLASSES = 'rotate-180';

// Placeholder text
export const PLACEHOLDER_CLASSES = 'text-[color:var(--component-select-text-placeholder)]';

// Wrapper
export const WRAPPER_CLASSES = 'relative w-full';

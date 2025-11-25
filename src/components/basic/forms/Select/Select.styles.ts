export type SelectSize = 'small' | 'default' | 'large';

// Trigger button styles
export const TRIGGER_BASE_CLASSES =
  'w-full flex items-center justify-between appearance-none rounded-[length:var(--component-input-radius)] border bg-[color:var(--component-select-bg-default)] text-[color:var(--component-select-text-default)] transition-colors duration-[var(--component-input-transition-duration)] focus:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:ring-[color:var(--semantic-border-focus)] disabled:cursor-not-allowed disabled:bg-[color:var(--component-select-bg-disabled)] disabled:text-[color:var(--component-select-text-disabled)] disabled:opacity-[var(--semantic-opacity-disabled)]';

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
  'absolute bg-[var(--component-dropdown-bg)] border-[length:var(--component-dropdown-border-width)] border-[var(--component-dropdown-border)] rounded-[var(--component-dropdown-radius)] shadow-[var(--component-dropdown-shadow)] z-[var(--component-dropdown-z-index)] w-full opacity-0 pointer-events-none transition-opacity duration-[var(--component-dropdown-transition-duration)]';

export const MENU_VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

export const MENU_WRAPPER_CLASSES = 'flex flex-col';

// Option styles
export const OPTION_BASE_CLASSES =
  'flex items-center text-[length:var(--component-dropdown-item-font-size)] font-[var(--component-dropdown-item-font-weight)] leading-[var(--component-dropdown-item-line-height)] cursor-pointer transition-colors outline-none';

export const OPTION_STATE_STYLES = {
  default: 'bg-[var(--component-dropdown-item-bg-default)] text-[var(--component-dropdown-item-text-default)]',
  hover: 'bg-[var(--component-dropdown-item-bg-hover)] text-[var(--component-dropdown-item-text-hover)]',
  selected: 'bg-[var(--component-dropdown-item-bg-active)] text-[var(--component-dropdown-item-text-active)]',
  disabled: 'bg-[var(--component-dropdown-item-bg-disabled)] text-[var(--component-dropdown-item-text-disabled)] cursor-not-allowed opacity-50',
} as const;

// Label and helper text
export const LABEL_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-select-label-default)] mb-[length:var(--component-input-gap-compact)]';

export const LABEL_ERROR_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-select-label-error)] mb-[length:var(--component-input-gap-compact)]';

export const HELPER_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-select-helper-default)]';

export const HELPER_ERROR_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-select-helper-error)]';

// Icon styles
export const ICON_CLASSES =
  'w-[length:var(--component-input-icon-size-default)] h-[length:var(--component-input-icon-size-default)] text-[color:var(--component-select-icon-default)] transition-transform duration-200 shrink-0';

export const ICON_OPEN_CLASSES = 'rotate-180';

export const ICON_DISABLED_CLASSES =
  'w-[length:var(--component-input-icon-size-default)] h-[length:var(--component-input-icon-size-default)] text-[color:var(--component-select-icon-disabled)] shrink-0';

// Placeholder text
export const PLACEHOLDER_CLASSES = 'text-[color:var(--semantic-text-tertiary)]';

// Wrapper
export const WRAPPER_CLASSES = 'relative w-full';

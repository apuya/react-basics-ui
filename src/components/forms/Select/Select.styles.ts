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

// Icon styles
export const ICON_BASE_CLASSES =
  'w-[length:var(--component-input-icon-size-default)] h-[length:var(--component-input-icon-size-default)] shrink-0';

export const ICON_STATE_STYLES = {
  default: 'text-[color:var(--component-select-icon-default)] transition-transform duration-200',
  disabled: 'text-[color:var(--component-select-icon-disabled)]',
} as const;

export const ICON_OPEN_CLASSES = 'rotate-180';

// Check icon (for selected option)
export const CHECK_ICON_CLASSES = 'shrink-0 w-[length:var(--component-select-icon-check-size)] h-[length:var(--component-select-icon-check-size)]';

// Placeholder text
export const PLACEHOLDER_CLASSES = 'text-[color:var(--component-select-text-placeholder)]';

// Dynamic style functions
export const TRIGGER_STYLE = (size: SelectSize) => ({
  height: `var(--component-input-height-${size})`,
  paddingInline: 'var(--component-input-padding-inline)',
} as const);

export const MENU_STYLE = {
  paddingInline: 'var(--component-dropdown-padding-inline)',
  paddingBlock: 'var(--component-dropdown-padding-block)',
  top: '100%',
  marginTop: 'var(--component-select-menu-gap)',
} as const;

export const OPTION_STYLE = {
  height: 'var(--component-dropdown-item-height)',
  paddingInline: 'var(--component-dropdown-item-padding-inline)',
  paddingBlock: 'var(--component-dropdown-item-padding-block)',
  gap: 'var(--component-dropdown-item-gap)',
} as const;

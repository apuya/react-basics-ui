export const BASE_CLASSES =
  'w-full rounded-[length:var(--component-searchbar-radius)] border bg-[color:var(--component-searchbar-bg-default)] text-[color:var(--component-searchbar-text-default)] transition-colors duration-[var(--component-searchbar-transition-duration)] placeholder:text-[color:var(--component-searchbar-text-placeholder)] focus:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:ring-[color:var(--semantic-border-focus)] disabled:cursor-not-allowed disabled:bg-[color:var(--component-searchbar-bg-disabled)] disabled:text-[color:var(--component-searchbar-text-disabled)] disabled:opacity-[var(--semantic-opacity-disabled)] border-[color:var(--component-searchbar-border-default)] hover:border-[color:var(--component-searchbar-border-hover)] focus:border-[color:var(--component-searchbar-border-focus)]';

export const SIZE_STYLES = {
  small: 'text-[length:var(--component-searchbar-font-size-small)]',
  default: 'text-[length:var(--component-searchbar-font-size-default)]',
  large: 'text-[length:var(--component-searchbar-font-size-large)]',
} as const;

export const ICON_SIZE_STYLES = {
  small: 'w-[length:var(--component-searchbar-icon-size-small)] h-[length:var(--component-searchbar-icon-size-small)]',
  default: 'w-[length:var(--component-searchbar-icon-size-default)] h-[length:var(--component-searchbar-icon-size-default)]',
  large: 'w-[length:var(--component-searchbar-icon-size-large)] h-[length:var(--component-searchbar-icon-size-large)]',
} as const;

export const CLEAR_BUTTON_BASE_CLASSES =
  'inline-flex items-center justify-center rounded-[length:var(--component-searchbar-clear-button-radius)] bg-transparent text-[color:var(--component-searchbar-clear-button-text)] hover:bg-[color:var(--component-searchbar-clear-button-bg-hover)] hover:text-[color:var(--component-searchbar-clear-button-text-hover)] transition-colors duration-[var(--component-searchbar-transition-duration)] focus:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-[color:var(--semantic-border-focus)]';

export const CLEAR_BUTTON_SIZE_STYLES = {
  small: 'w-5 h-5',
  default: 'w-6 h-6',
  large: 'w-7 h-7',
} as const;

export const SHORTCUT_BADGE_CLASSES =
  'inline-flex items-center justify-center px-1.5 min-w-[1.5rem] h-5 rounded-[length:var(--component-searchbar-shortcut-radius)] bg-[color:var(--component-searchbar-shortcut-bg)] text-[color:var(--component-searchbar-shortcut-text)] text-xs font-medium border border-[color:var(--component-searchbar-shortcut-border)]';

export const LEADING_ICON_CONTAINER_CLASSES = 'absolute left-[length:var(--component-searchbar-padding-inline)] top-1/2 -translate-y-1/2 flex items-center justify-center text-[color:var(--component-searchbar-text-placeholder)]';

export const TRAILING_CONTAINER_CLASSES = 'absolute right-[length:var(--component-searchbar-padding-inline)] top-1/2 -translate-y-1/2 flex items-center gap-2';

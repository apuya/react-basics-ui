export const BASE_CLASSES =
  'w-full rounded-full border transition-colors duration-200 placeholder:text-[color:var(--component-searchbar-text-placeholder)] focus:outline-none focus-visible:ring-focus focus-visible:ring-offset-focus focus-visible:ring-ring-focus disabled:cursor-not-allowed disabled:bg-[color:var(--component-searchbar-bg-disabled)] disabled:text-[color:var(--component-searchbar-text-disabled)] disabled:opacity-disabled [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none';

export const VARIANT_STYLES = {
  outline:
    'bg-[color:var(--component-searchbar-bg-default)] text-[color:var(--component-searchbar-text-default)] border-[color:var(--component-searchbar-border-default)] hover:border-[color:var(--component-searchbar-border-hover)] focus:border-[color:var(--component-searchbar-border-focus)]',
  filled:
    'bg-[color:var(--component-searchbar-filled-bg)] text-[color:var(--component-searchbar-text-default)] border-[color:var(--component-searchbar-filled-border)] hover:bg-[color:var(--component-searchbar-filled-bg-hover)] focus:border-[color:var(--component-searchbar-filled-border-focus)]',
  ghost:
    'bg-[color:var(--component-searchbar-ghost-bg)] text-[color:var(--component-searchbar-text-default)] border-[color:var(--component-searchbar-ghost-border)] hover:bg-[color:var(--component-searchbar-ghost-bg-hover)] hover:border-[color:var(--component-searchbar-ghost-border-hover)] focus:border-[color:var(--component-searchbar-ghost-border-focus)]',
} as const;

export const ERROR_CLASSES = 'border-[color:var(--component-searchbar-border-error)]';

export const SIZE_STYLES = {
  small: 'h-8 px-3 text-sm',
  default: 'h-10 px-4 text-sm',
  large: 'h-12 px-5 text-base',
} as const;

export const ICON_SIZE_STYLES = {
  small: 'size-4',
  default: 'size-5',
  large: 'size-6',
} as const;

export const CLEAR_BUTTON_BASE_CLASSES =
  'inline-flex items-center justify-center rounded-full bg-transparent text-[color:var(--component-searchbar-clear-button-text)] hover:bg-[color:var(--component-searchbar-clear-button-bg-hover)] hover:text-[color:var(--component-searchbar-clear-button-text-hover)] transition-colors duration-200 focus:outline-none focus-visible:ring-focus focus-visible:ring-ring-focus';

export const CLEAR_BUTTON_SIZE_STYLES = {
  small: 'size-5',
  default: 'size-6',
  large: 'size-7',
} as const;

export const SHORTCUT_BADGE_CLASSES =
  'inline-flex items-center justify-center px-1.5 min-w-5 h-5 rounded bg-[color:var(--component-searchbar-shortcut-bg)] text-[color:var(--component-searchbar-shortcut-text)] text-xs font-medium border border-[color:var(--component-searchbar-shortcut-border)]';

export const LEADING_ICON_CONTAINER_CLASSES = 'absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-[color:var(--component-searchbar-text-placeholder)]';

export const TRAILING_CONTAINER_CLASSES = 'absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2';

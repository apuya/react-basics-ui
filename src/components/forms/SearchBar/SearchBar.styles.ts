export const BASE_CLASSES =
  'w-full rounded-[length:var(--component-searchbar-radius)] border transition-colors duration-[var(--component-searchbar-transition-duration)] placeholder:text-[color:var(--component-searchbar-text-placeholder)] focus:outline-none focus-visible:ring-[length:var(--component-searchbar-focus-ring-width)] focus-visible:ring-offset-[length:var(--component-searchbar-focus-ring-offset)] focus-visible:ring-[color:var(--component-searchbar-focus-ring-color)] disabled:cursor-not-allowed disabled:bg-[color:var(--component-searchbar-bg-disabled)] disabled:text-[color:var(--component-searchbar-text-disabled)] disabled:opacity-[var(--component-searchbar-disabled-opacity)] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none';

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
  small: 'text-[length:var(--component-searchbar-font-size-small)]',
  default: 'text-[length:var(--component-searchbar-font-size-default)]',
  large: 'text-[length:var(--component-searchbar-font-size-large)]',
} as const;

export const ICON_SIZE_STYLES = {
  small: 'w-[length:var(--component-searchbar-icon-size-small)] h-[length:var(--component-searchbar-icon-size-small)]',
  default: 'w-[length:var(--component-searchbar-icon-size-default)] h-[length:var(--component-searchbar-icon-size-default)]',
  large: 'w-[length:var(--component-searchbar-icon-size-large)] h-[length:var(--component-searchbar-icon-size-large)]',
} as const;

export const ICON_WRAPPER_BASE_CLASSES = 'absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-[color:var(--component-searchbar-text-placeholder)] pointer-events-none';

export const LEADING_ICON_STYLE = {
  left: 'var(--component-searchbar-padding-inline)',
} as const;

export const TRAILING_ICON_STYLE = {
  right: 'var(--component-searchbar-padding-inline)',
} as const;

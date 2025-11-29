export const PAGINATION_LIST_BASE_CLASSES =
  'flex flex-row items-center gap-[var(--component-pagination-gap)]';

export const PAGINATION_ITEM_BASE_CLASSES =
  'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--component-pagination-radius)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-[var(--semantic-border-focus)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] disabled:pointer-events-none disabled:opacity-[var(--semantic-opacity-disabled)]';

export const PAGINATION_ITEM_SIZE_STYLES = {
  sm: 'h-7 min-w-7 px-2 text-xs',
  md: 'h-9 min-w-9 px-3 text-sm',
  lg: 'h-11 min-w-11 px-4 text-base',
} as const;

export const PAGINATION_ITEM_VARIANT_STYLES = {
  default: 'bg-[var(--component-pagination-bg-default)] text-[var(--component-pagination-text-default)] border border-[var(--component-pagination-border-default)] hover:bg-[var(--component-pagination-bg-hover)] hover:border-[var(--component-pagination-border-hover)] hover:text-[var(--component-pagination-text-hover)]',
  active: 'bg-[var(--component-pagination-bg-active)] text-[var(--component-pagination-text-active)] border border-[var(--component-pagination-border-active)]',
} as const;

export const PAGINATION_ELLIPSIS_BASE_CLASSES =
  'flex items-center justify-center text-[var(--component-pagination-text-default)]';

export const PAGINATION_ELLIPSIS_SIZE_STYLES = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-11 w-11 text-base',
} as const;

/**
 * Consolidated size mappings for pagination component
 * Maps pagination sizes to corresponding Button and Icon component sizes
 */
export const PAGINATION_SIZE_MAPPINGS = {
  sm: { button: 'small', icon: 'xs' },
  md: { button: 'default', icon: 'sm' },
  lg: { button: 'large', icon: 'md' },
} as const;

/** @deprecated Use PAGINATION_SIZE_MAPPINGS.button instead */
export const PAGINATION_TO_BUTTON_SIZE = {
  sm: 'small',
  md: 'default',
  lg: 'large',
} as const;

/** @deprecated Use PAGINATION_SIZE_MAPPINGS.icon instead */
export const PAGINATION_TO_ICON_SIZE = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
} as const;

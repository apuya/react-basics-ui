export const PAGINATION_LIST_BASE_CLASSES =
  'flex flex-row items-center gap-[length:var(--component-pagination-gap)]';

export const PAGINATION_ITEM_BASE_CLASSES =
  'inline-flex items-center justify-center whitespace-nowrap rounded-[length:var(--component-pagination-radius)] font-[number:var(--component-pagination-font-weight)] transition-colors focus-visible:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-[color:var(--semantic-border-focus)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] disabled:pointer-events-none disabled:opacity-[var(--semantic-opacity-disabled)]';

export const PAGINATION_ITEM_SIZE_STYLES = {
  sm: 'h-[length:var(--component-pagination-height-sm)] min-w-[length:var(--component-pagination-min-width-sm)] px-[length:var(--component-pagination-padding-inline-sm)] text-[length:var(--component-pagination-font-size-sm)]',
  md: 'h-[length:var(--component-pagination-height-md)] min-w-[length:var(--component-pagination-min-width-md)] px-[length:var(--component-pagination-padding-inline-md)] text-[length:var(--component-pagination-font-size-md)]',
  lg: 'h-[length:var(--component-pagination-height-lg)] min-w-[length:var(--component-pagination-min-width-lg)] px-[length:var(--component-pagination-padding-inline-lg)] text-[length:var(--component-pagination-font-size-lg)]',
} as const;

export const PAGINATION_ITEM_VARIANT_STYLES = {
  default:
    'bg-[color:var(--component-pagination-bg-default)] text-[color:var(--component-pagination-text-default)] border border-solid border-[color:var(--component-pagination-border-default)] hover:bg-[color:var(--component-pagination-bg-hover)] hover:border-[color:var(--component-pagination-border-hover)] hover:text-[color:var(--component-pagination-text-hover)]',
  active:
    'bg-[color:var(--component-pagination-bg-active)] text-[color:var(--component-pagination-text-active)] border border-solid border-[color:var(--component-pagination-border-active)]',
} as const;

export const PAGINATION_ELLIPSIS_BASE_CLASSES =
  'flex items-center justify-center text-[color:var(--component-pagination-text-default)]';

export const PAGINATION_ELLIPSIS_SIZE_STYLES = {
  sm: 'h-[length:var(--component-pagination-height-sm)] w-[length:var(--component-pagination-min-width-sm)] text-[length:var(--component-pagination-font-size-sm)]',
  md: 'h-[length:var(--component-pagination-height-md)] w-[length:var(--component-pagination-min-width-md)] text-[length:var(--component-pagination-font-size-md)]',
  lg: 'h-[length:var(--component-pagination-height-lg)] w-[length:var(--component-pagination-min-width-lg)] text-[length:var(--component-pagination-font-size-lg)]',
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

export const PAGINATION_LIST_BASE_CLASSES =
  'flex flex-row items-center gap-1';

export const PAGINATION_ITEM_BASE_CLASSES =
  'inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

export const PAGINATION_ITEM_SIZE_STYLES = {
  sm: 'h-8 min-w-8 px-2 text-sm',
  md: 'h-10 min-w-10 px-3 text-sm',
  lg: 'h-12 min-w-12 px-4 text-base',
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
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
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

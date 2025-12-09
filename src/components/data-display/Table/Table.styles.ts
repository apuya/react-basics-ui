export const TABLE_BASE_CLASSES =
  'w-full caption-bottom';

export const TABLE_WRAPPER_CLASSES = 'relative w-full overflow-auto bg-[color:var(--component-table-bg)] rounded border border-[color:var(--component-table-border)]';

/** Wrapper inline style - border radius */
export const TABLE_WRAPPER_STYLE = {
  borderRadius: '4px',
} as const;

export const TABLE_WRAPPER_STICKY_CLASS = 'max-h-[600px]';

// Header container is just a semantic wrapper - no styling
export const TABLE_HEADER_CONTAINER_BASE_CLASSES = '';

export const TABLE_HEADER_CONTAINER_STICKY_CLASS =
  'sticky top-0 z-10';

export const TABLE_BODY_BASE_CLASSES = '';

export const TABLE_ROW_BASE_CLASSES =
  'border-b border-[color:var(--component-table-border)] transition-colors';

export const TABLE_ROW_VARIANT_STYLES = {
  default: 'hover:bg-[color:var(--component-table-row-bg-hover)]',
  striped: 'odd:bg-[color:var(--component-table-row-bg-striped)] hover:bg-[color:var(--component-table-row-bg-hover)]',
  bordered: 'hover:bg-[color:var(--component-table-row-bg-hover)]',
} as const;

// Base header cell container (no background - cells are transparent)
export const TABLE_HEADER_CELL_BASE_CLASSES = '';

// Sort button base classes - colors only, layout via inline styles
export const TABLE_HEADER_SORT_BUTTON_CLASSES =
  'inline-flex items-center bg-[color:var(--component-table-header-sort-bg-default)] text-[color:var(--component-table-header-sort-text-default)] text-sm font-medium border border-solid border-[color:var(--component-table-header-sort-border-default)] rounded-sm cursor-pointer transition-all duration-150 outline-none hover:bg-[color:var(--component-table-header-sort-bg-hover)] hover:border-[color:var(--component-table-header-sort-border-hover)] hover:text-[color:var(--component-table-header-sort-text-hover)] active:bg-[color:var(--component-table-header-sort-bg-active)] active:text-[color:var(--component-table-header-sort-text-active)] disabled:bg-[color:var(--component-table-header-sort-bg-disabled)] disabled:text-[color:var(--component-table-header-sort-text-disabled)] disabled:border-[color:var(--component-table-header-sort-border-disabled)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--semantic-focus-ring)]';

/** Sort button inline style - padding and gap */
export const TABLE_HEADER_SORT_BUTTON_STYLE = {
  paddingBlock: '4px',
  paddingInline: '8px',
  gap: '8px',
} as const;

// Sort button alignment styles
export const TABLE_HEADER_SORT_ALIGN_STYLES = {
  left: 'justify-start',
  right: 'justify-end',
} as const;

// Sort icon container (stacked chevrons with negative gap)
export const TABLE_HEADER_SORT_ICON_CONTAINER_CLASSES =
  'inline-flex flex-col -space-y-1';

export const TABLE_FOOTER_BASE_CLASSES =
  'w-full border-t border-[color:var(--component-table-footer-border)] bg-[color:var(--component-table-footer-bg)] text-[color:var(--component-table-footer-text)]';

/** Footer inline style - padding and min-height */
export const TABLE_FOOTER_STYLE = {
  paddingBlock: '8px',
  paddingInline: '16px',
  minHeight: '44px',
} as const;

export const TABLE_VARIANT_BORDER_STYLES = {
  default: '',
  striped: '',
  bordered: 'border border-[color:var(--component-table-border)]',
} as const;

export const TABLE_ACTION_BAR_BASE_CLASSES =
  'bg-[color:var(--component-table-action-bar-bg)]';

/** Action bar inline style - padding, gap, and min-height */
export const TABLE_ACTION_BAR_STYLE = {
  paddingBlock: '8px',
  paddingInline: '16px',
  gap: '8px',
  minHeight: '44px',
} as const;

// Action bar header classes - alignment and typography
export const TABLE_ACTION_BAR_HEADER_CLASSES =
  'align-middle font-semibold text-[color:var(--component-table-cell-text-header)]';

// ============================================================================
// Cell Styles (inline styles for reliable rendering)
// ============================================================================

/** Base cell style - padding, min dimensions */
export const TABLE_CELL_STYLE = {
  paddingBlock: '8px',
  paddingInline: '16px',
  minHeight: '40px',
  minWidth: '120px',
} as const;

/** Checkbox cell style */
export const TABLE_CELL_CHECKBOX_STYLE = {
  padding: '8px',
  minHeight: '40px',
  minWidth: '40px',
  lineHeight: 0,
  verticalAlign: 'middle' as const,
} as const;

/** Input cell style */
export const TABLE_CELL_INPUT_STYLE = {
  paddingBlock: '8px',
  paddingInline: '16px',
  minHeight: '40px',
} as const;

/** Header cell style - padding, min dimensions */
export const TABLE_HEADER_CELL_STYLE = {
  paddingBlock: '8px',
  paddingInline: '16px',
  minWidth: '120px',
  verticalAlign: 'middle' as const,
} as const;

/** Checkbox header cell style */
export const TABLE_HEADER_CELL_CHECKBOX_STYLE = {
  padding: '8px',
  verticalAlign: 'middle' as const,
  lineHeight: 0,
} as const;

/** Sortable header cell style */
export const TABLE_HEADER_CELL_SORTABLE_STYLE = {
  paddingBlock: '8px',
  paddingInline: '8px',
  minWidth: '120px',
  verticalAlign: 'middle' as const,
  width: '100%',
} as const;

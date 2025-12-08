export const TABLE_BASE_CLASSES =
  'w-full caption-bottom';

export const TABLE_WRAPPER_CLASSES = 'relative w-full overflow-auto bg-[color:var(--component-table-bg)] rounded-[length:var(--component-table-radius)] border border-[color:var(--component-table-border)]';

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

// Sort button base classes - styled like Tabs button with border, rounded corners, and proper states
// Note: padding applied via inline style in component for CSS variable support
export const TABLE_HEADER_SORT_BUTTON_CLASSES =
  'inline-flex items-center gap-[length:var(--component-table-header-sort-gap)] bg-[color:var(--component-table-header-sort-bg-default)] text-[color:var(--component-table-header-sort-text-default)] text-[length:var(--component-table-header-sort-font-size)] font-[number:var(--component-table-header-sort-font-weight)] border border-solid border-[color:var(--component-table-header-sort-border-default)] rounded-[length:var(--component-table-header-sort-radius)] cursor-pointer transition-all duration-[var(--component-table-header-sort-transition)] outline-none hover:bg-[color:var(--component-table-header-sort-bg-hover)] hover:border-[color:var(--component-table-header-sort-border-hover)] hover:text-[color:var(--component-table-header-sort-text-hover)] active:bg-[color:var(--component-table-header-sort-bg-active)] active:text-[color:var(--component-table-header-sort-text-active)] disabled:bg-[color:var(--component-table-header-sort-bg-disabled)] disabled:text-[color:var(--component-table-header-sort-text-disabled)] disabled:border-[color:var(--component-table-header-sort-border-disabled)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--semantic-focus-ring)]';

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

export const TABLE_VARIANT_BORDER_STYLES = {
  default: '',
  striped: '',
  bordered: 'border border-[color:var(--component-table-border)]',
} as const;

export const TABLE_ACTION_BAR_BASE_CLASSES =
  'bg-[color:var(--component-table-action-bar-bg)]';

// Action bar header classes - alignment and typography (min-height applied inline for table cell compatibility)
export const TABLE_ACTION_BAR_HEADER_CLASSES =
  'align-middle font-[number:var(--component-table-header-font-weight)] text-[color:var(--component-table-cell-text-header)]';

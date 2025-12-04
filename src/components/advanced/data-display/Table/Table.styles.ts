export const TABLE_BASE_CLASSES =
  'w-full caption-bottom rounded-[length:var(--component-table-radius)] overflow-hidden';

export const TABLE_WRAPPER_CLASSES = 'relative w-full overflow-auto';

export const TABLE_WRAPPER_STICKY_CLASS = 'max-h-[600px]';

export const TABLE_HEAD_BASE_CLASSES =
  'bg-[color:var(--component-table-header-bg)]';

export const TABLE_HEAD_STICKY_CLASS =
  'sticky top-0 z-10';

export const TABLE_BODY_BASE_CLASSES = '';

export const TABLE_ROW_BASE_CLASSES =
  'border-b border-[color:var(--component-table-border)] transition-colors';

export const TABLE_ROW_VARIANT_STYLES = {
  default: 'hover:bg-[color:var(--component-table-row-bg-hover)]',
  striped: 'odd:bg-[color:var(--component-table-row-bg-striped)] hover:bg-[color:var(--component-table-row-bg-hover)]',
  bordered: 'hover:bg-[color:var(--component-table-row-bg-hover)]',
} as const;

export const TABLE_HEADER_BASE_CLASSES =
  'h-12 align-middle font-[number:var(--component-table-header-font-weight)] text-[color:var(--component-table-cell-text-header)]';

export const TABLE_HEADER_SORTABLE_CLASSES =
  'hover:bg-[color:var(--component-table-row-bg-hover)] active:bg-[color:var(--component-table-header-bg)] transition-colors cursor-pointer';

export const TABLE_CELL_BASE_CLASSES =
  'align-middle text-[color:var(--component-table-cell-text)]';

export const TABLE_CELL_SIZE_STYLES = {
  sm: 'p-[length:var(--component-table-padding-sm)] text-[length:var(--component-table-cell-font-size-sm)]',
  md: 'p-[length:var(--component-table-padding-md)] text-[length:var(--component-table-cell-font-size-md)]',
  lg: 'p-[length:var(--component-table-padding-lg)] text-[length:var(--component-table-cell-font-size-lg)]',
} as const;

export const TABLE_FOOTER_BASE_CLASSES =
  'border-t border-[color:var(--component-table-footer-border)] bg-[color:var(--component-table-footer-bg)] text-[color:var(--component-table-footer-text)]';

export const TABLE_VARIANT_BORDER_STYLES = {
  default: '',
  striped: '',
  bordered: 'border border-[color:var(--component-table-border)]',
} as const;

export const TABLE_ACTION_BAR_BASE_CLASSES =
  'bg-[color:var(--component-table-action-bar-bg)]';

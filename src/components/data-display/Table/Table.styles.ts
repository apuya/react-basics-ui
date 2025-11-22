export const TABLE_BASE_CLASSES =
  'w-full caption-bottom text-[length:var(--component-table-cell-font-size-md)]';

export const TABLE_HEAD_BASE_CLASSES =
  'bg-[var(--component-table-header-bg)]';

export const TABLE_HEAD_STICKY_CLASS =
  'sticky top-0 z-10';

export const TABLE_BODY_BASE_CLASSES =
  '';

export const TABLE_ROW_BASE_CLASSES =
  'border-b border-[var(--component-table-border)] transition-colors';

export const TABLE_ROW_VARIANT_STYLES = {
  default: 'hover:bg-[var(--component-table-row-bg-hover)]',
  striped: 'odd:bg-[var(--component-table-row-bg-striped)] hover:bg-[var(--component-table-row-bg-hover)]',
  bordered: 'hover:bg-[var(--component-table-row-bg-hover)]',
} as const;

export const TABLE_HEADER_BASE_CLASSES =
  'h-12 px-[var(--component-table-padding-md)] text-left align-middle font-[var(--component-table-header-font-weight)] text-[var(--component-table-header-text)]';

export const TABLE_HEADER_SIZE_STYLES = {
  sm: 'h-8 px-[var(--component-table-padding-sm)] text-[length:var(--component-table-cell-font-size-sm)]',
  md: 'h-12 px-[var(--component-table-padding-md)] text-[length:var(--component-table-cell-font-size-md)]',
  lg: 'h-14 px-[var(--component-table-padding-lg)] text-[length:var(--component-table-cell-font-size-lg)]',
} as const;

export const TABLE_CELL_BASE_CLASSES =
  'p-[var(--component-table-padding-md)] align-middle text-[var(--component-table-cell-text)]';

export const TABLE_CELL_SIZE_STYLES = {
  sm: 'p-[var(--component-table-padding-sm)] text-[length:var(--component-table-cell-font-size-sm)]',
  md: 'p-[var(--component-table-padding-md)] text-[length:var(--component-table-cell-font-size-md)]',
  lg: 'p-[var(--component-table-padding-lg)] text-[length:var(--component-table-cell-font-size-lg)]',
} as const;

export const TABLE_FOOTER_BASE_CLASSES =
  'border-t bg-[var(--component-table-footer-bg)] font-medium text-[var(--component-table-footer-text)]';

export const TABLE_VARIANT_BORDER_STYLES = {
  default: '',
  striped: '',
  bordered: 'border border-[var(--component-table-border)]',
} as const;

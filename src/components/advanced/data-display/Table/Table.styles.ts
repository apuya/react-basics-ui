/**
 * @file Table.styles.ts
 * @description Style constants for the Table component family.
 *
 * Exports Tailwind class strings and CSSProperties objects for styling
 * all table sub-components: Table, HeaderContainer, Body, Row, HeaderCell,
 * Cell, Footer, and ActionBar.
 *
 * All styles use component-level design tokens (--component-table-*).
 */

import type React from 'react';

/* =============================================================================
 * TABLE ROOT STYLES
 * ============================================================================= */

/** Base classes for the table element */
export const TABLE_BASE_CLASSES = 'w-full caption-bottom';

/** Classes for the table wrapper div (border, background, overflow) */
export const TABLE_WRAPPER_CLASSES =
  'relative w-full overflow-auto bg-[color:var(--component-table-bg)] rounded-[length:var(--component-table-radius)] border border-[color:var(--component-table-border)]';

/** Additional class for sticky header mode */
export const TABLE_WRAPPER_STICKY_CLASS = 'max-h-[600px]';

/** Variant-specific border styles for the table */
export const TABLE_VARIANT_BORDER_STYLES = {
  default: '',
  striped: '',
  bordered: 'border border-[color:var(--component-table-border)]',
} as const;

/* =============================================================================
 * TABLE HEADER CONTAINER STYLES
 * ============================================================================= */

/** Base classes for thead - semantic wrapper with no visual styling */
export const TABLE_HEADER_CONTAINER_BASE_CLASSES = '';

/** Sticky positioning class for fixed header */
export const TABLE_HEADER_CONTAINER_STICKY_CLASS = 'sticky top-0 z-10';

/* =============================================================================
 * TABLE BODY STYLES
 * ============================================================================= */

/** Base classes for tbody - semantic wrapper with no visual styling */
export const TABLE_BODY_BASE_CLASSES = '';

/* =============================================================================
 * TABLE ROW STYLES
 * ============================================================================= */

/** Base classes for all table rows */
export const TABLE_ROW_BASE_CLASSES =
  'border-b border-[color:var(--component-table-border)] transition-colors';

/** Variant-specific row styles (hover, striping) */
export const TABLE_ROW_VARIANT_STYLES = {
  default: 'hover:bg-[color:var(--component-table-row-bg-hover)]',
  striped:
    'odd:bg-[color:var(--component-table-row-bg-striped)] hover:bg-[color:var(--component-table-row-bg-hover)]',
  bordered: 'hover:bg-[color:var(--component-table-row-bg-hover)]',
} as const;

/* =============================================================================
 * TABLE HEADER CELL STYLES
 * ============================================================================= */

/** Base classes for th elements - transparent background */
export const TABLE_HEADER_CELL_BASE_CLASSES = '';

/** Static style for default header cells */
export const TABLE_HEADER_CELL_STYLE: React.CSSProperties = {
  paddingBlock: 'var(--component-table-header-cell-padding-block)',
  paddingInline: 'var(--component-table-header-cell-padding-inline)',
  minWidth: 'var(--component-table-header-cell-min-width)',
  verticalAlign: 'middle',
};

/** Static style for checkbox header cells - hugs content */
export const TABLE_HEADER_CELL_CHECKBOX_STYLE: React.CSSProperties = {
  padding: 'var(--component-table-header-checkbox-padding)',
  verticalAlign: 'middle',
  lineHeight: 0,
};

/** Static style for flexible header cells (stacked, textWithBadge, comparison) */
export const TABLE_HEADER_CELL_FLEXIBLE_STYLE: React.CSSProperties = {
  paddingBlock: 'var(--component-table-header-cell-padding-block)',
  paddingInline: 'var(--component-table-header-cell-padding-inline)',
  verticalAlign: 'middle',
};

/** Static style for sortable header cells */
export const TABLE_HEADER_CELL_SORTABLE_STYLE: React.CSSProperties = {
  paddingBlock: 'var(--component-table-header-cell-padding-block)',
  paddingInline: 'var(--component-table-header-cell-sortable-padding-inline)',
  minWidth: 'var(--component-table-header-cell-min-width)',
  verticalAlign: 'middle',
};

/** Sortable cell alignment styles lookup */
export const TABLE_HEADER_CELL_SORTABLE_ALIGN_STYLES = {
  left: {
    ...TABLE_HEADER_CELL_SORTABLE_STYLE,
    width: '100%',
    textAlign: 'left' as const,
  },
  right: {
    ...TABLE_HEADER_CELL_SORTABLE_STYLE,
    width: '100%',
    textAlign: 'right' as const,
  },
} as const;

/** Sort button classes - styled like Tabs button with border, rounded corners */
export const TABLE_HEADER_SORT_BUTTON_CLASSES =
  'inline-flex items-center gap-[length:var(--component-table-header-sort-gap)] bg-[color:var(--component-table-header-sort-bg-default)] text-[color:var(--component-table-header-sort-text-default)] text-[length:var(--component-table-header-sort-font-size)] font-[number:var(--component-table-header-sort-font-weight)] border border-solid border-[color:var(--component-table-header-sort-border-default)] rounded-[length:var(--component-table-header-sort-radius)] cursor-pointer transition-all duration-[var(--component-table-header-sort-transition)] outline-none hover:bg-[color:var(--component-table-header-sort-bg-hover)] hover:border-[color:var(--component-table-header-sort-border-hover)] hover:text-[color:var(--component-table-header-sort-text-hover)] active:bg-[color:var(--component-table-header-sort-bg-active)] active:text-[color:var(--component-table-header-sort-text-active)] disabled:bg-[color:var(--component-table-header-sort-bg-disabled)] disabled:text-[color:var(--component-table-header-sort-text-disabled)] disabled:border-[color:var(--component-table-header-sort-border-disabled)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--semantic-focus-ring)]';

/** Sort button padding style */
export const TABLE_HEADER_SORT_BUTTON_STYLE: React.CSSProperties = {
  paddingInline: 'var(--component-table-header-sort-padding-inline)',
  paddingBlock: 'var(--component-table-header-sort-padding-block)',
};

/** Sort button alignment classes */
export const TABLE_HEADER_SORT_ALIGN_STYLES = {
  left: 'justify-start',
  right: 'justify-end',
} as const;

/** Sort icon container classes (stacked chevrons) */
export const TABLE_HEADER_SORT_ICON_CONTAINER_CLASSES =
  'inline-flex flex-col -space-y-1';

/* =============================================================================
 * TABLE CELL STYLES
 * ============================================================================= */

/** Base classes for td elements */
export const TABLE_CELL_BASE_CLASSES = 'align-middle';

/** Variant-specific classes for table cells */
export const TABLE_CELL_VARIANT_CLASSES = {
  default: 'text-[color:var(--component-table-cell-text)]',
  text: 'text-[color:var(--component-table-cell-text)] text-[length:var(--component-table-cell-font-size-md)]',
  checkbox: '',
  numeric:
    'text-[color:var(--component-table-cell-text)] text-[length:var(--component-table-cell-font-size-md)] text-right tabular-nums',
  badge: '',
  input: '',
  comparison: '',
} as const;

/** Static style for default table cells */
export const TABLE_CELL_STYLE: React.CSSProperties = {
  paddingBlock: 'var(--component-table-cell-padding-block)',
  paddingInline: 'var(--component-table-cell-padding-inline)',
  minHeight: 'var(--component-table-cell-min-height)',
  minWidth: 'var(--component-table-cell-min-width)',
};

/** Static style for checkbox cells - hugs content */
export const TABLE_CELL_CHECKBOX_STYLE: React.CSSProperties = {
  padding: 'var(--component-table-cell-checkbox-padding)',
  minHeight: 'var(--component-table-cell-checkbox-min-height)',
  minWidth: 'var(--component-table-cell-checkbox-min-width)',
  lineHeight: 0,
  verticalAlign: 'middle',
};

/** Static style for input cells - no min-width constraint */
export const TABLE_CELL_INPUT_STYLE: React.CSSProperties = {
  paddingBlock: 'var(--component-table-cell-padding-block)',
  paddingInline: 'var(--component-table-cell-padding-inline)',
  minHeight: 'var(--component-table-cell-min-height)',
};

/* =============================================================================
 * TABLE FOOTER STYLES
 * ============================================================================= */

/** Base classes for tfoot element */
export const TABLE_FOOTER_BASE_CLASSES =
  'w-full border-t border-[color:var(--component-table-footer-border)] bg-[color:var(--component-table-footer-bg)] text-[color:var(--component-table-footer-text)]';

/** Static style for default footer cell - fixed height, no padding */
export const TABLE_FOOTER_DEFAULT_STYLE: React.CSSProperties = {
  height: 'var(--component-table-footer-min-height)',
  width: '100%',
};

/** Static style for navigation footer cell */
export const TABLE_FOOTER_NAVIGATION_STYLE: React.CSSProperties = {
  height: 'var(--component-table-footer-min-height)',
  paddingInline: 'var(--component-table-footer-padding-inline)',
  width: '100%',
};

/** Static style for pagination footer cell */
export const TABLE_FOOTER_PAGINATION_STYLE: React.CSSProperties = {
  paddingBlock: 'var(--component-table-footer-padding-block)',
  paddingInline: 'var(--component-table-footer-padding-inline)',
  width: '100%',
};

/** Style for navigation container */
export const TABLE_FOOTER_NAVIGATION_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
};

/** Style for navigation arrow buttons group */
export const TABLE_FOOTER_ARROWS_STYLE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--component-table-footer-gap)',
};

/** Style for page info text - centered */
export const TABLE_FOOTER_PAGE_INFO_STYLE: React.CSSProperties = {
  flex: 1,
  textAlign: 'center',
};

/** Style for pagination container */
export const TABLE_FOOTER_PAGINATION_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--component-table-footer-gap)',
  width: '100%',
};

/* =============================================================================
 * TABLE ACTION BAR STYLES
 * ============================================================================= */

/** Base classes for action bar */
export const TABLE_ACTION_BAR_BASE_CLASSES =
  'bg-[color:var(--component-table-action-bar-bg)]';

/** Header classes for action bar - alignment and typography */
export const TABLE_ACTION_BAR_HEADER_CLASSES =
  'align-middle font-[number:var(--component-table-header-font-weight)] text-[color:var(--component-table-cell-text-header)]';

/** Static style for default action bar cell */
export const TABLE_ACTION_BAR_DEFAULT_STYLE: React.CSSProperties = {
  height: 'var(--component-table-action-bar-min-height)',
};

/** Static style for action bar cell with content */
export const TABLE_ACTION_BAR_CONTENT_STYLE: React.CSSProperties = {
  minHeight: 'var(--component-table-action-bar-min-height)',
  paddingBlock: 'var(--component-table-action-bar-padding-block)',
  paddingInline: 'var(--component-table-action-bar-padding-inline)',
};

/** Style for flex container in action bar */
export const TABLE_ACTION_BAR_FLEX_STYLE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--component-table-action-bar-gap)',
  width: '100%',
};

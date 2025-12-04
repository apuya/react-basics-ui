export const BASE_CLASSES = 'grid';

// Grid template columns
export const COLS_STYLES = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
} as const;

// Grid template rows
export const ROWS_STYLES = {
  1: 'grid-rows-1',
  2: 'grid-rows-2',
  3: 'grid-rows-3',
  4: 'grid-rows-4',
  5: 'grid-rows-5',
  6: 'grid-rows-6',
} as const;

// Gap sizes using component tokens
export const GAP_STYLES = {
  none: 'gap-[length:var(--component-grid-gap-none)]',
  xs: 'gap-[length:var(--component-grid-gap-tight)]',
  sm: 'gap-[length:var(--component-grid-gap-compact)]',
  md: 'gap-[length:var(--component-grid-gap-default)]',
  lg: 'gap-[length:var(--component-grid-gap-comfortable)]',
  xl: 'gap-[length:var(--component-grid-gap-loose)]',
  '2xl': 'gap-[length:var(--component-grid-gap-spacious)]',
} as const;

// Gap X (horizontal) sizes using component tokens
export const GAP_X_STYLES = {
  none: 'gap-x-[length:var(--component-grid-gap-none)]',
  xs: 'gap-x-[length:var(--component-grid-gap-tight)]',
  sm: 'gap-x-[length:var(--component-grid-gap-compact)]',
  md: 'gap-x-[length:var(--component-grid-gap-default)]',
  lg: 'gap-x-[length:var(--component-grid-gap-comfortable)]',
  xl: 'gap-x-[length:var(--component-grid-gap-loose)]',
  '2xl': 'gap-x-[length:var(--component-grid-gap-spacious)]',
} as const;

// Gap Y (vertical) sizes using component tokens
export const GAP_Y_STYLES = {
  none: 'gap-y-[length:var(--component-grid-gap-none)]',
  xs: 'gap-y-[length:var(--component-grid-gap-tight)]',
  sm: 'gap-y-[length:var(--component-grid-gap-compact)]',
  md: 'gap-y-[length:var(--component-grid-gap-default)]',
  lg: 'gap-y-[length:var(--component-grid-gap-comfortable)]',
  xl: 'gap-y-[length:var(--component-grid-gap-loose)]',
  '2xl': 'gap-y-[length:var(--component-grid-gap-spacious)]',
} as const;

// Align items
export const ALIGN_STYLES = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

// Justify items
export const JUSTIFY_STYLES = {
  start: 'justify-items-start',
  center: 'justify-items-center',
  end: 'justify-items-end',
  stretch: 'justify-items-stretch',
} as const;

// Grid auto flow
export const FLOW_STYLES = {
  row: 'grid-flow-row',
  col: 'grid-flow-col',
  dense: 'grid-flow-dense',
  'row-dense': 'grid-flow-row-dense',
  'col-dense': 'grid-flow-col-dense',
} as const;

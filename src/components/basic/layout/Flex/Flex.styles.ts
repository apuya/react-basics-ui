export const BASE_CLASSES = 'flex';

export const DIRECTION_STYLES = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
} as const;

export const ALIGN_STYLES = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

export const JUSTIFY_STYLES = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

export const WRAP_STYLES = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
} as const;

// Gap sizes using component tokens
export const GAP_STYLES = {
  none: 'gap-[length:var(--component-flex-gap-none)]',
  xs: 'gap-[length:var(--component-flex-gap-tight)]',
  sm: 'gap-[length:var(--component-flex-gap-compact)]',
  md: 'gap-[length:var(--component-flex-gap-default)]',
  lg: 'gap-[length:var(--component-flex-gap-comfortable)]',
  xl: 'gap-[length:var(--component-flex-gap-loose)]',
  '2xl': 'gap-[length:var(--component-flex-gap-spacious)]',
} as const;

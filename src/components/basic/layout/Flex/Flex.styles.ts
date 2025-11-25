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

// Common gap sizes using Tailwind spacing scale
export const GAP_STYLES = {
  xs: 'gap-1', // 4px
  sm: 'gap-2', // 8px
  md: 'gap-4', // 16px
  lg: 'gap-6', // 24px
  xl: 'gap-8', // 32px
  '2xl': 'gap-12', // 48px
} as const;

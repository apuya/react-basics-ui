export const BASE_CLASSES = 'flex';

// Direction styles
export const DIRECTION_STYLES = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
} as const;

// Alignment styles
export const ALIGN_STYLES = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

// Justify styles
export const JUSTIFY_STYLES = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

// Wrap styles
export const WRAP_STYLES = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
} as const;

// Spacing/gap sizes using component tokens
export const SPACING_STYLES = {
  none: 'gap-[length:var(--component-stack-gap-none)]',
  xs: 'gap-[length:var(--component-stack-gap-tight)]',
  sm: 'gap-[length:var(--component-stack-gap-compact)]',
  md: 'gap-[length:var(--component-stack-gap-default)]',
  lg: 'gap-[length:var(--component-stack-gap-comfortable)]',
  xl: 'gap-[length:var(--component-stack-gap-loose)]',
  '2xl': 'gap-[length:var(--component-stack-gap-spacious)]',
} as const;

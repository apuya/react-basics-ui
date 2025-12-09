export const SIZE_STYLES = {
  xs: 'size-3',     // 12px
  sm: 'size-4',     // 16px
  md: 'size-5',     // 20px
  lg: 'size-6',     // 24px
  xl: 'size-8',     // 32px
  '2xl': 'size-10', // 40px
} as const;

export const COLOR_STYLES = {
  primary: 'text-[color:var(--component-icon-color-primary)]',
  secondary: 'text-[color:var(--component-icon-color-secondary)]',
  tertiary: 'text-[color:var(--component-icon-color-tertiary)]',
  inverse: 'text-[color:var(--component-icon-color-inverse)]',
  disabled: 'text-[color:var(--component-icon-color-disabled)]',
  success: 'text-[color:var(--component-icon-color-success)]',
  warning: 'text-[color:var(--component-icon-color-warning)]',
  error: 'text-[color:var(--component-icon-color-error)]',
  info: 'text-[color:var(--component-icon-color-info)]',
  inherit: 'text-inherit',
} as const;

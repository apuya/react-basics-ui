export const SIZE_STYLES = {
  xs: 'w-[length:var(--component-icon-size-xs)] h-[length:var(--component-icon-size-xs)]',
  sm: 'w-[length:var(--component-icon-size-sm)] h-[length:var(--component-icon-size-sm)]',
  md: 'w-[length:var(--component-icon-size-md)] h-[length:var(--component-icon-size-md)]',
  lg: 'w-[length:var(--component-icon-size-lg)] h-[length:var(--component-icon-size-lg)]',
  xl: 'w-[length:var(--component-icon-size-xl)] h-[length:var(--component-icon-size-xl)]',
  '2xl': 'w-[length:var(--component-icon-size-2xl)] h-[length:var(--component-icon-size-2xl)]',
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

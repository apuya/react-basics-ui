export const COLOR_STYLES = {
  primary: 'text-[color:var(--component-text-color-primary)]',
  secondary: 'text-[color:var(--component-text-color-secondary)]',
  tertiary: 'text-[color:var(--component-text-color-tertiary)]',
  inverse: 'text-[color:var(--component-text-color-inverse)]',
  disabled: 'text-[color:var(--component-text-color-disabled)]',
  link: 'text-[color:var(--component-text-color-link)]',
  error: 'text-[color:var(--component-text-color-error)]',
  warning: 'text-[color:var(--component-text-color-warning)]',
  success: 'text-[color:var(--component-text-color-success)]',
  inherit: 'text-inherit',
} as const;

export const SIZE_STYLES = {
  caption: 'text-xs',
  small: 'text-sm',
  body: 'text-base',
  subtitle: 'text-lg',
} as const;

export const WEIGHT_STYLES = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

export const LINE_HEIGHT_STYLES = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
} as const;

export const ALIGN_STYLES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export const FONT_FAMILY_STYLES = {
  body: 'font-[family-name:var(--component-text-font-family)]',
  mono: 'font-[family-name:var(--component-text-font-family-mono)]',
} as const;

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
  caption: 'text-[length:var(--component-text-font-size-caption)]',
  small: 'text-[length:var(--component-text-font-size-small)]',
  body: 'text-[length:var(--component-text-font-size-body)]',
  subtitle: 'text-[length:var(--component-text-font-size-subtitle)]',
} as const;

export const WEIGHT_STYLES = {
  light: 'font-[number:var(--component-text-font-weight-light)]',
  regular: 'font-[number:var(--component-text-font-weight-regular)]',
  medium: 'font-[number:var(--component-text-font-weight-medium)]',
  semibold: 'font-[number:var(--component-text-font-weight-semibold)]',
  bold: 'font-[number:var(--component-text-font-weight-bold)]',
} as const;

export const LINE_HEIGHT_STYLES = {
  tight: 'leading-[var(--component-text-line-height-tight)]',
  normal: 'leading-[var(--component-text-line-height-normal)]',
  relaxed: 'leading-[var(--component-text-line-height-relaxed)]',
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

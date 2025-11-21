import type { SpinnerSize, SpinnerColor } from './Spinner';

export const BASE_CLASSES =
  'inline-block border-[length:var(--component-spinner-border-width)] border-solid border-[color:var(--component-spinner-border-color)] border-t-[color:var(--component-spinner-border-top-color)] rounded-full animate-spin';

export const SIZE_STYLES: Record<SpinnerSize, string> = {
  xs: 'size-[var(--component-spinner-size-xs)]',
  sm: 'size-[var(--component-spinner-size-sm)]',
  md: 'size-[var(--component-spinner-size-md)]',
  lg: 'size-[var(--component-spinner-size-lg)]',
  xl: 'size-[var(--component-spinner-size-xl)]',
};

export const COLOR_STYLES: Record<SpinnerColor, string> = {
  default: '[--component-spinner-border-color:var(--component-spinner-color-default)] [--component-spinner-border-top-color:var(--component-spinner-color-default-top)]',
  inverse: '[--component-spinner-border-color:var(--component-spinner-color-inverse)] [--component-spinner-border-top-color:var(--component-spinner-color-inverse-top)]',
  inherit: '[--component-spinner-border-color:currentColor] [--component-spinner-border-top-color:transparent]',
};

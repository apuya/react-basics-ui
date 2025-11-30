export const BASE_CLASSES = 'inline-block';

export const SIZE_STYLES = {
  small: 'text-[length:var(--component-label-font-size-small)]',
  default: 'text-[length:var(--component-label-font-size)]',
  large: 'text-[length:var(--component-label-font-size-large)]',
} as const;

export const WEIGHT_STYLES = {
  normal: 'font-[number:var(--component-label-font-weight)]',
  medium: 'font-[number:var(--component-label-font-weight-medium)]',
  semibold: 'font-[number:var(--component-label-font-weight-semibold)]',
} as const;

export const COLOR_STYLES = {
  default: 'text-[color:var(--component-label-color)]',
  secondary: 'text-[color:var(--component-label-color-secondary)]',
  error: 'text-[color:var(--component-label-color-error)]',
  disabled: 'text-[color:var(--component-label-color-disabled)]',
} as const;

export const STATE_STYLES = {
  disabled: 'cursor-not-allowed opacity-60',
  required: '',
} as const;

export const REQUIRED_CLASSES = 'text-[color:var(--component-label-required-color)] ml-[length:var(--component-label-required-spacing)]';

export const BASE_CLASSES = 'inline-block';

export const SIZE_STYLES = {
  small: 'text-xs',
  default: 'text-sm',
  large: 'text-base',
} as const;

export const WEIGHT_STYLES = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
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

export const REQUIRED_CLASSES = 'ml-0.5 text-[color:var(--component-label-required-color)]';

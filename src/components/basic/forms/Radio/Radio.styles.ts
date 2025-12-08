export const WRAPPER_BASE_CLASSES = 'inline-flex items-center gap-2';

export const WRAPPER_STATE_STYLES = {
  enabled: 'cursor-pointer',
  disabled: 'cursor-not-allowed opacity-disabled',
} as const;

export const INPUT_CLASSES =
  'peer sr-only';

export const RADIO_CLASSES =
  'relative flex items-center justify-center rounded-full border-2 border-[color:var(--component-radio-border-default)] bg-[color:var(--component-radio-bg-default)] transition-colors peer-focus-visible:ring-focus peer-focus-visible:ring-offset-focus peer-focus-visible:ring-ring-focus peer-checked:border-[color:var(--component-radio-border-checked)] peer-checked:bg-[color:var(--component-radio-bg-checked)] peer-disabled:border-[color:var(--component-radio-border-disabled)] peer-disabled:bg-[color:var(--component-radio-bg-disabled)] peer-checked:[&>span]:scale-100';

export const SIZE_RADIO_STYLES = {
  small: 'size-4',
  default: 'size-5',
  large: 'size-6',
} as const;

export const DOT_CLASSES =
  'absolute rounded-full bg-[color:var(--component-radio-dot)] scale-0 transition-transform';

export const SIZE_DOT_STYLES = {
  small: 'size-1.5',
  default: 'size-2',
  large: 'size-2.5',
} as const;

export const LABEL_CLASSES =
  'text-sm font-medium text-[color:var(--component-radio-label-color)]';

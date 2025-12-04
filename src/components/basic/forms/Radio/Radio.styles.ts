export const WRAPPER_BASE_CLASSES = 'inline-flex items-center';

export const WRAPPER_STATE_STYLES = {
  enabled: 'cursor-pointer',
  disabled: 'cursor-not-allowed opacity-[var(--component-radio-disabled-opacity)]',
} as const;

export const INPUT_CLASSES =
  'peer sr-only';

export const RADIO_CLASSES =
  'relative flex items-center justify-center rounded-full border-[length:var(--component-radio-border-width)] border-[color:var(--component-radio-border-default)] bg-[color:var(--component-radio-bg-default)] transition-colors peer-focus-visible:ring-[length:var(--component-radio-focus-outline-width)] peer-focus-visible:ring-offset-[length:var(--component-radio-focus-outline-offset)] peer-focus-visible:ring-[color:var(--component-radio-focus-outline-color)] peer-checked:border-[color:var(--component-radio-border-checked)] peer-checked:bg-[color:var(--component-radio-bg-checked)] peer-disabled:border-[color:var(--component-radio-border-disabled)] peer-disabled:bg-[color:var(--component-radio-bg-disabled)] peer-checked:[&>span]:scale-100';

export const SIZE_RADIO_STYLES = {
  small: 'w-[length:var(--component-radio-size-small)] h-[length:var(--component-radio-size-small)]',
  default: 'w-[length:var(--component-radio-size-default)] h-[length:var(--component-radio-size-default)]',
  large: 'w-[length:var(--component-radio-size-large)] h-[length:var(--component-radio-size-large)]',
} as const;

export const DOT_CLASSES =
  'absolute rounded-full bg-[color:var(--component-radio-dot)] scale-0 transition-transform';

export const SIZE_DOT_STYLES = {
  small: 'w-[length:var(--component-radio-dot-size-small)] h-[length:var(--component-radio-dot-size-small)]',
  default: 'w-[length:var(--component-radio-dot-size-default)] h-[length:var(--component-radio-dot-size-default)]',
  large: 'w-[length:var(--component-radio-dot-size-large)] h-[length:var(--component-radio-dot-size-large)]',
} as const;

export const LABEL_CLASSES =
  'text-[length:var(--component-radio-label-size)] font-[number:var(--component-radio-label-weight)] text-[color:var(--component-radio-label-color)]';

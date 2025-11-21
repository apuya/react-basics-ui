export const WRAPPER_CLASSES = 'inline-flex items-center gap-[length:var(--component-radio-gap)] cursor-pointer';

export const WRAPPER_DISABLED_CLASSES = 'inline-flex items-center gap-[length:var(--component-radio-gap)] cursor-not-allowed opacity-[var(--component-radio-disabled-opacity)]';

export const INPUT_CLASSES =
  'peer sr-only';

export const RADIO_CLASSES =
  'relative flex items-center justify-center rounded-full border-[length:var(--component-radio-border-width)] border-[color:var(--component-radio-border-default)] bg-[color:var(--component-radio-bg-default)] transition-colors peer-focus-visible:ring-[length:var(--semantic-focus-ring-width)] peer-focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] peer-focus-visible:ring-[color:var(--semantic-border-focus)] peer-checked:border-[color:var(--component-radio-border-checked)] peer-checked:bg-[color:var(--component-radio-bg-checked)] peer-disabled:border-[color:var(--component-radio-border-disabled)] peer-disabled:bg-[color:var(--component-radio-bg-disabled)]';

export const DOT_CLASSES =
  'absolute rounded-full bg-[color:var(--component-radio-dot)] scale-[var(--component-radio-dot-scale-hidden)] transition-transform peer-checked:scale-[var(--component-radio-dot-scale-visible)]';

export const LABEL_CLASSES =
  'text-[length:var(--component-radio-label-size)] font-[number:var(--component-radio-label-weight)] text-[color:var(--component-radio-label-color)]';

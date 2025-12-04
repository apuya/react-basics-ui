export const WRAPPER_BASE_CLASSES = 'inline-flex items-center';

export const WRAPPER_STATE_STYLES = {
  enabled: 'cursor-pointer',
  disabled: 'cursor-not-allowed opacity-[var(--component-switch-disabled-opacity)]',
} as const;

export const INPUT_CLASSES = 'peer sr-only';

export const TRACK_CLASSES =
  'relative border-[length:var(--component-switch-border-width)] border-[color:var(--component-switch-border-off)] bg-[color:var(--component-switch-bg-off)] transition-colors duration-[var(--component-switch-transition)] peer-focus-visible:ring-[length:var(--semantic-focus-ring-width)] peer-focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] peer-focus-visible:ring-[color:var(--semantic-border-focus)] peer-checked:border-[color:var(--component-switch-border-on)] peer-checked:bg-[color:var(--component-switch-bg-on)] peer-disabled:border-[color:var(--component-switch-border-disabled)] peer-disabled:bg-[color:var(--component-switch-bg-disabled)] rounded-[var(--component-switch-radius)]';

export const SIZE_TRACK_STYLES = {
  small: 'w-[length:var(--component-switch-width-small)] h-[length:var(--component-switch-height-small)]',
  default: 'w-[length:var(--component-switch-width-default)] h-[length:var(--component-switch-height-default)]',
  large: 'w-[length:var(--component-switch-width-large)] h-[length:var(--component-switch-height-large)]',
} as const;

export const THUMB_CLASSES =
  'absolute top-1/2 left-[length:var(--component-switch-thumb-offset)] -translate-y-1/2 rounded-full bg-[color:var(--component-switch-thumb)] shadow-[shadow:var(--component-switch-thumb-shadow)] transition-transform duration-[var(--component-switch-transition)]';

export const SIZE_THUMB_STYLES = {
  small: 'w-[length:var(--component-switch-thumb-size-small)] h-[length:var(--component-switch-thumb-size-small)]',
  default: 'w-[length:var(--component-switch-thumb-size-default)] h-[length:var(--component-switch-thumb-size-default)]',
  large: 'w-[length:var(--component-switch-thumb-size-large)] h-[length:var(--component-switch-thumb-size-large)]',
} as const;

export const SIZE_THUMB_CHECKED_STYLES = {
  small: 'peer-checked:[&>span]:translate-x-[calc(var(--component-switch-width-small)-var(--component-switch-thumb-size-small)-var(--component-switch-thumb-travel-offset))]',
  default: 'peer-checked:[&>span]:translate-x-[calc(var(--component-switch-width-default)-var(--component-switch-thumb-size-default)-var(--component-switch-thumb-travel-offset))]',
  large: 'peer-checked:[&>span]:translate-x-[calc(var(--component-switch-width-large)-var(--component-switch-thumb-size-large)-var(--component-switch-thumb-travel-offset))]',
} as const;

export const LABEL_CLASSES =
  'text-[length:var(--component-switch-label-size)] font-[number:var(--component-switch-label-weight)] text-[color:var(--component-switch-label-color)]';

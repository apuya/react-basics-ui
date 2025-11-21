export const WRAPPER_CLASSES = 'inline-flex items-center gap-[length:var(--component-switch-gap)] cursor-pointer';

export const WRAPPER_DISABLED_CLASSES = 'inline-flex items-center gap-[length:var(--component-switch-gap)] cursor-not-allowed opacity-[var(--component-switch-disabled-opacity)]';

export const INPUT_CLASSES = 'peer sr-only';

export const TRACK_CLASSES =
  'relative border-[length:var(--component-switch-border-width)] border-[color:var(--component-switch-border-off)] bg-[color:var(--component-switch-bg-off)] transition-colors duration-[var(--component-switch-transition)] peer-focus-visible:ring-[length:var(--semantic-focus-ring-width)] peer-focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] peer-focus-visible:ring-[color:var(--semantic-border-focus)] peer-checked:border-[color:var(--component-switch-border-on)] peer-checked:bg-[color:var(--component-switch-bg-on)] peer-disabled:border-[color:var(--component-switch-border-disabled)] peer-disabled:bg-[color:var(--component-switch-bg-disabled)]';

export const THUMB_CLASSES =
  'absolute top-1/2 left-[length:var(--component-switch-thumb-offset)] -translate-y-1/2 rounded-full bg-[color:var(--component-switch-thumb)] shadow-[shadow:var(--component-switch-thumb-shadow)] transition-transform duration-[var(--component-switch-transition)] peer-checked:translate-x-[length:calc(var(--component-switch-width)-var(--component-switch-thumb-size)-var(--component-switch-thumb-travel-offset))]';

export const LABEL_CLASSES =
  'text-[length:var(--component-switch-label-size)] font-[number:var(--component-switch-label-weight)] text-[color:var(--component-switch-label-color)]';

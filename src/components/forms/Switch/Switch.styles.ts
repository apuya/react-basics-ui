export const WRAPPER_BASE_CLASSES = 'inline-flex items-center gap-2';

export const WRAPPER_STATE_STYLES = {
  enabled: 'cursor-pointer',
  disabled: 'cursor-not-allowed opacity-disabled',
} as const;

export const INPUT_CLASSES = 'peer sr-only';

export const TRACK_CLASSES =
  'relative border border-[color:var(--component-switch-border-off)] bg-[color:var(--component-switch-bg-off)] transition-colors duration-200 rounded-full peer-focus-visible:ring-focus peer-focus-visible:ring-offset-focus peer-focus-visible:ring-ring-focus peer-checked:border-[color:var(--component-switch-border-on)] peer-checked:bg-[color:var(--component-switch-bg-on)] peer-disabled:border-[color:var(--component-switch-border-disabled)] peer-disabled:bg-[color:var(--component-switch-bg-disabled)]';

export const SIZE_TRACK_STYLES = {
  small: 'w-8 h-4',
  default: 'w-10 h-5',
  large: 'w-12 h-6',
} as const;

export const THUMB_CLASSES =
  'absolute top-1/2 left-0.5 -translate-y-1/2 rounded-full bg-[color:var(--component-switch-thumb)] shadow-sm transition-transform duration-200';

export const SIZE_THUMB_STYLES = {
  small: 'size-3',
  default: 'size-4',
  large: 'size-5',
} as const;

export const SIZE_THUMB_CHECKED_STYLES = {
  small: 'peer-checked:[&>span]:translate-x-4',
  default: 'peer-checked:[&>span]:translate-x-5',
  large: 'peer-checked:[&>span]:translate-x-6',
} as const;

export const LABEL_CLASSES =
  'text-sm font-medium text-[color:var(--component-switch-label-color)]';

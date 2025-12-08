export const WRAPPER_CLASSES = 'w-full';

export const LABEL_BASE_CLASSES =
  'block text-sm font-medium';

export const LABEL_STATE_STYLES = {
  enabled: 'text-[color:var(--component-slider-label-color)]',
  disabled: 'text-[color:var(--component-slider-label-color-disabled)]',
} as const;

export const INPUT_BASE_CLASSES =
  'w-full appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-disabled focus-visible:outline-none';

export const INPUT_WEBKIT_SLIDER_RUNNABLE_TRACK =
  '[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[color:var(--component-slider-track-bg)] [&::-webkit-slider-runnable-track]:border [&::-webkit-slider-runnable-track]:border-[color:var(--component-slider-track-border)]';

export const INPUT_MOZ_RANGE_TRACK =
  '[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[color:var(--component-slider-track-bg)] [&::-moz-range-track]:border [&::-moz-range-track]:border-[color:var(--component-slider-track-border)]';

export const INPUT_WEBKIT_SLIDER_THUMB =
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[color:var(--component-slider-thumb-bg)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[color:var(--component-slider-thumb-border)] [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:hover:bg-[color:var(--component-slider-thumb-bg-hover)] [&::-webkit-slider-thumb]:hover:border-[color:var(--component-slider-thumb-border-hover)] [&::-webkit-slider-thumb]:hover:shadow-md [&::-webkit-slider-thumb]:active:bg-[color:var(--component-slider-thumb-bg-active)] [&::-webkit-slider-thumb]:active:shadow-lg [&:disabled::-webkit-slider-thumb]:bg-[color:var(--component-slider-thumb-bg-disabled)] [&:disabled::-webkit-slider-thumb]:border-[color:var(--component-slider-thumb-border-disabled)]';

export const INPUT_MOZ_RANGE_THUMB =
  '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[color:var(--component-slider-thumb-bg)] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[color:var(--component-slider-thumb-border)] [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-200 [&::-moz-range-thumb]:hover:bg-[color:var(--component-slider-thumb-bg-hover)] [&::-moz-range-thumb]:hover:border-[color:var(--component-slider-thumb-border-hover)] [&::-moz-range-thumb]:hover:shadow-md [&::-moz-range-thumb]:active:bg-[color:var(--component-slider-thumb-bg-active)] [&::-moz-range-thumb]:active:shadow-lg [&:disabled::-moz-range-thumb]:bg-[color:var(--component-slider-thumb-bg-disabled)] [&:disabled::-moz-range-thumb]:border-[color:var(--component-slider-thumb-border-disabled)]';

export const INPUT_FOCUS_RING =
  'focus-visible:[&::-webkit-slider-thumb]:ring-focus focus-visible:[&::-webkit-slider-thumb]:ring-offset-focus focus-visible:[&::-webkit-slider-thumb]:ring-ring-focus focus-visible:[&::-moz-range-thumb]:ring-focus focus-visible:[&::-moz-range-thumb]:ring-offset-focus focus-visible:[&::-moz-range-thumb]:ring-ring-focus';

export const VALUE_BASE_CLASSES =
  'flex justify-between text-xs font-normal';

export const VALUE_STATE_STYLES = {
  enabled: 'text-[color:var(--component-slider-value-color)]',
  disabled: 'text-[color:var(--component-slider-value-color-disabled)]',
} as const;

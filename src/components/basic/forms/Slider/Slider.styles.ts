export const WRAPPER_CLASSES = 'w-full';

export const LABEL_BASE_CLASSES =
  'block text-[length:var(--component-slider-label-size)] font-[number:var(--component-slider-label-weight)]';

export const LABEL_STATE_STYLES = {
  enabled: 'text-[color:var(--component-slider-label-color)]',
  disabled: 'text-[color:var(--component-slider-label-color-disabled)]',
} as const;

export const INPUT_BASE_CLASSES =
  'w-full appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-[var(--component-slider-disabled-opacity)] focus-visible:outline-none';

export const INPUT_WEBKIT_SLIDER_RUNNABLE_TRACK =
  '[&::-webkit-slider-runnable-track]:h-[length:var(--component-slider-track-height)] [&::-webkit-slider-runnable-track]:rounded-[length:var(--component-slider-track-radius)] [&::-webkit-slider-runnable-track]:bg-[color:var(--component-slider-track-bg)] [&::-webkit-slider-runnable-track]:border-[length:var(--component-slider-track-border-width)] [&::-webkit-slider-runnable-track]:border-[color:var(--component-slider-track-border)]';

export const INPUT_MOZ_RANGE_TRACK =
  '[&::-moz-range-track]:h-[length:var(--component-slider-track-height)] [&::-moz-range-track]:rounded-[length:var(--component-slider-track-radius)] [&::-moz-range-track]:bg-[color:var(--component-slider-track-bg)] [&::-moz-range-track]:border-[length:var(--component-slider-track-border-width)] [&::-moz-range-track]:border-[color:var(--component-slider-track-border)]';

export const INPUT_WEBKIT_SLIDER_THUMB =
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[length:var(--component-slider-thumb-size)] [&::-webkit-slider-thumb]:h-[length:var(--component-slider-thumb-size)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[color:var(--component-slider-thumb-bg)] [&::-webkit-slider-thumb]:border-[length:var(--component-slider-thumb-border-width)] [&::-webkit-slider-thumb]:border-[color:var(--component-slider-thumb-border)] [&::-webkit-slider-thumb]:shadow-[shadow:var(--component-slider-thumb-shadow)] [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-[var(--component-slider-transition)] [&::-webkit-slider-thumb]:-mt-[calc((var(--component-slider-thumb-size)-var(--component-slider-track-height))/2)] [&::-webkit-slider-thumb]:hover:bg-[color:var(--component-slider-thumb-bg-hover)] [&::-webkit-slider-thumb]:hover:border-[color:var(--component-slider-thumb-border-hover)] [&::-webkit-slider-thumb]:hover:shadow-[shadow:var(--component-slider-thumb-shadow-hover)] [&::-webkit-slider-thumb]:active:bg-[color:var(--component-slider-thumb-bg-active)] [&::-webkit-slider-thumb]:active:shadow-[shadow:var(--component-slider-thumb-shadow-active)] [&:disabled::-webkit-slider-thumb]:bg-[color:var(--component-slider-thumb-bg-disabled)] [&:disabled::-webkit-slider-thumb]:border-[color:var(--component-slider-thumb-border-disabled)]';

export const INPUT_MOZ_RANGE_THUMB =
  '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-[length:var(--component-slider-thumb-size)] [&::-moz-range-thumb]:h-[length:var(--component-slider-thumb-size)] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[color:var(--component-slider-thumb-bg)] [&::-moz-range-thumb]:border-[length:var(--component-slider-thumb-border-width)] [&::-moz-range-thumb]:border-[color:var(--component-slider-thumb-border)] [&::-moz-range-thumb]:shadow-[shadow:var(--component-slider-thumb-shadow)] [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-[var(--component-slider-transition)] [&::-moz-range-thumb]:hover:bg-[color:var(--component-slider-thumb-bg-hover)] [&::-moz-range-thumb]:hover:border-[color:var(--component-slider-thumb-border-hover)] [&::-moz-range-thumb]:hover:shadow-[shadow:var(--component-slider-thumb-shadow-hover)] [&::-moz-range-thumb]:active:bg-[color:var(--component-slider-thumb-bg-active)] [&::-moz-range-thumb]:active:shadow-[shadow:var(--component-slider-thumb-shadow-active)] [&:disabled::-moz-range-thumb]:bg-[color:var(--component-slider-thumb-bg-disabled)] [&:disabled::-moz-range-thumb]:border-[color:var(--component-slider-thumb-border-disabled)]';

export const INPUT_FOCUS_RING =
  'focus-visible:[&::-webkit-slider-thumb]:ring-[length:var(--semantic-focus-ring-width)] focus-visible:[&::-webkit-slider-thumb]:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:[&::-webkit-slider-thumb]:ring-[color:var(--semantic-border-focus)] focus-visible:[&::-moz-range-thumb]:ring-[length:var(--semantic-focus-ring-width)] focus-visible:[&::-moz-range-thumb]:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:[&::-moz-range-thumb]:ring-[color:var(--semantic-border-focus)]';

export const VALUE_BASE_CLASSES =
  'flex justify-between text-[length:var(--component-slider-value-size)] font-[number:var(--component-slider-value-weight)]';

export const VALUE_STATE_STYLES = {
  enabled: 'text-[color:var(--component-slider-value-color)]',
  disabled: 'text-[color:var(--component-slider-value-color-disabled)]',
} as const;

export const WRAPPER_CLASSES = 'w-full';

export const LABEL_BASE_CLASSES =
  'block text-[length:var(--component-slider-label-size)] font-[number:var(--component-slider-label-weight)]';

export const LABEL_STATE_STYLES = {
  enabled: 'text-[color:var(--component-slider-label-color)]',
  disabled: 'text-[color:var(--component-slider-label-color-disabled)]',
} as const;

export const SLIDER_CONTAINER_CLASSES =
  'relative w-full';

export const TRACK_BASE_CLASSES =
  'relative w-full rounded-[length:var(--component-slider-track-radius)] bg-[color:var(--component-slider-track-bg)] overflow-hidden';

export const TRACK_SIZE_STYLES = {
  sm: 'h-[length:var(--component-slider-track-height-sm)]',
  default: 'h-[length:var(--component-slider-track-height)]',
  lg: 'h-[length:var(--component-slider-track-height-lg)]',
} as const;

export const FILL_BASE_CLASSES =
  'h-full rounded-[length:var(--component-slider-track-radius)] pointer-events-none will-change-[width]';

export const FILL_VARIANT_STYLES = {
  default: 'bg-[color:var(--component-slider-fill-bg-default)]',
  primary: 'bg-[color:var(--component-slider-fill-bg-primary)]',
  success: 'bg-[color:var(--component-slider-fill-bg-success)]',
  warning: 'bg-[color:var(--component-slider-fill-bg-warning)]',
  error: 'bg-[color:var(--component-slider-fill-bg-error)]',
} as const;

export const INPUT_BASE_CLASSES =
  'absolute top-0 left-0 w-full appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[length:var(--component-slider-thumb-size)] [&::-webkit-slider-thumb]:h-[length:var(--component-slider-thumb-size)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[color:var(--component-slider-thumb-bg)] [&::-webkit-slider-thumb]:border-[length:var(--component-slider-thumb-border-width)] [&::-webkit-slider-thumb]:border-[color:var(--component-slider-thumb-border)] [&::-webkit-slider-thumb]:shadow-[shadow:var(--component-slider-thumb-shadow)] [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-[var(--component-slider-transition)] [&::-webkit-slider-thumb]:hover:bg-[color:var(--component-slider-thumb-bg-hover)] [&::-webkit-slider-thumb]:hover:border-[color:var(--component-slider-thumb-border-hover)] [&::-webkit-slider-thumb]:hover:shadow-[shadow:var(--component-slider-thumb-shadow-hover)] [&::-webkit-slider-thumb]:active:bg-[color:var(--component-slider-thumb-bg-active)] [&::-webkit-slider-thumb]:active:shadow-[shadow:var(--component-slider-thumb-shadow-active)] [&:disabled::-webkit-slider-thumb]:bg-[color:var(--component-slider-thumb-bg-disabled)] [&:disabled::-webkit-slider-thumb]:border-[color:var(--component-slider-thumb-border-disabled)] [&::-webkit-slider-runnable-track]:bg-transparent focus-visible:[&::-webkit-slider-thumb]:ring-[length:var(--semantic-focus-ring-width)] focus-visible:[&::-webkit-slider-thumb]:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:[&::-webkit-slider-thumb]:ring-[color:var(--semantic-border-focus)] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-[length:var(--component-slider-thumb-size)] [&::-moz-range-thumb]:h-[length:var(--component-slider-thumb-size)] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[color:var(--component-slider-thumb-bg)] [&::-moz-range-thumb]:border-[length:var(--component-slider-thumb-border-width)] [&::-moz-range-thumb]:border-[color:var(--component-slider-thumb-border)] [&::-moz-range-thumb]:shadow-[shadow:var(--component-slider-thumb-shadow)] [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-[var(--component-slider-transition)] [&::-moz-range-thumb]:hover:bg-[color:var(--component-slider-thumb-bg-hover)] [&::-moz-range-thumb]:hover:border-[color:var(--component-slider-thumb-border-hover)] [&::-moz-range-thumb]:hover:shadow-[shadow:var(--component-slider-thumb-shadow-hover)] [&::-moz-range-thumb]:active:bg-[color:var(--component-slider-thumb-bg-active)] [&::-moz-range-thumb]:active:shadow-[shadow:var(--component-slider-thumb-shadow-active)] [&:disabled::-moz-range-thumb]:bg-[color:var(--component-slider-thumb-bg-disabled)] [&:disabled::-moz-range-thumb]:border-[color:var(--component-slider-thumb-border-disabled)] [&::-moz-range-track]:bg-transparent focus-visible:[&::-moz-range-thumb]:ring-[length:var(--semantic-focus-ring-width)] focus-visible:[&::-moz-range-thumb]:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:[&::-moz-range-thumb]:ring-[color:var(--semantic-border-focus)]';

export const INPUT_SIZE_STYLES = {
  sm: 'h-[length:var(--component-slider-track-height-sm)] [&::-webkit-slider-thumb]:-mt-[calc((var(--component-slider-thumb-size)-var(--component-slider-track-height-sm))/2)] [&::-webkit-slider-runnable-track]:h-[length:var(--component-slider-track-height-sm)] [&::-moz-range-track]:h-[length:var(--component-slider-track-height-sm)]',
  default: 'h-[length:var(--component-slider-track-height)] [&::-webkit-slider-thumb]:-mt-[calc((var(--component-slider-thumb-size)-var(--component-slider-track-height))/2)] [&::-webkit-slider-runnable-track]:h-[length:var(--component-slider-track-height)] [&::-moz-range-track]:h-[length:var(--component-slider-track-height)]',
  lg: 'h-[length:var(--component-slider-track-height-lg)] [&::-webkit-slider-thumb]:-mt-[calc((var(--component-slider-thumb-size)-var(--component-slider-track-height-lg))/2)] [&::-webkit-slider-runnable-track]:h-[length:var(--component-slider-track-height-lg)] [&::-moz-range-track]:h-[length:var(--component-slider-track-height-lg)]',
} as const;

export type SliderSize = keyof typeof TRACK_SIZE_STYLES;
export type SliderVariant = keyof typeof FILL_VARIANT_STYLES;

export const VALUE_BASE_CLASSES =
  'flex justify-between text-[length:var(--component-slider-value-size)] font-[number:var(--component-slider-value-weight)]';

export const VALUE_STATE_STYLES = {
  enabled: 'text-[color:var(--component-slider-value-color)]',
  disabled: 'text-[color:var(--component-slider-value-color-disabled)]',
} as const;

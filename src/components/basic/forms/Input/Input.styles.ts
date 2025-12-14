export const BASE_CLASSES =
  'w-full rounded-[length:var(--component-input-radius)] border bg-[color:var(--component-input-bg-default)] text-[color:var(--component-input-text-default)] transition-colors duration-[var(--component-input-transition-duration)] placeholder:text-[color:var(--component-input-text-placeholder)] focus:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:ring-[color:var(--semantic-border-focus)] disabled:cursor-not-allowed disabled:bg-[color:var(--component-input-bg-disabled)] disabled:text-[color:var(--component-input-text-disabled)] disabled:opacity-[var(--semantic-opacity-disabled)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

export const SIZE_STYLES = {
  small: 'text-[length:var(--component-input-font-size-small)]',
  default: 'text-[length:var(--component-input-font-size-default)]',
  large: 'text-[length:var(--component-input-font-size-large)]',
} as const;

export const STATE_STYLES = {
  default:
    'border-[color:var(--component-input-border-default)] hover:border-[color:var(--component-input-border-hover)] focus:border-[color:var(--component-input-border-focus)]',
  error:
    'border-[color:var(--component-input-border-error)] focus:border-[color:var(--component-input-border-error)]',
} as const;

export const ICON_SIZE_STYLES = {
  small: 'w-[length:var(--component-input-icon-size-small)] h-[length:var(--component-input-icon-size-small)]',
  default: 'w-[length:var(--component-input-icon-size-default)] h-[length:var(--component-input-icon-size-default)]',
  large: 'w-[length:var(--component-input-icon-size-large)] h-[length:var(--component-input-icon-size-large)]',
} as const;

/** Shared classes for icon wrapper positioning */
export const ICON_WRAPPER_BASE_CLASSES = 'absolute top-1/2 -translate-y-1/2';

/** Static styles for leading icon positioning */
export const LEADING_ICON_STYLE = {
  left: 'var(--component-input-padding-inline)',
  color: 'var(--component-input-text-placeholder)',
} as const;

/** Static styles for trailing icon positioning */
export const TRAILING_ICON_STYLE = {
  right: 'var(--component-input-padding-inline)',
  color: 'var(--component-input-text-placeholder)',
} as const;

/** Suffix style for unit labels (e.g., kg, cm, $) */
export const SUFFIX_STYLE = {
  color: 'var(--component-input-suffix-color)',
  fontSize: 'var(--component-input-suffix-font-size)',
  fontWeight: 'var(--component-input-suffix-font-weight)',
  paddingLeft: 'var(--component-input-suffix-padding-inline)',
  paddingRight: 'var(--component-input-padding-inline)',
} as const;

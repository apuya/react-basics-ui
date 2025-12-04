export const BASE_CLASSES =
  'w-full rounded-[length:var(--component-input-radius)] border bg-[color:var(--component-textarea-bg-default)] text-[color:var(--component-textarea-text-default)] transition-colors duration-[var(--component-input-transition-duration)] placeholder:text-[color:var(--component-textarea-text-placeholder)] focus:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:ring-[color:var(--semantic-border-focus)] disabled:cursor-not-allowed disabled:bg-[color:var(--component-textarea-bg-disabled)] disabled:text-[color:var(--component-textarea-text-disabled)] disabled:opacity-[var(--semantic-opacity-disabled)]';

export const SIZE_STYLES = {
  small: 'text-[length:var(--component-input-font-size-small)]',
  default: 'text-[length:var(--component-input-font-size-default)]',
  large: 'text-[length:var(--component-input-font-size-large)]',
} as const;

export const STATE_STYLES = {
  default:
    'border-[color:var(--component-textarea-border-default)] hover:border-[color:var(--component-textarea-border-hover)] focus:border-[color:var(--component-textarea-border-focus)]',
  error:
    'border-[color:var(--component-textarea-border-error)] focus:border-[color:var(--component-textarea-border-error)]',
} as const;

export const RESIZE_STYLES = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
} as const;

export const CHAR_COUNT_ERROR_CLASSES =
  'text-[color:var(--component-textarea-helper-error)]';

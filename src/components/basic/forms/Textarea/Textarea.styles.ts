export const BASE_CLASSES =
  'w-full rounded-[length:var(--component-input-radius)] border bg-[color:var(--component-input-bg-default)] text-[color:var(--component-input-text-default)] transition-colors duration-[var(--component-input-transition-duration)] placeholder:text-[color:var(--component-input-text-placeholder)] focus:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:ring-[color:var(--semantic-border-focus)] disabled:cursor-not-allowed disabled:bg-[color:var(--component-input-bg-disabled)] disabled:text-[color:var(--component-input-text-disabled)] disabled:opacity-[var(--semantic-opacity-disabled)] resize-none';

export const SIZE_STYLES = {
  small: 'text-[length:var(--component-input-font-size-small)] p-2 min-h-[80px]',
  default: 'text-[length:var(--component-input-font-size-default)] p-3 min-h-[100px]',
  large: 'text-[length:var(--component-input-font-size-large)] p-4 min-h-[120px]',
} as const;

export const STATE_STYLES = {
  default:
    'border-[color:var(--component-input-border-default)] hover:border-[color:var(--component-input-border-hover)] focus:border-[color:var(--component-input-border-focus)]',
  error:
    'border-[color:var(--component-input-border-error)] focus:border-[color:var(--component-input-border-error)]',
} as const;

export const RESIZE_STYLES = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
} as const;

export const LABEL_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-input-label-default)] mb-[length:var(--component-input-gap-compact)]';

export const LABEL_ERROR_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-input-label-error)] mb-[length:var(--component-input-gap-compact)]';

export const HELPER_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-input-helper-default)]';

export const HELPER_ERROR_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-input-helper-error)]';

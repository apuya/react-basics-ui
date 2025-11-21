export const BASE_CLASSES =
  'w-full rounded-[length:var(--component-input-radius)] border bg-[color:var(--component-input-bg-default)] text-[color:var(--component-input-text-default)] transition-colors duration-[var(--component-input-transition-duration)] placeholder:text-[color:var(--component-input-text-placeholder)] focus:outline-none disabled:cursor-not-allowed disabled:bg-[color:var(--component-input-bg-disabled)] disabled:text-[color:var(--component-input-text-disabled)]';

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

export const LABEL_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-input-label-default)] mb-[length:var(--component-input-gap-compact)]';

export const LABEL_ERROR_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-input-label-error)] mb-[length:var(--component-input-gap-compact)]';

export const HELPER_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-input-helper-default)]';

export const HELPER_ERROR_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-input-helper-error)]';

export const ICON_SIZE_STYLES = {
  small: 'w-[length:var(--component-input-icon-size-small)] h-[length:var(--component-input-icon-size-small)]',
  default: 'w-[length:var(--component-input-icon-size-default)] h-[length:var(--component-input-icon-size-default)]',
  large: 'w-[length:var(--component-input-icon-size-default)] h-[length:var(--component-input-icon-size-default)]',
} as const;

export const BASE_CLASSES =
  'w-full appearance-none rounded-[length:var(--component-input-radius)] border bg-[color:var(--component-select-bg-default)] text-[color:var(--component-select-text-default)] transition-colors duration-[var(--component-input-transition-duration)] focus:outline-none disabled:cursor-not-allowed disabled:bg-[color:var(--component-select-bg-disabled)] disabled:text-[color:var(--component-select-text-disabled)]';

export const SIZE_STYLES = {
  small: 'text-[length:var(--component-input-font-size-small)]',
  medium: 'text-[length:var(--component-input-font-size-medium)]',
  large: 'text-[length:var(--component-input-font-size-large)]',
} as const;

export const STATE_STYLES = {
  default:
    'border-[color:var(--component-select-border-default)] hover:border-[color:var(--component-input-border-hover)] focus:border-[color:var(--component-select-border-focus)]',
  error:
    'border-[color:var(--component-select-border-error)] focus:border-[color:var(--component-select-border-error)]',
} as const;

export const LABEL_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-select-label-default)] mb-[length:var(--component-input-gap-compact)]';

export const LABEL_ERROR_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-select-label-error)] mb-[length:var(--component-input-gap-compact)]';

export const HELPER_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-select-helper-default)]';

export const HELPER_ERROR_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-select-helper-error)]';

export const ICON_CLASSES =
  'pointer-events-none absolute right-[length:var(--component-input-padding-inline)] top-1/2 -translate-y-1/2 w-[length:var(--component-input-icon-size-default)] h-[length:var(--component-input-icon-size-default)] text-[color:var(--component-select-icon-default)]';

export const ICON_DISABLED_CLASSES =
  'pointer-events-none absolute right-[length:var(--component-input-padding-inline)] top-1/2 -translate-y-1/2 w-[length:var(--component-input-icon-size-default)] h-[length:var(--component-input-icon-size-default)] text-[color:var(--component-select-icon-disabled)]';

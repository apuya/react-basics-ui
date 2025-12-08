export const BASE_CLASSES =
  'w-full rounded-md border bg-[color:var(--component-input-bg-default)] text-[color:var(--component-input-text-default)] transition-colors duration-200 placeholder:text-[color:var(--component-input-text-placeholder)] focus:outline-none focus-visible:ring-focus focus-visible:ring-offset-focus focus-visible:ring-ring-focus disabled:cursor-not-allowed disabled:bg-[color:var(--component-input-bg-disabled)] disabled:text-[color:var(--component-input-text-disabled)] disabled:opacity-disabled [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

export const SIZE_STYLES = {
  small: 'h-8 px-3 text-sm',
  default: 'h-10 px-3 text-sm',
  large: 'h-12 px-4 text-base',
} as const;

export const STATE_STYLES = {
  default:
    'border-[color:var(--component-input-border-default)] hover:border-[color:var(--component-input-border-hover)] focus:border-[color:var(--component-input-border-focus)]',
  error:
    'border-[color:var(--component-input-border-error)] focus:border-[color:var(--component-input-border-error)]',
} as const;

export const ICON_SIZE_STYLES = {
  small: 'size-4',
  default: 'size-5',
  large: 'size-6',
} as const;

/** Suffix style for unit labels (e.g., kg, cm, $) */
export const SUFFIX_CLASSES = 'pl-2 pr-3 text-sm font-normal text-[color:var(--component-input-suffix-color)]';

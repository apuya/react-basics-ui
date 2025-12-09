export const BASE_CLASSES =
  'w-full rounded-md border bg-[color:var(--component-textarea-bg-default)] text-[color:var(--component-textarea-text-default)] transition-colors duration-200 placeholder:text-[color:var(--component-textarea-text-placeholder)] focus:outline-none focus-visible:ring-focus focus-visible:ring-offset-focus focus-visible:ring-ring-focus disabled:cursor-not-allowed disabled:bg-[color:var(--component-textarea-bg-disabled)] disabled:text-[color:var(--component-textarea-text-disabled)] disabled:opacity-disabled';

export const SIZE_STYLES = {
  small: 'p-2 text-sm',
  default: 'p-3 text-sm',
  large: 'p-4 text-base',
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

export const SIZE_LAYOUT_STYLES = {
  small: 'px-3 py-2 min-h-20',
  default: 'px-3 py-2 min-h-24',
  large: 'px-3 py-2 min-h-32',
} as const;

export const CHAR_COUNT_ERROR_CLASSES =
  'text-[color:var(--component-textarea-helper-error)]';

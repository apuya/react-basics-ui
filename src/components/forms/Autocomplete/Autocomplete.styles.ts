import type { AutocompleteSize } from './Autocomplete';

/**
 * Base classes for the autocomplete input - reuses Input component tokens
 */
export const AUTOCOMPLETE_INPUT_BASE_CLASSES =
  'flex w-full rounded-md border bg-[color:var(--component-input-bg-default)] text-[color:var(--component-input-text-default)] transition-colors duration-200 placeholder:text-[color:var(--component-input-text-placeholder)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:bg-[color:var(--component-input-bg-disabled)] disabled:text-[color:var(--component-input-text-disabled)] disabled:opacity-50';

export const AUTOCOMPLETE_INPUT_SIZE_STYLES: Record<AutocompleteSize, string> = {
  small: 'h-8 px-3 text-sm',
  default: 'h-10 px-3 text-base',
  large: 'h-12 px-4 text-lg',
} as const;

export const AUTOCOMPLETE_INPUT_STATE_STYLES = {
  default:
    'border-input-border hover:border-input-border-hover focus:border-input-border-focus',
  error:
    'border-[color:var(--component-input-border-error)] focus:border-[color:var(--component-input-border-error)]',
} as const;

export const AUTOCOMPLETE_LIST_BASE_CLASSES =
  'absolute z-50 mt-1 py-1 px-1 max-h-60 w-full overflow-auto rounded-md border border-[color:var(--component-autocomplete-border)] bg-[color:var(--component-autocomplete-bg)] shadow-md transition-opacity duration-200';

export const AUTOCOMPLETE_LIST_VISIBLE_CLASS =
  'opacity-100 pointer-events-auto';

export const AUTOCOMPLETE_LIST_HIDDEN_CLASS =
  'opacity-0 pointer-events-none';

export const AUTOCOMPLETE_OPTION_BASE_CLASSES =
  'relative flex py-2 px-3 gap-2 cursor-pointer select-none items-center rounded-sm text-[color:var(--component-autocomplete-option-text-default)] outline-none transition-colors duration-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

export const AUTOCOMPLETE_OPTION_STATE_STYLES = {
  default: 'bg-[color:var(--component-autocomplete-option-bg-default)]',
  hover: 'bg-[color:var(--component-autocomplete-option-bg-hover)]',
  selected: 'bg-[color:var(--component-autocomplete-option-bg-selected)] text-[color:var(--component-autocomplete-option-text-selected)]',
  disabled: 'bg-[color:var(--component-autocomplete-option-bg-default)] cursor-not-allowed opacity-50',
} as const;

export const AUTOCOMPLETE_EMPTY_CLASSES =
  'py-4 text-center text-base text-[color:var(--component-autocomplete-empty-text)]';

export const AUTOCOMPLETE_CHECK_ICON_CLASSES =
  'ml-auto h-4 w-4';

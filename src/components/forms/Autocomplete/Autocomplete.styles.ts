import type { AutocompleteSize } from './Autocomplete';

/**
 * Base classes for the autocomplete input - reuses Input component tokens
 */
export const AUTOCOMPLETE_INPUT_BASE_CLASSES =
  'flex w-full rounded-[length:var(--component-input-radius)] border bg-[color:var(--component-input-bg-default)] text-[color:var(--component-input-text-default)] transition-colors duration-[var(--component-input-transition-duration)] placeholder:text-[color:var(--component-input-text-placeholder)] focus:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:ring-[color:var(--semantic-border-focus)] disabled:cursor-not-allowed disabled:bg-[color:var(--component-input-bg-disabled)] disabled:text-[color:var(--component-input-text-disabled)] disabled:opacity-[var(--semantic-opacity-disabled)]';

export const AUTOCOMPLETE_INPUT_SIZE_STYLES: Record<AutocompleteSize, string> = {
  small: 'text-[length:var(--component-input-font-size-small)]',
  default: 'text-[length:var(--component-input-font-size-default)]',
  large: 'text-[length:var(--component-input-font-size-large)]',
} as const;

export const AUTOCOMPLETE_INPUT_STATE_STYLES = {
  default:
    'border-[color:var(--component-input-border-default)] hover:border-[color:var(--component-input-border-hover)] focus:border-[color:var(--component-input-border-focus)]',
  error:
    'border-[color:var(--component-input-border-error)] focus:border-[color:var(--component-input-border-error)]',
} as const;

export const AUTOCOMPLETE_LIST_BASE_CLASSES =
  'absolute z-[var(--component-autocomplete-z-index)] mt-1 max-h-[length:var(--component-autocomplete-max-height)] w-full overflow-auto rounded-[length:var(--component-autocomplete-radius)] border border-[color:var(--component-autocomplete-border)] bg-[color:var(--component-autocomplete-bg)] shadow-[var(--component-autocomplete-shadow)] transition-opacity duration-[var(--component-autocomplete-transition-duration)]';

export const AUTOCOMPLETE_LIST_VISIBLE_CLASS =
  'opacity-100 pointer-events-auto';

export const AUTOCOMPLETE_LIST_HIDDEN_CLASS =
  'opacity-0 pointer-events-none';

export const AUTOCOMPLETE_OPTION_BASE_CLASSES =
  'relative flex cursor-pointer select-none items-center rounded-sm text-[color:var(--component-autocomplete-option-text-default)] outline-none transition-colors duration-[var(--component-autocomplete-transition-duration)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

export const AUTOCOMPLETE_OPTION_STATE_STYLES = {
  default: 'bg-[color:var(--component-autocomplete-option-bg-default)]',
  hover: 'bg-[color:var(--component-autocomplete-option-bg-hover)]',
  selected: 'bg-[color:var(--component-autocomplete-option-bg-selected)] text-[color:var(--component-autocomplete-option-text-selected)]',
  disabled: 'bg-[color:var(--component-autocomplete-option-bg-default)] cursor-not-allowed opacity-50',
} as const;

export const AUTOCOMPLETE_EMPTY_CLASSES =
  'py-[length:var(--semantic-space-relaxed)] text-center text-[length:var(--component-input-font-size-default)] text-[color:var(--component-autocomplete-empty-text)]';

export const AUTOCOMPLETE_CHECK_ICON_CLASSES =
  'ml-auto h-4 w-4';

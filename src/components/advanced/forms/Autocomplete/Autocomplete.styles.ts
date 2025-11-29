import type { AutocompleteSize } from './Autocomplete';

export const AUTOCOMPLETE_INPUT_BASE_CLASSES =
  'flex w-full rounded-md border bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:ring-[color:var(--semantic-border-focus)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors';

export const AUTOCOMPLETE_INPUT_SIZE_STYLES: Record<AutocompleteSize, string> = {
  small: 'h-8 py-1 text-xs',
  default: 'h-10 py-2',
  large: 'h-12 py-3',
};

export const AUTOCOMPLETE_INPUT_STATE_STYLES = {
  default: 'border-input',
  error: 'border-destructive focus-visible:ring-destructive',
  disabled: 'cursor-not-allowed opacity-50',
};

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
} as const;

export const AUTOCOMPLETE_EMPTY_CLASSES =
  'py-6 text-center text-[length:var(--semantic-typography-size-sm)] text-[color:var(--component-autocomplete-empty-text)]';

export const AUTOCOMPLETE_CHECK_ICON_CLASSES =
  'ml-auto h-4 w-4';

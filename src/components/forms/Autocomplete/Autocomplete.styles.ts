export const AUTOCOMPLETE_INPUT_BASE_CLASSES =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export const AUTOCOMPLETE_LIST_BASE_CLASSES =
  'absolute z-[var(--component-autocomplete-z-index)] mt-1 max-h-[var(--component-autocomplete-max-height)] w-full overflow-auto rounded-[var(--component-autocomplete-radius)] border border-[var(--component-autocomplete-border)] bg-[var(--component-autocomplete-bg)] py-[var(--component-autocomplete-padding-block)] px-[var(--component-autocomplete-padding-inline)] shadow-[var(--component-autocomplete-shadow)] transition-opacity duration-[var(--component-autocomplete-transition-duration)]';

export const AUTOCOMPLETE_LIST_VISIBLE_CLASS =
  'opacity-100 pointer-events-auto';

export const AUTOCOMPLETE_LIST_HIDDEN_CLASS =
  'opacity-0 pointer-events-none';

export const AUTOCOMPLETE_OPTION_BASE_CLASSES =
  'relative flex cursor-pointer select-none items-center rounded-sm px-[var(--component-autocomplete-option-padding-inline)] py-[var(--component-autocomplete-option-padding-block)] gap-[var(--component-autocomplete-option-gap)] text-[var(--component-autocomplete-option-text-default)] outline-none transition-colors duration-[var(--component-autocomplete-transition-duration)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

export const AUTOCOMPLETE_OPTION_STATE_STYLES = {
  default: 'bg-[var(--component-autocomplete-option-bg-default)]',
  hover: 'bg-[var(--component-autocomplete-option-bg-hover)]',
  selected: 'bg-[var(--component-autocomplete-option-bg-selected)] text-[var(--component-autocomplete-option-text-selected)]',
} as const;

export const AUTOCOMPLETE_EMPTY_CLASSES =
  'py-6 text-center text-[length:var(--semantic-typography-size-sm)] text-[var(--component-autocomplete-empty-text)]';

export const AUTOCOMPLETE_CHECK_ICON_CLASSES =
  'ml-auto h-4 w-4';

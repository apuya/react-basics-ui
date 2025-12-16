import { createComponentContext } from '@/lib/createComponentContext';
import type { AutocompleteOptionData, AutocompleteSize } from './Autocomplete.types';

export interface AutocompleteContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedValue: string[];
  selectOption: (value: string) => void;
  query: string;
  setQuery: (query: string) => void;
  multiple: boolean;
  disabled: boolean;
  error: boolean;
  size: AutocompleteSize;
  placeholder: string;
  clearable: boolean;
  loading: boolean;
  minSearchLength: number;
  showDropdownIcon: boolean;
  maxHeight: string | number;
  allowCreate: boolean;
  onCreateOption?: (query: string) => void;
  highlightMatches: boolean;
  renderOption?: (option: AutocompleteOptionData, isSelected: boolean) => React.ReactNode;
  onClear: () => void;
  options: AutocompleteOptionData[];
  filteredOptions: AutocompleteOptionData[];
  inputRef: React.RefObject<HTMLInputElement>;
  listRef: React.RefObject<HTMLDivElement>;
  listId: string;
}

const { Context: AutocompleteContext, useContext: useAutocompleteContext } =
  createComponentContext<AutocompleteContextValue>('Autocomplete');

export { AutocompleteContext, useAutocompleteContext };

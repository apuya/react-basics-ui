import type { ComponentPropsWithoutRef } from 'react';

/**
 * Data structure for autocomplete options
 */
export interface AutocompleteOptionData {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export type AutocompleteSize = 'small' | 'default' | 'large';

/**
 * Main Autocomplete component props
 */
export interface AutocompleteProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  options?: AutocompleteOptionData[];
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  loading?: boolean;
  debounceDelay?: number;
  minSearchLength?: number;
  showDropdownIcon?: boolean;
  maxHeight?: string | number;
  allowCreate?: boolean;
  onCreateOption?: (query: string) => void;
  onSearch?: (query: string) => void;
  highlightMatches?: boolean;
  renderOption?: (option: AutocompleteOptionData, isSelected: boolean) => React.ReactNode;
  filter?: (option: AutocompleteOptionData, query: string) => boolean;
  // FormField integration
  label?: string;
  helperText?: string;
  error?: boolean;
  id?: string;
  size?: AutocompleteSize;
}

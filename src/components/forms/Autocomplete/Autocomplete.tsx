import {
  useState,
  useRef,
  useCallback,
  useId,
  useMemo,
  useEffect,
} from 'react';
import { useControlledState } from '@/hooks/useControlledState';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useDebounce } from '@/hooks/useDebounce';
import { FormField } from '@/components/forms/FormField';
import { ListContext } from '@/components/overlays/List/ListContext';
import { cn } from '@/lib/cn';
import { AutocompleteInput } from './AutocompleteInput';
import { AutocompleteOption } from './AutocompleteOption';
import { AutocompleteEmpty } from './AutocompleteEmpty';
import { AutocompleteContext } from './Autocomplete.context';
import type { AutocompleteProps, AutocompleteOptionData } from './Autocomplete.types';

export { useAutocompleteContext } from './Autocomplete.context';

const defaultFilter = (option: AutocompleteOptionData, query: string) => {
  return option.label.toLowerCase().includes(query.toLowerCase());
};

const AutocompleteRoot = ({
  value,
  defaultValue,
  onChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  options = [],
  multiple = false,
  placeholder,
  disabled = false,
  clearable = false,
  loading = false,
  debounceDelay = 0,
  minSearchLength = 0,
  showDropdownIcon = true,
  maxHeight = 300,
  allowCreate = false,
  onCreateOption,
  onSearch,
  highlightMatches = false,
  renderOption,
  filter = defaultFilter,
  label,
  helperText,
  error = false,
  id: providedId,
  size = 'default',
  className,
  children,
  ...props
}: AutocompleteProps) => {
  const autoId = useId();
  const inputId = providedId || autoId;
  const listId = useId();
  const [query, setQuery] = useState('');

  const inputRef = useRef<HTMLInputElement>(null!);
  const listRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  // Use useControlledState for value management
  const [selectedValue, setSelectedValue] = useControlledState<string[]>(
    value ? (Array.isArray(value) ? value : [value]) : undefined,
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : [],
    (newVal) => onChange?.(multiple ? newVal : newVal[0] || '')
  );

  // Use useControlledState for open state management
  const [isOpen, setIsOpen] = useControlledState(
    controlledOpen,
    defaultOpen,
    onOpenChange
  );

  // Debounce the query for filtering
  const debouncedQuery = useDebounce(query, debounceDelay);

  // Trigger onSearch callback when debounced query changes
  useEffect(() => {
    if (onSearch && debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  // Only filter if query meets minimum length requirement
  const filteredOptions = !debouncedQuery || debouncedQuery.length < minSearchLength
    ? options
    : options.filter((option) => filter(option, debouncedQuery));

  const selectOption = useCallback((optionValue: string) => {
    if (disabled) return;
    
    const newValue = multiple
      ? selectedValue.includes(optionValue)
        ? selectedValue.filter((v) => v !== optionValue)
        : [...selectedValue, optionValue]
      : [optionValue];

    setSelectedValue(newValue);

    if (!multiple) {
      setIsOpen(false);
      setQuery('');
    }
  }, [disabled, multiple, selectedValue, setSelectedValue, setIsOpen]);

  const handleClear = useCallback(() => {
    if (disabled) return;
    setSelectedValue([]);
    setQuery('');
    inputRef.current?.focus();
  }, [disabled, setSelectedValue, inputRef]);

  const handleClickOutside = useCallback(() => {
    if (!disabled) {
      setIsOpen(false);
      setQuery('');
    }
  }, [disabled, setIsOpen, setQuery]);

  const handleEscapeKey = useCallback(() => {
    if (!disabled) {
      setIsOpen(false);
      setQuery('');
    }
  }, [disabled, setIsOpen, setQuery]);

  useClickOutside(containerRef, handleClickOutside);
  useEscapeKey(handleEscapeKey, isOpen);

  const autocompleteContextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
    selectedValue,
    selectOption,
    query,
    setQuery,
    multiple,
    disabled,
    error,
    size,
    placeholder: placeholder || 'Search...',
    clearable,
    loading,
    minSearchLength,
    showDropdownIcon,
    maxHeight,
    allowCreate,
    onCreateOption,
    highlightMatches,
    renderOption,
    onClear: handleClear,
    options,
    filteredOptions,
    inputRef,
    listRef,
    listId,
  }), [isOpen, setIsOpen, selectedValue, selectOption, query, multiple, disabled, error, size, placeholder, clearable, loading, minSearchLength, showDropdownIcon, maxHeight, allowCreate, onCreateOption, highlightMatches, renderOption, handleClear, options, filteredOptions, inputRef, listId]);

  // Check if a value is selected (works for both single and multi-select)
  const isValueSelected = useCallback(
    (val: string) => selectedValue.includes(val),
    [selectedValue]
  );

  // List context for List.Container and List.Item integration
  const listContextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
    value: multiple ? undefined : selectedValue[0],
    setValue: selectOption,
    isValueSelected,
    getOptionLabel: (val: string) => options.find(opt => opt.value === val)?.label,
    registerOption: () => {}, // No-op, options managed by Autocomplete
    menuId: listId,
  }), [isOpen, setIsOpen, multiple, selectedValue, selectOption, isValueSelected, options, listId]);

  return (
    <FormField error={error} disabled={disabled}>
      {label && <FormField.Label htmlFor={inputId}>{label}</FormField.Label>}
      <AutocompleteContext.Provider value={autocompleteContextValue}>
        <ListContext.Provider value={listContextValue}>
          <div
            ref={containerRef}
            data-autocomplete-container
            className={cn('relative w-full', className)}
            data-size={size}
            data-error={error || undefined}
            data-disabled={disabled || undefined}
            data-open={isOpen}
            data-multiple={multiple || undefined}
            {...props}
          >
            {children}
          </div>
        </ListContext.Provider>
      </AutocompleteContext.Provider>
      {helperText && !error && <FormField.HelperText>{helperText}</FormField.HelperText>}
      {helperText && error && <FormField.ErrorMessage>{helperText}</FormField.ErrorMessage>}
    </FormField>
  );
};

AutocompleteRoot.displayName = 'Autocomplete';

export const Autocomplete = Object.assign(AutocompleteRoot, {
  Input: AutocompleteInput,
  Option: AutocompleteOption,
  Empty: AutocompleteEmpty,
});

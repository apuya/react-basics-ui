import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useId,
  type ComponentPropsWithoutRef,
} from 'react';
import { createComponentContext } from '@/lib/createComponentContext';
import { useControlledState } from '@/hooks/useControlledState';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { FormField } from '@/components/basic/forms/FormField';
import { cn } from '@/lib/cn';
import { AutocompleteInput } from './AutocompleteInput';
import { AutocompleteList } from './AutocompleteList';
import { AutocompleteOption } from './AutocompleteOption';
import { AutocompleteEmpty } from './AutocompleteEmpty';

/**
 * Data structure for autocomplete options
 */
export interface AutocompleteOptionData {
  value: string;
  label: string;
  disabled?: boolean;
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
  filter?: (option: AutocompleteOptionData, query: string) => boolean;
  emptyMessage?: string;
  // FormField integration
  label?: string;
  helperText?: string;
  error?: boolean;
  id?: string;
  size?: AutocompleteSize;
}

interface AutocompleteContextValue {
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
  options: AutocompleteOptionData[];
  filteredOptions: AutocompleteOptionData[];
  highlightedIndex: number;
  setHighlightedIndex: (index: number | ((prev: number) => number)) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  listRef: React.RefObject<HTMLDivElement>;
  listId: string;
}

const { Context: AutocompleteContext, useContext: useAutocompleteContext } =
  createComponentContext<AutocompleteContextValue>('Autocomplete');

export { useAutocompleteContext };

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
  filter = defaultFilter,
  emptyMessage = 'No results found',
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
  const [highlightedIndex, setHighlightedIndex] = useState(0);

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

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    return options.filter((option) => filter(option, query));
  }, [options, query, filter]);

  const selectOption = useCallback(
    (optionValue: string) => {
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
    },
    [multiple, selectedValue, setSelectedValue, setIsOpen, disabled]
  );

  useClickOutside(containerRef, () => {
    if (!disabled) {
      setIsOpen(false);
      setQuery('');
    }
  });

  useEscapeKey(() => {
    if (!disabled) {
      setIsOpen(false);
      setQuery('');
    }
  }, isOpen);

  // Reset highlighted index when filtered options change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions]);

  const contextValue = useMemo(
    () => ({
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
      options,
      filteredOptions,
      highlightedIndex,
      setHighlightedIndex,
      inputRef,
      listRef,
      listId,
    }),
    [isOpen, setIsOpen, selectedValue, selectOption, query, multiple, disabled, error, size, options, filteredOptions, highlightedIndex, listId]
  );

  const autocompleteClasses = useMemo(
    () => cn('relative w-full', className),
    [className]
  );

  return (
    <FormField
      label={label}
      helperText={helperText}
      error={error}
      htmlFor={inputId}
      disabled={disabled}
    >
      <AutocompleteContext.Provider value={contextValue}>
        <div ref={containerRef} className={autocompleteClasses} {...props}>
          {children}
        </div>
      </AutocompleteContext.Provider>
    </FormField>
  );
};

export const Autocomplete = Object.assign(AutocompleteRoot, {
  Input: AutocompleteInput,
  List: AutocompleteList,
  Option: AutocompleteOption,
  Empty: AutocompleteEmpty,
});

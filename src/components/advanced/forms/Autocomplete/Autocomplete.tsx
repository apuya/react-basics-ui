import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  type ComponentPropsWithoutRef,
} from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/cn';
import { AutocompleteInput } from './AutocompleteInput';
import { AutocompleteList } from './AutocompleteList';
import { AutocompleteOption } from './AutocompleteOption';
import { AutocompleteEmpty } from './AutocompleteEmpty';

export interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AutocompleteProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  options?: AutocompleteOption[];
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  filter?: (option: AutocompleteOption, query: string) => boolean;
  emptyMessage?: string;
}

interface AutocompleteContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedValue: string[];
  selectOption: (value: string) => void;
  query: string;
  setQuery: (query: string) => void;
  multiple: boolean;
  filteredOptions: AutocompleteOption[];
  highlightedIndex: number;
  setHighlightedIndex: (index: number | ((prev: number) => number)) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  listRef: React.RefObject<HTMLDivElement>;
}

const AutocompleteContext = createContext<AutocompleteContextValue | undefined>(undefined);

export const useAutocompleteContext = () => {
  const context = useContext(AutocompleteContext);
  if (!context) {
    throw new Error('Autocomplete sub-components must be used within an Autocomplete component');
  }
  return context;
};

const defaultFilter = (option: AutocompleteOption, query: string) => {
  return option.label.toLowerCase().includes(query.toLowerCase());
};

const AutocompleteRoot = ({
  value,
  defaultValue,
  onChange,
  options = [],
  multiple = false,
  placeholder,
  disabled = false,
  filter = defaultFilter,
  emptyMessage = 'No results found',
  className,
  children,
  ...props
}: AutocompleteProps) => {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue === undefined) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null!);
  const listRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  const isControlled = value !== undefined;
  const selectedValue = useMemo(() => {
    if (isControlled) {
      return Array.isArray(value) ? value : value ? [value] : [];
    }
    return internalValue;
  }, [isControlled, value, internalValue]);

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    return options.filter((option) => filter(option, query));
  }, [options, query, filter]);

  const selectOption = useCallback(
    (optionValue: string) => {
      const newValue = (() => {
        if (multiple) {
          if (selectedValue.includes(optionValue)) {
            return selectedValue.filter((v) => v !== optionValue);
          }
          return [...selectedValue, optionValue];
        }
        return [optionValue];
      })();

      if (!isControlled) {
        setInternalValue(newValue);
      }

      if (onChange) {
        onChange(multiple ? newValue : (newValue[0] || ''));
      }

      if (!multiple) {
        setIsOpen(false);
        setQuery('');
      }
    },
    [multiple, selectedValue, isControlled, onChange]
  );

  useClickOutside(containerRef, () => {
    setIsOpen(false);
    setQuery('');
  });

  useEscapeKey(() => {
    setIsOpen(false);
    setQuery('');
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
      filteredOptions,
      highlightedIndex,
      setHighlightedIndex,
      inputRef,
      listRef,
    }),
    [isOpen, selectedValue, selectOption, query, multiple, filteredOptions, highlightedIndex]
  );

  const autocompleteClasses = useMemo(
    () => cn('relative w-full', className),
    [className]
  );

  return (
    <AutocompleteContext.Provider value={contextValue}>
      <div ref={containerRef} className={autocompleteClasses} {...props}>
        {children}
      </div>
    </AutocompleteContext.Provider>
  );
};

export const Autocomplete = Object.assign(AutocompleteRoot, {
  Input: AutocompleteInput,
  List: AutocompleteList,
  Option: AutocompleteOption,
  Empty: AutocompleteEmpty,
});

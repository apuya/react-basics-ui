import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { useAutocompleteContext } from './Autocomplete';
import { AUTOCOMPLETE_INPUT_BASE_CLASSES } from './Autocomplete.styles';

export interface AutocompleteInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'> {
  placeholder?: string;
}

export const AutocompleteInput = memo(
  forwardRef<HTMLInputElement, AutocompleteInputProps>(
    ({ placeholder = 'Search...', className, ...props }, forwardedRef) => {
      const { query, setQuery, setIsOpen, selectedValue, multiple, filteredOptions, highlightedIndex, setHighlightedIndex, selectOption, inputRef } = useAutocompleteContext();

      const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
          setIsOpen(true);
        },
        [setQuery, setIsOpen]
      );

      const handleInputFocus = useCallback(() => {
        setIsOpen(true);
      }, [setIsOpen]);

      const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (!filteredOptions.length) return;

          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
              break;
            case 'ArrowUp':
              e.preventDefault();
              setHighlightedIndex((prev) => Math.max(prev - 1, 0));
              break;
            case 'Enter':
              e.preventDefault();
              if (filteredOptions[highlightedIndex] && !filteredOptions[highlightedIndex].disabled) {
                selectOption(filteredOptions[highlightedIndex].value);
              }
              break;
            case 'Escape':
              setIsOpen(false);
              setQuery('');
              break;
          }
        },
        [filteredOptions, highlightedIndex, selectOption, setHighlightedIndex, setIsOpen, setQuery]
      );

      const inputClasses = useMemo(
        () => cn(AUTOCOMPLETE_INPUT_BASE_CLASSES, className),
        [className]
      );

      const displayValue = useMemo(() => {
        if (query) return query;
        if (!multiple && selectedValue.length === 1) {
          const selected = filteredOptions.find((opt) => opt.value === selectedValue[0]);
          return selected?.label || '';
        }
        return '';
      }, [query, multiple, selectedValue, filteredOptions]);

      return (
        <input
          ref={(node) => {
            if (node) inputRef.current = node;
            if (typeof forwardedRef === 'function') {
              forwardedRef(node);
            } else if (forwardedRef) {
              forwardedRef.current = node;
            }
          }}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={false}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />
      );
    }
  )
);

AutocompleteInput.displayName = 'Autocomplete.Input';

import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from 'react';
import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useAutocompleteContext } from './Autocomplete';
import { 
  AUTOCOMPLETE_INPUT_BASE_CLASSES, 
  AUTOCOMPLETE_INPUT_SIZE_STYLES, 
  AUTOCOMPLETE_INPUT_STATE_STYLES 
} from './Autocomplete.styles';

export interface AutocompleteInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'> {
  placeholder?: string;
}

export const AutocompleteInput = memo(
  forwardRef<HTMLInputElement, AutocompleteInputProps>(
    ({ placeholder: placeholderProp, className, style, disabled: disabledProp, ...props }, forwardedRef) => {
      const { isOpen, query, setQuery, setIsOpen, selectedValue, multiple, options, filteredOptions, highlightedIndex, setHighlightedIndex, selectOption, inputRef, listId, disabled: contextDisabled, error, size, placeholder: contextPlaceholder } = useAutocompleteContext();
      const placeholder = placeholderProp ?? contextPlaceholder;
      
      const disabled = disabledProp ?? contextDisabled;
      const mergedRef = useMergedRefs(forwardedRef, inputRef);

      const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          if (disabled) return;
          setQuery(e.target.value);
          setIsOpen(true);
        },
        [setQuery, setIsOpen, disabled]
      );

      const handleInputFocus = useCallback(() => {
        if (disabled) return;
        setIsOpen(true);
      }, [setIsOpen, disabled]);

      const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (!filteredOptions.length) return;

          // Helper to find next non-disabled index
          const findNextIndex = (startIndex: number, direction: 1 | -1): number => {
            let nextIndex = startIndex + direction;
            while (
              nextIndex >= 0 &&
              nextIndex < filteredOptions.length &&
              filteredOptions[nextIndex]?.disabled
            ) {
              nextIndex += direction;
            }
            // Clamp to valid range
            if (nextIndex < 0) return startIndex;
            if (nextIndex >= filteredOptions.length) return startIndex;
            return nextIndex;
          };

          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              setHighlightedIndex((prev) => findNextIndex(prev, 1));
              break;
            case 'ArrowUp':
              e.preventDefault();
              setHighlightedIndex((prev) => findNextIndex(prev, -1));
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
        () => cn(
          AUTOCOMPLETE_INPUT_BASE_CLASSES,
          AUTOCOMPLETE_INPUT_SIZE_STYLES[size],
          error ? AUTOCOMPLETE_INPUT_STATE_STYLES.error : AUTOCOMPLETE_INPUT_STATE_STYLES.default,
          className
        ),
        [size, error, className]
      );

      const displayValue = useMemo(() => {
        if (query) return query;
        if (!multiple && selectedValue.length === 1) {
          const selected = options.find((opt) => opt.value === selectedValue[0]);
          return selected?.label || '';
        }
        return '';
      }, [query, multiple, selectedValue, options]);

      const inputStyle = useMemo<CSSProperties>(
        () => ({
          height: `var(--component-input-height-${size})`,
          paddingInline: 'var(--component-autocomplete-input-padding-inline)',
          ...style,
        }),
        [size, style]
      );

      return (
        <input
          ref={mergedRef}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-activedescendant={
            isOpen && highlightedIndex >= 0 && filteredOptions[highlightedIndex]
              ? `${listId}-option-${filteredOptions[highlightedIndex].value}`
              : undefined
          }
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          style={inputStyle}
          data-size={size}
          data-error={error || undefined}
          data-open={isOpen}
          {...props}
        />
      );
    }
  )
);

AutocompleteInput.displayName = 'Autocomplete.Input';

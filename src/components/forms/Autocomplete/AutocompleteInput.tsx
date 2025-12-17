import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from 'react';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useAutocompleteContext } from './Autocomplete.context';
import { BaseInputField, type BaseInputSize } from '../BaseInputField';
import { Spinner } from '@/components/feedback/Spinner';
import { IoClose, IoChevronDown } from 'react-icons/io5';

export interface AutocompleteInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'onChange' | 'size'> {
  placeholder?: string;
}

export const AutocompleteInput = memo(
  forwardRef<HTMLInputElement, AutocompleteInputProps>(
    ({ placeholder: placeholderProp, className, style, disabled: disabledProp, ...props }, forwardedRef) => {
      const { 
        isOpen, 
        query, 
        setQuery, 
        setIsOpen, 
        selectedValue, 
        multiple, 
        options, 
        inputRef,
        listRef,
        listId, 
        disabled: contextDisabled, 
        error, 
        size, 
        placeholder: contextPlaceholder,
        clearable,
        loading,
        showDropdownIcon,
        onClear
      } = useAutocompleteContext();
      
      const placeholder = placeholderProp ?? contextPlaceholder;
      const disabled = disabledProp ?? contextDisabled;
      const mergedRef = useMergedRefs(forwardedRef, inputRef);

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        setQuery(e.target.value);
        setIsOpen(true);
      };

      const handleInputFocus = () => {
        if (disabled) return;
        setIsOpen(true);
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Escape key to close
        if (e.key === 'Escape') {
          setIsOpen(false);
          setQuery('');
          return;
        }

        // ArrowDown: Focus first option in the list
        if (e.key === 'ArrowDown' && isOpen) {
          e.preventDefault();
          const firstOption = listRef.current?.querySelector<HTMLButtonElement>('[role="option"]:not([disabled])');
          firstOption?.focus();
          return;
        }

        // Other arrow keys and Enter are handled by List.Container's keyboard navigation
      };

      const displayValue = (() => {
        if (query) return query;
        if (!multiple && selectedValue.length === 1) {
          const selected = options.find((opt) => opt.value === selectedValue[0]);
          return selected?.label || '';
        }
        return '';
      })();

      const inputStyle: CSSProperties = {
        paddingInline: 'var(--component-autocomplete-input-padding-inline)',
        ...style,
      };

      // Show loading spinner, clear button, or dropdown indicator
      const showClearButton = clearable && !disabled && !loading && (selectedValue.length > 0 || query);
      const showDropdown = showDropdownIcon && !loading && !showClearButton;

      // Spinner size mapping based on input size
      const spinnerSize = size === 'small' ? 'xs' : size === 'large' ? 'sm' : 'xs';
      // Icon size mapping based on input size
      const iconSize = size === 'small' ? '16px' : size === 'large' ? '20px' : '18px';

      const trailingIcon = loading ? (
        <Spinner size={spinnerSize} label="Loading options" />
      ) : showClearButton ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="flex items-center justify-center shrink-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          aria-label="Clear selection"
          tabIndex={-1}
          style={{ width: iconSize, height: iconSize, minWidth: iconSize, minHeight: iconSize }}
        >
          <IoClose style={{ width: '100%', height: '100%', display: 'block' }} />
        </button>
      ) : showDropdown ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) {
              setIsOpen(!isOpen);
            }
          }}
          className="flex items-center justify-center shrink-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-all"
          aria-label={isOpen ? 'Close dropdown' : 'Open dropdown'}
          tabIndex={-1}
          style={{ 
            width: iconSize, 
            height: iconSize, 
            minWidth: iconSize, 
            minHeight: iconSize,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <IoChevronDown style={{ width: '100%', height: '100%', display: 'block' }} />
        </button>
      ) : undefined;

      return (
        <BaseInputField
          ref={mergedRef}
          type="text"
          size={size as BaseInputSize}
          variant="input"
          error={error}
          disabled={disabled}
          className={className}
          cssPrefix="input"
          inputStyle={inputStyle}
          trailingIcon={trailingIcon}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-busy={loading}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          {...props}
        />
      );
    }
  )
);

AutocompleteInput.displayName = 'Autocomplete.Input';

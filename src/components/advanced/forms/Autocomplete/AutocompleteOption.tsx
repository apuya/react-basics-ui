import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  type ReactNode,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from 'react';
import { cn } from '@/lib/cn';
import { useAutocompleteContext, type AutocompleteOptionData } from './Autocomplete';
import {
  AUTOCOMPLETE_OPTION_BASE_CLASSES,
  AUTOCOMPLETE_OPTION_STATE_STYLES,
  AUTOCOMPLETE_CHECK_ICON_CLASSES,
} from './Autocomplete.styles';

/**
 * Props for AutocompleteOption component
 */
export interface AutocompleteOptionProps extends ComponentPropsWithoutRef<'div'> {
  /** Option value - simplified API */
  value?: string;
  /** Option object - legacy API (deprecated, use value prop instead) */
  option?: AutocompleteOptionData;
  /** Index - legacy API (deprecated, auto-calculated internally) */
  index?: number;
  /** Disabled state - overrides option.disabled if provided */
  disabled?: boolean;
  children?: ReactNode;
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={AUTOCOMPLETE_CHECK_ICON_CLASSES}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const AutocompleteOption = memo(
  forwardRef<HTMLDivElement, AutocompleteOptionProps>(
    ({ value: valueProp, option: optionProp, index: indexProp, disabled: disabledProp, children, className, style, ...props }, ref) => {
      const { selectedValue, selectOption, highlightedIndex, multiple, listId, filteredOptions } = useAutocompleteContext();

      // Support both new API (value prop) and legacy API (option + index props)
      const optionValue = valueProp ?? optionProp?.value ?? '';
      const option = valueProp
        ? filteredOptions.find(opt => opt.value === valueProp)
        : optionProp;
      const index = indexProp ?? filteredOptions.findIndex(opt => opt.value === optionValue);

      if (!option) {
        console.warn(`AutocompleteOption: No option found for value "${optionValue}"`);
        return null;
      }

      // Support both disabled prop and option.disabled
      const isDisabled = disabledProp ?? option.disabled ?? false;
      const isSelected = selectedValue.includes(option.value);
      const isHighlighted = highlightedIndex === index;

      const handleClick = useCallback(() => {
        if (!isDisabled) {
          selectOption(option.value);
        }
      }, [selectOption, option, isDisabled]);

      const optionClasses = useMemo(
        () =>
          cn(
            AUTOCOMPLETE_OPTION_BASE_CLASSES,
            isSelected
              ? AUTOCOMPLETE_OPTION_STATE_STYLES.selected
              : isHighlighted
              ? AUTOCOMPLETE_OPTION_STATE_STYLES.hover
              : AUTOCOMPLETE_OPTION_STATE_STYLES.default,
            className
          ),
        [isSelected, isHighlighted, className]
      );

      const optionStyle = useMemo<CSSProperties>(
        () => ({
          paddingBlock: 'var(--component-autocomplete-option-padding-block)',
          paddingInline: 'var(--component-autocomplete-option-padding-inline)',
          gap: 'var(--component-autocomplete-option-gap)',
          ...style,
        }),
        [style]
      );

      return (
        <div
          ref={ref}
          id={`${listId}-option-${option.value}`}
          role="option"
          aria-selected={isSelected}
          aria-disabled={isDisabled}
          data-disabled={isDisabled}
          onClick={handleClick}
          className={optionClasses}
          style={optionStyle}
          {...props}
        >
          {children || option.label}
          {multiple && isSelected && <CheckIcon />}
        </div>
      );
    }
  )
);

AutocompleteOption.displayName = 'Autocomplete.Option';

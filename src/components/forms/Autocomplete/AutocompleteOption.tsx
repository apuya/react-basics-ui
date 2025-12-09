import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  useState,
  useRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import { BiCheck } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { Icon } from '@/components/utility/Icon';
import { useAutocompleteContext, type AutocompleteOptionData } from './Autocomplete';
import {
  AUTOCOMPLETE_OPTION_BASE_CLASSES,
  AUTOCOMPLETE_OPTION_STATE_STYLES,
  AUTOCOMPLETE_CHECK_ICON_CLASSES,
} from './Autocomplete.styles';

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

export const AutocompleteOption = memo(
  forwardRef<HTMLDivElement, AutocompleteOptionProps>(
    ({ value: valueProp, option: optionProp, index: indexProp, disabled: disabledProp, children, className, style, ...props }, forwardedRef) => {
      const { selectedValue, selectOption, highlightedIndex, setHighlightedIndex, multiple, listId, filteredOptions } = useAutocompleteContext();
      const [isHovered, setIsHovered] = useState(false);
      const optionRef = useRef<HTMLDivElement>(null!);
      const mergedRef = useMergedRefs(forwardedRef, optionRef);

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

      const handleMouseEnter = useCallback(() => {
        if (!isDisabled) {
          setIsHovered(true);
          // Update highlighted index on hover so keyboard navigation continues from here
          setHighlightedIndex(index);
        }
      }, [isDisabled, index, setHighlightedIndex]);

      const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
      }, []);

      const optionClasses = useMemo(
        () =>
          cn(
            AUTOCOMPLETE_OPTION_BASE_CLASSES,
            isDisabled
              ? AUTOCOMPLETE_OPTION_STATE_STYLES.disabled
              : isSelected
              ? AUTOCOMPLETE_OPTION_STATE_STYLES.selected
              : isHighlighted || isHovered
              ? AUTOCOMPLETE_OPTION_STATE_STYLES.hover
              : AUTOCOMPLETE_OPTION_STATE_STYLES.default,
            className
          ),
        [isDisabled, isSelected, isHighlighted, isHovered, className]
      );

      return (
        <div
          ref={mergedRef}
          id={`${listId}-option-${option.value}`}
          role="option"
          aria-selected={isSelected}
          aria-disabled={isDisabled}
          data-disabled={isDisabled || undefined}
          data-selected={isSelected || undefined}
          data-highlighted={isHighlighted || isHovered || undefined}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={optionClasses}
          style={style}
          {...props}
        >
          {children || option.label}
          {multiple && isSelected && (
            <Icon
              icon={BiCheck}
              className={AUTOCOMPLETE_CHECK_ICON_CLASSES}
              aria-hidden
            />
          )}
        </div>
      );
    }
  )
);

AutocompleteOption.displayName = 'Autocomplete.Option';

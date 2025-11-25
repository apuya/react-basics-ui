import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { useAutocompleteContext, type AutocompleteOption as AutocompleteOptionType } from './Autocomplete';
import {
  AUTOCOMPLETE_OPTION_BASE_CLASSES,
  AUTOCOMPLETE_OPTION_STATE_STYLES,
  AUTOCOMPLETE_CHECK_ICON_CLASSES,
} from './Autocomplete.styles';

export interface AutocompleteOptionProps extends ComponentPropsWithoutRef<'div'> {
  option: AutocompleteOptionType;
  index: number;
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
    ({ option, index, children, className, ...props }, ref) => {
      const { selectedValue, selectOption, highlightedIndex, multiple } = useAutocompleteContext();
      const isSelected = selectedValue.includes(option.value);
      const isHighlighted = highlightedIndex === index;

      const handleClick = useCallback(() => {
        if (!option.disabled) {
          selectOption(option.value);
        }
      }, [selectOption, option]);

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

      return (
        <div
          ref={ref}
          role="option"
          aria-selected={isSelected}
          aria-disabled={option.disabled}
          data-disabled={option.disabled}
          onClick={handleClick}
          className={optionClasses}
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

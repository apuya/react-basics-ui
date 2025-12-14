import { forwardRef, memo, useCallback, useEffect, useMemo, useState, type ComponentPropsWithoutRef } from 'react';
import { BiCheck } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/basic/utility/Icon';
import { useOptionalSelectContext } from './SelectContext';
import {
  CHECK_ICON_CLASSES,
  OPTION_BASE_CLASSES,
  OPTION_STATE_STYLES,
  OPTION_STYLE,
} from './Select.styles';

export interface SelectOptionProps extends Omit<ComponentPropsWithoutRef<'button'>, 'value'> {
  value: string;
  disabled?: boolean;
  /** For standalone usage outside Select context */
  selected?: boolean;
  /** For standalone usage outside Select context */
  onOptionSelect?: (value: string) => void;
}

export const SelectOption = memo(
  forwardRef<HTMLButtonElement, SelectOptionProps>(
    ({ value: optionValue, disabled = false, selected: selectedProp, onOptionSelect, className, children, ...props }, ref) => {
      const context = useOptionalSelectContext();
      const [isHovered, setIsHovered] = useState(false);
      
      // Use context values if available, otherwise use props
      const isSelected = context ? context.value === optionValue : (selectedProp ?? false);

      // Extract label once
      const label = useMemo(
        () => typeof children === 'string' ? children : optionValue,
        [children, optionValue]
      );

      // Register option label when in context
      useEffect(() => {
        if (context) {
          context.registerOption(optionValue, label);
        }
      }, [optionValue, label, context]);

      const optionClasses = useMemo(() => {
        const state = disabled ? 'disabled' : isSelected ? 'selected' : isHovered ? 'hover' : 'default';
        return cn(OPTION_BASE_CLASSES, OPTION_STATE_STYLES[state], className);
      }, [disabled, isSelected, isHovered, className]);

      const handleClick = useCallback(() => {
        if (!disabled) {
          if (context) {
            context.setValue(optionValue);
          } else {
            onOptionSelect?.(optionValue);
          }
        }
      }, [disabled, optionValue, context, onOptionSelect]);

      const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
      }, []);

      const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
      }, []);

      return (
        <button
          ref={ref}
          type="button"
          role="option"
          aria-selected={isSelected}
          disabled={disabled}
          className={optionClasses}
          style={OPTION_STYLE}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-selected={isSelected || undefined}
          data-disabled={disabled || undefined}
          {...props}
        >
          <span className="flex-1 text-left">{children}</span>
          {isSelected && (
            <Icon
              icon={BiCheck}
              className={CHECK_ICON_CLASSES}
              aria-hidden
            />
          )}
        </button>
      );
    }
  )
);

SelectOption.displayName = 'Select.Option';

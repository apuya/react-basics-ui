import { forwardRef, memo, useCallback, useEffect, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { BiCheck } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { Text } from '@/components/typography/Text';
import { useOptionalListContext } from './ListContext';
import {
  ITEM_BASE_CLASSES,
  ITEM_STATE_STYLES,
  ITEM_STYLE,
} from './List.styles';

export interface ListItemProps extends Omit<ComponentPropsWithoutRef<'button'>, 'value'> {
  value: string;
  disabled?: boolean;
  /** For standalone usage outside List context */
  selected?: boolean;
  /** For standalone usage outside List context */
  onOptionSelect?: (value: string) => void;
  /** Icon element displayed before the label */
  leadingIcon?: ReactNode;
  /** Icon element displayed after the label (before check icon) */
  trailingIcon?: ReactNode;
  /** Secondary description text below the main label */
  description?: string;
  /** Hide the check icon when selected */
  hideCheckIcon?: boolean;
}

export const ListItem = memo(
  forwardRef<HTMLButtonElement, ListItemProps>(
    ({ value: optionValue, disabled = false, selected: selectedProp, onOptionSelect, leadingIcon, trailingIcon, description, hideCheckIcon = false, className, children, ...props }, ref) => {
      const context = useOptionalListContext();
      const [isHovered, setIsHovered] = useState(false);
      
      // Use context values if available, otherwise use props
      // Supports both single-select (value === optionValue) and multi-select (isValueSelected)
      const isSelected = context 
        ? context.isValueSelected 
          ? context.isValueSelected(optionValue) 
          : context.value === optionValue 
        : (selectedProp ?? false);

      // Register option label when in context
      useEffect(() => {
        if (context) {
          const label = typeof children === 'string' ? children : optionValue;
          context.registerOption(optionValue, label);
        }
      }, [optionValue, children, context]);

      // Compute state outside useMemo to avoid unnecessary recalculations
      const state = disabled ? 'disabled' : isSelected ? 'selected' : isHovered ? 'hover' : 'default';
      const itemClasses = cn(ITEM_BASE_CLASSES, ITEM_STATE_STYLES[state], className);
      const hasDescription = Boolean(description);

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
          className={itemClasses}
          style={ITEM_STYLE}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-selected={isSelected}
          data-disabled={disabled}
          {...props}
        >
          {leadingIcon && (
            <span className={cn("shrink-0 size-4", hasDescription && "self-start mt-0.5")}>
              {leadingIcon}
            </span>
          )}
          <span className={cn("flex-1 text-left", hasDescription && "flex flex-col")}>
            {hasDescription ? (
              <>
                <Text size="body">{children}</Text>
                <Text size="caption" color="secondary">{description}</Text>
              </>
            ) : (
              children
            )}
          </span>
          {trailingIcon && (
            <span className={cn("shrink-0 size-4", hasDescription && "self-start mt-0.5")}>
              {trailingIcon}
            </span>
          )}
          {isSelected && !hideCheckIcon && (
            <BiCheck className={cn("shrink-0 size-4", hasDescription && "self-start mt-0.5")} aria-hidden />
          )}
        </button>
      );
    }
  )
);

ListItem.displayName = 'List.Item';

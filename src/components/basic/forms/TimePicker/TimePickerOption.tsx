import { forwardRef, memo, useCallback, useMemo, type ComponentPropsWithoutRef } from 'react';
import { BiCheck } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/basic/utility/Icon';
import { useTimePickerContext } from './TimePickerContext';
import { formatTimeDisplay } from './timePickerUtils';
import { OPTION_BASE_CLASSES, OPTION_STATE_STYLES } from './TimePicker.styles';

// ============================================================================
// TimePickerOption Component
// ============================================================================

export interface TimePickerOptionProps extends Omit<ComponentPropsWithoutRef<'button'>, 'value'> {
  /** Time value in HH:MM format (24-hour) */
  value: string;
  /** Pre-computed display label (hour:minute meridiem). If not provided, computed from value */
  label?: string;
}

export const TimePickerOption = memo(
  forwardRef<HTMLButtonElement, TimePickerOptionProps>(function TimePickerOption(
    { value: optionValue, label, className, ...props },
    ref
  ) {
    const { value, setValue, disabled } = useTimePickerContext();
    const isSelected = value === optionValue;

    // Use pre-computed label if provided, otherwise compute on demand
    const displayLabel = label ?? formatTimeDisplay(optionValue);

    const handleClick = useCallback(() => {
      if (!disabled) {
        setValue(optionValue);
      }
    }, [disabled, optionValue, setValue]);

    const optionStyle = useMemo(
      () => ({
        height: 'var(--component-dropdown-item-height)',
        paddingInline: 'var(--component-dropdown-item-padding-inline)',
        paddingBlock: 'var(--component-dropdown-item-padding-block)',
        gap: 'var(--component-dropdown-item-gap)',
      }),
      []
    );

    const optionClasses = useMemo(
      () => cn(
        OPTION_BASE_CLASSES,
        isSelected ? OPTION_STATE_STYLES.selected : OPTION_STATE_STYLES.default,
        !isSelected && 'hover:bg-[color:var(--component-dropdown-item-bg-hover)] hover:text-[color:var(--component-dropdown-text)]',
        className
      ),
      [isSelected, className]
    );

    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={isSelected}
        className={optionClasses}
        style={optionStyle}
        onClick={handleClick}
        data-selected={isSelected || undefined}
        {...props}
      >
        <span className="flex-1 text-left">{displayLabel}</span>
        {isSelected && (
          <Icon
            icon={BiCheck}
            className="shrink-0 w-[length:var(--component-select-icon-check-size)] h-[length:var(--component-select-icon-check-size)]"
            aria-hidden
          />
        )}
      </button>
    );
  })
);

TimePickerOption.displayName = 'TimePicker.Option';

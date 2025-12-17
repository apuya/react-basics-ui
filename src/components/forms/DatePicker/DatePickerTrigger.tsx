import { forwardRef, memo, useCallback } from 'react';
import { HiOutlineCalendar } from 'react-icons/hi';
import { Button, type ButtonSize } from '../../actions/Button';
import { Icon } from '../../utility/Icon';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useDatePickerContext } from './DatePickerContext';
import {
  TRIGGER_PLACEHOLDER_CLASSES,
  TRIGGER_VALUE_CLASSES,
  TRIGGER_ERROR_CLASSES,
} from './DatePicker.styles';
import type { DatePickerTriggerProps, DateRange } from './DatePicker.types';
import { cn } from '@/lib/cn';

/**
 * Default date formatter
 */
const defaultFormatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Default range formatter
 */
const defaultFormatRange = (range: DateRange): string => {
  if (!range.start && !range.end) return '';
  if (range.start && !range.end) return defaultFormatDate(range.start);
  if (!range.start && range.end) return defaultFormatDate(range.end);
  return `${defaultFormatDate(range.start!)} - ${defaultFormatDate(range.end!)}`;
};

/**
 * DatePicker.Trigger - Button that opens the date picker popover.
 *
 * Composes the Button component with `variant="tertiary"` for consistent styling.
 * Displays the selected date/range or placeholder text with a calendar icon.
 *
 * @example
 * ```tsx
 * <DatePicker>
 *   <DatePicker.Trigger
 *     placeholder="Select date"
 *     formatDate={(date) => date.toLocaleDateString()}
 *   />
 *   <DatePicker.Content>...</DatePicker.Content>
 * </DatePicker>
 * ```
 */
export const DatePickerTrigger = memo(
  forwardRef<HTMLButtonElement, DatePickerTriggerProps>(function DatePickerTrigger(
    {
      placeholder = 'Select date',
      formatDate = defaultFormatDate,
      formatRange = defaultFormatRange,
      className,
      onClick,
      ...rest
    },
    ref
  ) {
    const {
      isOpen,
      setIsOpen,
      variant,
      size,
      disabled,
      error,
      selectedDate,
      selectedRange,
      triggerRef,
      contentId,
      triggerId,
    } = useDatePickerContext();

    const mergedRef = useMergedRefs(ref, triggerRef);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        setIsOpen(!isOpen);
        onClick?.(e);
      },
      [disabled, isOpen, setIsOpen, onClick]
    );

    // Determine what to display
    const isRangeMode = variant !== 'single';
    let displayValue: string | null = null;

    if (isRangeMode) {
      if (selectedRange.start || selectedRange.end) {
        displayValue = formatRange(selectedRange);
      }
    } else {
      if (selectedDate) {
        displayValue = formatDate(selectedDate);
      }
    }

    const hasValue = displayValue !== null;

    return (
      <Button
        ref={mergedRef}
        id={triggerId}
        variant="tertiary"
        size={size as ButtonSize}
        disabled={disabled}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={isOpen ? contentId : undefined}
        onClick={handleClick}
        leadingVisual={<Icon icon={HiOutlineCalendar} size="sm" />}
        className={cn(error && TRIGGER_ERROR_CLASSES, className)}
        {...rest}
      >
        <span className={hasValue ? TRIGGER_VALUE_CLASSES : TRIGGER_PLACEHOLDER_CLASSES}>
          {hasValue ? displayValue : placeholder}
        </span>
      </Button>
    );
  })
);

DatePickerTrigger.displayName = 'DatePicker.Trigger';

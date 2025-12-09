import { cn } from '@/lib/cn';
import { forwardRef, memo, useCallback } from 'react';
import { Icon } from '../../utility/Icon';
import { HiOutlineCalendar } from 'react-icons/hi';
import { useDatePickerContext } from './DatePickerContext';
import {
  TRIGGER_BASE_CLASSES,
  TRIGGER_SIZE_CLASSES,
  TRIGGER_STATE_STYLES,
  TRIGGER_ICON_CLASSES,
  TRIGGER_PLACEHOLDER_CLASSES,
  TRIGGER_VALUE_CLASSES,
} from './DatePicker.styles';
import type { DatePickerTriggerProps, DateRange } from './DatePicker.types';

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
 * DatePickerTrigger - Button that opens the date picker
 * 
 * @example
 * ```tsx
 * <DatePicker>
 *   <DatePickerTrigger placeholder="Select date" />
 *   <DatePickerContent>...</DatePickerContent>
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

    // Merge refs
    const setRef = useCallback(
      (node: HTMLButtonElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        if (triggerRef) {
          (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [ref, triggerRef]
    );

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

    // Determine state
    const stateKey = disabled ? 'disabled' : error ? 'error' : 'default';

    return (
      <button
        ref={setRef}
        id={triggerId}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={isOpen ? contentId : undefined}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          TRIGGER_BASE_CLASSES,
          TRIGGER_SIZE_CLASSES[size as keyof typeof TRIGGER_SIZE_CLASSES],
          TRIGGER_STATE_STYLES[stateKey],
          className
        )}
        {...rest}
      >
        <Icon 
          icon={HiOutlineCalendar} 
          size="sm" 
          className={TRIGGER_ICON_CLASSES}
          aria-hidden 
        />
        <span className={hasValue ? TRIGGER_VALUE_CLASSES : TRIGGER_PLACEHOLDER_CLASSES}>
          {hasValue ? displayValue : placeholder}
        </span>
      </button>
    );
  })
);

DatePickerTrigger.displayName = 'DatePickerTrigger';

import { memo, useCallback, useId, useMemo, useRef, useState } from 'react';
import { DatePickerContext } from './DatePickerContext';
import {
  WRAPPER_CLASSES,
} from './DatePicker.styles';
import type {
  DatePickerProps,
  DatePickerContextValue,
  DateRange,
  DatePickerVariant,
  DatePickerSize,
} from './DatePicker.types';

/**
 * DatePicker - Main compound component for date selection
 * 
 * Supports 4 variants:
 * - `single`: Single calendar, single date selection
 * - `single-range`: Single calendar, date range selection
 * - `double-range`: Double calendar, date range selection
 * - `double-presets`: Double calendar with presets sidebar
 * 
 * @example
 * ```tsx
 * // Single date picker
 * <DatePicker variant="single" onChange={setDate}>
 *   <DatePickerTrigger placeholder="Select date" />
 *   <DatePickerContent>
 *     <Calendar />
 *   </DatePickerContent>
 * </DatePicker>
 * 
 * // Range with presets
 * <DatePicker variant="double-presets" onRangeChange={setRange}>
 *   <DatePickerTrigger placeholder="Select range" />
 *   <DatePickerContent>
 *     <DatePickerPresets />
 *     <div>
 *       <Calendar variant="dual" />
 *       <DatePickerConfirmation />
 *     </div>
 *   </DatePickerContent>
 * </DatePicker>
 * ```
 */
export const DatePicker = memo(function DatePicker({
  children,
  variant = 'single',
  defaultOpen = false,
  open,
  onOpenChange,
  value,
  defaultValue = null,
  rangeValue,
  defaultRangeValue = { start: null, end: null },
  onChange,
  onRangeChange,
  minDate,
  maxDate,
  disabledDates,
  firstDayOfWeek = 0,
  size = 'default',
  disabled = false,
  error = false,
  closeOnSelect = true,
}: DatePickerProps) {
  // Generate unique IDs
  const id = useId();
  const triggerId = `datepicker-trigger-${id}`;
  const contentId = `datepicker-content-${id}`;

  // Refs
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Open state (controlled or uncontrolled)
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open !== undefined ? open : internalOpen;

  const setIsOpen = useCallback(
    (newOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [open, onOpenChange]
  );

  // Single date state (controlled or uncontrolled)
  const [internalDate, setInternalDate] = useState<Date | null>(defaultValue);
  const selectedDate = value !== undefined ? value : internalDate;

  const setSelectedDate = useCallback(
    (date: Date | null) => {
      if (value === undefined) {
        setInternalDate(date);
      }
      onChange?.(date);
      
      // Close on select for single mode
      if (closeOnSelect && variant === 'single' && date) {
        setIsOpen(false);
      }
    },
    [value, onChange, closeOnSelect, variant, setIsOpen]
  );

  // Date range state (controlled or uncontrolled)
  const [internalRange, setInternalRange] = useState<DateRange>(defaultRangeValue);
  const selectedRange = rangeValue !== undefined ? rangeValue : internalRange;

  const setSelectedRange = useCallback(
    (range: DateRange) => {
      if (rangeValue === undefined) {
        setInternalRange(range);
      }
      onRangeChange?.(range);
    },
    [rangeValue, onRangeChange]
  );

  // Hover state for range preview
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Display state (month/year being viewed)
  const now = new Date();
  const [displayMonth, setDisplayMonth] = useState(
    selectedDate?.getMonth() ?? selectedRange.start?.getMonth() ?? now.getMonth()
  );
  const [displayYear, setDisplayYear] = useState(
    selectedDate?.getFullYear() ?? selectedRange.start?.getFullYear() ?? now.getFullYear()
  );

  // Secondary display state for dual calendar (next month)
  const secondaryDisplayMonth = displayMonth === 11 ? 0 : displayMonth + 1;
  const secondaryDisplayYear = displayMonth === 11 ? displayYear + 1 : displayYear;

  // Confirm handler (for range modes)
  const onConfirm = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // Cancel handler
  const onCancel = useCallback(() => {
    // Reset to previous value if needed
    setIsOpen(false);
  }, [setIsOpen]);

  // Build context value
  const contextValue = useMemo<DatePickerContextValue>(
    () => ({
      isOpen,
      setIsOpen,
      variant: variant as DatePickerVariant,
      size: size as DatePickerSize,
      disabled,
      error,
      selectedDate,
      setSelectedDate,
      selectedRange,
      setSelectedRange,
      hoveredDate,
      setHoveredDate,
      displayMonth,
      displayYear,
      setDisplayMonth,
      setDisplayYear,
      secondaryDisplayMonth,
      secondaryDisplayYear,
      minDate,
      maxDate,
      disabledDates,
      firstDayOfWeek,
      triggerRef,
      contentRef,
      contentId,
      triggerId,
      closeOnSelect,
      onConfirm,
      onCancel,
    }),
    [
      isOpen,
      setIsOpen,
      variant,
      size,
      disabled,
      error,
      selectedDate,
      setSelectedDate,
      selectedRange,
      setSelectedRange,
      hoveredDate,
      displayMonth,
      displayYear,
      secondaryDisplayMonth,
      secondaryDisplayYear,
      minDate,
      maxDate,
      disabledDates,
      firstDayOfWeek,
      contentId,
      triggerId,
      closeOnSelect,
      onConfirm,
      onCancel,
    ]
  );

  return (
    <DatePickerContext.Provider value={contextValue}>
      <div className={WRAPPER_CLASSES}>
        {children}
      </div>
    </DatePickerContext.Provider>
  );
});

DatePicker.displayName = 'DatePicker';

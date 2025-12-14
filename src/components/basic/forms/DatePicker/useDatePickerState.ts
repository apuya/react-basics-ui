import { useCallback, useId, useRef, useState } from 'react';
import type {
  DatePickerProps,
  DatePickerContextValue,
  DateRange,
  DatePickerVariant,
  DatePickerSize,
} from './DatePicker.types';

// =============================================================================
// TYPES
// =============================================================================

export interface UseDatePickerStateProps
  extends Omit<DatePickerProps, 'children'> {}

// =============================================================================
// HOOK
// =============================================================================

/**
 * useDatePickerState - Core state management hook for DatePicker compound component.
 *
 * Extracted from DatePickerRoot to follow the compound component pattern.
 * Handles all state logic allowing DatePickerRoot to be a simple wrapper.
 *
 * **Managed State:**
 * - Open state (controlled via `open`/`onOpenChange` or uncontrolled)
 * - Single date selection (controlled via `value`/`onChange` or uncontrolled)
 * - Date range selection (controlled via `rangeValue`/`onRangeChange` or uncontrolled)
 * - Display month/year for calendar navigation
 * - Hover state for range selection preview
 * - Refs and IDs for accessibility (trigger, content, ARIA attributes)
 *
 * @param props - DatePicker configuration options
 * @returns DatePickerContextValue to be provided to sub-components
 *
 * @example
 * ```tsx
 * // Used internally by DatePickerRoot
 * const contextValue = useDatePickerState({
 *   variant: 'single',
 *   value: selectedDate,
 *   onChange: setSelectedDate,
 * });
 *
 * // For custom implementations
 * import { useDatePickerState, DatePickerContext } from 'react-basics-ui';
 *
 * function CustomDatePicker(props) {
 *   const state = useDatePickerState(props);
 *   return (
 *     <DatePickerContext.Provider value={state}>
 *       {/* custom UI *\/}
 *     </DatePickerContext.Provider>
 *   );
 * }
 * ```
 */
export function useDatePickerState({
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
}: UseDatePickerStateProps): DatePickerContextValue {
  // ===========================================================================
  // IDS & REFS
  // ===========================================================================

  const id = useId();
  const triggerId = `datepicker-trigger-${id}`;
  const contentId = `datepicker-content-${id}`;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ===========================================================================
  // OPEN STATE
  // ===========================================================================

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

  // ===========================================================================
  // SINGLE DATE STATE
  // ===========================================================================

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

  // ===========================================================================
  // DATE RANGE STATE
  // ===========================================================================

  const [internalRange, setInternalRange] =
    useState<DateRange>(defaultRangeValue);
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

  // ===========================================================================
  // HOVER STATE (for range preview)
  // ===========================================================================

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // ===========================================================================
  // DISPLAY STATE (month/year navigation)
  // ===========================================================================

  const now = new Date();
  const [displayMonth, setDisplayMonth] = useState(
    selectedDate?.getMonth() ??
      selectedRange.start?.getMonth() ??
      now.getMonth()
  );
  const [displayYear, setDisplayYear] = useState(
    selectedDate?.getFullYear() ??
      selectedRange.start?.getFullYear() ??
      now.getFullYear()
  );

  // Secondary display for dual calendar (next month)
  const secondaryDisplayMonth = displayMonth === 11 ? 0 : displayMonth + 1;
  const secondaryDisplayYear =
    displayMonth === 11 ? displayYear + 1 : displayYear;

  // ===========================================================================
  // HANDLERS
  // ===========================================================================

  const onConfirm = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onCancel = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // ===========================================================================
  // CONTEXT VALUE
  // ===========================================================================

  // Return directly - useMemo with 24 dependencies defeats its purpose.
  // Context updates when state changes, which is expected behavior.
  return {
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
  };
}

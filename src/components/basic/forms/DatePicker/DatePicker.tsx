import { memo } from 'react';
import { DatePickerContext } from './DatePickerContext';
import { useDatePickerState } from './useDatePickerState';
import { WRAPPER_CLASSES } from './DatePicker.styles';
import type { DatePickerProps } from './DatePicker.types';

// =============================================================================
// SUB-COMPONENT IMPORTS
// =============================================================================
import { DatePickerTrigger } from './DatePickerTrigger';
import { DatePickerContent } from './DatePickerContent';
import { DatePickerConfirmation } from './DatePickerConfirmation';
import { DatePickerPresets } from './DatePickerPresets';
import { DatePickerCell } from './DatePickerCell';
import { Calendar } from './Calendar';
import { CalendarHeader } from './CalendarHeader';

// =============================================================================
// ROOT COMPONENT
// =============================================================================

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
 *   <DatePicker.Trigger placeholder="Select date" />
 *   <DatePicker.Content>
 *     <DatePicker.Calendar />
 *   </DatePicker.Content>
 * </DatePicker>
 *
 * // Range with presets
 * <DatePicker variant="double-presets" onRangeChange={setRange}>
 *   <DatePicker.Trigger placeholder="Select range" />
 *   <DatePicker.Content>
 *     <DatePicker.Presets />
 *     <div>
 *       <DatePicker.Calendar variant="dual" />
 *       <DatePicker.Confirmation />
 *     </div>
 *   </DatePicker.Content>
 * </DatePicker>
 * ```
 */
const DatePickerRoot = memo(function DatePickerRoot({
  children,
  variant = 'single',
  size = 'default',
  disabled = false,
  error = false,
  ...stateProps
}: DatePickerProps) {
  const contextValue = useDatePickerState({
    variant,
    size,
    disabled,
    error,
    ...stateProps,
  });

  return (
    <DatePickerContext.Provider value={contextValue}>
      <div
        className={WRAPPER_CLASSES}
        data-variant={variant}
        data-size={size}
        data-disabled={disabled || undefined}
        data-error={error || undefined}
        data-open={contextValue.isOpen || undefined}
      >
        {children}
      </div>
    </DatePickerContext.Provider>
  );
});

DatePickerRoot.displayName = 'DatePicker';

// =============================================================================
// COMPOUND COMPONENT EXPORT
// =============================================================================

/**
 * DatePicker compound component with attached sub-components.
 * 
 * @example
 * ```tsx
 * <DatePicker variant="single">
 *   <DatePicker.Trigger placeholder="Select date" />
 *   <DatePicker.Content>
 *     <DatePicker.Calendar />
 *   </DatePicker.Content>
 * </DatePicker>
 * ```
 */
export const DatePicker = Object.assign(DatePickerRoot, {
  Trigger: DatePickerTrigger,
  Content: DatePickerContent,
  Confirmation: DatePickerConfirmation,
  Presets: DatePickerPresets,
  Cell: DatePickerCell,
  Calendar: Calendar,
  CalendarHeader: CalendarHeader,
});

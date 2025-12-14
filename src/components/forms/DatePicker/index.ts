/**
 * DatePicker - Compound component for date and date range selection.
 *
 * Exports:
 * - `DatePicker` - Main compound component with attached sub-components
 * - Individual sub-components for direct imports
 * - `useDatePickerState` hook for custom implementations
 * - `useDatePickerContext` for accessing context in custom sub-components
 * - All TypeScript types
 *
 * @example
 * ```tsx
 * import { DatePicker } from 'react-basics-ui';
 *
 * <DatePicker variant="single" onChange={setDate}>
 *   <DatePicker.Trigger placeholder="Select date" />
 *   <DatePicker.Content>
 *     <DatePicker.Calendar />
 *   </DatePicker.Content>
 * </DatePicker>
 * ```
 *
 * @module DatePicker
 */

// =============================================================================
// MAIN COMPOUND COMPONENT
// =============================================================================
export { DatePicker } from './DatePicker';

// =============================================================================
// INDIVIDUAL SUB-COMPONENTS (for direct imports if needed)
// =============================================================================
export { DatePickerTrigger } from './DatePickerTrigger';
export { DatePickerContent } from './DatePickerContent';
export { DatePickerConfirmation } from './DatePickerConfirmation';
export { DatePickerPresets, DEFAULT_PRESETS, generateQuarterPresets } from './DatePickerPresets';
export { DatePickerCell } from './DatePickerCell';
export { Calendar } from './Calendar';
export { CalendarHeader } from './CalendarHeader';

// =============================================================================
// HOOKS (for custom implementations)
// =============================================================================
export { useDatePickerState } from './useDatePickerState';

// =============================================================================
// CONTEXT (for custom implementations)
// =============================================================================
export { DatePickerContext, useDatePickerContext } from './DatePickerContext';

// =============================================================================
// TYPES
// =============================================================================
export type {
  DatePickerVariant,
  DatePickerSize,
  DateRange,
  PresetDateRange,
  CellState,
  CalendarVariant,
  DatePickerCellProps,
  CalendarProps,
  CalendarHeaderProps,
  DatePickerConfirmationProps,
  DatePickerPresetsProps,
  DatePickerProps,
  DatePickerTriggerProps,
  DatePickerContentProps,
  DatePickerContextValue,
} from './DatePicker.types';

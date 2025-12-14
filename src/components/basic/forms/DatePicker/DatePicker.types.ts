import type { ComponentPropsWithoutRef, ReactNode, RefObject } from 'react';

// ============================================================================
// Core Types
// ============================================================================

export type DatePickerVariant = 
  | 'single'           // Single calendar, single date
  | 'single-range'     // Single calendar, date range
  | 'double-range'     // Double calendar, date range
  | 'double-presets';  // Double calendar, date range with presets

export type DatePickerSize = 'small' | 'default' | 'large';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface PresetDateRange {
  label: string;
  getValue: () => DateRange;
  /** Optional: marks this preset as starting a new category (adds divider before it) */
  dividerBefore?: boolean;
}

// ============================================================================
// Cell Types
// ============================================================================

export type CellState = 
  | 'default'
  | 'selected'
  | 'range-start'
  | 'range-end'
  | 'in-range'
  | 'today'
  | 'disabled'
  | 'outside-month'
  | 'header';

export interface DatePickerCellProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  /** The date this cell represents (required for non-header cells) */
  date?: Date;
  /** Label text for header cells (e.g., 'Su', 'Mo', 'Tu') */
  label?: string;
  /** Visual state of the cell */
  state?: CellState;
  /** Whether the cell is outside the current month */
  isOutsideMonth?: boolean;
  /** Whether this is today's date */
  isToday?: boolean;
}

// ============================================================================
// Calendar Header Types
// ============================================================================

export interface CalendarHeaderProps extends ComponentPropsWithoutRef<'div'> {
  /** Current month being displayed (0-11) */
  month: number;
  /** Current year being displayed */
  year: number;
  /** Callback when previous month is clicked */
  onPrevMonth?: () => void;
  /** Callback when next month is clicked */
  onNextMonth?: () => void;
  /** Callback when month is selected from dropdown */
  onMonthSelect?: (month: number) => void;
  /** Callback when year is selected from dropdown */
  onYearSelect?: (year: number) => void;
  /** Whether to show month/year dropdowns */
  showDropdowns?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Hide navigation buttons (useful for second calendar in double view) */
  hideNavigation?: boolean;
  /** Which navigation buttons to show: 'both' | 'leading' | 'trailing' */
  navigationPosition?: 'both' | 'leading' | 'trailing';
}

// ============================================================================
// Calendar Types
// ============================================================================

export interface CalendarProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Calendar variant: 'single' for one calendar, 'dual' for two side-by-side */
  variant?: 'single' | 'dual';
  /** Currently selected date (single mode) */
  selectedDate?: Date | null;
  /** Currently selected date range (range mode) */
  selectedRange?: DateRange;
  /** The month to display (0-11) */
  displayMonth?: number;
  /** The year to display */
  displayYear?: number;
  /** Callback when a date is selected */
  onDateSelect?: (date: Date) => void;
  /** External callback for previous month navigation (for controlled navigation) */
  onPrevMonth?: () => void;
  /** External callback for next month navigation (for controlled navigation) */
  onNextMonth?: () => void;
  /** Whether in range selection mode */
  isRangeMode?: boolean;
  /** Whether this is a secondary calendar (for double calendar layouts) - internal use */
  isSecondary?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Dates that should be disabled */
  disabledDates?: Date[];
  /** First day of week (0 = Sunday, 1 = Monday, etc.) */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Custom day labels */
  dayLabels?: string[];
  /** Custom month labels */
  monthLabels?: string[];
  /** Hide navigation in header */
  hideNavigation?: boolean;
  /** Which navigation buttons to show: 'both' | 'leading' | 'trailing' */
  navigationPosition?: 'both' | 'leading' | 'trailing';
}

export type CalendarVariant = 'single' | 'dual';

// ============================================================================
// Presets Types
// ============================================================================

export interface DatePickerPresetsProps extends ComponentPropsWithoutRef<'div'> {
  /** Preset options to display */
  presets?: PresetDateRange[];
  /** Callback when a preset is selected */
  onPresetSelect?: (range: DateRange) => void;
  /** Currently selected preset label */
  selectedPreset?: string;
  /** 
   * Variant for styling: 
   * - 'positioned': Uses absolute positioning (for use within a wrapper)
   * - 'static': Uses natural flow (default, standalone use)
   */
  variant?: 'positioned' | 'static';
}

// ============================================================================
// Confirmation Types
// ============================================================================

export interface DatePickerConfirmationProps extends ComponentPropsWithoutRef<'div'> {
  /** Start date input value (formatted string) */
  startDateValue?: string;
  /** End date input value (formatted string) */
  endDateValue?: string;
  /** Callback when start date input changes */
  onStartDateChange?: (value: string) => void;
  /** Callback when end date input changes */
  onEndDateChange?: (value: string) => void;
  /** Placeholder for start date input */
  startDatePlaceholder?: string;
  /** Placeholder for end date input */
  endDatePlaceholder?: string;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
  /** Callback when apply/confirm is clicked */
  onApply?: () => void;
  /** Cancel button text */
  cancelText?: string;
  /** Apply button text */
  applyText?: string;
  /** Whether apply button is disabled */
  applyDisabled?: boolean;
  /** Stack inputs vertically (for single-range variant) */
  stacked?: boolean;
}

// ============================================================================
// Trigger Types
// ============================================================================

export interface DatePickerTriggerProps extends ComponentPropsWithoutRef<'button'> {
  /** Placeholder text when no date selected */
  placeholder?: string;
  /** Format function for displaying the date */
  formatDate?: (date: Date) => string;
  /** Format function for displaying the date range */
  formatRange?: (range: DateRange) => string;
}

// ============================================================================
// Content Types
// ============================================================================

export interface DatePickerContentProps extends ComponentPropsWithoutRef<'div'> {
  /** Position relative to trigger */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Alignment relative to trigger */
  align?: 'start' | 'center' | 'end';
}

// ============================================================================
// Main DatePicker Types
// ============================================================================

export interface DatePickerProps {
  children: ReactNode;
  /** Variant of the date picker */
  variant?: DatePickerVariant;
  /** Initial open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Selected date (single mode, controlled) */
  value?: Date | null;
  /** Default selected date (single mode, uncontrolled) */
  defaultValue?: Date | null;
  /** Selected date range (range mode, controlled) */
  rangeValue?: DateRange;
  /** Default selected date range (range mode, uncontrolled) */
  defaultRangeValue?: DateRange;
  /** Callback when date changes (single mode) */
  onChange?: (date: Date | null) => void;
  /** Callback when date range changes (range mode) */
  onRangeChange?: (range: DateRange) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Dates that should be disabled */
  disabledDates?: Date[];
  /** First day of week (0 = Sunday, 1 = Monday) */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Size of the date picker */
  size?: DatePickerSize;
  /** Whether the date picker is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Close on date select (single mode only) */
  closeOnSelect?: boolean;
}

// ============================================================================
// Context Types
// ============================================================================

export interface DatePickerContextValue {
  // State
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  variant: DatePickerVariant;
  size: DatePickerSize;
  disabled: boolean;
  error: boolean;
  
  // Single date
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  
  // Date range
  selectedRange: DateRange;
  setSelectedRange: (range: DateRange) => void;
  
  // Hover state for range preview
  hoveredDate: Date | null;
  setHoveredDate: (date: Date | null) => void;
  
  // Display state
  displayMonth: number;
  displayYear: number;
  setDisplayMonth: (month: number) => void;
  setDisplayYear: (year: number) => void;
  
  // Secondary display state (for double calendar)
  secondaryDisplayMonth: number;
  secondaryDisplayYear: number;
  
  // Constraints
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  
  // Refs
  triggerRef: RefObject<HTMLButtonElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  
  // IDs for ARIA
  contentId: string;
  triggerId: string;
  
  // Callbacks
  closeOnSelect: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

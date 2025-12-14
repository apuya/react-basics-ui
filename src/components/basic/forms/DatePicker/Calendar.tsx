import { cn } from '@/lib/cn';
import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import type { CalendarProps, CellState, DateRange } from './DatePicker.types';
import { DatePickerCell } from './DatePickerCell';
import { CalendarHeader } from './CalendarHeader';
import {
  CALENDAR_BASE_CLASSES,
  CALENDAR_BASE_STYLE,
  CALENDAR_GRID_CLASSES,
  CALENDAR_GRID_STYLE,
  CALENDAR_WEEKDAY_HEADER_CLASSES,
  CALENDAR_WEEKDAY_HEADER_STYLE,
  DUAL_CALENDAR_CLASSES,
  DUAL_CALENDAR_STYLE,
} from './DatePicker.styles';

const DEFAULT_DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// ============================================================================
// Utility Functions
// ============================================================================

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isDateInRange(date: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false;
  const time = date.getTime();
  return time > range.start.getTime() && time < range.end.getTime();
}

function isDateDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[]
): boolean {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  if (disabledDates?.some((d) => isSameDay(d, date))) return true;
  return false;
}

// ============================================================================
// Calendar Component
// ============================================================================

/**
 * DatePicker.Calendar - Calendar grid for date selection.
 *
 * Supports single and dual calendar layouts with month/year navigation.
 * Handles single date and date range selection modes.
 *
 * @example
 * ```tsx
 * // Single calendar
 * <DatePicker.Calendar
 *   selectedDate={date}
 *   onDateSelect={setDate}
 * />
 *
 * // Dual calendar for range selection
 * <DatePicker.Calendar
 *   variant="dual"
 *   selectedRange={range}
 *   onRangeSelect={setRange}
 * />
 * ```
 */

/**
 * SingleCalendarGrid - Internal component for a single calendar grid
 */
const SingleCalendarGrid = memo(
  forwardRef<HTMLDivElement, CalendarProps & { today: Date }>(
    (
      {
        selectedDate,
        selectedRange = { start: null, end: null },
        displayMonth: controlledMonth,
        displayYear: controlledYear,
        onDateSelect,
        onPrevMonth: externalPrevMonth,
        onNextMonth: externalNextMonth,
        isRangeMode = false,
        isSecondary = false,
        minDate,
        maxDate,
        disabledDates,
        firstDayOfWeek = 0,
        dayLabels = DEFAULT_DAY_LABELS,
        hideNavigation = false,
        navigationPosition = 'both',
        className,
        today,
        ...props
      },
      ref
    ) => {
      // Internal state for uncontrolled mode
      const [internalMonth, setInternalMonth] = useState(() => {
        if (controlledMonth !== undefined) return controlledMonth;
        const baseMonth = today.getMonth();
        return isSecondary ? (baseMonth === 11 ? 0 : baseMonth + 1) : baseMonth;
      });
      const [internalYear, setInternalYear] = useState(() => {
        if (controlledYear !== undefined) return controlledYear;
        const baseYear = today.getFullYear();
        return isSecondary && today.getMonth() === 11 ? baseYear + 1 : baseYear;
      });

      // Use controlled values if provided
      const displayMonth = controlledMonth ?? internalMonth;
      const displayYear = controlledYear ?? internalYear;

      // Hover state for range preview
      const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

      // Reorder day labels based on firstDayOfWeek
      const reorderedDayLabels = useMemo(() => {
        const labels = [...dayLabels];
        return [...labels.slice(firstDayOfWeek), ...labels.slice(0, firstDayOfWeek)];
      }, [dayLabels, firstDayOfWeek]);

      // Generate calendar grid data
      const calendarDays = useMemo(() => {
        const days: { date: Date; isOutsideMonth: boolean }[] = [];
        const daysInMonth = getDaysInMonth(displayYear, displayMonth);
        const firstDay = getFirstDayOfMonth(displayYear, displayMonth);
        
        // Adjust for first day of week
        const adjustedFirstDay = (firstDay - firstDayOfWeek + 7) % 7;
        
        // Previous month days
        const prevMonth = displayMonth === 0 ? 11 : displayMonth - 1;
        const prevYear = displayMonth === 0 ? displayYear - 1 : displayYear;
        const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
        
        for (let i = adjustedFirstDay - 1; i >= 0; i--) {
          days.push({
            date: new Date(prevYear, prevMonth, daysInPrevMonth - i),
            isOutsideMonth: true,
          });
        }
        
        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
          days.push({
            date: new Date(displayYear, displayMonth, day),
            isOutsideMonth: false,
          });
        }
        
        // Next month days (fill to complete rows)
        const nextMonth = displayMonth === 11 ? 0 : displayMonth + 1;
        const nextYear = displayMonth === 11 ? displayYear + 1 : displayYear;
        const totalCells = Math.ceil(days.length / 7) * 7;
        const remaining = totalCells - days.length;
        
        for (let day = 1; day <= remaining; day++) {
          days.push({
            date: new Date(nextYear, nextMonth, day),
            isOutsideMonth: true,
          });
        }
        
        return days;
      }, [displayYear, displayMonth, firstDayOfWeek]);

      // Determine cell state
      const getCellState = useCallback(
        (date: Date, isOutsideMonth: boolean): CellState => {
          if (isOutsideMonth) return 'outside-month';
          if (isDateDisabled(date, minDate, maxDate, disabledDates)) return 'disabled';
          
          if (isRangeMode) {
            const { start, end } = selectedRange;
            if (isSameDay(date, start)) return 'range-start';
            if (isSameDay(date, end)) return 'range-end';
            if (isDateInRange(date, selectedRange)) return 'in-range';
            
            // Preview range on hover
            if (start && !end && hoveredDate) {
              const previewRange: DateRange = {
                start: start < hoveredDate ? start : hoveredDate,
                end: start < hoveredDate ? hoveredDate : start,
              };
              if (isDateInRange(date, previewRange)) return 'in-range';
              if (isSameDay(date, hoveredDate)) return 'range-end';
            }
          } else {
            if (isSameDay(date, selectedDate ?? null)) return 'selected';
          }
          
          return 'default';
        },
        [isRangeMode, selectedDate, selectedRange, hoveredDate, minDate, maxDate, disabledDates]
      );

      // Navigation handlers
      const handlePrevMonth = useCallback(() => {
        if (externalPrevMonth) {
          externalPrevMonth();
        } else if (controlledMonth === undefined) {
          setInternalMonth((prev) => (prev === 0 ? 11 : prev - 1));
          if (internalMonth === 0) {
            setInternalYear((prev) => prev - 1);
          }
        }
      }, [externalPrevMonth, controlledMonth, internalMonth]);

      const handleNextMonth = useCallback(() => {
        if (externalNextMonth) {
          externalNextMonth();
        } else if (controlledMonth === undefined) {
          setInternalMonth((prev) => (prev === 11 ? 0 : prev + 1));
          if (internalMonth === 11) {
            setInternalYear((prev) => prev + 1);
          }
        }
      }, [externalNextMonth, controlledMonth, internalMonth]);

      const handleMonthSelect = useCallback(
        (month: number) => {
          if (controlledMonth === undefined) {
            setInternalMonth(month);
          }
        },
        [controlledMonth]
      );

      const handleYearSelect = useCallback(
        (year: number) => {
          if (controlledYear === undefined) {
            setInternalYear(year);
          }
        },
        [controlledYear]
      );

      const calendarClasses = useMemo(
        () => cn(CALENDAR_BASE_CLASSES, className),
        [className]
      );

      return (
        <div ref={ref} className={calendarClasses} style={CALENDAR_BASE_STYLE} {...props}>
          {/* Header */}
          <CalendarHeader
            month={displayMonth}
            year={displayYear}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onMonthSelect={handleMonthSelect}
            onYearSelect={handleYearSelect}
            minDate={minDate}
            maxDate={maxDate}
            hideNavigation={hideNavigation}
            navigationPosition={navigationPosition}
          />

          {/* Weekday Labels */}
          <div className={CALENDAR_WEEKDAY_HEADER_CLASSES} style={CALENDAR_WEEKDAY_HEADER_STYLE}>
            {reorderedDayLabels.map((label) => (
              <DatePickerCell
                key={label}
                state="header"
                label={label}
              />
            ))}
          </div>

          {/* Calendar Grid */}
          <div className={CALENDAR_GRID_CLASSES} style={CALENDAR_GRID_STYLE} role="grid">
            {calendarDays.map(({ date, isOutsideMonth }) => (
              <DatePickerCell
                key={date.toISOString()}
                date={date}
                state={getCellState(date, isOutsideMonth)}
                isOutsideMonth={isOutsideMonth}
                isToday={isSameDay(date, today)}
                onClick={() => onDateSelect?.(date)}
                onMouseEnter={() => isRangeMode && setHoveredDate(date)}
                onMouseLeave={() => isRangeMode && setHoveredDate(null)}
              />
            ))}
          </div>
        </div>
      );
    }
  )
);

SingleCalendarGrid.displayName = 'SingleCalendarGrid';

/**
 * Calendar - The calendar component
 * 
 * Supports two variants:
 * - 'single' (default): Single calendar grid
 * - 'dual': Two calendars side-by-side for range selection
 */
export const Calendar = memo(
  forwardRef<HTMLDivElement, CalendarProps>(
    (
      {
        variant = 'single',
        selectedDate,
        selectedRange = { start: null, end: null },
        displayMonth: controlledMonth,
        displayYear: controlledYear,
        onDateSelect,
        onPrevMonth: externalPrevMonth,
        onNextMonth: externalNextMonth,
        isRangeMode = false,
        isSecondary = false,
        minDate,
        maxDate,
        disabledDates,
        firstDayOfWeek = 0,
        dayLabels = DEFAULT_DAY_LABELS,
        hideNavigation = false,
        navigationPosition = 'both',
        className,
        ...props
      },
      ref
    ) => {
      const today = useMemo(() => new Date(), []);

      // For dual variant, manage the left calendar's month/year
      const [leftMonth, setLeftMonth] = useState(controlledMonth ?? today.getMonth());
      const [leftYear, setLeftYear] = useState(controlledYear ?? today.getFullYear());

      // Right calendar is always one month ahead (for dual variant)
      const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;
      const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;

      // Navigation handlers for dual variant
      const handleDualPrevMonth = useCallback(() => {
        setLeftMonth((prev) => {
          if (prev === 0) {
            setLeftYear((y) => y - 1);
            return 11;
          }
          return prev - 1;
        });
      }, []);

      const handleDualNextMonth = useCallback(() => {
        setLeftMonth((prev) => {
          if (prev === 11) {
            setLeftYear((y) => y + 1);
            return 0;
          }
          return prev + 1;
        });
      }, []);

      // Dual variant: Two calendars side-by-side
      if (variant === 'dual') {
        const containerClasses = cn(DUAL_CALENDAR_CLASSES, className);
        
        return (
          <div ref={ref} className={containerClasses} style={DUAL_CALENDAR_STYLE} {...props}>
            {/* Left Calendar - Leading navigation only */}
            <SingleCalendarGrid
              selectedRange={selectedRange}
              displayMonth={leftMonth}
              displayYear={leftYear}
              onDateSelect={onDateSelect}
              isRangeMode
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              firstDayOfWeek={firstDayOfWeek}
              dayLabels={dayLabels}
              navigationPosition="leading"
              onPrevMonth={handleDualPrevMonth}
              today={today}
            />

            {/* Right Calendar - Trailing navigation only */}
            <SingleCalendarGrid
              selectedRange={selectedRange}
              displayMonth={rightMonth}
              displayYear={rightYear}
              onDateSelect={onDateSelect}
              isRangeMode
              isSecondary
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              firstDayOfWeek={firstDayOfWeek}
              dayLabels={dayLabels}
              navigationPosition="trailing"
              onNextMonth={handleDualNextMonth}
              today={today}
            />
          </div>
        );
      }

      // Single variant: Original calendar behavior
      return (
        <SingleCalendarGrid
          ref={ref}
          selectedDate={selectedDate}
          selectedRange={selectedRange}
          displayMonth={controlledMonth}
          displayYear={controlledYear}
          onDateSelect={onDateSelect}
          onPrevMonth={externalPrevMonth}
          onNextMonth={externalNextMonth}
          isRangeMode={isRangeMode}
          isSecondary={isSecondary}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          firstDayOfWeek={firstDayOfWeek}
          dayLabels={dayLabels}
          hideNavigation={hideNavigation}
          navigationPosition={navigationPosition}
          className={className}
          today={today}
          {...props}
        />
      );
    }
  )
);

Calendar.displayName = 'DatePicker.Calendar';

import { cn } from '@/lib/cn';
import { forwardRef, memo, useCallback, useMemo } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import type { CalendarHeaderProps } from './DatePicker.types';
import {
  HEADER_BASE_CLASSES,
  HEADER_TITLE_CLASSES,
  HEADER_TITLE_WRAPPER_CLASSES,
  HEADER_SELECT_CLASSES,
} from './DatePicker.styles';
import { Button } from '@/components/forms/Button';

const DEFAULT_MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * CalendarHeader - Navigation header for the calendar
 * 
 * Displays:
 * - Previous/Next month navigation buttons
 * - Current month and year (optionally as dropdowns)
 */
export const CalendarHeader = memo(
  forwardRef<HTMLDivElement, CalendarHeaderProps>(
    (
      {
        month,
        year,
        onPrevMonth,
        onNextMonth,
        onMonthSelect,
        onYearSelect,
        showDropdowns = false,
        minDate,
        maxDate,
        hideNavigation = false,
        navigationPosition = 'both',
        className,
        ...props
      },
      ref
    ) => {
      const monthLabels = DEFAULT_MONTH_LABELS;

      // Generate year range for dropdown
      const yearRange = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const minYear = minDate?.getFullYear() ?? currentYear - 100;
        const maxYear = maxDate?.getFullYear() ?? currentYear + 10;
        const years: number[] = [];
        for (let y = minYear; y <= maxYear; y++) {
          years.push(y);
        }
        return years;
      }, [minDate, maxDate]);

      // Check if navigation should be disabled
      const isPrevDisabled = useMemo(() => {
        if (!minDate) return false;
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        return prevYear < minDate.getFullYear() || 
          (prevYear === minDate.getFullYear() && prevMonth < minDate.getMonth());
      }, [month, year, minDate]);

      const isNextDisabled = useMemo(() => {
        if (!maxDate) return false;
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        return nextYear > maxDate.getFullYear() || 
          (nextYear === maxDate.getFullYear() && nextMonth > maxDate.getMonth());
      }, [month, year, maxDate]);

      const handleMonthChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
          onMonthSelect?.(parseInt(e.target.value, 10));
        },
        [onMonthSelect]
      );

      const handleYearChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
          onYearSelect?.(parseInt(e.target.value, 10));
        },
        [onYearSelect]
      );

      const headerClasses = useMemo(
        () => cn(HEADER_BASE_CLASSES, className),
        [className]
      );

      const showLeading = !hideNavigation && (navigationPosition === 'both' || navigationPosition === 'leading');
      const showTrailing = !hideNavigation && (navigationPosition === 'both' || navigationPosition === 'trailing');

      return (
        <div ref={ref} className={headerClasses} {...props}>
          {/* Previous Month Button */}
          {showLeading && (
            <Button
              variant="tabs"
              size="small"
              onClick={onPrevMonth}
              disabled={isPrevDisabled}
              aria-label="Previous month"
              className="!p-1"
            >
              <BiChevronLeft className="size-5" />
            </Button>
          )}

          {/* Month/Year Display */}
          <div className={HEADER_TITLE_WRAPPER_CLASSES}>
            {showDropdowns ? (
              <>
                <select
                  value={month}
                  onChange={handleMonthChange}
                  className={HEADER_SELECT_CLASSES}
                  aria-label="Select month"
                >
                  {monthLabels.map((label, idx) => (
                    <option key={label} value={idx}>
                      {label}
                    </option>
                  ))}
                </select>
                <select
                  value={year}
                  onChange={handleYearChange}
                  className={HEADER_SELECT_CLASSES}
                  aria-label="Select year"
                >
                  {yearRange.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <span className={HEADER_TITLE_CLASSES}>
                {monthLabels[month]} {year}
              </span>
            )}
          </div>

          {/* Next Month Button */}
          {showTrailing && (
            <Button
              variant="tabs"
              size="small"
              onClick={onNextMonth}
              disabled={isNextDisabled}
              aria-label="Next month"
              className="!p-1"
            >
              <BiChevronRight className="size-5" />
            </Button>
          )}
        </div>
      );
    }
  )
);

CalendarHeader.displayName = 'DatePicker.CalendarHeader';

import { cn } from '@/lib/cn';
import { forwardRef, memo, useCallback, useMemo, type MouseEvent } from 'react';
import type { DatePickerCellProps } from './DatePicker.types';
import {
  CELL_BASE_CLASSES,
  CELL_STATE_STYLES,
  CELL_COMBINED_STYLES,
} from './DatePicker.styles';

/**
 * DatePickerCell - Individual cell in the calendar grid
 * 
 * Handles different visual states:
 * - header: Static weekday label (Su, Mo, Tu, etc.) - non-interactive
 * - default: Normal selectable day
 * - selected: Single date selection
 * - range-start: Start of date range
 * - range-end: End of date range
 * - in-range: Days between range start and end
 * - today: Current date highlight
 * - disabled: Non-selectable day
 * - outside-month: Days from previous/next month
 */
export const DatePickerCell = memo(
  forwardRef<HTMLButtonElement | HTMLDivElement, DatePickerCellProps>(
    (
      {
        date,
        label,
        state = 'default',
        isOutsideMonth = false,
        isToday = false,
        className,
        onClick,
        onMouseEnter,
        disabled,
        ...props
      },
      ref
    ) => {
      const isHeader = state === 'header';

      const cellClasses = useMemo(() => {
        const states: string[] = [CELL_BASE_CLASSES];

        // Add state-specific styles
        if (isHeader) {
          states.push(CELL_STATE_STYLES.header);
        } else if (disabled || state === 'disabled') {
          states.push(CELL_STATE_STYLES.disabled);
        } else if (isOutsideMonth || state === 'outside-month') {
          states.push(CELL_STATE_STYLES['outside-month']);
        } else {
          states.push(CELL_STATE_STYLES[state] || CELL_STATE_STYLES.default);
        }

        // Today indicator (can combine with other states)
        if (isToday && state !== 'selected' && state !== 'range-start' && state !== 'range-end' && !isHeader) {
          states.push(CELL_STATE_STYLES.today);
        }

        return cn(...states, className);
      }, [state, isOutsideMonth, isToday, disabled, isHeader, className]);

      // Get pre-computed style for state
      const cellStyle = useMemo(() => {
        const styleKey = isHeader ? 'header' : (state as keyof typeof CELL_COMBINED_STYLES);
        return CELL_COMBINED_STYLES[styleKey] || CELL_COMBINED_STYLES.default;
      }, [state, isHeader]);

      const handleClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
          if (disabled || state === 'disabled' || isHeader) return;
          onClick?.(e);
        },
        [disabled, state, isHeader, onClick]
      );

      const handleMouseEnter = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
          if (disabled || state === 'disabled' || isHeader) return;
          onMouseEnter?.(e);
        },
        [disabled, state, isHeader, onMouseEnter]
      );

      // Header cell (weekday label) - render as div with typography from tokens
      if (isHeader) {
        // Extract only div-compatible props for header
        const { type, form, formAction, formEncType, formMethod, formNoValidate, formTarget, value, ...divProps } = props as Record<string, unknown>;
        
        return (
          <div
            ref={ref as React.Ref<HTMLDivElement>}
            className={cellClasses}
            style={cellStyle}
            role="columnheader"
            aria-label={label}
            {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
          >
            {label}
          </div>
        );
      }

      // Date cell - render as button
      const dayNumber = date?.getDate();

      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          className={cellClasses}
          style={cellStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          disabled={disabled || state === 'disabled'}
          aria-label={date?.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          aria-selected={state === 'selected' || state === 'range-start' || state === 'range-end'}
          aria-current={isToday ? 'date' : undefined}
          tabIndex={disabled || state === 'disabled' ? -1 : 0}
          {...props}
        >
          {dayNumber}
        </button>
      );
    }
  )
);

DatePickerCell.displayName = 'DatePicker.Cell';

import { cn } from '@/lib/cn';
import { forwardRef, memo } from 'react';
import type { DatePickerConfirmationProps } from './DatePicker.types';
import { Button } from '../Button';
import { Input } from '../Input';
import { Icon } from '../../utility/Icon';
import { HiArrowNarrowRight } from 'react-icons/hi';
import {
  CONFIRMATION_BASE_CLASSES,
  CONFIRMATION_BASE_STYLE,
  CONFIRMATION_STACKED_CLASSES,
  CONFIRMATION_STACKED_STYLE,
  CONFIRMATION_DATE_INPUTS_CLASSES,
  CONFIRMATION_DATE_INPUTS_STYLE,
  CONFIRMATION_DATE_INPUTS_STACKED_CLASSES,
  CONFIRMATION_DATE_INPUTS_STACKED_STYLE,
  CONFIRMATION_DATE_INPUT_CLASSES,
  CONFIRMATION_DATE_INPUT_STACKED_CLASSES,
  CONFIRMATION_BUTTONS_CLASSES,
  CONFIRMATION_BUTTONS_STYLE,
  CONFIRMATION_BUTTONS_STACKED_CLASSES,
  CONFIRMATION_BUTTONS_STACKED_STYLE,
} from './DatePicker.styles';

/**
 * DatePicker.Confirmation - Footer with date inputs and action buttons for range selection.
 *
 * Displays editable start/end date inputs and Cancel/Apply buttons.
 * Supports `stacked` layout for narrow containers (single-range variant).
 *
 * @example
 * ```tsx
 * <DatePicker.Content>
 *   <DatePicker.Calendar variant="dual" />
 *   <DatePicker.Confirmation
 *     startDateValue={formatDate(range.start)}
 *     endDateValue={formatDate(range.end)}
 *     onCancel={handleCancel}
 *     onApply={handleApply}
 *   />
 * </DatePicker.Content>
 * ```
 */
export const DatePickerConfirmation = memo(
  forwardRef<HTMLDivElement, DatePickerConfirmationProps>(function DatePickerConfirmation(
    {
      startDateValue = '',
      endDateValue = '',
      onStartDateChange,
      onEndDateChange,
      startDatePlaceholder = 'Start date',
      endDatePlaceholder = 'End date',
      onCancel,
      onApply,
      cancelText = 'Cancel',
      applyText = 'Apply',
      applyDisabled = false,
      stacked = false,
      className,
      ...rest
    },
    ref
  ) {
    // Choose classes based on stacked prop
    const containerClasses = stacked ? CONFIRMATION_STACKED_CLASSES : CONFIRMATION_BASE_CLASSES;
    const containerStyle = stacked ? CONFIRMATION_STACKED_STYLE : CONFIRMATION_BASE_STYLE;
    const inputsClasses = stacked ? CONFIRMATION_DATE_INPUTS_STACKED_CLASSES : CONFIRMATION_DATE_INPUTS_CLASSES;
    const inputsStyle = stacked ? CONFIRMATION_DATE_INPUTS_STACKED_STYLE : CONFIRMATION_DATE_INPUTS_STYLE;
    const inputWrapperClass = stacked ? CONFIRMATION_DATE_INPUT_STACKED_CLASSES : CONFIRMATION_DATE_INPUT_CLASSES;
    const buttonsClasses = stacked ? CONFIRMATION_BUTTONS_STACKED_CLASSES : CONFIRMATION_BUTTONS_CLASSES;
    const buttonsStyle = stacked ? CONFIRMATION_BUTTONS_STACKED_STYLE : CONFIRMATION_BUTTONS_STYLE;

    return (
      <div
        ref={ref}
        className={cn(containerClasses, className)}
        style={containerStyle}
        {...rest}
      >
        {/* Date Range Inputs */}
        <div className={inputsClasses} style={inputsStyle}>
          <Input
            type="text"
            size="small"
            value={startDateValue}
            onChange={(e) => onStartDateChange?.(e.target.value)}
            placeholder={startDatePlaceholder}
            aria-label={startDatePlaceholder}
            wrapperClassName={inputWrapperClass}
          />
          {!stacked && (
            <Icon icon={HiArrowNarrowRight} size="sm" color="tertiary" aria-hidden />
          )}
          <Input
            type="text"
            size="small"
            value={endDateValue}
            onChange={(e) => onEndDateChange?.(e.target.value)}
            placeholder={endDatePlaceholder}
            aria-label={endDatePlaceholder}
            wrapperClassName={inputWrapperClass}
          />
        </div>

        {/* Action Buttons */}
        <div className={buttonsClasses} style={buttonsStyle}>
          <Button
            variant="ghost"
            size="small"
            onClick={onCancel}
            className={stacked ? 'flex-1' : undefined}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={onApply}
            disabled={applyDisabled}
            className={stacked ? 'flex-1' : undefined}
          >
            {applyText}
          </Button>
        </div>
      </div>
    );
  })
);

DatePickerConfirmation.displayName = 'DatePicker.Confirmation';

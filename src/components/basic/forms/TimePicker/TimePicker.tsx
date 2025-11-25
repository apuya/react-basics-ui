import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import {
  BASE_CLASSES,
  HELPER_CLASSES,
  HELPER_ERROR_CLASSES,
  LABEL_CLASSES,
  LABEL_ERROR_CLASSES,
  SIZE_STYLES,
  STATE_STYLES,
} from './TimePicker.styles';

export type TimePickerSize = keyof typeof SIZE_STYLES;

export interface TimePickerProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  /** Size of the time picker */
  size?: TimePickerSize;
  /** Error state */
  error?: boolean;
  /** Label text */
  label?: string;
  /** Helper or error text */
  helperText?: string;
  /** Wrapper div className */
  wrapperClassName?: string;
  /** Minimum selectable time (HH:MM) */
  min?: string;
  /** Maximum selectable time (HH:MM) */
  max?: string;
  /** Step interval in seconds (default: 60 for 1 minute steps) */
  step?: number;
}

export const TimePicker = memo(
  forwardRef<HTMLInputElement, TimePickerProps>(function TimePicker(
    {
      size = 'default',
      error = false,
      label,
      helperText,
      className,
      wrapperClassName,
      id,
      disabled,
      min,
      max,
      step,
      ...rest
    },
    ref
  ) {
    const inputId = id || (label ? `timepicker-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const inputClasses = useMemo(
      () => cn(
        BASE_CLASSES,
        SIZE_STYLES[size],
        error ? STATE_STYLES.error : STATE_STYLES.default,
        className
      ),
      [size, error, className]
    );

    const inputStyle = useMemo(
      () => ({
        height: `var(--component-input-height-${size})`,
        paddingInline: 'var(--component-input-padding-inline)',
      }),
      [size]
    );

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={error ? LABEL_ERROR_CLASSES : LABEL_CLASSES}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type="time"
          className={inputClasses}
          style={inputStyle}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          {...rest}
        />
        {helperText && (
          <p className={error ? HELPER_ERROR_CLASSES : HELPER_CLASSES}>
            {helperText}
          </p>
        )}
      </div>
    );
  })
);

TimePicker.displayName = 'TimePicker';

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
} from './DatePicker.styles';

export type DatePickerSize = keyof typeof SIZE_STYLES;

export interface DatePickerProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  /** Size of the date picker */
  size?: DatePickerSize;
  /** Error state */
  error?: boolean;
  /** Label text */
  label?: string;
  /** Helper or error text */
  helperText?: string;
  /** Wrapper div className */
  wrapperClassName?: string;
  /** Minimum selectable date (YYYY-MM-DD) */
  min?: string;
  /** Maximum selectable date (YYYY-MM-DD) */
  max?: string;
}

export const DatePicker = memo(
  forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
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
      ...rest
    },
    ref
  ) {
    const inputId = id || (label ? `datepicker-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

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
          type="date"
          className={inputClasses}
          style={inputStyle}
          disabled={disabled}
          min={min}
          max={max}
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

DatePicker.displayName = 'DatePicker';

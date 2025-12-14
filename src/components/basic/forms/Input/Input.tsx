import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { FormField } from '../FormField';
import {
  BASE_CLASSES,
  ICON_SIZE_STYLES,
  ICON_WRAPPER_BASE_CLASSES,
  LEADING_ICON_STYLE,
  SIZE_STYLES,
  STATE_STYLES,
  SUFFIX_STYLE,
  TRAILING_ICON_STYLE,
} from './Input.styles';

export type InputSize = keyof typeof SIZE_STYLES;

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  /** Size variant of the input */
  size?: InputSize;
  /** Indicates validation error state */
  error?: boolean;
  /** Label text displayed above the input */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Icon displayed at the start of the input */
  leadingIcon?: ReactNode;
  /** Icon displayed at the end of the input */
  trailingIcon?: ReactNode;
  /** Suffix text displayed inside the input, aligned right (e.g., "kg", "cm", "$") */
  suffix?: string;
  /** Additional className for the wrapper element */
  wrapperClassName?: string;
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function Input(
    {
      size = 'default',
      error = false,
      label,
      helperText,
      leadingIcon,
      trailingIcon,
      suffix,
      className,
      wrapperClassName,
      id,
      disabled,
      ...rest
    },
    ref
  ) {
    const inputId = id || generateFormId('input', label);

    const inputClasses = useMemo(
      () => cn(
        BASE_CLASSES,
        SIZE_STYLES[size],
        STATE_STYLES[error ? 'error' : 'default'],
        className
      ),
      [size, error, className]
    );

    const inputStyle = useMemo(
      () => {
        const hasTrailing = suffix || trailingIcon;
        return {
          height: `var(--component-input-height-${size})`,
          paddingLeft: leadingIcon
            ? `calc(var(--component-input-padding-inline) * 2 + var(--component-input-icon-size-${size}))`
            : 'var(--component-input-padding-inline)',
          paddingRight: hasTrailing
            ? `calc(var(--component-input-padding-inline) * 2 + var(--component-input-icon-size-${size}))`
            : 'var(--component-input-padding-inline)',
        };
      },
      [size, leadingIcon, trailingIcon, suffix]
    );

    const iconWrapperClasses = cn(ICON_WRAPPER_BASE_CLASSES, ICON_SIZE_STYLES[size]);

    return (
      <FormField
        label={label}
        helperText={helperText}
        error={error}
        htmlFor={inputId}
        disabled={disabled}
        className={cn('w-full', wrapperClassName)}
      >
        <div
          className="relative"
          data-size={size}
          data-error={error || undefined}
          data-disabled={disabled || undefined}
        >
          {leadingIcon && (
            <span
              className={iconWrapperClasses}
              style={LEADING_ICON_STYLE}
              aria-hidden="true"
            >
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={inputClasses}
            style={inputStyle}
            aria-invalid={error || undefined}
            {...rest}
          />

          {trailingIcon && (
            <span
              className={iconWrapperClasses}
              style={TRAILING_ICON_STYLE}
              aria-hidden="true"
            >
              {trailingIcon}
            </span>
          )}

          {suffix && !trailingIcon && (
            <span
              className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none"
              style={SUFFIX_STYLE}
              aria-hidden="true"
            >
              {suffix}
            </span>
          )}
        </div>
      </FormField>
    );
  })
);

Input.displayName = 'Input';

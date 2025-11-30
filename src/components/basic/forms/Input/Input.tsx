import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { FormField } from '../FormField';
import {
  BASE_CLASSES,
  ICON_SIZE_STYLES,
  SIZE_STYLES,
  STATE_STYLES,
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
  /** Additional className for the wrapper element */
  wrapperClassName?: string;
}

/** Static styles for icon positioning */
const LEADING_ICON_STYLE = {
  left: 'var(--component-input-padding-inline)',
  color: 'var(--component-input-text-placeholder)',
} as const;

const TRAILING_ICON_STYLE = {
  right: 'var(--component-input-padding-inline)',
  color: 'var(--component-input-text-placeholder)',
} as const;

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function Input(
    {
      size = 'default',
      error = false,
      label,
      helperText,
      leadingIcon,
      trailingIcon,
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
        error ? STATE_STYLES.error : STATE_STYLES.default,
        className
      ),
      [size, error, className]
    );

    const inputStyle = useMemo(
      () => ({
        height: `var(--component-input-height-${size})`,
        paddingInline: leadingIcon || trailingIcon
          ? undefined
          : 'var(--component-input-padding-inline)',
        paddingLeft: leadingIcon
          ? 'calc(var(--component-input-padding-inline) * 2 + var(--component-input-icon-size-default))'
          : undefined,
        paddingRight: trailingIcon
          ? 'calc(var(--component-input-padding-inline) * 2 + var(--component-input-icon-size-default))'
          : undefined,
      }),
      [size, leadingIcon, trailingIcon]
    );

    // Simple lookup - no memoization needed
    const iconWrapperClasses = ICON_SIZE_STYLES[size];

    return (
      <FormField
        label={label}
        helperText={helperText}
        error={error}
        htmlFor={inputId}
        disabled={disabled}
        className={cn('w-full', wrapperClassName)}
      >
        <div className="relative" data-size={size} data-error={error || undefined}>
          {leadingIcon && (
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2',
                iconWrapperClasses
              )}
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
            data-size={size}
            data-error={error || undefined}
            {...rest}
          />

          {trailingIcon && (
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2',
                iconWrapperClasses
              )}
              style={TRAILING_ICON_STYLE}
              aria-hidden="true"
            >
              {trailingIcon}
            </span>
          )}
        </div>
      </FormField>
    );
  })
);

Input.displayName = 'Input';

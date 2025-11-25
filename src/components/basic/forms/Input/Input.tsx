import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { FormFieldWrapper } from '../FormFieldWrapper';
import {
  BASE_CLASSES,
  ICON_SIZE_STYLES,
  SIZE_STYLES,
  STATE_STYLES,
} from './Input.styles';

export type InputSize = keyof typeof SIZE_STYLES;

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  size?: InputSize;
  error?: boolean;
  label?: string;
  helperText?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
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
      className,
      wrapperClassName,
      id,
      disabled,
      ...rest
    },
    ref
  ) {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

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

    const iconWrapperClasses = useMemo(
      () => ICON_SIZE_STYLES[size],
      [size]
    );

    const leadingIconStyle = useMemo(
      () => ({
        left: 'var(--component-input-padding-inline)',
        color: 'var(--component-input-text-placeholder)',
      }),
      []
    );

    const trailingIconStyle = useMemo(
      () => ({
        right: 'var(--component-input-padding-inline)',
        color: 'var(--component-input-text-placeholder)',
      }),
      []
    );

    return (
      <FormFieldWrapper
        label={label}
        helperText={helperText}
        error={error}
        inputId={inputId}
        className={cn('w-full', wrapperClassName)}
      >
        <div className="relative">
          {leadingIcon && (
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2',
                iconWrapperClasses
              )}
              style={leadingIconStyle}
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
            {...rest}
          />

          {trailingIcon && (
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2',
                iconWrapperClasses
              )}
              style={trailingIconStyle}
              aria-hidden="true"
            >
              {trailingIcon}
            </span>
          )}
        </div>
      </FormFieldWrapper>
    );
  })
);

Input.displayName = 'Input';

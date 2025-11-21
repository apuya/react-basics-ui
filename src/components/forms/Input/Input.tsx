import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import {
  BASE_CLASSES,
  HELPER_CLASSES,
  HELPER_ERROR_CLASSES,
  ICON_SIZE_STYLES,
  LABEL_CLASSES,
  LABEL_ERROR_CLASSES,
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
      size = 'medium',
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

        <div className="relative">
          {leadingIcon && (
            <span
              className={cn(
                'absolute left-[length:var(--component-input-padding-inline)] top-1/2 -translate-y-1/2 text-[color:var(--component-input-text-placeholder)]',
                ICON_SIZE_STYLES[size]
              )}
              aria-hidden="true"
            >
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              BASE_CLASSES,
              SIZE_STYLES[size],
              error ? STATE_STYLES.error : STATE_STYLES.default,
              className
            )}
            style={{
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
            }}
            {...rest}
          />

          {trailingIcon && (
            <span
              className={cn(
                'absolute right-[length:var(--component-input-padding-inline)] top-1/2 -translate-y-1/2 text-[color:var(--component-input-text-placeholder)]',
                ICON_SIZE_STYLES[size]
              )}
              aria-hidden="true"
            >
              {trailingIcon}
            </span>
          )}
        </div>

        {helperText && (
          <p className={error ? HELPER_ERROR_CLASSES : HELPER_CLASSES}>
            {helperText}
          </p>
        )}
      </div>
    );
  })
);

Input.displayName = 'Input';

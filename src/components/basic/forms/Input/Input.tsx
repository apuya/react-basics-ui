import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { FormField } from '../FormField';
import {
  BASE_CLASSES,
  ICON_SIZE_STYLES,
  SIZE_STYLES,
  STATE_STYLES,
  SUFFIX_CLASSES,
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

/** Static classes for icon positioning */
const LEADING_ICON_CLASSES = 'left-3 text-[color:var(--component-input-text-placeholder)]';
const TRAILING_ICON_CLASSES = 'right-3 text-[color:var(--component-input-text-placeholder)]';

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
      () => {
        const paddingClasses = leadingIcon ? 'pl-10' : '';
        const rightPaddingClasses = (suffix || trailingIcon) ? 'pr-10' : '';
        return cn(
          BASE_CLASSES,
          SIZE_STYLES[size],
          error ? STATE_STYLES.error : STATE_STYLES.default,
          paddingClasses,
          rightPaddingClasses,
          className
        );
      },
      [size, error, leadingIcon, trailingIcon, suffix, className]
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
                LEADING_ICON_CLASSES,
                iconWrapperClasses
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
            className={inputClasses}
            data-size={size}
            data-error={error || undefined}
            {...rest}
          />

          {trailingIcon && (
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2',
                TRAILING_ICON_CLASSES,
                iconWrapperClasses
              )}
              aria-hidden="true"
            >
              {trailingIcon}
            </span>
          )}

          {suffix && !trailingIcon && (
            <span
              className={cn(
                'absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none',
                SUFFIX_CLASSES
              )}
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

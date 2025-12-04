import { cn } from '@/lib/cn';
import { forwardRef, memo, useId, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import {
  BASE_CLASSES,
  ERROR_CLASSES,
  HELPER_CLASSES,
  LABEL_CLASSES,
  REQUIRED_CLASSES,
} from './FormField.styles';

export interface FormFieldProps extends ComponentPropsWithoutRef<'div'> {
  /** Label text displayed above the input */
  label?: ReactNode;
  /** Associates the label with an input via id */
  htmlFor?: string;
  /** Helper text displayed below the input */
  helperText?: ReactNode;
  /** Enables error state styling */
  error?: boolean;
  /** Error message (replaces helperText when error=true) */
  errorMessage?: string;
  /** Shows required indicator (*) */
  required?: boolean;
  /** Sets data-disabled attribute */
  disabled?: boolean;
  /** ID for the helper/error text element (for aria-describedby). Auto-generated if not provided. */
  helperId?: string;
}

export const FormField = memo(
  forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
    {
      label,
      htmlFor,
      helperText,
      error = false,
      errorMessage,
      required = false,
      disabled = false,
      helperId: helperIdProp,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const generatedHelperId = useId();
    const hasHelperContent = helperText || (error && errorMessage);
    const helperId = hasHelperContent ? (helperIdProp ?? `${generatedHelperId}-helper`) : undefined;

    const wrapperClasses = useMemo(
      () => cn(BASE_CLASSES, className),
      [className]
    );

    return (
      <div
        ref={ref}
        className={wrapperClasses}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
        data-required={required || undefined}
        {...rest}
      >
        {label && (
          <label htmlFor={htmlFor} className={LABEL_CLASSES}>
            {label}
            {required && (
              <span className={REQUIRED_CLASSES} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {children}

        {hasHelperContent && (
          <p
            id={helperId}
            className={error ? ERROR_CLASSES : HELPER_CLASSES}
            role={error ? 'alert' : undefined}
          >
            {error && errorMessage ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  })
);

FormField.displayName = 'FormField';

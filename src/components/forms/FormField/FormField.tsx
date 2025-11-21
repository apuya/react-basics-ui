import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import {
  ERROR_CLASSES,
  HELPER_CLASSES,
  LABEL_CLASSES,
  REQUIRED_CLASSES,
  WRAPPER_CLASSES,
} from './FormField.styles';

export interface FormFieldProps extends ComponentPropsWithoutRef<'div'> {
  label?: ReactNode;
  htmlFor?: string;
  helperText?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
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
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(WRAPPER_CLASSES, className)}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
        style={{
          gap: 'var(--component-formfield-gap)',
        }}
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

        {(helperText || (error && errorMessage)) && (
          <p className={error ? ERROR_CLASSES : HELPER_CLASSES}>
            {error && errorMessage ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  })
);

FormField.displayName = 'FormField';

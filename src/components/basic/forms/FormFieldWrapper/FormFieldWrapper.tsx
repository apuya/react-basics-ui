import { forwardRef, memo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import {
  LABEL_CLASSES,
  LABEL_ERROR_CLASSES,
  HELPER_CLASSES,
  HELPER_ERROR_CLASSES,
} from '@/lib/sharedFormStyles';

export interface FormFieldWrapperProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Input element ID (for label association)
   */
  inputId?: string;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * The actual input/form control element
   */
  children: ReactNode;
}

/**
 * Wrapper component for form fields that handles label and helper text rendering
 * Consolidates duplicate label/helper text logic from Input, Textarea, Select, FileInput, DatePicker, TimePicker
 *
 * @example
 * ```tsx
 * <FormFieldWrapper
 *   label="Email"
 *   helperText="Enter your email address"
 *   error={!!errors.email}
 *   inputId="email-input"
 * >
 *   <input id="email-input" type="email" />
 * </FormFieldWrapper>
 * ```
 */
export const FormFieldWrapper = memo(
  forwardRef<HTMLDivElement, FormFieldWrapperProps>(function FormFieldWrapper(
    { inputId, label, helperText, error = false, children, className, ...rest },
    ref
  ) {
    return (
      <div ref={ref} className={className} {...rest}>
        {label && (
          <label htmlFor={inputId} className={error ? LABEL_ERROR_CLASSES : LABEL_CLASSES}>
            {label}
          </label>
        )}
        {children}
        {helperText && <p className={error ? HELPER_ERROR_CLASSES : HELPER_CLASSES}>{helperText}</p>}
      </div>
    );
  })
);

FormFieldWrapper.displayName = 'FormFieldWrapper';

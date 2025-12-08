import React, { ReactNode } from 'react';
import { getLabelClasses, getHelperClasses } from '@/lib/sharedFormStyles';

export interface FormFieldWrapperProps {
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
  
  /**
   * Additional wrapper class names
   */
  className?: string;
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
export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  inputId,
  label,
  helperText,
  error = false,
  children,
  className,
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className={getLabelClasses(error)}>
          {label}
        </label>
      )}
      {children}
      {helperText && <p className={getHelperClasses(error)}>{helperText}</p>}
    </div>
  );
};

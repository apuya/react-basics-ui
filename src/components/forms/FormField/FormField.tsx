import { cn } from '@/lib/cn';
import { forwardRef, memo, useId, useMemo, type ComponentPropsWithoutRef } from 'react';
import { FormFieldContext, type FormFieldContextValue } from './FormFieldContext';
import { FormFieldLabel, FormFieldHelperText, FormFieldErrorMessage } from './FormFieldText';

// =============================================================================
// Styles
// =============================================================================

const BASE_CLASSES = 'flex flex-col gap-[length:var(--component-formfield-gap)]';

// =============================================================================
// Types
// =============================================================================

export interface FormFieldProps extends ComponentPropsWithoutRef<'div'> {
  /** Enables error state styling (shared with sub-components via context) */
  error?: boolean;
  /** Shows required indicator (*) (shared with sub-components via context) */
  required?: boolean;
  /** Sets data-disabled attribute (shared with sub-components via context) */
  disabled?: boolean;
  /** ID for the helper/error text element (for aria-describedby). Auto-generated if not provided. */
  helperId?: string;
}

// =============================================================================
// Root Component
// =============================================================================

/**
 * FormField - Compound component for form field layout with automatic state sharing.
 *
 * Provides context to sub-components (Label, HelperText, ErrorMessage) for automatic
 * error/disabled/required state sharing.
 *
 * @example
 * ```tsx
 * // Compound component usage (recommended)
 * <FormField error required>
 *   <FormField.Label htmlFor="username">Username</FormField.Label>
 *   <Input id="username" aria-describedby={helperId} />
 *   <FormField.ErrorMessage>Username is required</FormField.ErrorMessage>
 * </FormField>
 *
 * // With helper text
 * <FormField>
 *   <FormField.Label htmlFor="email">Email</FormField.Label>
 *   <Input id="email" type="email" />
 *   <FormField.HelperText>We'll never share your email</FormField.HelperText>
 * </FormField>
 * ```
 */
const FormFieldRoot = memo(
  forwardRef<HTMLDivElement, FormFieldProps>(function FormFieldRoot(
    {
      error = false,
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
    const helperId = helperIdProp ?? `${generatedHelperId}-helper`;

    const contextValue = useMemo<FormFieldContextValue>(
      () => ({ error, disabled, required, helperId }),
      [error, disabled, required, helperId]
    );

    return (
      <FormFieldContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(BASE_CLASSES, className)}
          data-error={error || undefined}
          data-disabled={disabled || undefined}
          data-required={required || undefined}
          {...rest}
        >
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  })
);

FormFieldRoot.displayName = 'FormField';

// =============================================================================
// Compound Component Export
// =============================================================================

/**
 * FormField compound component with attached sub-components.
 */
export const FormField = Object.assign(FormFieldRoot, {
  Label: FormFieldLabel,
  HelperText: FormFieldHelperText,
  ErrorMessage: FormFieldErrorMessage,
});

// Re-export context for advanced usage
export { FormFieldContext, useFormFieldContext } from './FormFieldContext';
export type { FormFieldContextValue } from './FormFieldContext';

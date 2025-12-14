import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useFormFieldContext } from './FormFieldContext';
import { ERROR_CLASSES } from './FormField.styles';

export interface FormFieldErrorMessageProps extends ComponentPropsWithoutRef<'p'> {}

/**
 * FormField.ErrorMessage - Error message component that automatically receives error state from context.
 *
 * Only renders when error state is true.
 *
 * @example
 * ```tsx
 * <FormField error>
 *   <FormField.Label>Username</FormField.Label>
 *   <FormField.Input />
 *   <FormField.ErrorMessage>Username is required</FormField.ErrorMessage>
 * </FormField>
 * ```
 */
export const FormFieldErrorMessage = memo(
  forwardRef<HTMLParagraphElement, FormFieldErrorMessageProps>(function FormFieldErrorMessage(
    { children, className, ...rest },
    ref
  ) {
    const { helperId, error } = useFormFieldContext();

    // Only render if there's an error
    if (!error) return null;

    return (
      <p ref={ref} id={helperId} className={cn(ERROR_CLASSES, className)} role="alert" {...rest}>
        {children}
      </p>
    );
  })
);

FormFieldErrorMessage.displayName = 'FormField.ErrorMessage';

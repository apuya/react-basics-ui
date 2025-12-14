import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useFormFieldContext } from './FormFieldContext';
import { HELPER_CLASSES } from './FormField.styles';

export interface FormFieldHelperTextProps extends ComponentPropsWithoutRef<'p'> {}

/**
 * FormField.HelperText - Helper text component that automatically receives helperId from context.
 *
 * Only renders when there's no error state (ErrorMessage takes precedence).
 *
 * @example
 * ```tsx
 * <FormField>
 *   <FormField.Label>Username</FormField.Label>
 *   <FormField.Input />
 *   <FormField.HelperText>Enter your username</FormField.HelperText>
 * </FormField>
 * ```
 */
export const FormFieldHelperText = memo(
  forwardRef<HTMLParagraphElement, FormFieldHelperTextProps>(function FormFieldHelperText(
    { children, className, ...rest },
    ref
  ) {
    const { helperId, error } = useFormFieldContext();

    // Don't render if there's an error (ErrorMessage should be used instead)
    if (error) return null;

    return (
      <p ref={ref} id={helperId} className={cn(HELPER_CLASSES, className)} {...rest}>
        {children}
      </p>
    );
  })
);

FormFieldHelperText.displayName = 'FormField.HelperText';

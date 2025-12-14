import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useFormGroupContext } from './FormGroupContext';
import { ERROR_CLASSES } from './FormGroup.styles';

export interface FormGroupErrorMessageProps extends ComponentPropsWithoutRef<'p'> {}

/**
 * FormGroup.ErrorMessage - Error message component that automatically receives error state from FormGroup context.
 *
 * Only renders when error state is true.
 *
 * @example
 * ```tsx
 * <FormGroup error>
 *   <FormGroup.Legend>Preferences</FormGroup.Legend>
 *   <Checkbox>Option 1</Checkbox>
 *   <FormGroup.ErrorMessage>Please select at least one option</FormGroup.ErrorMessage>
 * </FormGroup>
 * ```
 */
export const FormGroupErrorMessage = memo(
  forwardRef<HTMLParagraphElement, FormGroupErrorMessageProps>(function FormGroupErrorMessage(
    { children, className, ...rest },
    ref
  ) {
    const { errorId, error } = useFormGroupContext();

    // Only render if there's an error
    if (!error) return null;

    return (
      <p ref={ref} id={errorId} className={cn(ERROR_CLASSES, className)} role="alert" {...rest}>
        {children}
      </p>
    );
  })
);

FormGroupErrorMessage.displayName = 'FormGroup.ErrorMessage';

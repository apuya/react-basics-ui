import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useFormFieldContext } from './FormFieldContext';
import { LABEL_CLASSES, REQUIRED_CLASSES } from './FormField.styles';

export interface FormFieldLabelProps extends ComponentPropsWithoutRef<'label'> {
  /** Override required indicator from context */
  showRequired?: boolean;
}

/**
 * FormField.Label - Label component that automatically receives state from FormField context.
 *
 * @example
 * ```tsx
 * <FormField required>
 *   <FormField.Label>Username</FormField.Label>
 *   <FormField.Input />
 * </FormField>
 * ```
 */
export const FormFieldLabel = memo(
  forwardRef<HTMLLabelElement, FormFieldLabelProps>(function FormFieldLabel(
    { children, className, showRequired, ...rest },
    ref
  ) {
    const { required } = useFormFieldContext();
    const displayRequired = showRequired ?? required;

    return (
      <label ref={ref} className={cn(LABEL_CLASSES, className)} {...rest}>
        {children}
        {displayRequired && (
          <span className={REQUIRED_CLASSES} aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  })
);

FormFieldLabel.displayName = 'FormField.Label';

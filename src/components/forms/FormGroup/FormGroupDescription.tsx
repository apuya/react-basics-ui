import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { DESCRIPTION_CLASSES } from './FormGroup.styles';

export interface FormGroupDescriptionProps extends ComponentPropsWithoutRef<'p'> {}

/**
 * FormGroup.Description - Description component that automatically receives state from FormGroup context.
 *
 * @example
 * ```tsx
 * <FormGroup>
 *   <FormGroup.Legend>Preferences</FormGroup.Legend>
 *   <FormGroup.Description>Choose your notification settings</FormGroup.Description>
 *   <Checkbox>Email notifications</Checkbox>
 * </FormGroup>
 * ```
 */
export const FormGroupDescription = memo(
  forwardRef<HTMLParagraphElement, FormGroupDescriptionProps>(function FormGroupDescription(
    { children, className, ...rest },
    ref
  ) {
    return (
      <p ref={ref} className={cn(DESCRIPTION_CLASSES, className)} {...rest}>
        {children}
      </p>
    );
  })
);

FormGroupDescription.displayName = 'FormGroup.Description';

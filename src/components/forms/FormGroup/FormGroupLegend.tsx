import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { LEGEND_CLASSES } from './FormGroup.styles';

export interface FormGroupLegendProps extends ComponentPropsWithoutRef<'legend'> {}

/**
 * FormGroup.Legend - Legend component that automatically receives state from FormGroup context.
 *
 * @example
 * ```tsx
 * <FormGroup>
 *   <FormGroup.Legend>Notification Preferences</FormGroup.Legend>
 *   <Checkbox>Email</Checkbox>
 *   <Checkbox>SMS</Checkbox>
 * </FormGroup>
 * ```
 */
export const FormGroupLegend = memo(
  forwardRef<HTMLLegendElement, FormGroupLegendProps>(function FormGroupLegend(
    { children, className, ...rest },
    ref
  ) {
    return (
      <legend ref={ref} className={cn(LEGEND_CLASSES, className)} {...rest}>
        {children}
      </legend>
    );
  })
);

FormGroupLegend.displayName = 'FormGroup.Legend';

import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import {
  CHILDREN_HORIZONTAL_CLASSES,
  CHILDREN_VERTICAL_CLASSES,
  DESCRIPTION_CLASSES,
  ERROR_CLASSES,
  LEGEND_CLASSES,
  WRAPPER_CLASSES,
} from './FormGroup.styles';

export type FormGroupOrientation = 'vertical' | 'horizontal';

export interface FormGroupProps extends ComponentPropsWithoutRef<'fieldset'> {
  legend?: ReactNode;
  description?: ReactNode;
  orientation?: FormGroupOrientation;
  error?: boolean;
  errorMessage?: string;
}

export const FormGroup = memo(
  forwardRef<HTMLFieldSetElement, FormGroupProps>(function FormGroup(
    {
      legend,
      description,
      orientation = 'vertical',
      error = false,
      errorMessage,
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <fieldset
        ref={ref}
        className={cn(WRAPPER_CLASSES, className)}
        data-orientation={orientation}
        data-error={error || undefined}
        style={{
          gap: 'var(--component-formgroup-gap)',
        }}
        {...rest}
      >
        {legend && <legend className={LEGEND_CLASSES}>{legend}</legend>}
        {description && <p className={DESCRIPTION_CLASSES}>{description}</p>}

        <div
          className={
            orientation === 'horizontal'
              ? CHILDREN_HORIZONTAL_CLASSES
              : CHILDREN_VERTICAL_CLASSES
          }
          style={{
            gap:
              orientation === 'horizontal'
                ? 'var(--component-formgroup-gap-horizontal)'
                : 'var(--component-formgroup-gap)',
          }}
        >
          {children}
        </div>

        {error && errorMessage && <p className={ERROR_CLASSES}>{errorMessage}</p>}
      </fieldset>
    );
  })
);

FormGroup.displayName = 'FormGroup';

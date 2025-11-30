import { cn } from '@/lib/cn';
import { forwardRef, memo, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
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
  /** Legend/title displayed at the top of the group */
  legend?: ReactNode;
  /** Helper description text below the legend */
  description?: ReactNode;
  /** Layout direction for child elements */
  orientation?: FormGroupOrientation;
  /** Indicates validation error state */
  error?: boolean;
  /** Error message displayed when error is true */
  errorMessage?: string;
  /** ID for the error message element (for aria-describedby). Auto-generated if not provided. */
  errorId?: string;
}

export const FormGroup = memo(
  forwardRef<HTMLFieldSetElement, FormGroupProps>(function FormGroup(
    {
      legend,
      description,
      orientation = 'vertical',
      error = false,
      errorMessage,
      errorId: errorIdProp,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const hasError = error && errorMessage;
    const errorId = hasError ? (errorIdProp ?? `${generatedId}-error`) : undefined;

    return (
      <fieldset
        ref={ref}
        className={cn(WRAPPER_CLASSES, className)}
        data-orientation={orientation}
        data-error={error || undefined}
        aria-invalid={error || undefined}
        aria-describedby={errorId}
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
        >
          {children}
        </div>

        {hasError && (
          <p id={errorId} className={ERROR_CLASSES} role="alert">
            {errorMessage}
          </p>
        )}
      </fieldset>
    );
  })
);

FormGroup.displayName = 'FormGroup';

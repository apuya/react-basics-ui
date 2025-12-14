import { cn } from '@/lib/cn';
import { forwardRef, memo, useId, useMemo, type ComponentPropsWithoutRef } from 'react';
import { FormGroupContext, useFormGroupContext, type FormGroupContextValue } from './FormGroupContext';
import { FormGroupLegend, FormGroupDescription, FormGroupErrorMessage } from './FormGroupText';

// =============================================================================
// Styles
// =============================================================================

const BASE_CLASSES = 'flex flex-col border-0 p-0 m-0 gap-[length:var(--component-formgroup-gap)]';

// =============================================================================
// Types
// =============================================================================

export type FormGroupOrientation = 'vertical' | 'horizontal';

export interface FormGroupProps extends ComponentPropsWithoutRef<'fieldset'> {
  /** Layout direction for child elements */
  orientation?: FormGroupOrientation;
  /** Enables error state styling (shared with sub-components via context) */
  error?: boolean;
  /** Sets data-disabled attribute (shared with sub-components via context) */
  disabled?: boolean;
  /** Whether the form group is required (shared with sub-components via context) */
  required?: boolean;
  /** ID for the error message element (for aria-describedby). Auto-generated if not provided. */
  errorId?: string;
}

// =============================================================================
// Root Component
// =============================================================================

/**
 * FormGroup - Compound component for grouping related form controls with automatic state sharing.
 *
 * Provides context to sub-components (Legend, Description, ErrorMessage) for automatic
 * error/disabled state sharing.
 *
 * @example
 * ```tsx
 * // Compound component usage (recommended)
 * <FormGroup error orientation="vertical">
 *   <FormGroup.Legend>Notification Preferences</FormGroup.Legend>
 *   <FormGroup.Description>Choose how you want to be notified</FormGroup.Description>
 *   <Checkbox>Email</Checkbox>
 *   <Checkbox>SMS</Checkbox>
 *   <FormGroup.ErrorMessage>Please select at least one option</FormGroup.ErrorMessage>
 * </FormGroup>
 * ```
 */
const FormGroupRoot = memo(
  forwardRef<HTMLFieldSetElement, FormGroupProps>(function FormGroupRoot(
    {
      orientation = 'vertical',
      error = false,
      disabled = false,
      required = false,
      errorId: errorIdProp,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const generatedErrorId = useId();
    const errorId = errorIdProp ?? `${generatedErrorId}-error`;

    const contextValue = useMemo<FormGroupContextValue>(
      () => ({ error, disabled, required, errorId, orientation }),
      [error, disabled, required, errorId, orientation]
    );

    return (
      <FormGroupContext.Provider value={contextValue}>
        <fieldset
          ref={ref}
          className={cn(BASE_CLASSES, className)}
          data-orientation={orientation}
          data-error={error || undefined}
          data-disabled={disabled || undefined}
          data-required={required || undefined}
          aria-invalid={error || undefined}
          aria-required={required || undefined}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          {...rest}
        >
          {children}
        </fieldset>
      </FormGroupContext.Provider>
    );
  })
);

FormGroupRoot.displayName = 'FormGroup';

// =============================================================================
// FormGroup.Options
// =============================================================================

const ORIENTATION_CLASSES = {
  vertical: 'flex flex-col gap-[length:var(--component-formgroup-gap)]',
  horizontal: 'flex flex-row flex-wrap gap-[length:var(--component-formgroup-gap-horizontal)]',
} as const;

export interface FormGroupOptionsProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * FormGroup.Options - Container for form controls that applies orientation layout.
 * Wraps radio/checkbox inputs and applies horizontal or vertical layout based on context.
 */
const FormGroupOptions = memo(
  forwardRef<HTMLDivElement, FormGroupOptionsProps>(function FormGroupOptions(
    { className, children, ...rest },
    ref
  ) {
    const { orientation } = useFormGroupContext();

    return (
      <div
        ref={ref}
        className={cn(ORIENTATION_CLASSES[orientation], className)}
        role="group"
        {...rest}
      >
        {children}
      </div>
    );
  })
);

FormGroupOptions.displayName = 'FormGroup.Options';

// =============================================================================
// Compound Component Export
// =============================================================================

/**
 * FormGroup compound component with sub-components for flexible form group composition.
 *
 * @example
 * ```tsx
 * <FormGroup orientation="horizontal">
 *   <FormGroup.Legend>Settings</FormGroup.Legend>
 *   <FormGroup.Description>Customize your preferences</FormGroup.Description>
 *   <FormGroup.Options>
 *     <Checkbox>Option 1</Checkbox>
 *     <Checkbox>Option 2</Checkbox>
 *   </FormGroup.Options>
 *   <FormGroup.ErrorMessage>Error text</FormGroup.ErrorMessage>
 * </FormGroup>
 * ```
 */
export const FormGroup = Object.assign(FormGroupRoot, {
  Legend: FormGroupLegend,
  Description: FormGroupDescription,
  Options: FormGroupOptions,
  ErrorMessage: FormGroupErrorMessage,
});

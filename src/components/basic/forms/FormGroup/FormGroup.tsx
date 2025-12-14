import { cn } from '@/lib/cn';
import { forwardRef, memo, useId, type ComponentPropsWithoutRef } from 'react';
import { BASE_CLASSES } from './FormGroup.styles';
import { FormGroupContext, type FormGroupContextValue } from './FormGroupContext';
import { FormGroupLegend } from './FormGroupLegend';
import { FormGroupDescription } from './FormGroupDescription';
import { FormGroupErrorMessage } from './FormGroupErrorMessage';

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
      errorId: errorIdProp,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const generatedErrorId = useId();
    const errorId = errorIdProp ?? `${generatedErrorId}-error`;

    const contextValue: FormGroupContextValue = {
      error,
      disabled,
      errorId,
      orientation,
    };

    return (
      <FormGroupContext.Provider value={contextValue}>
        <fieldset
          ref={ref}
          className={cn(BASE_CLASSES, className)}
          data-orientation={orientation}
          data-error={error || undefined}
          data-disabled={disabled || undefined}
          aria-invalid={error || undefined}
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
// Compound Component Export
// =============================================================================

/**
 * FormGroup compound component with sub-components for flexible form group composition.
 *
 * @example
 * ```tsx
 * <FormGroup error>
 *   <FormGroup.Legend>Settings</FormGroup.Legend>
 *   <FormGroup.Description>Customize your preferences</FormGroup.Description>
 *   <Checkbox>Option 1</Checkbox>
 *   <FormGroup.ErrorMessage>Error text</FormGroup.ErrorMessage>
 * </FormGroup>
 * ```
 */
export const FormGroup = Object.assign(FormGroupRoot, {
  Legend: FormGroupLegend,
  Description: FormGroupDescription,
  ErrorMessage: FormGroupErrorMessage,
});

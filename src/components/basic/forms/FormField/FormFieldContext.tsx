import { createComponentContext } from '@/lib/createComponentContext';

/**
 * FormField Context Value - Shares state between FormField compound components.
 *
 * @property error - Whether the field has an error state
 * @property disabled - Whether the field is disabled
 * @property required - Whether the field is required
 * @property helperId - ID for aria-describedby linking
 */
export interface FormFieldContextValue {
  /** Whether the field has an error state */
  error: boolean;
  /** Whether the field is disabled */
  disabled: boolean;
  /** Whether the field is required */
  required: boolean;
  /** ID for the helper/error text element (for aria-describedby) */
  helperId?: string;
}

/**
 * FormField Context - Shares state between FormField compound components.
 *
 * Created using `createComponentContext` factory for consistent error handling.
 * Sub-components access context via `useFormFieldContext()` hook.
 *
 * @internal Used internally by FormField sub-components
 */
const { Context, useContext: useFormFieldContext } = createComponentContext<FormFieldContextValue>('FormField');

export const FormFieldContext = Context;
export { useFormFieldContext };

FormFieldContext.displayName = 'FormFieldContext';

import { createComponentContext } from '@/lib/createComponentContext';

export interface FormGroupContextValue {
  /** Whether the form group is in an error state */
  error: boolean;
  /** Whether the form group is disabled */
  disabled: boolean;
  /** ID for the error message element (for aria-describedby) */
  errorId: string;
  /** Orientation of the form group */
  orientation: 'vertical' | 'horizontal';
}

export const { Context: FormGroupContext, useContext: useFormGroupContext } =
  createComponentContext<FormGroupContextValue>('FormGroup');

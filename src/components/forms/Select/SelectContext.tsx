import { createComponentContext } from '@/lib/createComponentContext';
import type { SelectSize } from './Select.styles';

export interface SelectContextValue {
  disabled: boolean;
  error: boolean;
  size: SelectSize;
  triggerId: string;
}

export const { 
  Context: SelectContext, 
  useContext: useSelectContext,
} = createComponentContext<SelectContextValue>('Select');

import { createComponentContext } from '@/lib/createComponentContext';
import type { SelectSize } from './Select.styles';

export interface SelectContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value: string | undefined;
  setValue: (value: string) => void;
  disabled: boolean;
  error: boolean;
  size: SelectSize;
  getOptionLabel: (value: string) => string | undefined;
  registerOption: (value: string, label: string) => void;
  triggerId: string;
  menuId: string;
}

export const { 
  Context: SelectContext, 
  useContext: useSelectContext,
  useOptionalContext: useOptionalSelectContext,
} = createComponentContext<SelectContextValue>('Select');

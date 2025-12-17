import { createComponentContext } from '@/lib/createComponentContext';

export interface ListContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  /** Current value for single-select mode */
  value: string | undefined;
  /** Set value (handles both single and multi modes internally) */
  setValue: (value: string) => void;
  /** Check if a specific value is selected (works for both single and multi-select) */
  isValueSelected?: (value: string) => boolean;
  getOptionLabel: (value: string) => string | undefined;
  registerOption: (value: string, label: string) => void;
  menuId: string;
}

export const { 
  Context: ListContext, 
  useContext: useListContext,
  useOptionalContext: useOptionalListContext,
} = createComponentContext<ListContextValue>('List');

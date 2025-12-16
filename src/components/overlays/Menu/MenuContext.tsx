import { createComponentContext } from '@/lib/createComponentContext';

export interface MenuContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  menuId: string;
  /** Close menu after action (default: true) */
  closeOnAction?: boolean;
}

export const { 
  Context: MenuContext, 
  useContext: useMenuContext,
  useOptionalContext: useOptionalMenuContext,
} = createComponentContext<MenuContextValue>('Menu');

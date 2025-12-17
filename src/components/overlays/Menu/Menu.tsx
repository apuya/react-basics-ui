import {
  memo,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/cn';
import { MenuContext } from './MenuContext';
import { MenuContainer } from './MenuContainer';
import { MenuItem } from './MenuItem';
import { MenuDivider } from './MenuDivider';
import { MenuLabel } from './MenuLabel';

// =============================================================================
// Types
// =============================================================================

export interface MenuProps {
  children?: ReactNode;
  className?: string;
  /** Base ID for accessibility attributes */
  id?: string;
  /** Whether the menu is initially open (uncontrolled) */
  defaultOpen?: boolean;
  /** Whether the menu is open (controlled) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Close menu after action (default: true) */
  closeOnAction?: boolean;
}

// =============================================================================
// Root Component
// =============================================================================

/**
 * Menu - Primitive for executing actions and commands.
 * 
 * Use when the user needs to **perform an action** (edit, delete, share).
 * Triggers callbacks without maintaining selection state. Uses menu/menuitem ARIA roles.
 *
 * **Use Cases:**
 * - Context menus (right-click actions: Cut, Copy, Paste)
 * - Dropdown actions (Edit, Duplicate, Delete)
 * - Navigation menus (Profile → Settings → Logout)
 * - Toolbar action menus (Share, Export, Print)
 *
 * **NOT for selections** - Use List for choosing data/values.
 *
 * @example
 * ```tsx
 * <Menu defaultOpen>
 *   <Menu.Container>
 *     <Menu.Item onAction={() => edit()}>Edit</Menu.Item>
 *     <Menu.Item onAction={() => share()}>Share</Menu.Item>
 *     <Menu.Divider />
 *     <Menu.Item variant="danger" onAction={() => delete()}>Delete</Menu.Item>
 *   </Menu.Container>
 * </Menu>
 * ```
 */
const MenuRoot = memo(function MenuRoot({
  children,
  className,
  id = 'menu',
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  closeOnAction = true,
}: MenuProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  
  // Support controlled and uncontrolled modes
  const isOpen = controlledOpen ?? internalOpen;
  
  const setIsOpen = useMemo(() => (open: boolean) => {
    setInternalOpen(open);
    onOpenChange?.(open);
  }, [onOpenChange]);

  const menuId = useMemo(() => `${id}-menu`, [id]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      menuId,
      closeOnAction,
    }),
    [isOpen, setIsOpen, menuId, closeOnAction]
  );

  return (
    <MenuContext.Provider value={contextValue}>
      <div 
        className={cn('relative inline-block', className)}
        data-open={isOpen}
      >
        {children}
      </div>
    </MenuContext.Provider>
  );
});

MenuRoot.displayName = 'Menu';

// =============================================================================
// Compound Component Export
// =============================================================================

export const Menu = Object.assign(MenuRoot, {
  Container: MenuContainer,
  Item: MenuItem,
  Divider: MenuDivider,
  Label: MenuLabel,
});

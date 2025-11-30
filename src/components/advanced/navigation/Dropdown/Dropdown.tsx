import {
  useId,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react';
import { createComponentContext } from '@/lib/createComponentContext';
import { useControlledState } from '@/hooks/useControlledState';
import { TRIGGER_WRAPPER_CLASSES } from './Dropdown.styles';
import { DropdownTrigger } from './DropdownTrigger';
import { DropdownMenu } from './DropdownMenu';
import { DropdownItem } from './DropdownItem';
import { DropdownMenuItem } from './DropdownMenuItem';

/**
 * Position of the menu relative to the trigger.
 */
export type DropdownSide = 'top' | 'bottom' | 'left' | 'right';

/**
 * Alignment of the menu relative to the trigger.
 */
export type DropdownAlign = 'start' | 'center' | 'end';

/**
 * Props for the main Dropdown component.
 */
export interface DropdownProps {
  /** Content including Dropdown.Trigger and Dropdown.Menu */
  children: ReactNode;
  /** Whether the menu is open by default (uncontrolled mode) */
  defaultOpen?: boolean;
  /** Whether the menu is open (controlled mode) */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (open: boolean) => void;
}

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  menuId: string;
}

// Use shared context factory instead of raw createContext
const { Context: DropdownContext, useContext: useDropdownContext } =
  createComponentContext<DropdownContextValue>('Dropdown');

// Re-export for sub-components
export { DropdownContext, useDropdownContext };

/**
 * Main Dropdown component using compound component pattern.
 * 
 * A fully accessible dropdown menu with keyboard navigation, click-outside detection,
 * and flexible positioning. Supports both controlled and uncontrolled modes.
 * 
 * @example
 * ```tsx
 * // Basic uncontrolled usage
 * <Dropdown>
 *   <Dropdown.Trigger>
 *     <Button>Menu</Button>
 *   </Dropdown.Trigger>
 *   <Dropdown.Menu>
 *     <Dropdown.Item>Option 1</Dropdown.Item>
 *     <Dropdown.Item>Option 2</Dropdown.Item>
 *   </Dropdown.Menu>
 * </Dropdown>
 * 
 * // With icons and shortcuts
 * <Dropdown>
 *   <Dropdown.Trigger>
 *     <Button>Actions</Button>
 *   </Dropdown.Trigger>
 *   <Dropdown.Menu>
 *     <Dropdown.Item leadingIcon={<BiEdit />} shortcut="⌘E">Edit</Dropdown.Item>
 *     <Dropdown.Item leadingIcon={<BiTrash />} variant="danger">Delete</Dropdown.Item>
 *   </Dropdown.Menu>
 * </Dropdown>
 * 
 * // Controlled mode
 * <Dropdown open={isOpen} onOpenChange={setIsOpen}>
 *   ...
 * </Dropdown>
 * ```
 */
const DropdownRoot = ({ children, defaultOpen = false, open, onOpenChange }: DropdownProps) => {
  // Use shared hook for controlled/uncontrolled state management
  const [isOpen, setIsOpen] = useControlledState(open, defaultOpen, onOpenChange);
  
  // Ref for the trigger button (shared with DropdownTrigger)
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  // Generate unique ID for ARIA relationships
  const menuId = useId();

  // Memoize context to prevent unnecessary re-renders of child components
  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, triggerRef, menuId }),
    [isOpen, setIsOpen, menuId]
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={TRIGGER_WRAPPER_CLASSES}>{children}</div>
    </DropdownContext.Provider>
  );
};

// Compound Component Pattern
export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
  MenuItem: DropdownMenuItem,
  /** @deprecated Use MenuItem with variant="divider" instead */
  Divider: DropdownMenuItem,
});

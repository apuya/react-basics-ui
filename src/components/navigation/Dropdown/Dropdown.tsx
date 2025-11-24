import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
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

export const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

/**
 * Hook to access dropdown context.
 * 
 * @throws Error if used outside of Dropdown component
 * @internal
 */
export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown');
  }
  return context;
};

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
  // Internal state for uncontrolled mode
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  
  // Ref for the trigger button (shared with DropdownTrigger)
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  // Generate unique ID for ARIA relationships
  const menuId = useId();
  
  // Determine if component is controlled (external state) or uncontrolled (internal state)
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  /**
   * Unified setter that works in both controlled and uncontrolled modes.
   * In controlled mode: only calls onOpenChange callback
   * In uncontrolled mode: updates internal state and calls optional callback
   */
  const setIsOpen = useCallback(
    (newOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [open, onOpenChange]
  );

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

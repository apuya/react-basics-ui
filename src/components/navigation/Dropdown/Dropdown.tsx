import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { TRIGGER_WRAPPER_CLASSES } from './Dropdown.styles';
import { DropdownTrigger } from './DropdownTrigger';
import { DropdownMenu } from './DropdownMenu';
import { DropdownItem } from './DropdownItem';
import { DropdownDivider } from './DropdownDivider';

export type DropdownSide = 'top' | 'bottom' | 'left' | 'right';
export type DropdownAlign = 'start' | 'center' | 'end';

export interface DropdownProps {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown');
  }
  return context;
};

// Main Dropdown Component
const DropdownRoot = ({ children, defaultOpen = false, open, onOpenChange }: DropdownProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setIsOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen }),
    [isOpen, setIsOpen]
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
  Divider: DropdownDivider,
});

import { useMemo, type ReactNode } from 'react';
import { createComponentContext } from '@/lib/createComponentContext';
import { BaseOverlayDialog } from '@/lib/BaseOverlayDialog';
import { cn } from '@/lib/cn';
import {
  CLOSE_BUTTON_CLASSES,
  DRAWER_BASE_CLASSES,
  DRAWER_VISIBLE_CLASS,
  OVERLAY_CLASSES,
  OVERLAY_VISIBLE_CLASS,
  PLACEMENT_STYLES,
  PLACEMENT_VISIBLE_STYLES,
  SIZE_STYLES,
} from './Drawer.styles';
import { DrawerHeader } from './DrawerHeader';
import { DrawerContent } from './DrawerContent';
import { DrawerFooter } from './DrawerFooter';
import { DrawerTitle } from './DrawerTitle';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

export interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventBodyScroll?: boolean;
}

interface DrawerContextValue {
  onClose: () => void;
}

const { Context: DrawerContext, useContext: useDrawerContext } =
  createComponentContext<DrawerContextValue>('Drawer');

// Main Drawer Component
const DrawerRoot = ({
  children,
  isOpen,
  onClose,
  placement = 'right',
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  preventBodyScroll = true,
}: DrawerProps) => {
  const drawerClasses = useMemo(
    () =>
      cn(
        DRAWER_BASE_CLASSES,
        PLACEMENT_STYLES[placement],
        SIZE_STYLES[placement][size]
      ),
    [placement, size]
  );

  const drawerVisibleClass = useMemo(
    () => cn(DRAWER_VISIBLE_CLASS, PLACEMENT_VISIBLE_STYLES[placement]),
    [placement]
  );

  const contextValue = useMemo(() => ({ onClose }), [onClose]);

  return (
    <BaseOverlayDialog
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEscape={closeOnEscape}
      showCloseButton={showCloseButton}
      preventBodyScroll={preventBodyScroll}
      overlayClassName={OVERLAY_CLASSES}
      overlayVisibleClassName={OVERLAY_VISIBLE_CLASS}
      dialogClassName={drawerClasses}
      dialogVisibleClassName={drawerVisibleClass}
      closeButtonClassName={CLOSE_BUTTON_CLASSES}
      ariaLabel="drawer"
      closeButtonAriaLabel="Close drawer"
      contextValue={contextValue}
      ContextProvider={DrawerContext.Provider}
      dialogPosition="sibling"
    >
      {children}
    </BaseOverlayDialog>
  );
};

// Compound Component Pattern
export const Drawer = Object.assign(DrawerRoot, {
  Header: DrawerHeader,
  Content: DrawerContent,
  Footer: DrawerFooter,
  Title: DrawerTitle,
});

export { useDrawerContext };

import { useMemo, type ReactNode } from 'react';
import { createComponentContext } from '@/lib/createComponentContext';
import { BaseOverlayDialog } from '@/lib/BaseOverlayDialog';
import { cn } from '@/lib/cn';
import {
  CLOSE_BUTTON_CLASSES,
  MODAL_BASE_CLASSES,
  MODAL_VISIBLE_CLASS,
  OVERLAY_CLASSES,
  OVERLAY_VISIBLE_CLASS,
  SIZE_STYLES,
} from './Modal.styles';
import { ModalHeader } from './ModalHeader';
import { ModalContent } from './ModalContent';
import { ModalFooter } from './ModalFooter';
import { ModalTitle } from './ModalTitle';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventBodyScroll?: boolean;
}

interface ModalContextValue {
  onClose: () => void;
}

const { Context: ModalContext, useContext: useModalContext } =
  createComponentContext<ModalContextValue>('Modal');

// Main Modal Component
const ModalRoot = ({
  children,
  isOpen,
  onClose,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  preventBodyScroll = true,
}: ModalProps) => {
  const dialogClasses = useMemo(
    () => cn(MODAL_BASE_CLASSES, SIZE_STYLES[size]),
    [size]
  );

  const dialogStyle = useMemo(
    () => ({
      marginInline: size === 'full' ? '0' : 'var(--semantic-space-default)',
    }),
    [size]
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
      dialogClassName={dialogClasses}
      dialogVisibleClassName={MODAL_VISIBLE_CLASS}
      closeButtonClassName={CLOSE_BUTTON_CLASSES}
      dialogStyle={dialogStyle}
      ariaLabel="modal"
      closeButtonAriaLabel="Close modal"
      contextValue={contextValue}
      ContextProvider={ModalContext.Provider}
      dialogPosition="inside"
    >
      {children}
    </BaseOverlayDialog>
  );
};

// Compound Component Pattern
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
  Title: ModalTitle,
});

export { useModalContext };

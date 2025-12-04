import { memo, useMemo, type ReactNode } from 'react';
import { createComponentContext } from '@/lib/createComponentContext';
import { BaseOverlayDialog } from '@/lib/BaseOverlayDialog';
import { cn } from '@/lib/cn';
import {
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
  /** Modal content (typically Modal.Header, Modal.Content, Modal.Footer) */
  children: ReactNode;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Size of the modal */
  size?: ModalSize;
  /** Whether clicking the overlay closes the modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Whether to prevent body scrolling when modal is open */
  preventBodyScroll?: boolean;
}

interface ModalContextValue {
  onClose: () => void;
}

const { Context: ModalContext, useContext: useModalContext } =
  createComponentContext<ModalContextValue>('Modal');

/**
 * Modal component for displaying focused content in an overlay dialog.
 * Uses compound component pattern with Modal.Header, Modal.Content, Modal.Footer, Modal.Title.
 *
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={handleClose}>
 *   <Modal.Header>
 *     <Modal.Title>Confirm Action</Modal.Title>
 *   </Modal.Header>
 *   <Modal.Content>Are you sure?</Modal.Content>
 *   <Modal.Footer>
 *     <Button onClick={handleClose}>Cancel</Button>
 *     <Button onClick={handleConfirm}>Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
const ModalRoot = memo(
  ({
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
        marginInline: size === 'full' ? '0' : 'var(--component-modal-margin-inline)',
        padding: 'var(--component-modal-padding-block) var(--component-modal-padding-inline)',
        gap: 'var(--component-modal-gap-default)',
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
        dialogStyle={dialogStyle}
        ariaLabel="modal"
        closeButtonAriaLabel="Close modal"
        contextValue={contextValue}
        ContextProvider={ModalContext.Provider}
        dialogPosition="inside"
        dataSize={size}
      >
        {children}
      </BaseOverlayDialog>
    );
  }
);

ModalRoot.displayName = 'Modal';

// Compound Component Pattern
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
  Title: ModalTitle,
});

export { useModalContext };

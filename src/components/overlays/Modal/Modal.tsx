import { memo, useMemo } from 'react';
import { createComponentContext } from '@/lib/createComponentContext';
import { BaseOverlayDialog } from '@/lib/BaseOverlayDialog';
import { BaseCardContainer } from '@/components/layout/BaseCardContainer';
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
import type { ModalContextValue, ModalProps } from './Modal.types';

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
    const modalClasses = useMemo(
      () => cn(MODAL_BASE_CLASSES, SIZE_STYLES[size], isOpen && MODAL_VISIBLE_CLASS),
      [size, isOpen]
    );

    const dialogStyle = useMemo(
      () => ({
        position: 'relative' as const,
        marginInline: size === 'full' ? '0' : 'var(--component-modal-margin-inline)',
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
        dialogClassName="" // Empty - BaseCardContainer handles all classes
        dialogVisibleClassName="" // Empty - BaseCardContainer handles visibility
        dialogStyle={dialogStyle}
        ariaLabel="modal"
        closeButtonAriaLabel="Close modal"
        contextValue={contextValue}
        ContextProvider={ModalContext.Provider}
        dialogPosition="inside"
        dataSize={size}
      >
        <BaseCardContainer
          baseClasses={modalClasses}
          dataAttributes={{ 'data-modal-visible': 'true' }}
        >
          {children}
        </BaseCardContainer>
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

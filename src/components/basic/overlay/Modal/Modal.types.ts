import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// =============================================================================
// Size Types
// =============================================================================

/** Available modal size variants */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

// =============================================================================
// Context Types
// =============================================================================

/**
 * Context value for Modal compound components.
 * Provides close handler to sub-components.
 */
export interface ModalContextValue {
  /** Callback to close the modal */
  onClose: () => void;
}

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Modal component.
 * Displays focused content in an overlay dialog with compound component pattern.
 */
export interface ModalProps {
  /**
   * Modal content (typically Modal.Header, Modal.Content, Modal.Footer).
   */
  children: ReactNode;
  /**
   * Whether the modal is open.
   */
  isOpen: boolean;
  /**
   * Callback when modal should close.
   */
  onClose: () => void;
  /**
   * Size of the modal.
   * @default 'md'
   */
  size?: ModalSize;
  /**
   * Whether clicking the overlay closes the modal.
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing Escape closes the modal.
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * Whether to show the close button.
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Whether to prevent body scrolling when modal is open.
   * @default true
   */
  preventBodyScroll?: boolean;
}

// =============================================================================
// Sub-component Props
// =============================================================================

/**
 * Props for the Modal.Header sub-component.
 * Renders the header section of the modal.
 */
export interface ModalHeaderProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * Props for the Modal.Content sub-component.
 * Renders the main content area of the modal with scroll support.
 */
export interface ModalContentProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * Props for the Modal.Footer sub-component.
 * Renders the footer section typically containing action buttons.
 */
export interface ModalFooterProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * Props for the Modal.Title sub-component.
 * Renders the modal title as an h2 heading.
 */
export interface ModalTitleProps extends ComponentPropsWithoutRef<'h2'> {}

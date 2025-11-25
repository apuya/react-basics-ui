import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { cn } from '@/lib/cn';
import { Portal } from '@/components/basic/utility/Portal';
import { BiX } from 'react-icons/bi';

export interface BaseOverlayDialogProps {
  /**
   * Dialog content
   */
  children: ReactNode;

  /**
   * Whether the dialog is open
   */
  isOpen: boolean;

  /**
   * Callback when dialog should close
   */
  onClose: () => void;

  /**
   * Whether clicking overlay closes dialog
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Whether pressing Escape closes dialog
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Whether to prevent body scroll when open
   * @default true
   */
  preventBodyScroll?: boolean;

  /**
   * CSS classes for overlay
   */
  overlayClassName: string;

  /**
   * CSS classes for overlay when visible
   */
  overlayVisibleClassName: string;

  /**
   * CSS classes for dialog container
   */
  dialogClassName: string;

  /**
   * CSS classes for dialog when visible
   */
  dialogVisibleClassName?: string;

  /**
   * CSS classes for close button
   */
  closeButtonClassName: string;

  /**
   * Inline styles for dialog container
   */
  dialogStyle?: CSSProperties;

  /**
   * ARIA label for dialog
   */
  ariaLabel?: string;

  /**
   * Close button aria-label
   */
  closeButtonAriaLabel?: string;

  /**
   * Context value to provide to children
   */
  contextValue?: any;

  /**
   * Context Provider component
   */
  ContextProvider?: React.Provider<any>;

  /**
   * Whether to render dialog inside overlay (Modal) or as sibling (Drawer)
   * @default 'inside'
   */
  dialogPosition?: 'inside' | 'sibling';
}

/**
 * Base component for overlay dialogs (Modal, Drawer)
 * Consolidates duplicate logic for overlay handling, animations, hooks, and accessibility
 */
export const BaseOverlayDialog = ({
  children,
  isOpen,
  onClose,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  preventBodyScroll = true,
  overlayClassName,
  overlayVisibleClassName,
  dialogClassName,
  dialogVisibleClassName,
  closeButtonClassName,
  dialogStyle,
  ariaLabel = 'dialog',
  closeButtonAriaLabel,
  contextValue,
  ContextProvider,
  dialogPosition = 'inside',
}: BaseOverlayDialogProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null!);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Hooks
  useBodyScrollLock(isOpen && preventBodyScroll);
  useFocusTrap(dialogRef, isOpen);
  useEscapeKey(onClose, isOpen && closeOnEscape);

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === overlayRef.current) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  // Animation: Mount then show
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const overlayClasses = useMemo(
    () => cn(overlayClassName, isOpen && overlayVisibleClassName),
    [overlayClassName, overlayVisibleClassName, isOpen]
  );

  const dialogClasses = useMemo(
    () => cn(dialogClassName, isOpen && dialogVisibleClassName),
    [dialogClassName, dialogVisibleClassName, isOpen]
  );

  const closeButtonIconStyle = useMemo(
    () => ({
      width: 'var(--component-modal-close-button-size)',
      height: 'var(--component-modal-close-button-size)',
    }),
    []
  );

  if (!isVisible) return null;

  const closeButton = showCloseButton && (
    <button
      type="button"
      aria-label={closeButtonAriaLabel || `Close ${ariaLabel}`}
      className={cn(closeButtonClassName, 'absolute top-4 right-4')}
      onClick={onClose}
    >
      <BiX style={closeButtonIconStyle} />
    </button>
  );

  const dialogContent = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${ariaLabel}-title`}
      className={dialogClasses}
      style={dialogStyle}
      tabIndex={-1}
    >
      {ContextProvider && contextValue ? (
        <ContextProvider value={contextValue}>
          {closeButton}
          {children}
        </ContextProvider>
      ) : (
        <>
          {closeButton}
          {children}
        </>
      )}
    </div>
  );

  return (
    <Portal>
      {dialogPosition === 'inside' ? (
        <div
          ref={overlayRef}
          className={overlayClasses}
          onClick={handleOverlayClick}
          aria-hidden="true"
        >
          {dialogContent}
        </div>
      ) : (
        <>
          <div
            ref={overlayRef}
            className={overlayClasses}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
          {dialogContent}
        </>
      )}
    </Portal>
  );
};

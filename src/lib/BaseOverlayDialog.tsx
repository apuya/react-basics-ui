import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
  type Ref,
} from 'react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { cn } from '@/lib/cn';
import { Portal } from '@/components/utility/Portal';
import { Button } from '@/components/actions/Button';
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

  /**
   * Data attribute for size (for testing/styling)
   */
  dataSize?: string;

  /**
   * Data attribute for placement (for testing/styling)
   */
  dataPlacement?: string;

  /**
   * Data attribute for open state (for testing/styling)
   */
  dataOpen?: boolean;

  /**
   * Forwarded ref to dialog element
   */
  forwardedRef?: Ref<HTMLDivElement>;
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
  dialogStyle,
  ariaLabel = 'dialog',
  closeButtonAriaLabel,
  contextValue,
  ContextProvider,
  dialogPosition = 'inside',
  dataSize,
  dataPlacement,
  dataOpen,
  forwardedRef,
}: BaseOverlayDialogProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mergedDialogRef = useMergedRefs(forwardedRef, dialogRef);

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

  if (!isVisible) return null;

  const closeButton = showCloseButton && (
    <Button
      variant="tabs"
      size="small"
      leadingVisual={<BiX />}
      aria-label={closeButtonAriaLabel || `Close ${ariaLabel}`}
      className="absolute top-[length:var(--component-modal-close-button-offset)] right-[length:var(--component-modal-close-button-offset)]"
      onClick={onClose}
    />
  );

  const dialogContent = (
    <div
      ref={mergedDialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${ariaLabel}-title`}
      className={dialogClasses}
      style={dialogStyle}
      tabIndex={-1}
      data-size={dataSize}
      data-placement={dataPlacement}
      data-open={dataOpen || undefined}
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
          data-modal-overlay
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
            data-modal-overlay
          />
          {dialogContent}
        </>
      )}
    </Portal>
  );
};

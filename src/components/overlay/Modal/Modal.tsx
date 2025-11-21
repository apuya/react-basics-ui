import { cn } from '@/lib/cn';
import { useBodyScrollLock } from '@/lib/useBodyScrollLock';
import { useEscapeKey } from '@/lib/useEscapeKey';
import { useFocusTrap } from '@/lib/useFocusTrap';
import { Portal } from '@/components/utility/Portal';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { BiX } from 'react-icons/bi';
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

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

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
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null!);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Hooks
  useBodyScrollLock(isOpen && preventBodyScroll);
  useFocusTrap(modalRef, isOpen);
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
    () => cn(OVERLAY_CLASSES, isOpen && OVERLAY_VISIBLE_CLASS),
    [isOpen]
  );

  const modalClasses = useMemo(
    () => cn(MODAL_BASE_CLASSES, SIZE_STYLES[size], isOpen && MODAL_VISIBLE_CLASS),
    [size, isOpen]
  );

  const modalStyle = useMemo(
    () => ({
      marginInline: size === 'full' ? '0' : 'var(--semantic-space-default)',
    }),
    [size]
  );

  const closeButtonIconStyle = useMemo(
    () => ({
      width: 'var(--component-modal-close-button-size)',
      height: 'var(--component-modal-close-button-size)',
    }),
    []
  );

  const contextValue = useMemo(() => ({ onClose }), [onClose]);

  if (!isVisible) return null;

  return (
    <Portal>
      <div
        ref={overlayRef}
        className={overlayClasses}
        onClick={handleOverlayClick}
        aria-hidden="true"
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className={modalClasses}
          style={modalStyle}
          tabIndex={-1}
        >
          <ModalContext.Provider value={contextValue}>
            {showCloseButton && (
              <button
                type="button"
                aria-label="Close modal"
                className={cn(CLOSE_BUTTON_CLASSES, 'absolute top-4 right-4')}
                onClick={onClose}
              >
                <BiX style={closeButtonIconStyle} />
              </button>
            )}
            {children}
          </ModalContext.Provider>
        </div>
      </div>
    </Portal>
  );
};

// Compound Component Pattern
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
  Title: ModalTitle,
});

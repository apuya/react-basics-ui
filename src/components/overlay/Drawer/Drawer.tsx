import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { Portal } from '@/components/utility/Portal';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { cn } from '@/lib/cn';
import { BiX } from 'react-icons/bi';
import {
  BODY_CLASSES,
  CLOSE_BUTTON_CLASSES,
  CLOSE_BUTTON_ICON_CLASSES,
  DRAWER_BASE_CLASSES,
  DRAWER_VISIBLE_CLASS,
  FOOTER_CLASSES,
  HEADER_CLASSES,
  OVERLAY_CLASSES,
  OVERLAY_VISIBLE_CLASS,
  PLACEMENT_STYLES,
  PLACEMENT_VISIBLE_STYLES,
  SIZE_STYLES,
  TITLE_CLASSES,
} from './Drawer.styles';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

export interface DrawerProps {
  /** Drawer content */
  children: ReactNode;
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Placement of the drawer */
  placement?: DrawerPlacement;
  /** Size of the drawer */
  size?: DrawerSize;
  /** Whether clicking overlay closes drawer */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes drawer */
  closeOnEscape?: boolean;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether to prevent body scroll when open */
  preventBodyScroll?: boolean;
  /** Additional class names for the drawer */
  className?: string;
}

export interface DrawerHeaderProps extends ComponentPropsWithoutRef<'div'> {}
export interface DrawerBodyProps extends ComponentPropsWithoutRef<'div'> {}
export interface DrawerFooterProps extends ComponentPropsWithoutRef<'div'> {}
export interface DrawerTitleProps extends ComponentPropsWithoutRef<'h2'> {}

/**
 * Drawer Header - contains title and close button area
 */
const DrawerHeader = memo(
  forwardRef<HTMLDivElement, DrawerHeaderProps>(
    ({ className, children, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(HEADER_CLASSES, className)}
        {...props}
      >
        {children}
      </div>
    )
  )
);
DrawerHeader.displayName = 'Drawer.Header';

/**
 * Drawer Body - scrollable content area
 */
const DrawerBody = memo(
  forwardRef<HTMLDivElement, DrawerBodyProps>(
    ({ className, children, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(BODY_CLASSES, className)}
        {...props}
      >
        {children}
      </div>
    )
  )
);
DrawerBody.displayName = 'Drawer.Body';

/**
 * Drawer Footer - action buttons area
 */
const DrawerFooter = memo(
  forwardRef<HTMLDivElement, DrawerFooterProps>(
    ({ className, children, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(FOOTER_CLASSES, className)}
        {...props}
      >
        {children}
      </div>
    )
  )
);
DrawerFooter.displayName = 'Drawer.Footer';

/**
 * Drawer Title - heading element
 */
const DrawerTitle = memo(
  forwardRef<HTMLHeadingElement, DrawerTitleProps>(
    ({ className, children, style, ...props }, ref) => (
      <h2
        ref={ref}
        className={cn(TITLE_CLASSES, className)}
        style={style}
        {...props}
      >
        {children}
      </h2>
    )
  )
);
DrawerTitle.displayName = 'Drawer.Title';

/**
 * A drawer component that slides in from the edges of the screen.
 * Renders in a portal with focus trap, body scroll lock, and keyboard support.
 *
 * Use with Drawer.Header, Drawer.Body, Drawer.Footer, and Drawer.Title sub-components
 * to structure content with proper spacing applied via inline styles.
 */
const DrawerRoot = memo(
  forwardRef<HTMLDivElement, DrawerProps>(
    (
      {
        children,
        isOpen,
        onClose,
        placement = 'right',
        size = 'md',
        closeOnOverlayClick = true,
        closeOnEscape = true,
        showCloseButton = true,
        preventBodyScroll = true,
        className,
      },
      ref
    ) => {
      const [isVisible, setIsVisible] = useState(false);
      const drawerRef = useRef<HTMLDivElement>(null);
      const overlayRef = useRef<HTMLDivElement>(null);
      const mergedRef = useMergedRefs(ref, drawerRef);

      // Hooks
      useBodyScrollLock(isOpen && preventBodyScroll);
      useFocusTrap(drawerRef, isOpen);
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
          const timer = setTimeout(() => setIsVisible(false), 200);
          return () => clearTimeout(timer);
        }
      }, [isOpen]);

      const drawerClasses = useMemo(
        () =>
          cn(
            DRAWER_BASE_CLASSES,
            PLACEMENT_STYLES[placement],
            SIZE_STYLES[placement][size],
            isOpen && DRAWER_VISIBLE_CLASS,
            isOpen && PLACEMENT_VISIBLE_STYLES[placement],
            className
          ),
        [placement, size, isOpen, className]
      );

      const overlayClasses = useMemo(
        () => cn(OVERLAY_CLASSES, isOpen && OVERLAY_VISIBLE_CLASS),
        [isOpen]
      );

      if (!isVisible) return null;

      return (
        <Portal containerId="drawer-root">
          <div
            ref={overlayRef}
            className={overlayClasses}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
          <div
            ref={mergedRef}
            role="dialog"
            aria-modal="true"
            className={drawerClasses}
            tabIndex={-1}
            data-placement={placement}
            data-size={size}
            data-open={isOpen || undefined}
          >
            {showCloseButton && (
              <button
                type="button"
                aria-label="Close drawer"
                className={CLOSE_BUTTON_CLASSES}
                onClick={onClose}
              >
                <BiX className={CLOSE_BUTTON_ICON_CLASSES} />
              </button>
            )}
            {children}
          </div>
        </Portal>
      );
    }
  )
);

DrawerRoot.displayName = 'Drawer';

// Compound Component Pattern
export const Drawer = Object.assign(DrawerRoot, {
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Title: DrawerTitle,
});


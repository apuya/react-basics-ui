import { forwardRef, memo, useMemo, type ReactNode } from 'react';
import { BaseOverlayDialog } from '@/lib/BaseOverlayDialog';
import { cn } from '@/lib/cn';
import { DrawerHeader } from './DrawerHeader';
import { DrawerBody } from './DrawerBody';
import { DrawerFooter } from './DrawerFooter';
import { DrawerTitle } from './DrawerTitle';
import {
  DRAWER_BASE_CLASSES,
  DRAWER_VISIBLE_CLASS,
  OVERLAY_CLASSES,
  OVERLAY_VISIBLE_CLASS,
  PLACEMENT_STYLES,
  PLACEMENT_VISIBLE_STYLES,
  SIZE_STYLES,
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

/**
 * A drawer component that slides in from the edges of the screen.
 * Uses BaseOverlayDialog for overlay handling, focus management, and accessibility.
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
      const drawerClasses = useMemo(
        () =>
          cn(
            DRAWER_BASE_CLASSES,
            PLACEMENT_STYLES[placement],
            SIZE_STYLES[placement][size],
            className
          ),
        [placement, size, className]
      );

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
          dialogVisibleClassName={cn(DRAWER_VISIBLE_CLASS, PLACEMENT_VISIBLE_STYLES[placement])}
          ariaLabel="drawer"
          closeButtonAriaLabel="Close drawer"
          dialogPosition="sibling"
          dataSize={size}
          dataPlacement={placement}
          dataOpen={isOpen}
          forwardedRef={ref}
        >
          {children}
        </BaseOverlayDialog>
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


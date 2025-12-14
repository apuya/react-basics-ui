import { memo, useMemo, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { BiErrorCircle, BiCheckCircle, BiInfoCircle } from 'react-icons/bi';
import { Modal } from '@/components/overlays/Modal';
import { createComponentContext } from '@/lib/createComponentContext';
import { ConfirmDialogHeader } from './ConfirmDialogHeader';
import { ConfirmDialogIcon } from './ConfirmDialogIcon';
import { ConfirmDialogTitle } from './ConfirmDialogTitle';
import { ConfirmDialogContent } from './ConfirmDialogContent';
import { ConfirmDialogFooter } from './ConfirmDialogFooter';
import { ConfirmDialogCancelButton } from './ConfirmDialogCancelButton';
import { ConfirmDialogConfirmButton } from './ConfirmDialogConfirmButton';

// =============================================================================
// Types
// =============================================================================

export type ConfirmDialogVariant = 'default' | 'destructive' | 'warning' | 'info';

interface VariantConfig {
  icon: IconType;
  buttonVariant: 'primary' | 'destructive';
}

const VARIANT_CONFIG: Record<ConfirmDialogVariant, VariantConfig> = {
  default: {
    icon: BiCheckCircle,
    buttonVariant: 'primary',
  },
  destructive: {
    icon: BiErrorCircle,
    buttonVariant: 'destructive',
  },
  warning: {
    icon: BiErrorCircle,
    buttonVariant: 'primary',
  },
  info: {
    icon: BiInfoCircle,
    buttonVariant: 'primary',
  },
};

interface ConfirmDialogContextValue {
  variant: ConfirmDialogVariant;
  isLoading: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export interface ConfirmDialogProps {
  /** Whether dialog is open */
  isOpen: boolean;
  /** Callback when dialog should close */
  onClose: () => void;
  /** Visual variant affecting icon and button style */
  variant?: ConfirmDialogVariant;
  /** Loading state for confirm button */
  isLoading?: boolean;
  /** Callback when confirmed */
  onConfirm?: () => void;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Child components */
  children: ReactNode;
}

// =============================================================================
// Context
// =============================================================================

const { Context: ConfirmDialogContext, useContext: useConfirmDialogContext } =
  createComponentContext<ConfirmDialogContextValue>('ConfirmDialog');

// =============================================================================
// Root Component
// =============================================================================

/**
 * ConfirmDialog root component with compound pattern.
 * Provides context to all child components.
 *
 * @example
 * ```tsx
 * <ConfirmDialog isOpen={isOpen} onClose={handleClose} variant="destructive">
 *   <ConfirmDialog.Header>
 *     <ConfirmDialog.Icon />
 *     <ConfirmDialog.Title>Delete Item</ConfirmDialog.Title>
 *   </ConfirmDialog.Header>
 *   <ConfirmDialog.Content>
 *     Are you sure you want to delete this item?
 *   </ConfirmDialog.Content>
 *   <ConfirmDialog.Footer>
 *     <ConfirmDialog.CancelButton />
 *     <ConfirmDialog.ConfirmButton />
 *   </ConfirmDialog.Footer>
 * </ConfirmDialog>
 * ```
 */
const ConfirmDialogRoot = memo(
  ({
    isOpen,
    onClose,
    variant = 'default',
    isLoading = false,
    onConfirm,
    size = 'sm',
    children,
  }: ConfirmDialogProps) => {
    const contextValue = useMemo(
      () => ({ variant, isLoading, onClose, onConfirm }),
      [variant, isLoading, onClose, onConfirm]
    );

    return (
      <ConfirmDialogContext.Provider value={contextValue}>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={size}
          closeOnEscape={!isLoading}
          closeOnOverlayClick={!isLoading}
          showCloseButton={false}
        >
          {children}
        </Modal>
      </ConfirmDialogContext.Provider>
    );
  }
);
ConfirmDialogRoot.displayName = 'ConfirmDialog';

// =============================================================================
// Exports
// =============================================================================

// Export context hook for sub-components
export { useConfirmDialogContext };

// Export VARIANT_CONFIG for sub-components
export { VARIANT_CONFIG };

// =============================================================================
// Compound Component
// =============================================================================

export const ConfirmDialog = Object.assign(ConfirmDialogRoot, {
  Header: ConfirmDialogHeader,
  Icon: ConfirmDialogIcon,
  Title: ConfirmDialogTitle,
  Content: ConfirmDialogContent,
  Footer: ConfirmDialogFooter,
  CancelButton: ConfirmDialogCancelButton,
  ConfirmButton: ConfirmDialogConfirmButton,
});

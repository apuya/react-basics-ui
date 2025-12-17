import { memo, useMemo, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { BiErrorCircle, BiCheckCircle, BiInfoCircle } from 'react-icons/bi';
import { Modal } from '@/components/overlays/Modal';
import { createComponentContext } from '@/lib/createComponentContext';
import { ConfirmDialogHeader } from './ConfirmDialogHeader';
import { ConfirmDialogContent } from './ConfirmDialogContent';

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
  /** Button variant based on dialog variant */
  buttonVariant: 'primary' | 'destructive';
  /** Icon component for the variant */
  variantIcon: IconType;
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
 * A thin wrapper around Modal providing variant context.
 * 
 * Use `useConfirmDialogContext()` to access `variant`, `onClose`, `onConfirm`, 
 * `isLoading`, `buttonVariant`, and `variantIcon` for building dialogs.
 *
 * @example
 * ```tsx
 * const { variant, variantIcon } = useConfirmDialogContext();
 * 
 * <ConfirmDialog isOpen={isOpen} onClose={handleClose} variant="destructive">
 *   <ConfirmDialog.Header>
 *     <Icon icon={variantIcon} size="lg" />
 *     <Modal.Title as="h2" level="h4">Delete Item</Modal.Title>
 *   </ConfirmDialog.Header>
 *   <ConfirmDialog.Content>
 *     Are you sure you want to delete this item?
 *   </ConfirmDialog.Content>
 *   <ConfirmDialog.Footer>
 *     <Button variant="secondary" onClick={handleClose}>Cancel</Button>
 *     <Button variant="destructive" onClick={handleConfirm}>Delete</Button>
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
      () => ({
        variant,
        isLoading,
        onClose,
        onConfirm,
        buttonVariant: VARIANT_CONFIG[variant].buttonVariant,
        variantIcon: VARIANT_CONFIG[variant].icon,
      }),
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

// Export context hook for building custom buttons
export { useConfirmDialogContext };

// Re-export variant icon classes for styling
export { VARIANT_ICON_CLASSES } from './ConfirmDialog.styles';

// =============================================================================
// Compound Component
// =============================================================================

export const ConfirmDialog = Object.assign(ConfirmDialogRoot, {
  Header: ConfirmDialogHeader,
  Content: ConfirmDialogContent,
  Footer: Modal.Footer,
});

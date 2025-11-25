import React, { useCallback } from 'react';
import { Modal } from '@/components/basic/overlay/Modal';
import { Button } from '@/components/basic/forms/Button';
import { BiErrorCircle, BiCheckCircle, BiInfoCircle } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { DIALOG_CONTENT_CLASSES, ICON_CLASSES, ICON_WRAPPER_CLASSES } from './ConfirmDialog.styles';

export type ConfirmDialogVariant = 'default' | 'destructive' | 'warning' | 'info';

export interface ConfirmDialogProps {
  /** Whether dialog is open */
  isOpen: boolean;
  /** Callback when dialog should close */
  onClose: () => void;
  /** Dialog title */
  title: string;
  /** Dialog description */
  description?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Callback when confirmed */
  onConfirm?: () => void;
  /** Visual variant affecting icon and button style */
  variant?: ConfirmDialogVariant;
  /** Whether to show an icon */
  showIcon?: boolean;
  /** Loading state for confirm button */
  isLoading?: boolean;
  /** Custom content to display instead of description */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

const VARIANT_CONFIG: Record<ConfirmDialogVariant, {
  icon: React.ElementType;
  iconColor: string;
  buttonVariant: 'primary' | 'destructive';
}> = {
  default: {
    icon: BiCheckCircle,
    iconColor: 'text-blue-600 dark:text-blue-400',
    buttonVariant: 'primary',
  },
  destructive: {
    icon: BiErrorCircle,
    iconColor: 'text-red-600 dark:text-red-400',
    buttonVariant: 'destructive',
  },
  warning: {
    icon: BiErrorCircle,
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    buttonVariant: 'primary',
  },
  info: {
    icon: BiInfoCircle,
    iconColor: 'text-blue-600 dark:text-blue-400',
    buttonVariant: 'primary',
  },
};

/**
 * A confirmation dialog component for user confirmations and critical actions.
 * Built on top of Modal with pre-configured layout and action buttons.
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <ConfirmDialog
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Delete Item"
 *   description="Are you sure you want to delete this item? This action cannot be undone."
 *   variant="destructive"
 *   onConfirm={() => {
 *     // Handle deletion
 *     setIsOpen(false);
 *   }}
 * />
 * ```
 */
export const ConfirmDialog = React.memo<ConfirmDialogProps>(
  ({
    isOpen,
    onClose,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    variant = 'default',
    showIcon = true,
    isLoading = false,
    children,
    className,
  }) => {
    const config = VARIANT_CONFIG[variant];
    const Icon = config.icon;

    const handleConfirm = useCallback(() => {
      onConfirm?.();
    }, [onConfirm]);

    const handleCancel = useCallback(() => {
      onClose();
    }, [onClose]);

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        closeOnEscape={!isLoading}
        closeOnOverlayClick={!isLoading}
      >
        <Modal.Content>
          <Modal.Header>
            <div className="flex items-start gap-3 w-full">
              {showIcon && (
                <div className={ICON_WRAPPER_CLASSES}>
                  <Icon className={cn(ICON_CLASSES, config.iconColor)} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <Modal.Title>{title}</Modal.Title>
              </div>
            </div>
          </Modal.Header>
          <div className={cn(DIALOG_CONTENT_CLASSES, showIcon && 'pl-11', className)}>
            {children || (description && <p className="text-sm text-[var(--semantic-color-text-secondary)]">{description}</p>)}
          </div>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              variant={config.buttonVariant}
              onClick={handleConfirm}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {confirmText}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  }
);

ConfirmDialog.displayName = 'ConfirmDialog';

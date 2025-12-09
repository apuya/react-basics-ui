import { forwardRef, memo, useCallback, useMemo } from 'react';
import type { IconType } from 'react-icons';
import { BiErrorCircle, BiCheckCircle, BiInfoCircle } from 'react-icons/bi';
import { Modal } from '@/components/overlay/Modal';
import { Button } from '@/components/forms/Button';
import { Text } from '@/components/typography/Text';
import { Heading } from '@/components/typography/Heading';
import { Icon } from '@/components/utility/Icon';
import { Flex } from '@/components/layout/Flex';
import { Box } from '@/components/layout/Box';
import { cn } from '@/lib/cn';
import {
  DESCRIPTION_WITH_ICON_CLASSES,
  ICON_CLASSES,
  TITLE_WRAPPER_CLASSES,
  VARIANT_ICON_CLASSES,
} from './ConfirmDialog.styles';

export type ConfirmDialogVariant = 'default' | 'destructive' | 'warning' | 'info';

interface VariantConfig {
  icon: IconType;
  buttonVariant: 'primary' | 'destructive';
}

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
export const ConfirmDialog = memo(
  forwardRef<HTMLDivElement, ConfirmDialogProps>(function ConfirmDialog(
    {
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
    },
    ref
  ) {
    const config = VARIANT_CONFIG[variant];
    const VariantIcon = config.icon;

    const descriptionClasses = useMemo(
      () => cn(showIcon && DESCRIPTION_WITH_ICON_CLASSES, className),
      [showIcon, className]
    );

    const iconClasses = useMemo(
      () => cn(ICON_CLASSES, VARIANT_ICON_CLASSES[variant]),
      [variant]
    );

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
        showCloseButton={false}
      >
        {/* Header with icon and title */}
        <Flex
          ref={ref}
          align="start"
          className="w-full gap-4"
          data-variant={variant}
          data-loading={isLoading || undefined}
        >
          {showIcon && (
            <Icon
              icon={VariantIcon}
              size="lg"
              aria-hidden
              className={iconClasses}
            />
          )}
          <Box className={TITLE_WRAPPER_CLASSES}>
            <Heading as="h2" level="h4">
              {title}
            </Heading>
          </Box>
        </Flex>

        {/* Description */}
        <Box className={descriptionClasses}>
          {children || (
            description && (
              <Text as="p" size="body" color="secondary">
                {description}
              </Text>
            )
          )}
        </Box>

        {/* Footer with buttons */}
        <Flex align="center" justify="end" className="gap-4">
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
        </Flex>
      </Modal>
    );
  })
);

ConfirmDialog.displayName = 'ConfirmDialog';

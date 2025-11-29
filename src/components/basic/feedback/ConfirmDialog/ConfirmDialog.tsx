import { forwardRef, memo, useCallback, useMemo } from 'react';
import { type IconType } from 'react-icons';
import { Modal } from '@/components/basic/overlay/Modal';
import { Button } from '@/components/basic/forms/Button';
import { Text } from '@/components/basic/typography/Text';
import { Heading } from '@/components/basic/typography/Heading';
import { Icon } from '@/components/basic/utility/Icon';
import { BiErrorCircle, BiCheckCircle, BiInfoCircle } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import {
  BASE_CONTENT_CLASSES,
  CONTENT_WRAPPER_STYLES,
  DESCRIPTION_WRAPPER_STYLES,
  HEADER_CONTENT_CLASSES,
  HEADER_CONTENT_STYLES,
  ICON_WRAPPER_CLASSES,
  NO_BORDER_STYLES,
  SECTION_PADDING_STYLES,
  VARIANT_ICON_COLORS,
  type ConfirmDialogVariant,
} from './ConfirmDialog.styles';

export type { ConfirmDialogVariant };

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

    const contentClasses = useMemo(
      () => cn(showIcon && 'pl-11', className),
      [showIcon, className]
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
      >
        <Modal.Content ref={ref} style={CONTENT_WRAPPER_STYLES}>
          <Modal.Header style={{ ...SECTION_PADDING_STYLES, ...NO_BORDER_STYLES }}>
            <div className={HEADER_CONTENT_CLASSES} style={HEADER_CONTENT_STYLES}>
              {showIcon && (
                <Icon
                  icon={VariantIcon}
                  size="lg"
                  color={VARIANT_ICON_COLORS[variant]}
                  aria-hidden
                  className={ICON_WRAPPER_CLASSES}
                />
              )}
              <div className={BASE_CONTENT_CLASSES}>
                <Heading as="h2" level="h4">
                  {title}
                </Heading>
              </div>
            </div>
          </Modal.Header>
          <div className={contentClasses} style={DESCRIPTION_WRAPPER_STYLES}>
            {children || (
              description && (
                <Text as="p" size="body" color="secondary">
                  {description}
                </Text>
              )
            )}
          </div>
          <Modal.Footer style={{ ...SECTION_PADDING_STYLES, ...NO_BORDER_STYLES }}>
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
  })
);

ConfirmDialog.displayName = 'ConfirmDialog';

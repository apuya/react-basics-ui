import { forwardRef, memo, useMemo } from 'react';
import { BiCheckCircle, BiErrorCircle, BiInfoCircle, BiXCircle, BiX } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { Text } from '@/components/typography/Text';
import {
  BASE_CLASSES,
  VARIANT_STYLES,
  ICON_CLASSES,
  CONTENT_CLASSES,
  CLOSE_BUTTON_CLASSES,
  CLOSE_ICON_CLASSES,
} from './Toast.styles';

/** Available toast variants for different notification types. */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

const VARIANT_ICONS: Record<ToastVariant, React.ComponentType<{ className?: string }>> = {
  success: BiCheckCircle,
  error: BiXCircle,
  warning: BiErrorCircle,
  info: BiInfoCircle,
  default: BiInfoCircle,
};

const PADDING_STYLE = {
  paddingInline: 'var(--component-toast-padding-inline)',
  paddingBlock: 'var(--component-toast-padding-block)',
} as const;

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Visual variant of the toast. @default 'default' */
  variant?: ToastVariant;
  /** Title text of the toast notification. */
  title?: React.ReactNode;
  /** Description text of the toast notification. */
  description?: React.ReactNode;
  /** Callback when close button is clicked. */
  onClose?: () => void;
  /** Whether to show the variant icon. @default true */
  showIcon?: boolean;
}

/**
 * A toast notification component for displaying temporary messages.
 *
 * @example
 * ```tsx
 * <Toast variant="success" title="Saved" description="Your changes have been saved." onClose={() => {}} />
 * ```
 */
export const Toast = memo(
  forwardRef<HTMLDivElement, ToastProps>(
    (
      {
        variant = 'default',
        title,
        description,
        onClose,
        showIcon = true,
        className,
        children,
        ...props
      },
      ref
    ) => {
      const Icon = VARIANT_ICONS[variant];

      const toastClasses = useMemo(
        () => cn(BASE_CLASSES, VARIANT_STYLES[variant], className),
        [variant, className]
      );

      return (
        <div
          ref={ref}
          role="alert"
          aria-live="polite"
          className={toastClasses}
          style={PADDING_STYLE}
          {...props}
        >
          {showIcon && <Icon className={ICON_CLASSES} />}
          <div className={CONTENT_CLASSES}>
            {title && <Text as="div" size="body" weight="semibold" className="mb-1">{title}</Text>}
            {description && <Text as="div" size="small" weight="regular" className="opacity-90">{description}</Text>}
            {children}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={CLOSE_BUTTON_CLASSES}
              aria-label="Close notification"
            >
              <BiX className={CLOSE_ICON_CLASSES} />
            </button>
          )}
        </div>
      );
    }
  )
);

Toast.displayName = 'Toast';

import { type ComponentPropsWithoutRef, forwardRef, memo, useCallback, useMemo } from 'react';
import { BiCheckCircle, BiErrorCircle, BiInfoCircle, BiXCircle, BiX } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import {
  BASE_CLASSES,
  BODY_CLASSES,
  CLOSE_BUTTON_CLASSES,
  CLOSE_BUTTON_SIZE_STYLE,
  CONTAINER_CLASSES,
  CONTENT_CLASSES,
  ICON_COLOR_STYLES,
  ICON_SIZE_CLASS,
  TITLE_CLASSES,
  VARIANT_STYLES,
} from './Toast.styles';

/** Available toast variants for different notification types. */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

/**
 * Icon components mapped to each variant
 */
const VARIANT_ICONS = {
  success: BiCheckCircle,
  error: BiXCircle,
  warning: BiErrorCircle,
  info: BiInfoCircle,
  default: BiInfoCircle,
} as const;

export interface ToastProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * Visual variant of the toast
   * @default 'default'
   */
  variant?: ToastVariant;
  /**
   * Title text of the toast notification
   */
  title?: React.ReactNode;
  /**
   * Description text of the toast notification
   */
  description?: React.ReactNode;
  /**
   * Callback when close button is clicked.
   * If provided, a close button will be rendered.
   */
  onClose?: () => void;
  /**
   * Whether to show the variant icon
   * @default true
   */
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
  forwardRef<HTMLDivElement, ToastProps>(function Toast(
    {
      variant = 'default',
      title,
      description,
      onClose,
      showIcon = true,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const toastClasses = useMemo(
      () => cn(BASE_CLASSES, VARIANT_STYLES[variant], className),
      [variant, className]
    );

    const handleClose = useCallback(() => {
      onClose?.();
    }, [onClose]);

    const IconComponent = VARIANT_ICONS[variant];
    const hasContent = title || description || children;

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(toastClasses, CONTAINER_CLASSES)}
        data-variant={variant}
        {...rest}
      >
        {/* Icon */}
        {showIcon && (
          <span
            className={cn('shrink-0', ICON_COLOR_STYLES[variant], ICON_SIZE_CLASS)}
            aria-hidden="true"
          >
            <IconComponent />
          </span>
        )}

        {/* Content */}
        {hasContent && (
          <div className={CONTENT_CLASSES}>
            {title && <div className={TITLE_CLASSES}>{title}</div>}
            {description && (
              <div
                className={cn(BODY_CLASSES, title && 'mt-1')}
              >
                {description}
              </div>
            )}
            {children && !description && (
              <div
                className={cn(BODY_CLASSES, title && 'mt-1')}
              >
                {children}
              </div>
            )}
          </div>
        )}

        {/* Close button */}
        {onClose && (
          <button
            type="button"
            onClick={handleClose}
            className={cn('shrink-0', CLOSE_BUTTON_CLASSES, ICON_COLOR_STYLES[variant])}
            style={CLOSE_BUTTON_SIZE_STYLE}
            aria-label="Close notification"
          >
            <BiX />
          </button>
        )}
      </div>
    );
  })
);

Toast.displayName = 'Toast';

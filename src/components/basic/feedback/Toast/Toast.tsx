import { type ComponentPropsWithoutRef, forwardRef, memo } from 'react';
import { BiCheckCircle, BiErrorCircle, BiInfoCircle, BiXCircle, BiX } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import {
  BASE_CLASSES,
  BODY_STYLES,
  CLOSE_BUTTON_CLASSES,
  CLOSE_BUTTON_SIZE_STYLE,
  CONTAINER_STYLES,
  CONTENT_CLASSES,
  ICON_COLOR_STYLES,
  ICON_SIZE_STYLE,
  TITLE_STYLES,
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
    const toastClasses = cn(BASE_CLASSES, VARIANT_STYLES[variant], className);
    const IconComponent = VARIANT_ICONS[variant];
    const hasContent = title || description || children;

    // Shared style for description/children with conditional top margin
    const contentBodyStyle = {
      ...BODY_STYLES,
      marginTop: title ? 'var(--semantic-space-tight)' : '0',
    };

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={toastClasses}
        style={CONTAINER_STYLES}
        data-variant={variant}
        {...rest}
      >
        {/* Icon */}
        {showIcon && (
          <span
            className={cn('shrink-0', ICON_COLOR_STYLES[variant])}
            style={ICON_SIZE_STYLE}
            aria-hidden="true"
          >
            <IconComponent />
          </span>
        )}

        {/* Content */}
        {hasContent && (
          <div className={CONTENT_CLASSES}>
            {title && <div style={TITLE_STYLES}>{title}</div>}
            {description && <div style={contentBodyStyle}>{description}</div>}
            {children && !description && <div style={contentBodyStyle}>{children}</div>}
          </div>
        )}

        {/* Close button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
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

import { forwardRef, memo, useMemo } from 'react';
import { BiCheckCircle, BiErrorCircle, BiInfoCircle, BiXCircle, BiX } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import {
  BASE_CLASSES,
  VARIANT_STYLES,
  ICON_CLASSES,
  CONTENT_CLASSES,
  TITLE_CLASSES,
  DESCRIPTION_CLASSES,
  CLOSE_BUTTON_CLASSES,
  CLOSE_ICON_CLASSES,
} from './Toast.styles';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

const VARIANT_ICONS: Record<ToastVariant, React.ComponentType<{ className?: string }>> = {
  success: BiCheckCircle,
  error: BiXCircle,
  warning: BiErrorCircle,
  info: BiInfoCircle,
  default: BiInfoCircle,
};

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: ToastVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
  showIcon?: boolean;
}

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

    const paddingStyle = useMemo(
      () => ({
        paddingInline: 'var(--component-toast-padding-inline)',
        paddingBlock: 'var(--component-toast-padding-block)',
      }),
      []
    );      return (
        <div
          ref={ref}
          role="alert"
          aria-live="polite"
          className={toastClasses}
          style={paddingStyle}
          {...props}
        >
          {showIcon && <Icon className={ICON_CLASSES} />}
          <div className={CONTENT_CLASSES}>
            {title && <div className={TITLE_CLASSES}>{title}</div>}
            {description && <div className={DESCRIPTION_CLASSES}>{description}</div>}
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

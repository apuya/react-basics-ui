import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
  memo,
  useCallback,
  useMemo,
} from 'react';
import { BiX } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import {
  BASE_CLASSES,
  BODY_STYLES,
  CONTAINER_STYLES,
  CONTENT_GAP,
  ICON_COLOR_STYLES,
  ICON_SIZE_STYLE,
  TITLE_STYLES,
  type AlertVariant,
  VARIANT_ICONS,
  VARIANT_STYLES,
} from './Alert.styles';

export interface AlertProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * The visual variant of the alert
   * @default 'info'
   */
  variant?: AlertVariant;
  /**
   * Optional title for the alert
   */
  title?: ReactNode;
  /**
   * Optional description text for the alert
   */
  description?: ReactNode;
  /**
   * Whether to show the variant icon
   * @default true
   */
  showIcon?: boolean;
  /**
   * Optional callback when the alert is dismissed
   * If provided, a close button will be rendered
   */
  onClose?: () => void;
}

/**
 * Alert component for displaying important messages to users
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Success!" description="Your changes have been saved." />
 * <Alert variant="error" onClose={() => console.log('closed')}>
 *   An error occurred
 * </Alert>
 * ```
 */
export const Alert = memo(
  forwardRef<HTMLDivElement, AlertProps>(function Alert(
    {
      variant = 'info',
      title,
      description,
      showIcon = true,
      onClose,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const alertClasses = useMemo(
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
        className={alertClasses}
        style={CONTAINER_STYLES}
        data-variant={variant}
        {...rest}
      >
        {/* Icon */}
        {showIcon && (
          <span
            className={cn('flex-shrink-0', ICON_COLOR_STYLES[variant])}
            style={ICON_SIZE_STYLE}
            aria-hidden="true"
          >
            <IconComponent />
          </span>
        )}

        {/* Content */}
        {hasContent && (
          <div className="flex-1 min-w-0">
            {title && (
              <div
                className="font-[var(--component-alert-title-weight)]"
                style={TITLE_STYLES}
              >
                {title}
              </div>
            )}
            {description && (
              <div
                className="font-[var(--component-alert-body-weight)]"
                style={{
                  ...BODY_STYLES,
                  marginTop: title ? CONTENT_GAP : '0',
                }}
              >
                {description}
              </div>
            )}
            {children && !description && (
              <div
                className="font-[var(--component-alert-body-weight)]"
                style={{
                  ...BODY_STYLES,
                  marginTop: title ? CONTENT_GAP : '0',
                }}
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
            className={cn(
              'flex-shrink-0 inline-flex items-center justify-center rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1',
              ICON_COLOR_STYLES[variant]
            )}
            style={ICON_SIZE_STYLE}
            aria-label="Close alert"
          >
            <BiX />
          </button>
        )}
      </div>
    );
  })
);

Alert.displayName = 'Alert';

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
  memo,
  useMemo,
} from 'react';
import { BiX } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import {
  BASE_CLASSES,
  BODY_STYLES,
  CONTAINER_STYLES,
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
   * Optional icon to display at the start of the alert
   * Pass `null` to hide the default variant icon
   */
  leadingIcon?: ReactNode;
  /**
   * Optional icon to display at the end of the alert (before close button)
   */
  trailingIcon?: ReactNode;
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
      leadingIcon,
      trailingIcon,
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

    const DefaultIcon = VARIANT_ICONS[variant];
    
    // Determine which leading icon to render
    // undefined = show default variant icon
    // null = hide icon
    // ReactNode = show custom icon
    const resolvedLeadingIcon = useMemo(() => {
      if (leadingIcon === null) return null;
      if (leadingIcon !== undefined) return leadingIcon;
      return <DefaultIcon />;
    }, [leadingIcon, DefaultIcon]);

    // Use description if provided, otherwise fall back to children
    const bodyContent = description || children;
    const bodyStyles = useMemo(
      () => ({ ...BODY_STYLES, marginTop: title ? 'var(--component-alert-content-gap)' : '0' }),
      [title]
    );

    // Shared icon wrapper classes
    const iconClasses = useMemo(
      () => cn('flex-shrink-0', ICON_COLOR_STYLES[variant]),
      [variant]
    );

    return (
      <div
        ref={ref}
        role="alert"
        className={alertClasses}
        style={CONTAINER_STYLES}
        data-variant={variant}
        {...rest}
      >
        {/* Leading Icon */}
        {resolvedLeadingIcon && (
          <span className={iconClasses} style={ICON_SIZE_STYLE} aria-hidden="true">
            {resolvedLeadingIcon}
          </span>
        )}

        {/* Content */}
        {(title || bodyContent) && (
          <div className="flex-1 min-w-0">
            {title && (
              <div
                className="font-[var(--component-alert-title-weight)]"
                style={TITLE_STYLES}
              >
                {title}
              </div>
            )}
            {bodyContent && (
              <div
                className="font-[var(--component-alert-body-weight)]"
                style={bodyStyles}
              >
                {bodyContent}
              </div>
            )}
          </div>
        )}

        {/* Trailing Icon */}
        {trailingIcon && (
          <span className={iconClasses} style={ICON_SIZE_STYLE} aria-hidden="true">
            {trailingIcon}
          </span>
        )}

        {/* Close button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
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

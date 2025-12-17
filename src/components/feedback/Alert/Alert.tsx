import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
  memo,
} from 'react';
import { BaseAlertBox } from '../BaseAlertBox';
import {
  BASE_CLASSES,
  BODY_STYLES,
  CONTAINER_STYLES,
  ICON_COLOR_STYLES,
  ICON_SIZE_STYLE,
  TITLE_STYLES,
  type AlertVariant,
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
 * Alert component for displaying important messages to users.
 * Composed using BaseAlertBox for consistent structure with Toast component.
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
    return (
      <BaseAlertBox
        ref={ref}
        variant={variant}
        title={title}
        description={description}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
        onClose={onClose}
        closeButtonLabel="Close alert"
        baseClasses={BASE_CLASSES}
        variantClasses={VARIANT_STYLES}
        iconColorClasses={ICON_COLOR_STYLES}
        containerStyles={CONTAINER_STYLES}
        titleStyles={TITLE_STYLES}
        bodyStyles={BODY_STYLES}
        iconSizeStyle={ICON_SIZE_STYLE}
        className={className}
        {...rest}
      >
        {children}
      </BaseAlertBox>
    );
  })
);

Alert.displayName = 'Alert';

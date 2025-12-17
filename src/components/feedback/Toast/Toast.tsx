import { type ComponentPropsWithoutRef, forwardRef, memo } from 'react';
import { BaseAlertBox } from '../BaseAlertBox';
import {
  BASE_CLASSES,
  BODY_STYLES,
  CLOSE_BUTTON_SIZE_STYLE,
  CONTAINER_STYLES,
  ICON_COLOR_STYLES,
  ICON_SIZE_STYLE,
  TITLE_STYLES,
  VARIANT_STYLES,
} from './Toast.styles';

/** Available toast variants for different notification types. */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

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
 * Composed using BaseAlertBox for consistent structure with Alert component.
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
    return (
      <BaseAlertBox
        ref={ref}
        variant={variant}
        title={title}
        description={description}
        leadingIcon={showIcon ? undefined : null}
        onClose={onClose}
        closeButtonLabel="Close notification"
        baseClasses={BASE_CLASSES}
        variantClasses={VARIANT_STYLES}
        iconColorClasses={ICON_COLOR_STYLES}
        containerStyles={CONTAINER_STYLES}
        titleStyles={TITLE_STYLES}
        bodyStyles={BODY_STYLES}
        iconSizeStyle={ICON_SIZE_STYLE}
        closeButtonSizeStyle={CLOSE_BUTTON_SIZE_STYLE}
        className={className}
        {...rest}
      >
        {children}
      </BaseAlertBox>
    );
  })
);

Toast.displayName = 'Toast';

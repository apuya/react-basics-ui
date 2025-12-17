import { type ComponentPropsWithoutRef, type ReactNode, type ComponentType, forwardRef, memo, useMemo } from 'react';
import { BiX, BiCheckCircle, BiXCircle, BiErrorCircle, BiInfoCircle } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import {
  DEFAULT_BASE_CLASSES,
  DEFAULT_CLOSE_BUTTON_CLASSES,
  DEFAULT_ICON_CLASSES,
} from './BaseAlertBox.styles';

/**
 * Variant types for alert-style components
 */
export type BaseAlertVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

/**
 * Default variant icons - can be overridden via variantIcons prop
 */
export const DEFAULT_VARIANT_ICONS: Record<BaseAlertVariant, ComponentType> = {
  success: BiCheckCircle,
  error: BiXCircle,
  warning: BiErrorCircle,
  info: BiInfoCircle,
  default: BiInfoCircle,
} as const;

/**
 * Props for BaseAlertBox component
 */
export interface BaseAlertBoxProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * Visual variant
   */
  variant?: BaseAlertVariant;
  /**
   * Title content
   */
  title?: ReactNode;
  /**
   * Description/body content
   */
  description?: ReactNode;
  /**
   * Leading icon
   * - undefined: show default variant icon
   * - null: hide icon
   * - ReactNode: show custom icon
   */
  leadingIcon?: ReactNode | null;
  /**
   * Trailing icon
   */
  trailingIcon?: ReactNode;
  /**
   * Close button callback. If provided, renders close button.
   */
  onClose?: () => void;
  /**
   * Close button aria-label
   */
  closeButtonLabel?: string;
  /**
   * Custom variant icons mapping. If not provided, uses DEFAULT_VARIANT_ICONS.
   */
  variantIcons?: Record<string, ComponentType>;
  /**
   * Additional CSS classes for container (merged with base flex layout)
   */
  baseClasses?: string;
  /**
   * Variant-specific CSS classes for background/text colors
   */
  variantClasses: Record<string, string>;
  /**
   * Icon color CSS classes per variant
   */
  iconColorClasses: Record<string, string>;
  /**
   * Container styles (padding, gap)
   */
  containerStyles: React.CSSProperties;
  /**
   * Title styles (font-size, line-height, weight)
   */
  titleStyles: React.CSSProperties;
  /**
   * Body styles (font-size, line-height, weight)
   */
  bodyStyles: React.CSSProperties;
  /**
   * Icon size style
   */
  iconSizeStyle: React.CSSProperties;
  /**
   * Close button size style
   */
  closeButtonSizeStyle?: React.CSSProperties;
  /**
   * Close button classes
   */
  closeButtonClasses?: string;
}

/**
 * BaseAlertBox - Shared base component for Toast and Alert
 * 
 * Provides common structure:
 * - Container with flex layout
 * - Optional leading icon
 * - Content area (title + description)
 * - Optional trailing icon
 * - Optional close button
 * 
 * Styling is delegated to parent components via props to maintain
 * design token separation (toast tokens vs alert tokens).
 */
export const BaseAlertBox = memo(
  forwardRef<HTMLDivElement, BaseAlertBoxProps>(function BaseAlertBox(
    {
      variant = 'default',
      title,
      description,
      leadingIcon,
      trailingIcon,
      onClose,
      closeButtonLabel = 'Close',
      variantIcons = DEFAULT_VARIANT_ICONS,
      baseClasses,
      variantClasses,
      iconColorClasses,
      containerStyles,
      titleStyles,
      bodyStyles: bodyStylesProp,
      iconSizeStyle,
      closeButtonSizeStyle,
      closeButtonClasses = DEFAULT_CLOSE_BUTTON_CLASSES,
      className,
      children,
      role = 'alert',
      ...rest
    },
    ref
  ) {
    const containerClasses = useMemo(
      () => cn(DEFAULT_BASE_CLASSES, baseClasses, variantClasses[variant], className),
      [baseClasses, variantClasses, variant, className]
    );

    const iconClasses = useMemo(
      () => cn(DEFAULT_ICON_CLASSES, iconColorClasses[variant]),
      [iconColorClasses, variant]
    );

    // Resolve leading icon:
    // - undefined: show default variant icon
    // - null: hide icon
    // - ReactNode: show custom icon
    const resolvedLeadingIcon = useMemo(() => {
      if (leadingIcon === null) return null;
      if (leadingIcon !== undefined) return leadingIcon;
      
      const DefaultIcon = variantIcons[variant];
      return DefaultIcon ? <DefaultIcon /> : null;
    }, [leadingIcon, variantIcons, variant]);

    // Body content: prefer description, fallback to children
    const bodyContent = description || children;

    // Body styles with conditional margin based on title presence
    const bodyStyles = useMemo(
      () => ({
        ...bodyStylesProp,
        marginTop: title ? (bodyStylesProp as React.CSSProperties)?.marginTop ?? '0' : '0',
      }),
      [bodyStylesProp, title]
    );

    return (
      <div
        ref={ref}
        role={role}
        aria-live="polite"
        className={containerClasses}
        style={containerStyles}
        data-variant={variant}
        {...rest}
      >
        {/* Leading Icon */}
        {resolvedLeadingIcon !== null && resolvedLeadingIcon && (
          <span className={iconClasses} style={iconSizeStyle} aria-hidden="true">
            {resolvedLeadingIcon}
          </span>
        )}

        {/* Content */}
        {(title || bodyContent) && (
          <div className="flex-1 min-w-0">
            {title && <div style={titleStyles}>{title}</div>}
            {bodyContent && <div style={bodyStyles}>{bodyContent}</div>}
          </div>
        )}

        {/* Trailing Icon */}
        {trailingIcon && (
          <span className={iconClasses} style={iconSizeStyle} aria-hidden="true">
            {trailingIcon}
          </span>
        )}

        {/* Close Button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={cn(closeButtonClasses, iconClasses)}
            style={closeButtonSizeStyle}
            aria-label={closeButtonLabel}
          >
            <BiX />
          </button>
        )}
      </div>
    );
  })
);

BaseAlertBox.displayName = 'BaseAlertBox';

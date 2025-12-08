import React, { memo, useMemo, useCallback, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/utility/Icon';
import { Text } from '@/components/typography/Text';
import {
  STATUS_BASE_CLASSES,
  STATUS_INTERACTIVE_CLASSES,
  STATUS_DISABLED_CLASSES,
  STATUS_VARIANT_STYLES,
  STATUS_ICON_CLASSES,
  STATUS_CONTENT_CLASSES,
  STATUS_STYLE,
  ICON_SIZE_MAP,
  TEXT_SIZE_MAP,
} from './TimelineStatus.styles';

/** Status variant options */
export type TimelineStatusVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

/** Size options for the status component */
export type TimelineStatusSize = 'sm' | 'md' | 'lg';

/**
 * Props for the TimelineStatus sub-component.
 *
 * TimelineStatus displays an interactive status area within timeline items.
 * Supports icons, titles, descriptions, and click/navigation interactions.
 * Can be rendered as a button (onClick) or link (href).
 */
export interface TimelineStatusProps {
  /** Icon to display (IconType from react-icons) */
  icon?: IconType;
  /** Custom icon element (overrides icon prop) */
  iconElement?: ReactNode;
  /** Title text */
  title?: ReactNode;
  /** Description text */
  description?: ReactNode;
  /** Visual variant */
  variant?: TimelineStatusVariant;
  /** Size of the status area */
  size?: TimelineStatusSize;
  /** Click handler - makes the status interactive */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** URL to navigate to - makes the status interactive */
  href?: string;
  /** Whether the status is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * TimelineStatus - A sub-component for displaying interactive status areas in timeline items.
 *
 * Features:
 * - Uses Icon component for standardized icon rendering
 * - Uses Text component for standardized typography
 * - Supports 5 variants: default, info, success, warning, error
 * - Interactive when onClick or href is provided
 * - Keyboard accessible with focus ring
 *
 * @example
 * ```tsx
 * <Timeline.Status
 *   icon={BiLinkExternal}
 *   title="View details"
 *   description="Click to open"
 *   variant="success"
 *   onClick={() => console.log('clicked')}
 * />
 * ```
 */
export const TimelineStatus = memo(
  React.forwardRef<HTMLButtonElement | HTMLDivElement, TimelineStatusProps>(
    (
      {
        icon,
        iconElement,
        title,
        description,
        variant = 'default',
        size = 'md',
        onClick,
        href,
        disabled = false,
        className,
      },
      ref
    ) => {
      const isInteractive = !disabled && (!!onClick || !!href);

      // Build class names
      const statusClasses = useMemo(
        () =>
          cn(
            STATUS_BASE_CLASSES,
            STATUS_VARIANT_STYLES[variant],
            isInteractive && STATUS_INTERACTIVE_CLASSES,
            disabled && STATUS_DISABLED_CLASSES,
            className
          ),
        [variant, isInteractive, disabled, className]
      );

      // Handle click
      const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
          if (disabled) return;

          if (href) {
            window.location.href = href;
          }
          onClick?.(e);
        },
        [href, onClick, disabled]
      );

      // Render icon - prefer iconElement, then icon prop with Icon component
      const iconContent = useMemo(() => {
        if (iconElement) {
          return <span className={STATUS_ICON_CLASSES}>{iconElement}</span>;
        }
        if (icon) {
          return (
            <Icon
              icon={icon}
              size={ICON_SIZE_MAP[size]}
              color="inherit"
              className={STATUS_ICON_CLASSES}
            />
          );
        }
        return null;
      }, [iconElement, icon, size]);

      // Common content structure
      const content = (
        <>
          {iconContent}
          {(title || description) && (
            <div className={STATUS_CONTENT_CLASSES}>
              {title && (
                <Text as="div" size={TEXT_SIZE_MAP[size]} weight="semibold" color="primary">
                  {title}
                </Text>
              )}
              {description && (
                <Text as="div" size={TEXT_SIZE_MAP[size]} weight="regular" color="secondary">
                  {description}
                </Text>
              )}
            </div>
          )}
        </>
      );

      // Render as button when interactive, div otherwise
      if (isInteractive) {
        return (
          <button
            ref={ref as React.Ref<HTMLButtonElement>}
            type="button"
            className={statusClasses}
            style={STATUS_STYLE}
            onClick={handleClick}
            disabled={disabled}
            data-variant={variant}
            data-size={size}
          >
            {content}
          </button>
        );
      }

      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={statusClasses}
          style={STATUS_STYLE}
          data-variant={variant}
          data-size={size}
        >
          {content}
        </div>
      );
    }
  )
);

TimelineStatus.displayName = 'Timeline.Status';

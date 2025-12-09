import React, { memo, useMemo, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { cn } from '@/lib/cn';
import { Text } from '@/components/typography/Text';
import {
  ITEM_BASE_CLASSES,
  ITEM_DISABLED_CLASSES,
  ITEM_POSITION_STYLES,
  DOT_CONTAINER_CLASSES,
  DOT_BASE_CLASSES,
  DOT_VARIANT_STYLES,
  DOT_SIZE_STYLES,
  DOT_ICON_CONTAINER_SIZE_STYLES,
  CONNECTOR_CLASSES,
  CONNECTOR_LEFT_CLASSES,
  CONNECTOR_RIGHT_CLASSES,
  CONNECTOR_VARIANT_STYLES,
  CONTENT_BASE_CLASSES,
  CONTENT_HEADER_CLASSES,
  HEADER_CONTENT_WRAPPER_CLASSES,
  LEADING_CLASSES,
  SKELETON_DOT_CLASSES,
  SKELETON_LINE_CLASSES,
  // Spacing classes (migrated from inline styles)
  ITEM_SPACING_CLASSES,
  ITEM_LAST_SPACING_CLASSES,
  TITLE_SPACING_CLASSES,
  TIMESTAMP_SPACING_CLASSES,
  LEADING_SPACING_CLASSES,
  SKELETON_TIMESTAMP_CLASSES,
  SKELETON_TITLE_CLASSES,
  // Tailwind class-based sizing
  DOT_CONTAINER_WIDTH_CLASSES,
  ICON_WRAPPER_CLASSES,
  SKELETON_DOT_SIZE_CLASSES,
  // Inline styles for dynamic positioning only
  SKELETON_TIMESTAMP_STYLE,
  SKELETON_TITLE_STYLE,
  SKELETON_DESCRIPTION_STYLE,
  CONNECTOR_DOT_LEFT_STYLES,
  CONNECTOR_DOT_RIGHT_STYLES,
  CONNECTOR_ICON_LEFT_STYLES,
  CONNECTOR_ICON_RIGHT_STYLES,
} from './Timeline.styles';
import {
  useTimelineContext,
  type TimelineVariant,
  type TimelineSize,
  type TimelinePosition,
} from './Timeline.context';
import { TimelineStatus, type TimelineStatusVariant, type TimelineStatusSize } from './TimelineStatus';

export type { TimelineStatusVariant, TimelineStatusSize };

/**
 * Props for the TimelineItem component.
 *
 * TimelineItem represents a single event in a timeline with support for:
 * - Title, timestamp, and description
 * - Custom dot/icon display
 * - Leading elements (avatars, badges)
 * - Interactive status area
 * - Loading skeleton state
 */
export interface TimelineItemProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Item title displayed prominently */
  title?: ReactNode;
  /** Item timestamp (typically a date/time string) */
  timestamp?: string;
  /** Item description/content */
  description?: string;
  /** Visual variant of the dot */
  variant?: TimelineVariant;
  /** Custom dot element (replaces default dot) */
  dot?: ReactNode;
  /** Icon to display in the dot */
  icon?: ReactNode;
  /** Whether this is the last item (hides connector) */
  isLast?: boolean;
  /** Leading element displayed before the title (avatar, badge, etc.) */
  leading?: ReactNode;
  /** Icon for the status area (IconType from react-icons) */
  statusIcon?: IconType;
  /** Custom status icon element (overrides statusIcon) */
  statusIconElement?: ReactNode;
  /** Title for the status area */
  statusTitle?: ReactNode;
  /** Description for the status area */
  statusDescription?: ReactNode;
  /** Visual variant for the status area */
  statusVariant?: TimelineStatusVariant;
  /** Click handler for status area */
  onStatusClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** URL to navigate to from status area */
  statusHref?: string;
  /** Whether the item is in loading/skeleton state */
  loading?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  children?: ReactNode;
}

// Timeline Item Component
export const TimelineItem = memo(
  React.forwardRef<HTMLDivElement, TimelineItemProps>(
    (
      {
        title,
        timestamp,
        description,
        variant: variantProp = 'default',
        dot,
        icon,
        isLast = false,
        leading,
        statusIcon,
        statusIconElement,
        statusTitle,
        statusDescription,
        statusVariant = 'default',
        onStatusClick,
        statusHref,
        loading = false,
        disabled = false,
        className,
        children,
        ...props
      },
      ref
    ) => {
      const context = useTimelineContext();
      const position: TimelinePosition = context?.position ?? 'left';
      const size: TimelineSize = context?.size ?? 'md';
      const variant: TimelineVariant = variantProp;
      const itemIndex = context?.itemIndex ?? 0;

      // For alternate position, determine if item is on left or right
      const isAlternateLeft = position === 'alternate' && itemIndex % 2 === 0;
      const isAlternateRight = position === 'alternate' && itemIndex % 2 === 1;

      const itemClasses = useMemo(() => {
        const baseClasses = cn(ITEM_BASE_CLASSES, disabled && ITEM_DISABLED_CLASSES);

        if (position === 'alternate') {
          return cn(baseClasses, isAlternateLeft ? 'flex-row' : 'flex-row-reverse', className);
        }
        return cn(baseClasses, ITEM_POSITION_STYLES[position], className);
      }, [position, isAlternateLeft, disabled, className]);

      // Check if item has icon or custom dot
      const hasIconOrDot = icon || dot;

      const dotClasses = useMemo(() => {
        const sizeClass = hasIconOrDot ? DOT_ICON_CONTAINER_SIZE_STYLES[size] : DOT_SIZE_STYLES[size];
        return cn(DOT_BASE_CLASSES, sizeClass, DOT_VARIANT_STYLES[variant]);
      }, [hasIconOrDot, size, variant]);

      const iconWrapperClasses = hasIconOrDot ? ICON_WRAPPER_CLASSES[size] : undefined;

      const isRightAligned = position === 'right' || isAlternateRight;

      const connectorClasses = useMemo(() => {
        const alignmentClass = isRightAligned ? CONNECTOR_RIGHT_CLASSES : CONNECTOR_LEFT_CLASSES;
        return cn(CONNECTOR_CLASSES, alignmentClass, CONNECTOR_VARIANT_STYLES[variant]);
      }, [isRightAligned, variant]);

      const contentClasses = useMemo(() => {
        if (position === 'alternate') {
          return cn(CONTENT_BASE_CLASSES, isAlternateRight ? 'text-right' : '');
        }
        return cn(CONTENT_BASE_CLASSES, position === 'right' ? 'text-right' : '');
      }, [position, isAlternateRight]);

      const itemSpacingClasses = isLast ? ITEM_LAST_SPACING_CLASSES : ITEM_SPACING_CLASSES;

      const connectorStyle = useMemo(() => {
        if (hasIconOrDot) {
          return isRightAligned ? CONNECTOR_ICON_RIGHT_STYLES[size] : CONNECTOR_ICON_LEFT_STYLES[size];
        }
        return isRightAligned ? CONNECTOR_DOT_RIGHT_STYLES[size] : CONNECTOR_DOT_LEFT_STYLES[size];
      }, [hasIconOrDot, isRightAligned, size]);

      const dotContainerClasses = DOT_CONTAINER_WIDTH_CLASSES[size];

      // Determine if status should be shown
      const hasStatus = statusTitle || statusDescription || statusIcon || statusIconElement;

      // Render loading skeleton
      if (loading) {
        const skeletonAlignmentClass = position === 'right' ? CONNECTOR_RIGHT_CLASSES : CONNECTOR_LEFT_CLASSES;
        const skeletonConnectorStyle =
          position === 'right' ? CONNECTOR_DOT_RIGHT_STYLES[size] : CONNECTOR_DOT_LEFT_STYLES[size];

        return (
          <div
            ref={ref}
            role="listitem"
            className={cn(ITEM_BASE_CLASSES, ITEM_POSITION_STYLES[position], isLast ? ITEM_LAST_SPACING_CLASSES : ITEM_SPACING_CLASSES, className)}
            data-loading="true"
            aria-busy="true"
            {...props}
          >
            <div className={cn(DOT_CONTAINER_CLASSES, dotContainerClasses)} aria-hidden="true">
              <div className={cn(SKELETON_DOT_CLASSES, SKELETON_DOT_SIZE_CLASSES[size])} />
            </div>

            {!isLast && (
              <div
                className={cn(CONNECTOR_CLASSES, skeletonAlignmentClass, 'bg-[color:var(--component-timeline-skeleton-bg)]')}
                style={skeletonConnectorStyle}
                aria-hidden="true"
              />
            )}

            <div className={CONTENT_BASE_CLASSES}>
              <div className={cn(SKELETON_LINE_CLASSES, SKELETON_TIMESTAMP_CLASSES)} style={SKELETON_TIMESTAMP_STYLE} />
              <div className={cn(SKELETON_LINE_CLASSES, SKELETON_TITLE_CLASSES)} style={SKELETON_TITLE_STYLE} />
              <div className={SKELETON_LINE_CLASSES} style={SKELETON_DESCRIPTION_STYLE} />
            </div>
          </div>
        );
      }

      return (
        <div
          ref={ref}
          role="listitem"
          className={cn(itemClasses, itemSpacingClasses)}
          data-variant={variant}
          data-last={isLast || undefined}
          data-disabled={disabled || undefined}
          {...props}
        >
          {/* Dot Container */}
          <div className={cn(DOT_CONTAINER_CLASSES, dotContainerClasses)} aria-hidden="true">
            <div className={dotClasses}>
              {hasIconOrDot && <span className={iconWrapperClasses}>{dot ?? icon}</span>}
            </div>
          </div>

          {/* Connector */}
          {!isLast && <div className={connectorClasses} style={connectorStyle} aria-hidden="true" />}

          {/* Content */}
          <div className={contentClasses}>
            {/* Timestamp */}
            {timestamp && (
              <Text as="div" size="small" color="tertiary" className={TIMESTAMP_SPACING_CLASSES}>
                {timestamp}
              </Text>
            )}

            {/* Header: Leading + Title */}
            {(title || leading) && (
              <div className={cn(CONTENT_HEADER_CLASSES, TITLE_SPACING_CLASSES)}>
                <div className={HEADER_CONTENT_WRAPPER_CLASSES}>
                  {leading && (
                    <div className={cn(LEADING_CLASSES, LEADING_SPACING_CLASSES)}>
                      {leading}
                    </div>
                  )}
                  {title && (
                    <Text as="div" size="body" weight="semibold" className="flex-1 min-w-0">
                      {title}
                    </Text>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {description && (
              <Text as="div" size="small" color="secondary">
                {description}
              </Text>
            )}

            {/* Children */}
            {children}

            {/* Status Area - using TimelineStatus sub-component */}
            {hasStatus && (
              <TimelineStatus
                icon={statusIcon}
                iconElement={statusIconElement}
                title={statusTitle}
                description={statusDescription}
                variant={statusVariant}
                size={size}
                onClick={onStatusClick}
                href={statusHref}
                disabled={disabled}
              />
            )}
          </div>
        </div>
      );
    }
  )
);

TimelineItem.displayName = 'Timeline.Item';

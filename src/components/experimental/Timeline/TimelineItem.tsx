import React, { memo, useMemo, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { cn } from '@/lib/cn';
import { Text } from '@/components/basic/typography/Text';
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
  // Inline style tokens
  ITEM_STYLE,
  ITEM_LAST_STYLE,
  TITLE_STYLE,
  TIMESTAMP_STYLE,
  LEADING_STYLE,
  DOT_CONTAINER_WIDTH,
  ICON_WRAPPER_STYLES,
  SKELETON_DOT_SIZE,
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
  onStatusClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
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

      // Memoize computed boolean values
      // For alternate positioning: even indices (0, 2, 4...) render on left, odd indices (1, 3, 5...) on right
      const isAlternateLeft = useMemo(
        () => position === 'alternate' && itemIndex % 2 === 0,
        [position, itemIndex]
      );
      
      const isAlternateRight = useMemo(
        () => position === 'alternate' && itemIndex % 2 === 1,
        [position, itemIndex]
      );

      // Determine if item content should be right-aligned (affects text and connector placement)
      const isRightAligned = useMemo(
        () => position === 'right' || isAlternateRight,
        [position, isAlternateRight]
      );

      // Check if item has custom icon or dot element (affects sizing and styling)
      const hasIconOrDot = useMemo(() => !!(icon || dot), [icon, dot]);

      // Check if status area should be rendered
      const hasStatus = useMemo(
        () => !!(statusTitle || statusDescription || statusIcon || statusIconElement),
        [statusTitle, statusDescription, statusIcon, statusIconElement]
      );

      // Memoize class strings to prevent recalculation on every render
      const baseClasses = useMemo(
        () => cn(ITEM_BASE_CLASSES, disabled && ITEM_DISABLED_CLASSES),
        [disabled]
      );

      // Build item classes based on position (alternate uses dynamic flex-row/flex-row-reverse)
      const itemClasses = useMemo(() => {
        if (position === 'alternate') {
          return cn(baseClasses, isAlternateLeft ? 'flex-row' : 'flex-row-reverse', className);
        }
        return cn(baseClasses, ITEM_POSITION_STYLES[position], className);
      }, [position, isAlternateLeft, baseClasses, className]);

      const sizeClass = useMemo(
        () => hasIconOrDot ? DOT_ICON_CONTAINER_SIZE_STYLES[size] : DOT_SIZE_STYLES[size],
        [hasIconOrDot, size]
      );

      const dotClasses = useMemo(
        () => cn(DOT_BASE_CLASSES, sizeClass, DOT_VARIANT_STYLES[variant]),
        [sizeClass, variant]
      );

      const alignmentClass = useMemo(
        () => isRightAligned ? CONNECTOR_RIGHT_CLASSES : CONNECTOR_LEFT_CLASSES,
        [isRightAligned]
      );

      const connectorClasses = useMemo(
        () => cn(CONNECTOR_CLASSES, alignmentClass, CONNECTOR_VARIANT_STYLES[variant]),
        [alignmentClass, variant]
      );

      const contentClasses = useMemo(() => {
        if (position === 'alternate') {
          return cn(CONTENT_BASE_CLASSES, isAlternateRight ? 'text-right' : '');
        }
        return cn(CONTENT_BASE_CLASSES, position === 'right' ? 'text-right' : '');
      }, [position, isAlternateRight]);

      // Memoize style objects to prevent recreation
      const itemStyle = useMemo(() => isLast ? ITEM_LAST_STYLE : ITEM_STYLE, [isLast]);

      const iconWrapperStyle = useMemo(
        () => hasIconOrDot ? ICON_WRAPPER_STYLES[size] : undefined,
        [hasIconOrDot, size]
      );

      // Connector positioning varies based on whether item has icon (larger) or just dot (smaller)
      const connectorStyle = useMemo(() => {
        if (hasIconOrDot) {
          return isRightAligned ? CONNECTOR_ICON_RIGHT_STYLES[size] : CONNECTOR_ICON_LEFT_STYLES[size];
        }
        return isRightAligned ? CONNECTOR_DOT_RIGHT_STYLES[size] : CONNECTOR_DOT_LEFT_STYLES[size];
      }, [hasIconOrDot, isRightAligned, size]);

      const dotContainerStyle = useMemo(() => DOT_CONTAINER_WIDTH[size], [size]);

      // Memoize skeleton-specific values
      const skeletonAlignmentClass = useMemo(
        () => position === 'right' ? CONNECTOR_RIGHT_CLASSES : CONNECTOR_LEFT_CLASSES,
        [position]
      );

      const skeletonConnectorStyle = useMemo(
        () => position === 'right' ? CONNECTOR_DOT_RIGHT_STYLES[size] : CONNECTOR_DOT_LEFT_STYLES[size],
        [position, size]
      );

      const skeletonDotSize = useMemo(() => SKELETON_DOT_SIZE[size], [size]);

      // Memoize skeleton item classes
      const skeletonItemClasses = useMemo(
        () => cn(ITEM_BASE_CLASSES, ITEM_POSITION_STYLES[position], className),
        [position, className]
      );

      // Render loading skeleton
      if (loading) {

        return (
          <div
            ref={ref}
            role="listitem"
            className={skeletonItemClasses}
            style={itemStyle}
            data-loading="true"
            aria-busy="true"
            {...props}
          >
            <div className={DOT_CONTAINER_CLASSES} style={dotContainerStyle} aria-hidden="true">
              <div className={SKELETON_DOT_CLASSES} style={skeletonDotSize} />
            </div>

            {!isLast && (
              <div
                className={cn(CONNECTOR_CLASSES, skeletonAlignmentClass, 'bg-[color:var(--component-timeline-skeleton-bg)]')}
                style={skeletonConnectorStyle}
                aria-hidden="true"
              />
            )}

            <div className={CONTENT_BASE_CLASSES}>
              <div className={SKELETON_LINE_CLASSES} style={SKELETON_TIMESTAMP_STYLE} />
              <div className={SKELETON_LINE_CLASSES} style={SKELETON_TITLE_STYLE} />
              <div className={SKELETON_LINE_CLASSES} style={SKELETON_DESCRIPTION_STYLE} />
            </div>
          </div>
        );
      }

      return (
        <div
          ref={ref}
          role="listitem"
          className={itemClasses}
          style={itemStyle}
          data-variant={variant}
          data-position={isAlternateRight ? 'right' : isAlternateLeft ? 'left' : position}
          data-has-icon={hasIconOrDot || undefined}
          data-last={isLast || undefined}
          data-disabled={disabled || undefined}
          {...props}
        >
          {/* Dot Container */}
          <div className={DOT_CONTAINER_CLASSES} style={dotContainerStyle} aria-hidden="true">
            <div className={dotClasses}>
              {hasIconOrDot && <span style={iconWrapperStyle}>{dot ?? icon}</span>}
            </div>
          </div>

          {/* Connector */}
          {!isLast && <div className={connectorClasses} style={connectorStyle} aria-hidden="true" />}

          {/* Content */}
          <div className={contentClasses}>
            {/* Timestamp */}
            {timestamp && (
              <Text as="div" size="small" color="tertiary" style={TIMESTAMP_STYLE}>
                {timestamp}
              </Text>
            )}

            {/* Header: Leading + Title */}
            {(title || leading) && (
              <div className={CONTENT_HEADER_CLASSES} style={TITLE_STYLE}>
                <div className={HEADER_CONTENT_WRAPPER_CLASSES}>
                  {leading && (
                    <div className={LEADING_CLASSES} style={LEADING_STYLE}>
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

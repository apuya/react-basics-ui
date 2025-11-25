import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import {
  TIMELINE_BASE_CLASSES,
  TIMELINE_POSITION_STYLES,
  ITEM_BASE_CLASSES,
  ITEM_POSITION_STYLES,
  DOT_CONTAINER_CLASSES,
  DOT_BASE_CLASSES,
  DOT_VARIANT_STYLES,
  DOT_SIZE_STYLES,
  DOT_ICON_SIZE_STYLES,
  CONNECTOR_CLASSES,
  CONNECTOR_VARIANT_STYLES,
  CONTENT_BASE_CLASSES,
  TITLE_CLASSES,
  TIMESTAMP_CLASSES,
  DESCRIPTION_CLASSES,
} from './Timeline.styles';

export type TimelinePosition = 'left' | 'right' | 'alternate';
export type TimelineVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type TimelineSize = 'sm' | 'md' | 'lg';

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Position of timeline items */
  position?: TimelinePosition;
  /** Size of timeline dots */
  size?: TimelineSize;
  children?: ReactNode;
}

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Item title */
  title?: string;
  /** Item timestamp */
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
  children?: ReactNode;
}

interface TimelineContextValue {
  position: TimelinePosition;
  size: TimelineSize;
  itemIndex: number;
}

const TimelineContext = createContext<TimelineContextValue | undefined>(undefined);

const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  return context;
};

// Main Timeline Component
const TimelineRoot = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ position = 'left', size = 'md', className, children, ...props }, ref) => {
    const timelineClasses = useMemo(
      () => cn(TIMELINE_BASE_CLASSES, TIMELINE_POSITION_STYLES[position], className),
      [position, className]
    );

    // Add index to each child
    const childrenWithIndex = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      const contextValue: TimelineContextValue = {
        position,
        size,
        itemIndex: index,
      };

      return (
        <TimelineContext.Provider value={contextValue}>
          {child}
        </TimelineContext.Provider>
      );
    });

    return (
      <div ref={ref} className={timelineClasses} {...props}>
        {childrenWithIndex}
      </div>
    );
  }
);

TimelineRoot.displayName = 'Timeline';

// Timeline Item Component
const TimelineItemComponent = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      title,
      timestamp,
      description,
      variant = 'default',
      dot,
      icon,
      isLast = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const context = useTimelineContext();
    const position = context?.position || 'left';
    const size = context?.size || 'md';
    const itemIndex = context?.itemIndex || 0;

    // For alternate position, determine if item is on left or right
    const isAlternateLeft = position === 'alternate' && itemIndex % 2 === 0;
    const isAlternateRight = position === 'alternate' && itemIndex % 2 === 1;

    const itemClasses = useMemo(() => {
      if (position === 'alternate') {
        return cn(
          ITEM_BASE_CLASSES,
          isAlternateLeft ? 'flex-row' : 'flex-row-reverse',
          className
        );
      }
      return cn(ITEM_BASE_CLASSES, ITEM_POSITION_STYLES[position], className);
    }, [position, isAlternateLeft, className]);

    const dotClasses = useMemo(() => {
      if (icon || dot) {
        return cn(
          DOT_BASE_CLASSES,
          DOT_ICON_SIZE_STYLES[size],
          DOT_VARIANT_STYLES[variant]
        );
      }
      return cn(DOT_BASE_CLASSES, DOT_SIZE_STYLES[size], DOT_VARIANT_STYLES[variant]);
    }, [icon, dot, size, variant]);

    const connectorClasses = useMemo(
      () => cn(CONNECTOR_CLASSES, CONNECTOR_VARIANT_STYLES[variant]),
      [variant]
    );

    const contentClasses = useMemo(() => {
      if (position === 'alternate') {
        return cn(CONTENT_BASE_CLASSES, isAlternateRight ? 'text-right' : '');
      }
      return cn(CONTENT_BASE_CLASSES, position === 'right' ? 'text-right' : '');
    }, [position, isAlternateRight]);

    return (
      <div ref={ref} className={itemClasses} {...props}>
        {/* Dot and Connector */}
        <div className={DOT_CONTAINER_CLASSES}>
          <div className={dotClasses}>
            {dot || icon || null}
          </div>
          {!isLast && (
            <div
              className={connectorClasses}
              style={{ height: 'calc(100% + 2rem)' }}
            />
          )}
        </div>

        {/* Content */}
        <div className={contentClasses}>
          {timestamp && <div className={TIMESTAMP_CLASSES}>{timestamp}</div>}
          {title && <div className={TITLE_CLASSES}>{title}</div>}
          {description && <div className={DESCRIPTION_CLASSES}>{description}</div>}
          {children}
        </div>
      </div>
    );
  }
);

TimelineItemComponent.displayName = 'Timeline.Item';

// Compound Component Pattern
export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItemComponent,
});

export const TimelineItem = TimelineItemComponent;

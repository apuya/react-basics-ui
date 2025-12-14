import React, { memo, useMemo, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import {
  TIMELINE_BASE_CLASSES,
  TIMELINE_POSITION_STYLES,
} from './Timeline.styles';
import {
  TimelineContext,
  type TimelineContextValue,
  type TimelinePosition,
  type TimelineSize,
} from './Timeline.context';
import { TimelineItem } from './TimelineItem';
import { TimelineStatus } from './TimelineStatus';

export type { TimelinePosition, TimelineVariant, TimelineSize } from './Timeline.context';
export type { TimelineItemProps, TimelineStatusVariant, TimelineStatusSize } from './TimelineItem';
export type { TimelineStatusProps } from './TimelineStatus';

/**
 * Props for the Timeline component.
 *
 * Timeline displays a chronological sequence of events with customizable
 * dots, connectors, and content areas. Supports left, right, and alternating positions.
 */
export interface TimelineProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Position of timeline items relative to the connector line */
  position?: TimelinePosition;
  /** Size of timeline dots and icons */
  size?: TimelineSize;
  /** Timeline items (typically Timeline.Item components) */
  children?: ReactNode;
}

// Main Timeline Component
const TimelineRoot = memo(
  React.forwardRef<HTMLDivElement, TimelineProps>(
    ({ position = 'left', size = 'md', className, children, ...props }, ref) => {
      const timelineClasses = useMemo(
        () => cn(TIMELINE_BASE_CLASSES, TIMELINE_POSITION_STYLES[position], className),
        [position, className]
      );

      // Add index to each child - wrap all children in single context provider with index
      const childrenWithIndex = useMemo(
        () =>
          React.Children.map(children, (child, index) => {
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
          }),
        [children, position, size]
      );

      return (
        <div
          ref={ref}
          role="list"
          aria-label="Timeline"
          className={timelineClasses}
          data-position={position}
          data-size={size}
          {...props}
        >
          {childrenWithIndex}
        </div>
      );
    }
  )
);

TimelineRoot.displayName = 'Timeline';

// Compound Component Pattern
export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  Status: TimelineStatus,
});

export { TimelineItem, TimelineStatus };

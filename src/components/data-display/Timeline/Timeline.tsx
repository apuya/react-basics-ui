import React from 'react';

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Item title */
  title?: string;
  /** Item timestamp */
  timestamp?: string;
  /** Custom dot element */
  dot?: React.ReactNode;
  children?: React.ReactNode;
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ title, timestamp, dot, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        <div>{dot || <span />}</div>
        <div>
          {title && <div>{title}</div>}
          {timestamp && <div>{timestamp}</div>}
          {children}
        </div>
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';
TimelineItem.displayName = 'TimelineItem';

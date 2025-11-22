import React from 'react';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio (width / height) */
  ratio?: number;
  children?: React.ReactNode;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, children, style, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          position: 'relative',
          paddingBottom: `${100 / ratio}%`,
          ...style,
        }}
        {...props}
      >
        <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
      </div>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';

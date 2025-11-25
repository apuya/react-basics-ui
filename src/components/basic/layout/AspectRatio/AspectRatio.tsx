import { cn } from '@/lib/cn';
import React, { useMemo } from 'react';
import { BASE_CLASSES, COMMON_RATIOS, type CommonRatioName } from './AspectRatio.styles';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio (width / height) - can be a number or a common ratio name */
  ratio?: number | CommonRatioName;
  /** Children to render inside the aspect ratio container */
  children?: React.ReactNode;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, children, style, className, ...props }, ref) => {
    const actualRatio = useMemo(() => {
      if (typeof ratio === 'string') {
        return COMMON_RATIOS[ratio] || 1;
      }
      return ratio;
    }, [ratio]);

    return (
      <div
        ref={ref}
        className={cn(BASE_CLASSES, className)}
        style={{
          paddingBottom: `${100 / actualRatio}%`,
          ...style,
        }}
        {...props}
      >
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';

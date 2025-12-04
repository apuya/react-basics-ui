import { cn } from '@/lib/cn';
import React, { memo, useMemo } from 'react';
import { BASE_CLASSES, COMMON_RATIOS, type CommonRatioName } from './AspectRatio.styles';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio (width / height) - can be a number or a common ratio name */
  ratio?: number | CommonRatioName;
  /** Children to render inside the aspect ratio container */
  children?: React.ReactNode;
}

export const AspectRatio = memo(
  React.forwardRef<HTMLDivElement, AspectRatioProps>(
    ({ ratio = 1, children, style, className, ...props }, ref) => {
      const actualRatio = useMemo(() => {
        if (typeof ratio === 'string') {
          return COMMON_RATIOS[ratio] || 1;
        }
        return ratio;
      }, [ratio]);

      const classes = useMemo(
        () => cn(BASE_CLASSES, className),
        [className]
      );

      const containerStyle = useMemo(
        () => ({
          paddingBottom: `${100 / actualRatio}%`,
          ...style,
        }),
        [actualRatio, style]
      );

      // Determine data-ratio value
      const ratioName = typeof ratio === 'string' ? ratio : undefined;

      return (
        <div
          ref={ref}
          className={classes}
          style={containerStyle}
          data-ratio={ratioName}
          {...props}
        >
          <div className="absolute inset-0">{children}</div>
        </div>
      );
    }
  )
);

AspectRatio.displayName = 'AspectRatio';

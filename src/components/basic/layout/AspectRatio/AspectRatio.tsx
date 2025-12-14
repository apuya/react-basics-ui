import { cn } from '@/lib/cn';
import React, { memo, useMemo } from 'react';
import { BASE_CLASSES, COMMON_RATIOS } from './AspectRatio.styles';
import type { AspectRatioProps } from './AspectRatio.types';

// =============================================================================
// AspectRatio Component
// =============================================================================

/**
 * Maintains a consistent aspect ratio for its children.
 * Useful for responsive images, videos, and other media.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio="video">
 *   <img src="thumbnail.jpg" alt="Video thumbnail" />
 * </AspectRatio>
 * ```
 */
export const AspectRatio = memo(
  React.forwardRef<HTMLDivElement, AspectRatioProps>(function AspectRatio(
    { ratio = 1, children, style, className, ...props },
    ref
  ) {
    const actualRatio = useMemo(() => {
      if (typeof ratio === 'string') {
        return COMMON_RATIOS[ratio] || 1;
      }
      return ratio;
    }, [ratio]);

    const classes = useMemo(() => cn(BASE_CLASSES, className), [className]);

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
  })
);

AspectRatio.displayName = 'AspectRatio';

import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import {
  BASE_CLASSES,
  ANIMATION_STYLES,
  VARIANT_STYLES,
  type SkeletonVariant,
  type SkeletonAnimation,
} from './Skeleton.styles';

export interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * The visual variant of the skeleton
   * @default 'rectangle'
   */
  variant?: SkeletonVariant;
  /**
   * The animation type
   * @default 'pulse'
   */
  animation?: SkeletonAnimation | false;
  /**
   * Width of the skeleton (can use CSS units)
   */
  width?: string | number;
  /**
   * Height of the skeleton (can use CSS units)
   */
  height?: string | number;
  /**
   * Number of lines to render (only for 'text' variant)
   */
  count?: number;
}

/**
 * Skeleton component for loading placeholders
 * 
 * @example
 * ```tsx
 * // Basic rectangle
 * <Skeleton width={200} height={100} />
 * 
 * // Circle avatar
 * <Skeleton variant="circle" width={40} height={40} />
 * 
 * // Text lines
 * <Skeleton variant="text" count={3} />
 * 
 * // Wave animation
 * <Skeleton animation="wave" width="100%" height={200} />
 * ```
 */
export const Skeleton = memo(
  forwardRef<HTMLDivElement, SkeletonProps>(
    (
      {
        variant = 'rectangle',
        animation = 'pulse',
        width,
        height,
        count = 1,
        className,
        style,
        ...props
      },
      ref
    ) => {
      const variantClass = VARIANT_STYLES[variant];
      const animationClass = animation ? ANIMATION_STYLES[animation] : '';

      const computedStyle = useMemo(() => {
        const styles: React.CSSProperties = {
          backgroundColor: 'var(--component-skeleton-bg)',
          ...style,
        };
        
        if (width !== undefined) {
          styles.width = typeof width === 'number' ? `${width}px` : width;
        }
        
        if (height !== undefined) {
          styles.height = typeof height === 'number' ? `${height}px` : height;
        }
        
        return styles;
      }, [width, height, style]);

      const classes = useMemo(
        () => cn(BASE_CLASSES, variantClass, animationClass, className),
        [variantClass, animationClass, className]
      );

      // For text variant with count > 1, render multiple lines
      if (variant === 'text' && count > 1) {
        return (
          <div className="space-y-2" {...props}>
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                ref={index === 0 ? ref : undefined}
                className={classes}
                style={{
                  ...computedStyle,
                  // Last line is typically shorter
                  width: index === count - 1 ? '80%' : computedStyle.width,
                }}
                aria-busy="true"
                aria-live="polite"
              />
            ))}
          </div>
        );
      }

      return (
        <div
          ref={ref}
          className={classes}
          style={computedStyle}
          aria-busy="true"
          aria-live="polite"
          {...props}
        />
      );
    }
  )
);

Skeleton.displayName = 'Skeleton';

export type { SkeletonProps };

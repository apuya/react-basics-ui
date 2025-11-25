import { cn } from '@/lib/cn';
import React, { useMemo } from 'react';
import {
  ALIGN_STYLES,
  BASE_CLASSES,
  DIRECTION_STYLES,
  GAP_STYLES,
  JUSTIFY_STYLES,
  WRAP_STYLES,
} from './Flex.styles';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex direction */
  direction?: keyof typeof DIRECTION_STYLES;
  /** Align items */
  align?: keyof typeof ALIGN_STYLES;
  /** Justify content */
  justify?: keyof typeof JUSTIFY_STYLES;
  /** Flex wrap */
  wrap?: keyof typeof WRAP_STYLES;
  /** Gap between items - can be a preset size or custom value */
  gap?: keyof typeof GAP_STYLES | number | string;
  /** Display as inline-flex instead of flex */
  inline?: boolean;
  /** Children elements */
  children?: React.ReactNode;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      align,
      justify,
      wrap,
      gap,
      inline = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const gapStyle = useMemo(() => {
      if (!gap) return undefined;
      
      // If gap is a number, convert to rem
      if (typeof gap === 'number') {
        return { gap: `${gap}rem` };
      }
      
      // If gap is a custom string (not a preset), use it directly
      if (typeof gap === 'string' && !(gap in GAP_STYLES)) {
        return { gap };
      }
      
      return undefined;
    }, [gap]);

    const gapClass = useMemo(() => {
      if (typeof gap === 'string' && gap in GAP_STYLES) {
        return GAP_STYLES[gap as keyof typeof GAP_STYLES];
      }
      return undefined;
    }, [gap]);

    const classes = cn(
      inline ? 'inline-flex' : BASE_CLASSES,
      DIRECTION_STYLES[direction],
      align && ALIGN_STYLES[align],
      justify && JUSTIFY_STYLES[justify],
      wrap && WRAP_STYLES[wrap],
      gapClass,
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        style={{
          ...gapStyle,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

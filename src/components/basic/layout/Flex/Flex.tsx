import { cn } from '@/lib/cn';
import React, { memo, useMemo } from 'react';
import {
  ALIGN_STYLES,
  BASE_CLASSES,
  DIRECTION_STYLES,
  GAP_STYLES,
  JUSTIFY_STYLES,
  WRAP_STYLES,
} from './Flex.styles';

export type FlexDirection = keyof typeof DIRECTION_STYLES;
export type FlexAlign = keyof typeof ALIGN_STYLES;
export type FlexJustify = keyof typeof JUSTIFY_STYLES;
export type FlexWrap = keyof typeof WRAP_STYLES;
export type FlexGap = keyof typeof GAP_STYLES;

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex direction */
  direction?: FlexDirection;
  /** Align items */
  align?: FlexAlign;
  /** Justify content */
  justify?: FlexJustify;
  /** Flex wrap */
  wrap?: FlexWrap;
  /** Gap between items - can be a preset size or custom value */
  gap?: FlexGap | number | string;
  /** Display as inline-flex instead of flex */
  inline?: boolean;
  /** Children elements */
  children?: React.ReactNode;
}

export const Flex = memo(
  React.forwardRef<HTMLDivElement, FlexProps>(
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

      const classes = useMemo(
        () =>
          cn(
            inline ? 'inline-flex' : BASE_CLASSES,
            DIRECTION_STYLES[direction],
            align && ALIGN_STYLES[align],
            justify && JUSTIFY_STYLES[justify],
            wrap && WRAP_STYLES[wrap],
            gapClass,
            className
          ),
        [inline, direction, align, justify, wrap, gapClass, className]
      );

      // Data attributes for preset values only
      const dataGap =
        typeof gap === 'string' && gap in GAP_STYLES ? gap : undefined;

      return (
        <div
          ref={ref}
          className={classes}
          style={{
            ...gapStyle,
            ...style,
          }}
          data-direction={direction}
          data-gap={dataGap}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);

Flex.displayName = 'Flex';

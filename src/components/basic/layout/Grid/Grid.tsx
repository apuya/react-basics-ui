import { cn } from '@/lib/cn';
import React, { useMemo } from 'react';
import {
  ALIGN_STYLES,
  BASE_CLASSES,
  COLS_STYLES,
  FLOW_STYLES,
  GAP_STYLES,
  GAP_X_STYLES,
  GAP_Y_STYLES,
  JUSTIFY_STYLES,
  ROWS_STYLES,
} from './Grid.styles';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  cols?: keyof typeof COLS_STYLES;
  /** Number of rows */
  rows?: keyof typeof ROWS_STYLES;
  /** Gap between items (both horizontal and vertical) */
  gap?: keyof typeof GAP_STYLES | number | string;
  /** Horizontal gap between items */
  gapX?: keyof typeof GAP_X_STYLES | number | string;
  /** Vertical gap between items */
  gapY?: keyof typeof GAP_Y_STYLES | number | string;
  /** Align items */
  align?: keyof typeof ALIGN_STYLES;
  /** Justify items */
  justify?: keyof typeof JUSTIFY_STYLES;
  /** Grid auto flow */
  flow?: keyof typeof FLOW_STYLES;
  /** Display as inline-grid instead of grid */
  inline?: boolean;
  /** Children elements */
  children?: React.ReactNode;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      cols,
      rows,
      gap,
      gapX,
      gapY,
      align,
      justify,
      flow,
      inline = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const gapStyles = useMemo(() => {
      const styles: React.CSSProperties = {};

      // Handle gap
      if (gap !== undefined) {
        if (typeof gap === 'number') {
          styles.gap = `${gap}rem`;
        } else if (typeof gap === 'string' && !(gap in GAP_STYLES)) {
          styles.gap = gap;
        }
      }

      // Handle gapX
      if (gapX !== undefined) {
        if (typeof gapX === 'number') {
          styles.columnGap = `${gapX}rem`;
        } else if (typeof gapX === 'string' && !(gapX in GAP_X_STYLES)) {
          styles.columnGap = gapX;
        }
      }

      // Handle gapY
      if (gapY !== undefined) {
        if (typeof gapY === 'number') {
          styles.rowGap = `${gapY}rem`;
        } else if (typeof gapY === 'string' && !(gapY in GAP_Y_STYLES)) {
          styles.rowGap = gapY;
        }
      }

      return Object.keys(styles).length > 0 ? styles : undefined;
    }, [gap, gapX, gapY]);

    const gapClasses = useMemo(() => {
      const classes: string[] = [];

      if (typeof gap === 'string' && gap in GAP_STYLES) {
        classes.push(GAP_STYLES[gap as keyof typeof GAP_STYLES]);
      }

      if (typeof gapX === 'string' && gapX in GAP_X_STYLES) {
        classes.push(GAP_X_STYLES[gapX as keyof typeof GAP_X_STYLES]);
      }

      if (typeof gapY === 'string' && gapY in GAP_Y_STYLES) {
        classes.push(GAP_Y_STYLES[gapY as keyof typeof GAP_Y_STYLES]);
      }

      return classes;
    }, [gap, gapX, gapY]);

    const classes = cn(
      inline ? 'inline-grid' : BASE_CLASSES,
      cols && COLS_STYLES[cols],
      rows && ROWS_STYLES[rows],
      ...gapClasses,
      align && ALIGN_STYLES[align],
      justify && JUSTIFY_STYLES[justify],
      flow && FLOW_STYLES[flow],
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        style={{
          ...gapStyles,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

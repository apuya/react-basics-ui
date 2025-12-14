import { cn } from '@/lib/cn';
import React, { memo, useMemo } from 'react';
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
import type { GridProps } from './Grid.types';

// =============================================================================
// Grid Component
// =============================================================================

export const Grid = memo(
  React.forwardRef<HTMLDivElement, GridProps>(function Grid(
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
  ) {
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

      const classes = useMemo(
        () =>
          cn(
            inline ? 'inline-grid' : BASE_CLASSES,
            cols && COLS_STYLES[cols],
            rows && ROWS_STYLES[rows],
            ...gapClasses,
            align && ALIGN_STYLES[align],
            justify && JUSTIFY_STYLES[justify],
            flow && FLOW_STYLES[flow],
            className
          ),
        [inline, cols, rows, gapClasses, align, justify, flow, className]
      );

      // Data attributes for preset values only
      const dataGap =
        typeof gap === 'string' && gap in GAP_STYLES ? gap : undefined;

      return (
        <div
          ref={ref}
          className={classes}
          style={{
            ...gapStyles,
            ...style,
          }}
          data-cols={cols}
          data-rows={rows}
          data-gap={dataGap}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);

Grid.displayName = 'Grid';

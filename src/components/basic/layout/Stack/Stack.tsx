import { cn } from '@/lib/cn';
import React, { memo, useMemo } from 'react';
import {
  ALIGN_STYLES,
  BASE_CLASSES,
  DIRECTION_STYLES,
  JUSTIFY_STYLES,
  SPACING_STYLES,
  WRAP_STYLES,
} from './Stack.styles';
import type { HStackProps, StackProps, VStackProps } from './Stack.types';

// =============================================================================
// Stack Component
// =============================================================================

export const Stack = memo(
  React.forwardRef<HTMLDivElement, StackProps>(function Stack(
    {
      direction = 'vertical',
      spacing,
      align,
      justify,
      wrap,
      inline = false,
      divider,
      className,
      style,
      children,
      ...props
    },
    ref
  ) {
      const spacingStyle = useMemo(() => {
        if (!spacing) return undefined;

        // If spacing is a number, convert to rem
        if (typeof spacing === 'number') {
          return { gap: `${spacing}rem` };
        }

        // If spacing is a custom string (not a preset), use it directly
        if (typeof spacing === 'string' && !(spacing in SPACING_STYLES)) {
          return { gap: spacing };
        }

        return undefined;
      }, [spacing]);

      const spacingClass = useMemo(() => {
        if (typeof spacing === 'string' && spacing in SPACING_STYLES) {
          return SPACING_STYLES[spacing as keyof typeof SPACING_STYLES];
        }
        return undefined;
      }, [spacing]);

      const classes = useMemo(
        () =>
          cn(
            inline ? 'inline-flex' : BASE_CLASSES,
            DIRECTION_STYLES[direction],
            spacingClass,
            align && ALIGN_STYLES[align],
            justify && JUSTIFY_STYLES[justify],
            wrap && WRAP_STYLES[wrap],
            className
          ),
        [inline, direction, spacingClass, align, justify, wrap, className]
      );

      // If divider is provided, insert it between children
      const childrenArray = React.Children.toArray(children);
      const childrenWithDividers = divider
        ? childrenArray.reduce<React.ReactNode[]>((acc, child, index) => {
            acc.push(child);
            if (index < childrenArray.length - 1) {
              acc.push(
                <React.Fragment key={`divider-${index}`}>{divider}</React.Fragment>
              );
            }
            return acc;
          }, [])
        : children;

      return (
        <div
          ref={ref}
          className={classes}
          style={{
            ...spacingStyle,
            ...style,
          }}
          data-direction={direction}
          data-spacing={
            typeof spacing === 'string' && spacing in SPACING_STYLES ? spacing : undefined
          }
          {...props}
        >
          {childrenWithDividers}
        </div>
      );
    }
  )
);

Stack.displayName = 'Stack';

// =============================================================================
// HStack Component
// =============================================================================

/**
 * Horizontal stack - shorthand for Stack with direction="horizontal".
 */
export const HStack = memo(
  React.forwardRef<HTMLDivElement, HStackProps>(function HStack(props, ref) {
    return <Stack ref={ref} direction="horizontal" {...props} />;
  })
);

HStack.displayName = 'HStack';

// =============================================================================
// VStack Component
// =============================================================================

/**
 * Vertical stack - shorthand for Stack with direction="vertical".
 */
export const VStack = memo(
  React.forwardRef<HTMLDivElement, VStackProps>(function VStack(props, ref) {
    return <Stack ref={ref} direction="vertical" {...props} />;
  })
);

VStack.displayName = 'VStack';

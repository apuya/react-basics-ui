import { cn } from '@/lib/cn';
import React, { useMemo } from 'react';
import {
  ALIGN_STYLES,
  BASE_CLASSES,
  DIRECTION_STYLES,
  JUSTIFY_STYLES,
  SPACING_STYLES,
  WRAP_STYLES,
} from './Stack.styles';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the stack */
  direction?: keyof typeof DIRECTION_STYLES;
  /** Spacing between items */
  spacing?: keyof typeof SPACING_STYLES | number | string;
  /** Align items */
  align?: keyof typeof ALIGN_STYLES;
  /** Justify content */
  justify?: keyof typeof JUSTIFY_STYLES;
  /** Wrap behavior */
  wrap?: keyof typeof WRAP_STYLES;
  /** Display as inline-flex instead of flex */
  inline?: boolean;
  /** Divider element to place between items */
  divider?: React.ReactNode;
  /** Children elements */
  children?: React.ReactNode;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
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
  ) => {
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

    const classes = cn(
      inline ? 'inline-flex' : BASE_CLASSES,
      DIRECTION_STYLES[direction],
      spacingClass,
      align && ALIGN_STYLES[align],
      justify && JUSTIFY_STYLES[justify],
      wrap && WRAP_STYLES[wrap],
      className
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
        {...props}
      >
        {childrenWithDividers}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

// HStack - Horizontal Stack (shorthand for Stack with direction="horizontal")
export interface HStackProps extends Omit<StackProps, 'direction'> {}

export const HStack = React.forwardRef<HTMLDivElement, HStackProps>(
  (props, ref) => {
    return <Stack ref={ref} direction="horizontal" {...props} />;
  }
);

HStack.displayName = 'HStack';

// VStack - Vertical Stack (shorthand for Stack with direction="vertical")
export interface VStackProps extends Omit<StackProps, 'direction'> {}

export const VStack = React.forwardRef<HTMLDivElement, VStackProps>(
  (props, ref) => {
    return <Stack ref={ref} direction="vertical" {...props} />;
  }
);

VStack.displayName = 'VStack';

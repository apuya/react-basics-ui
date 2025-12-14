import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo } from 'react';
import { BASE_CLASSES } from './Box.styles';
import type { BoxProps } from './Box.types';

// =============================================================================
// Helper Functions
// =============================================================================

const formatSpacing = (value: string | number | undefined): string | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const cleanStyle = (style: Record<string, unknown>): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(style).filter(([, value]) => value !== undefined)
  );
};

// =============================================================================
// Box Component
// =============================================================================

/**
 * A polymorphic Box component that serves as a primitive building block for layouts.
 * Provides convenient props for common CSS properties like spacing, sizing, and colors.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Box p={4} bg="gray-100">Content</Box>
 *
 * // As a different element
 * <Box as="section" p={8}>Section content</Box>
 *
 * // With custom styles
 * <Box p={4} m={2} borderRadius={8} bg="blue-500" color="white">
 *   Styled box
 * </Box>
 * ```
 */
export const Box = memo(
  forwardRef<HTMLElement, BoxProps>(function Box(
    {
      as,
      className,
      style,
      children,
      // Padding
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      // Margin
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      // Sizing
      w,
      h,
      minW,
      minH,
      maxW,
      maxH,
      // Colors
      bg,
      color,
      // Borders
      borderWidth,
      borderColor,
      borderRadius,
      // Layout
      display,
      position,
      overflow,
      textAlign,
      ...rest
    },
    ref
  ) {
    const Component = as || 'div';

    const boxStyle = useMemo(
      () => cleanStyle({
        // Padding
        padding: formatSpacing(p),
        paddingLeft: formatSpacing(px ?? pl),
        paddingRight: formatSpacing(px ?? pr),
        paddingTop: formatSpacing(py ?? pt),
        paddingBottom: formatSpacing(py ?? pb),
        // Margin
        margin: formatSpacing(m),
        marginLeft: formatSpacing(mx ?? ml),
        marginRight: formatSpacing(mx ?? mr),
        marginTop: formatSpacing(my ?? mt),
        marginBottom: formatSpacing(my ?? mb),
        // Sizing
        width: formatSpacing(w),
        height: formatSpacing(h),
        minWidth: formatSpacing(minW),
        minHeight: formatSpacing(minH),
        maxWidth: formatSpacing(maxW),
        maxHeight: formatSpacing(maxH),
        // Colors
        backgroundColor: bg,
        color,
        // Borders
        borderWidth: formatSpacing(borderWidth),
        borderColor,
        borderRadius: formatSpacing(borderRadius),
        // Layout
        display,
        position,
        overflow,
        textAlign,
        ...style,
      }),
      [
        p, px, py, pt, pr, pb, pl,
        m, mx, my, mt, mr, mb, ml,
        w, h, minW, minH, maxW, maxH,
        bg, color,
        borderWidth, borderColor, borderRadius,
        display, position, overflow, textAlign,
        style,
      ]
    );

    return (
      <Component
        ref={ref as any}
        className={cn(BASE_CLASSES, className)}
        style={boxStyle}
        data-display={display || undefined}
        data-position={position || undefined}
        {...rest}
      >
        {children}
      </Component>
    );
  })
);

Box.displayName = 'Box';

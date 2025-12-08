import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementType,
} from 'react';
import { BASE_CLASSES } from './Box.styles';

/** Props that can be passed to any element type */
type PolymorphicProps<E extends ElementType> = ComponentPropsWithoutRef<E> & {
  /** The element type to render as */
  as?: E;
};

/**
 * Props for the Box component
 * @template E - The element type to render as (default: 'div')
 */
export type BoxProps<E extends ElementType = 'div'> = PolymorphicProps<E> & {
  /** Padding - all sides */
  p?: string | number;
  /** Padding - horizontal (left and right) */
  px?: string | number;
  /** Padding - vertical (top and bottom) */
  py?: string | number;
  /** Padding - top */
  pt?: string | number;
  /** Padding - right */
  pr?: string | number;
  /** Padding - bottom */
  pb?: string | number;
  /** Padding - left */
  pl?: string | number;

  /** Margin - all sides */
  m?: string | number;
  /** Margin - horizontal (left and right) */
  mx?: string | number;
  /** Margin - vertical (top and bottom) */
  my?: string | number;
  /** Margin - top */
  mt?: string | number;
  /** Margin - right */
  mr?: string | number;
  /** Margin - bottom */
  mb?: string | number;
  /** Margin - left */
  ml?: string | number;

  /** Width */
  w?: string | number;
  /** Height */
  h?: string | number;
  /** Min width */
  minW?: string | number;
  /** Min height */
  minH?: string | number;
  /** Max width */
  maxW?: string | number;
  /** Max height */
  maxH?: string | number;

  /** Background color */
  bg?: string;
  /** Text color */
  color?: string;
  /** Border width */
  borderWidth?: string | number;
  /** Border color */
  borderColor?: string;
  /** Border radius */
  borderRadius?: string | number;

  /** Display property */
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
  /** Position property */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  /** Overflow property */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';

  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right' | 'justify';
};

const formatSpacing = (value: string | number | undefined): string | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const cleanStyle = (style: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(style).filter(([_, value]) => value !== undefined)
  );
};

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

import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ElementType } from 'react';
import type { HeadingProps } from './Heading.types';
import {
  ALIGN_STYLES,
  COLOR_STYLES,
  FONT_FAMILY_STYLES,
  LEVEL_STYLES,
} from './Heading.styles';

// Re-export types from types file
export type {
  HeadingProps,
  HeadingLevel,
  HeadingColor,
  HeadingAlign,
  HeadingFontFamily,
} from './Heading.types';

/**
 * A semantic heading component with configurable levels and styling.
 *
 * @example
 * ```tsx
 * <Heading as="h1" color="primary">Page Title</Heading>
 * ```
 */
export const Heading = memo(
  forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
    {
      as,
      level,
      color = 'primary',
      align,
      fontFamily = 'heading',
      truncate = false,
      children,
      className,
      ...rest
    },
    ref
  ) {
    const semanticLevel = level || as || 'h2';
    const Component = (as || level || 'h2') as ElementType;

    const headingClasses = useMemo(
      () =>
        cn(
          LEVEL_STYLES[semanticLevel],
          COLOR_STYLES[color],
          FONT_FAMILY_STYLES[fontFamily],
          align && ALIGN_STYLES[align],
          truncate && 'truncate',
          className
        ),
      [semanticLevel, color, fontFamily, align, truncate, className]
    );

    return (
      <Component
        ref={ref}
        className={headingClasses}
        data-level={semanticLevel}
        data-color={color}
        {...rest}
      >
        {children}
      </Component>
    );
  })
);

Heading.displayName = 'Heading';

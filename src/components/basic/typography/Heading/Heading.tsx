import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ElementType, type ReactNode } from 'react';
import {
  ALIGN_STYLES,
  COLOR_STYLES,
  FONT_FAMILY_STYLES,
  LEVEL_STYLES,
} from './Heading.styles';

/** Available heading levels from h1 to h6. */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/** Available heading color variants. */
export type HeadingColor = keyof typeof COLOR_STYLES;

/** Available heading text alignments. */
export type HeadingAlign = keyof typeof ALIGN_STYLES;

/** Available heading font families. */
export type HeadingFontFamily = keyof typeof FONT_FAMILY_STYLES;

export interface HeadingProps {
  /** HTML element to render. @default 'h2' */
  as?: HeadingLevel;
  /** Visual styling level (independent of HTML element). */
  level?: HeadingLevel;
  /** Color variant of the heading. @default 'primary' */
  color?: HeadingColor;
  /** Text alignment. */
  align?: HeadingAlign;
  /** Font family to use. @default 'heading' */
  fontFamily?: HeadingFontFamily;
  /** Whether to truncate text with ellipsis. @default false */
  truncate?: boolean;
  /** Heading content. */
  children: ReactNode;
  /** Additional CSS classes. */
  className?: string;
}

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
      <Component ref={ref} className={headingClasses} {...rest}>
        {children}
      </Component>
    );
  })
);

Heading.displayName = 'Heading';

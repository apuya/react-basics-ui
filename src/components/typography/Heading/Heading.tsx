import { cn } from '@/lib/cn';
import { forwardRef, memo, type ElementType, type ReactNode } from 'react';
import {
  ALIGN_STYLES,
  COLOR_STYLES,
  FONT_FAMILY_STYLES,
  LEVEL_STYLES,
} from './Heading.styles';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingColor = keyof typeof COLOR_STYLES;
export type HeadingAlign = keyof typeof ALIGN_STYLES;
export type HeadingFontFamily = keyof typeof FONT_FAMILY_STYLES;

export interface HeadingProps {
  as?: HeadingLevel;
  level?: HeadingLevel;
  color?: HeadingColor;
  align?: HeadingAlign;
  fontFamily?: HeadingFontFamily;
  truncate?: boolean;
  children: ReactNode;
  className?: string;
}

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
    // Determine the semantic level (for styling)
    const semanticLevel = level || as || 'h2';
    
    // Determine the actual HTML element to render
    const Component = (as || level || 'h2') as ElementType;

    return (
      <Component
        ref={ref as any}
        className={cn(
          LEVEL_STYLES[semanticLevel],
          COLOR_STYLES[color],
          FONT_FAMILY_STYLES[fontFamily],
          align && ALIGN_STYLES[align],
          truncate && 'truncate',
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  })
);

Heading.displayName = 'Heading';

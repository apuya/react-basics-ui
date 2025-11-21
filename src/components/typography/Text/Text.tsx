import { cn } from '@/lib/cn';
import { forwardRef, memo, type ElementType, type ReactNode } from 'react';
import {
  ALIGN_STYLES,
  COLOR_STYLES,
  FONT_FAMILY_STYLES,
  LINE_HEIGHT_STYLES,
  SIZE_STYLES,
  WEIGHT_STYLES,
} from './Text.styles';

export type TextSize = keyof typeof SIZE_STYLES;
export type TextWeight = keyof typeof WEIGHT_STYLES;
export type TextColor = keyof typeof COLOR_STYLES;
export type TextLineHeight = keyof typeof LINE_HEIGHT_STYLES;
export type TextAlign = keyof typeof ALIGN_STYLES;
export type TextFontFamily = keyof typeof FONT_FAMILY_STYLES;

type TextElement = 'span' | 'p' | 'label' | 'div' | 'strong' | 'em' | 'small';

export interface TextProps {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  lineHeight?: TextLineHeight;
  align?: TextAlign;
  fontFamily?: TextFontFamily;
  truncate?: boolean;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

export const Text = memo(
  forwardRef<HTMLElement, TextProps>(function Text(
    {
      as: Component = 'span',
      size = 'body',
      weight = 'regular',
      color = 'primary',
      lineHeight = 'normal',
      align,
      fontFamily = 'body',
      truncate = false,
      children,
      className,
      ...rest
    },
    ref
  ) {
    return (
      <Component
        ref={ref as React.Ref<HTMLElement & ElementType>}
        className={cn(
          SIZE_STYLES[size],
          WEIGHT_STYLES[weight],
          COLOR_STYLES[color],
          LINE_HEIGHT_STYLES[lineHeight],
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

Text.displayName = 'Text';

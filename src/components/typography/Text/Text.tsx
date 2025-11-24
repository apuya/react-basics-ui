import { cn } from '@/lib/cn';
import { type ComponentPropsWithoutRef, forwardRef, memo, type ReactNode, useMemo } from 'react';
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

/**
 * Text component for rendering text content with various styling options.
 * Supports polymorphic rendering as different HTML elements while maintaining consistent typography.
 *
 * @example
 * ```tsx
 * <Text size="body" weight="medium">Default text</Text>
 * <Text as="p" color="secondary">Paragraph text</Text>
 * <Text as="label" htmlFor="input-id">Label text</Text>
 * ```
 */
export interface TextProps extends Omit<ComponentPropsWithoutRef<'span'>, 'ref'> {
  /**
   * The HTML element to render as.
   * @default 'span'
   */
  as?: TextElement;
  /**
   * The font size variant.
   * @default 'body'
   */
  size?: TextSize;
  /**
   * The font weight variant.
   * @default 'regular'
   */
  weight?: TextWeight;
  /**
   * The text color variant.
   * @default 'primary'
   */
  color?: TextColor;
  /**
   * The line height variant.
   * @default 'normal'
   */
  lineHeight?: TextLineHeight;
  /**
   * The text alignment.
   */
  align?: TextAlign;
  /**
   * The font family variant.
   * @default 'body'
   */
  fontFamily?: TextFontFamily;
  /**
   * Whether to truncate text with ellipsis.
   * @default false
   */
  truncate?: boolean;
  /**
   * The content to display.
   */
  children: ReactNode;
  /**
   * Additional CSS classes to apply.
   */
  className?: string;
  /**
   * The ID of a form element (only applicable when as="label").
   */
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
    const textClasses = useMemo(
      () =>
        cn(
          SIZE_STYLES[size],
          WEIGHT_STYLES[weight],
          COLOR_STYLES[color],
          LINE_HEIGHT_STYLES[lineHeight],
          FONT_FAMILY_STYLES[fontFamily],
          align && ALIGN_STYLES[align],
          truncate && 'truncate',
          className
        ),
      [size, weight, color, lineHeight, fontFamily, align, truncate, className]
    );

    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={textClasses}
        {...rest}
      >
        {children}
      </Component>
    );
  })
);

Text.displayName = 'Text';

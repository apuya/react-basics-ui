import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo } from 'react';
import type { TextProps } from './Text.types';
import {
  ALIGN_STYLES,
  COLOR_STYLES,
  FONT_FAMILY_STYLES,
  LINE_HEIGHT_STYLES,
  SIZE_STYLES,
  WEIGHT_STYLES,
} from './Text.styles';

// Re-export types from types file
export type {
  TextProps,
  TextSize,
  TextWeight,
  TextColor,
  TextLineHeight,
  TextAlign,
  TextFontFamily,
  TextElement,
} from './Text.types';

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Polymorphic ref forwarding requires any
        ref={ref as any}
        className={textClasses}
        data-size={size}
        data-color={color}
        {...rest}
      >
        {children}
      </Component>
    );
  })
);

Text.displayName = 'Text';

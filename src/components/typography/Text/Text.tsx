import { forwardRef, memo } from 'react';
import type { TextProps } from './Text.types';
import { BaseText } from '../BaseText';

/**
 * Text component for rendering text content with various styling options.
 * A thin wrapper around BaseText with text-appropriate defaults.
 *
 * @example
 * ```tsx
 * <Text size="body" weight="medium">Default text</Text>
 * <Text as="p" color="secondary">Paragraph text</Text>
 * <Text size="caption" color="tertiary">Helper text</Text>
 * ```
 */
export const Text = memo(
  forwardRef<HTMLElement, TextProps>(function Text(
    {
      as = 'span',
      size = 'body',
      weight = 'normal',
      color = 'primary',
      lineHeight = 'normal',
      fontFamily = 'body',
      ...props
    },
    ref
  ) {
    return (
      <BaseText
        ref={ref}
        as={as}
        size={size}
        weight={weight}
        color={color}
        lineHeight={lineHeight}
        fontFamily={fontFamily}
        {...props}
      />
    );
  })
);

Text.displayName = 'Text';

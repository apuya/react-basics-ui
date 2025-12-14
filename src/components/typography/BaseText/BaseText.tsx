import { cn } from '@/lib/cn';
import { forwardRef, memo } from 'react';
import type { BaseTextProps } from './BaseText.types';
import {
  TEXT_SIZE_STYLES,
  TEXT_WEIGHT_STYLES,
  TEXT_COLOR_STYLES,
  HEADING_COLOR_STYLES,
  TEXT_LINE_HEIGHT_STYLES,
  TEXT_ALIGN_STYLES,
  TEXT_FONT_FAMILY_STYLES,
} from './BaseText.styles';

// Re-export types from types file
export type {
  BaseTextProps,
  TextSize,
  TextWeight,
  TextColor,
  TextLineHeight,
  TextAlign,
  TextFontFamily,
  TextVariant,
} from './BaseText.types';

/**
 * BaseText - The foundational typography primitive.
 * 
 * All text-based components should compose this to ensure consistent styling.
 * Uses CSS variables for theming, allowing centralized typography control.
 * 
 * @example
 * ```tsx
 * // Direct usage
 * <BaseText size="body" color="primary">Body text</BaseText>
 * 
 * // As a heading
 * <BaseText as="h1" size="h1" variant="heading">Page Title</BaseText>
 * 
 * // As a label
 * <BaseText as="label" size="small" weight="medium">Field Label</BaseText>
 * ```
 */
export const BaseText = memo(
  forwardRef<HTMLElement, BaseTextProps>(function BaseText(
    {
      as: Component = 'span',
      variant = 'text',
      size,
      weight,
      color,
      lineHeight,
      align,
      fontFamily,
      truncate = false,
      className,
      children,
      ...rest
    },
    ref
  ) {
    // Determine if this is a heading size (h1-h6) - these have built-in weight/line-height
    const isHeadingSize = size && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(size);
    
    // Use heading color tokens for heading variant, text color tokens otherwise
    const colorStyles = variant === 'heading' && color && HEADING_COLOR_STYLES[color]
      ? HEADING_COLOR_STYLES[color]
      : color && TEXT_COLOR_STYLES[color];

    const textClasses = cn(
      // Size styles (heading sizes include weight and line-height)
      size && TEXT_SIZE_STYLES[size],
      // Only apply weight/lineHeight if NOT a heading size (headings have them built-in)
      !isHeadingSize && weight && TEXT_WEIGHT_STYLES[weight],
      !isHeadingSize && lineHeight && TEXT_LINE_HEIGHT_STYLES[lineHeight],
      // Color and other styles
      colorStyles,
      fontFamily && TEXT_FONT_FAMILY_STYLES[fontFamily],
      align && TEXT_ALIGN_STYLES[align],
      truncate && 'truncate',
      className
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

BaseText.displayName = 'BaseText';

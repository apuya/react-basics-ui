import { forwardRef, memo } from 'react';
import type { HeadingProps } from './Heading.types';
import { BaseText } from '../BaseText';

/**
 * Semantic heading component with configurable levels.
 * A thin wrapper around BaseText with heading-appropriate defaults.
 *
 * @example
 * ```tsx
 * <Heading as="h1" color="primary">Page Title</Heading>
 * <Heading level="h3" as="h2">Visually h3, semantically h2</Heading>
 * ```
 */
export const Heading = memo(
  forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
    {
      as,
      level,
      color = 'primary',
      fontFamily = 'heading',
      ...props
    },
    ref
  ) {
    const element = as || level || 'h2';
    const visualLevel = level || as || 'h2';

    return (
      <BaseText
        ref={ref}
        as={element}
        variant="heading"
        size={visualLevel}
        color={color}
        fontFamily={fontFamily}
        {...props}
      />
    );
  })
);

Heading.displayName = 'Heading';

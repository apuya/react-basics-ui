import { forwardRef, memo } from 'react';
import { Heading } from '@/components/typography/Heading';
import type { CardTitleProps } from './Card.types';

export const CardTitle = memo(
  forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ as = 'h3', level, className, style, children, ...props }, ref) => (
      <Heading ref={ref} as={as} level={level} className={className} style={style} {...props}>
        {children}
      </Heading>
    )
  )
);
CardTitle.displayName = 'Card.Title';

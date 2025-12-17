import { forwardRef, memo } from 'react';
import { BaseCardDescription } from '@/components/layout/BaseCardContainer';
import type { CardDescriptionProps } from './Card.types';

export const CardDescription = memo(
  forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, style, children, ...props }, ref) => (
      <BaseCardDescription ref={ref} className={className} style={style} {...props}>
        {children}
      </BaseCardDescription>
    )
  )
);
CardDescription.displayName = 'Card.Description';

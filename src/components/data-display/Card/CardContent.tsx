import { forwardRef, memo } from 'react';
import { BaseCardContent } from '@/components/layout/BaseCardContainer';
import type { CardContentProps } from './Card.types';

export const CardContent = memo(
  forwardRef<HTMLDivElement, CardContentProps>(({ className, style, children, ...props }, ref) => (
    <BaseCardContent ref={ref} className={className} style={style} {...props}>
      {children}
    </BaseCardContent>
  ))
);
CardContent.displayName = 'Card.Content';

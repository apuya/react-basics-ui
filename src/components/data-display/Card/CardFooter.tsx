import { forwardRef, memo } from 'react';
import { BaseCardFooter } from '@/components/layout/BaseCardContainer';
import type { CardFooterProps } from './Card.types';

export const CardFooter = memo(
  forwardRef<HTMLDivElement, CardFooterProps>(({ className, style, children, ...props }, ref) => (
    <BaseCardFooter ref={ref} className={className} style={style} {...props}>
      {children}
    </BaseCardFooter>
  ))
);
CardFooter.displayName = 'Card.Footer';

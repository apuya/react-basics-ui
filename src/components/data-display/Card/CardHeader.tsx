import { forwardRef, memo } from 'react';
import { BaseCardHeader } from '@/components/layout/BaseCardContainer';
import type { CardHeaderProps } from './Card.types';

export const CardHeader = memo(
  forwardRef<HTMLDivElement, CardHeaderProps>(({ className, style, children, ...props }, ref) => (
    <BaseCardHeader ref={ref} className={className} style={style} {...props}>
      {children}
    </BaseCardHeader>
  ))
);
CardHeader.displayName = 'Card.Header';

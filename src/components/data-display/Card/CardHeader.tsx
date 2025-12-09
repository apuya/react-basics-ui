import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { HEADER_CLASSES } from './Card.styles';

export interface CardHeaderProps extends ComponentPropsWithoutRef<'div'> {}

export const CardHeader = memo(
  forwardRef<HTMLDivElement, CardHeaderProps>(({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(HEADER_CLASSES, className)}
      {...props}
    >
      {children}
    </div>
  ))
);
CardHeader.displayName = 'Card.Header';

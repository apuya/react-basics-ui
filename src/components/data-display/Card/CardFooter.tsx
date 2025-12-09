import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { FOOTER_CLASSES } from './Card.styles';

export interface CardFooterProps extends ComponentPropsWithoutRef<'div'> {}

export const CardFooter = memo(
  forwardRef<HTMLDivElement, CardFooterProps>(({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(FOOTER_CLASSES, className)}
      {...props}
    >
      {children}
    </div>
  ))
);
CardFooter.displayName = 'Card.Footer';

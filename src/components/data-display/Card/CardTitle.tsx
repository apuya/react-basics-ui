import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { TITLE_CLASSES } from './Card.styles';

export interface CardTitleProps extends ComponentPropsWithoutRef<'h3'> {}

export const CardTitle = memo(
  forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn(TITLE_CLASSES, className)} {...props}>
      {children}
    </h3>
  ))
);
CardTitle.displayName = 'Card.Title';

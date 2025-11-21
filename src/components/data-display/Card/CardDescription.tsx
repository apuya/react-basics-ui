import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { DESCRIPTION_CLASSES } from './Card.styles';

export interface CardDescriptionProps extends ComponentPropsWithoutRef<'p'> {}

export const CardDescription = memo(
  forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, children, ...props }, ref) => (
      <p ref={ref} className={cn(DESCRIPTION_CLASSES, className)} {...props}>
        {children}
      </p>
    )
  )
);
CardDescription.displayName = 'Card.Description';

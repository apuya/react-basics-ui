import { cn } from '@/lib/cn';
import { forwardRef, memo } from 'react';
import { FOOTER_CLASSES, FOOTER_PADDING_STYLE } from './Card.styles';
import type { CardFooterProps } from './Card.types';

export const CardFooter = memo(
  forwardRef<HTMLDivElement, CardFooterProps>(({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(FOOTER_CLASSES, className)}
      style={{
        ...FOOTER_PADDING_STYLE,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ))
);
CardFooter.displayName = 'Card.Footer';

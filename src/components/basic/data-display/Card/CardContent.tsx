import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { CONTENT_CLASSES } from './Card.styles';

export interface CardContentProps extends ComponentPropsWithoutRef<'div'> {}

export const CardContent = memo(
  forwardRef<HTMLDivElement, CardContentProps>(({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(CONTENT_CLASSES, className)}
      style={{
        paddingInline: 'var(--component-card-padding-inline)',
        paddingBlock: 'var(--component-card-padding-block)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ))
);
CardContent.displayName = 'Card.Content';

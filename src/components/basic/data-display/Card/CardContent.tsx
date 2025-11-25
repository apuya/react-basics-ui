import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { CONTENT_CLASSES } from './Card.styles';

export interface CardContentProps extends ComponentPropsWithoutRef<'div'> {}

export const CardContent = memo(
  forwardRef<HTMLDivElement, CardContentProps>(({ className, children, ...props }, ref) => {
    const contentStyle = useMemo(
      () => ({
        paddingInline: 'var(--component-card-padding-inline)',
        paddingBlock: 'var(--component-card-padding-block)',
      }),
      []
    );

    return (
      <div
        ref={ref}
        className={cn(CONTENT_CLASSES, className)}
        style={contentStyle}
        {...props}
      >
        {children}
      </div>
    );
  })
);
CardContent.displayName = 'Card.Content';

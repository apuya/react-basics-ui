import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { HEADER_CLASSES } from './Card.styles';

export interface CardHeaderProps extends ComponentPropsWithoutRef<'div'> {}

export const CardHeader = memo(
  forwardRef<HTMLDivElement, CardHeaderProps>(({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(HEADER_CLASSES, className)}
      style={{
        paddingInline: 'var(--component-card-header-padding-inline)',
        paddingBlock: 'var(--component-card-header-padding-block)',
        gap: 'var(--component-card-gap-compact)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ))
);
CardHeader.displayName = 'Card.Header';

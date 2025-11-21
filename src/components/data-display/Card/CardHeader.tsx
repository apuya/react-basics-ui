import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { HEADER_CLASSES } from './Card.styles';

export interface CardHeaderProps extends ComponentPropsWithoutRef<'div'> {}

export const CardHeader = memo(
  forwardRef<HTMLDivElement, CardHeaderProps>(({ className, children, ...props }, ref) => {
    const headerStyle = useMemo(
      () => ({
        paddingInline: 'var(--component-card-header-padding-inline)',
        paddingBlock: 'var(--component-card-header-padding-block)',
      }),
      []
    );

    return (
      <div
        ref={ref}
        className={cn(HEADER_CLASSES, className)}
        style={headerStyle}
        {...props}
      >
        {children}
      </div>
    );
  })
);
CardHeader.displayName = 'Card.Header';

import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { FOOTER_CLASSES } from './Card.styles';

export interface CardFooterProps extends ComponentPropsWithoutRef<'div'> {}

export const CardFooter = memo(
  forwardRef<HTMLDivElement, CardFooterProps>(({ className, children, ...props }, ref) => {
    const footerStyle = useMemo(
      () => ({
        paddingInline: 'var(--component-card-footer-padding-inline)',
        paddingBlock: 'var(--component-card-footer-padding-block)',
      }),
      []
    );

    return (
      <div
        ref={ref}
        className={cn(FOOTER_CLASSES, className)}
        style={footerStyle}
        {...props}
      >
        {children}
      </div>
    );
  })
);
CardFooter.displayName = 'Card.Footer';

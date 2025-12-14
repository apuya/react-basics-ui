import { cn } from '@/lib/cn';
import { forwardRef, memo } from 'react';
import { BASE_CLASSES, VARIANT_STYLES, GAP_STYLE } from './Card.styles';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import type { CardProps } from './Card.types';

// Main Card Component
const CardRoot = memo(
  forwardRef<HTMLDivElement, CardProps>(
    ({ variant = 'default', className, style, children, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-variant={variant}
          className={cn(BASE_CLASSES, VARIANT_STYLES[variant], className)}
          style={{
            ...GAP_STYLE,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);
CardRoot.displayName = 'Card';

// Compound Component Pattern
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});

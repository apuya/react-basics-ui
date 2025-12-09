import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { BASE_CLASSES, VARIANT_STYLES } from './Card.styles';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { CardTitle } from './CardTitle';
import { CardDescription } from './CardDescription';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  variant?: CardVariant;
}

// Main Card Component
const CardRoot = memo(
  forwardRef<HTMLDivElement, CardProps>(
    ({ variant = 'default', className, style, children, ...props }, ref) => {
      const cardClasses = useMemo(
        () => cn(BASE_CLASSES, VARIANT_STYLES[variant], className),
        [variant, className]
      );

      return (
        <div
          ref={ref}
          data-variant={variant}
          className={cardClasses}
          style={style}
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
  Title: CardTitle,
  Description: CardDescription,
});

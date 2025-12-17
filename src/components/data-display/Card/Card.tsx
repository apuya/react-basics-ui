import { forwardRef, memo } from 'react';
import { BaseCardContainer } from '@/components/layout/BaseCardContainer';
import { BASE_CLASSES, VARIANT_STYLES, GAP_STYLE } from './Card.styles';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { CardTitle } from './CardTitle';
import { CardDescription } from './CardDescription';
import type { CardProps } from './Card.types';

// Main Card Component - composes from BaseCardContainer
const CardRoot = memo(
  forwardRef<HTMLDivElement, CardProps>(
    ({ variant = 'default', className, style, children, ...props }, ref) => {
      return (
        <BaseCardContainer
          ref={ref}
          baseClasses={BASE_CLASSES}
          variantClasses={VARIANT_STYLES}
          variant={variant === 'interactive' ? 'default' : variant}
          interactive={variant === 'interactive'}
          interactiveClasses={VARIANT_STYLES.interactive}
          containerStyles={GAP_STYLE}
          className={className}
          style={style}
          dataAttributes={{ 'data-variant': variant }}
          {...props}
        >
          {children}
        </BaseCardContainer>
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

import { cn } from '@/lib/cn';
import { forwardRef, memo } from 'react';
import { CONTENT_CLASSES, CONTENT_PADDING_STYLE } from './Card.styles';
import type { CardContentProps } from './Card.types';

export const CardContent = memo(
  forwardRef<HTMLDivElement, CardContentProps>(({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(CONTENT_CLASSES, className)}
      style={{
        ...CONTENT_PADDING_STYLE,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ))
);
CardContent.displayName = 'Card.Content';

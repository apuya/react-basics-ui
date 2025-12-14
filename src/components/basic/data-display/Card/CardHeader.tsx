import { cn } from '@/lib/cn';
import { forwardRef, memo } from 'react';
import { HEADER_CLASSES, HEADER_PADDING_STYLE } from './Card.styles';
import type { CardHeaderProps } from './Card.types';

export const CardHeader = memo(
  forwardRef<HTMLDivElement, CardHeaderProps>(({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(HEADER_CLASSES, className)}
      style={{
        ...HEADER_PADDING_STYLE,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ))
);
CardHeader.displayName = 'Card.Header';

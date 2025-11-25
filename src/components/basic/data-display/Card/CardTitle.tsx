import { cn } from '@/lib/cn';
import { forwardRef, memo, type ReactNode } from 'react';
import { Heading } from '../../typography/Heading/Heading';
import { TITLE_CLASSES } from './Card.styles';

export interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

export const CardTitle = memo(
  forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, children }, ref) => (
    <Heading ref={ref} level="h3" className={cn(TITLE_CLASSES, className)}>
      {children}
    </Heading>
  ))
);
CardTitle.displayName = 'Card.Title';

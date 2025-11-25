import { cn } from '@/lib/cn';
import { forwardRef, memo, type ReactNode } from 'react';
import { Text } from '../../typography/Text/Text';
import { DESCRIPTION_CLASSES } from './Card.styles';

export interface CardDescriptionProps {
  className?: string;
  children: ReactNode;
}

export const CardDescription = memo(
  forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, children }, ref) => (
      <Text ref={ref} as="p" className={cn(DESCRIPTION_CLASSES, className)}>
        {children}
      </Text>
    )
  )
);
CardDescription.displayName = 'Card.Description';

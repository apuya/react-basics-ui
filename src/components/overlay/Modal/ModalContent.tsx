import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { CONTENT_CLASSES } from './Modal.styles';

export interface ModalContentProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalContent = memo(
  forwardRef<HTMLDivElement, ModalContentProps>(({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(CONTENT_CLASSES, className)}
      {...props}
    >
      {children}
    </div>
  ))
);
ModalContent.displayName = 'Modal.Content';

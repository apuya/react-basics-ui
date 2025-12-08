import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { CONTENT_CLASSES } from './Modal.styles';

export interface ModalContentProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalContent = memo(
  forwardRef<HTMLDivElement, ModalContentProps>(({ className, children, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(CONTENT_CLASSES, className)}
      style={{
        gap: 'var(--component-modal-gap-default)',
        // Negative margin + padding creates space for focus rings without affecting layout
        margin: 'calc(var(--component-modal-focus-ring-offset) * -1)',
        padding: 'var(--component-modal-focus-ring-offset)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ))
);
ModalContent.displayName = 'Modal.Content';

import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { HEADER_CLASSES } from './Modal.styles';

export interface ModalHeaderProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalHeader = memo(
  forwardRef<HTMLDivElement, ModalHeaderProps>(({ className, children, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(HEADER_CLASSES, className)}
      style={{
        gap: 'var(--component-modal-gap-compact)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ))
);
ModalHeader.displayName = 'Modal.Header';

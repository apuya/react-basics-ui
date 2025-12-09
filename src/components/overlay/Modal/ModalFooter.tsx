import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { FOOTER_CLASSES } from './Modal.styles';

export interface ModalFooterProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalFooter = memo(
  forwardRef<HTMLDivElement, ModalFooterProps>(({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(FOOTER_CLASSES, className)}
      {...props}
    >
      {children}
    </div>
  ))
);
ModalFooter.displayName = 'Modal.Footer';

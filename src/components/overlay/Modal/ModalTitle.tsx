import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { TITLE_CLASSES } from './Modal.styles';

export interface ModalTitleProps extends ComponentPropsWithoutRef<'h2'> {}

export const ModalTitle = memo(
  forwardRef<HTMLHeadingElement, ModalTitleProps>(({ className, children, ...props }, ref) => (
    <h2 ref={ref} id="modal-title" className={cn(TITLE_CLASSES, className)} {...props}>
      {children}
    </h2>
  ))
);
ModalTitle.displayName = 'Modal.Title';

import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { FOOTER_CLASSES } from './Modal.styles';

export interface ModalFooterProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalFooter = memo(
  forwardRef<HTMLDivElement, ModalFooterProps>(({ className, children, ...props }, ref) => {
    const footerStyle = useMemo(
      () => ({
        paddingInline: 'var(--component-modal-footer-padding-inline)',
        paddingBlock: 'var(--component-modal-footer-padding-block)',
        gap: 'var(--component-modal-gap)',
      }),
      []
    );

    return (
      <div
        ref={ref}
        className={cn(FOOTER_CLASSES, className)}
        style={footerStyle}
        {...props}
      >
        {children}
      </div>
    );
  })
);
ModalFooter.displayName = 'Modal.Footer';

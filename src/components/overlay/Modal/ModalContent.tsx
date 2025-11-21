import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { CONTENT_CLASSES } from './Modal.styles';

export interface ModalContentProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalContent = memo(
  forwardRef<HTMLDivElement, ModalContentProps>(({ className, children, ...props }, ref) => {
    const contentStyle = useMemo(
      () => ({
        paddingInline: 'var(--component-modal-content-padding-inline)',
        paddingBlock: 'var(--component-modal-content-padding-block)',
      }),
      []
    );

    return (
      <div
        ref={ref}
        className={cn(CONTENT_CLASSES, className)}
        style={contentStyle}
        {...props}
      >
        {children}
      </div>
    );
  })
);
ModalContent.displayName = 'Modal.Content';

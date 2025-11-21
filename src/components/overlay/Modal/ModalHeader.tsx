import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { HEADER_CLASSES } from './Modal.styles';

export interface ModalHeaderProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalHeader = memo(
  forwardRef<HTMLDivElement, ModalHeaderProps>(({ className, children, ...props }, ref) => {
    const headerStyle = useMemo(
      () => ({
        paddingInline: 'var(--component-modal-header-padding-inline)',
        paddingBlock: 'var(--component-modal-header-padding-block)',
        gap: 'var(--component-modal-gap)',
      }),
      []
    );

    return (
      <div
        ref={ref}
        className={cn(HEADER_CLASSES, className)}
        style={headerStyle}
        {...props}
      >
        {children}
      </div>
    );
  })
);
ModalHeader.displayName = 'Modal.Header';

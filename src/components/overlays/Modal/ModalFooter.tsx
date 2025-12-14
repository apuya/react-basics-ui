import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo } from 'react';
import { FOOTER_CLASSES } from './Modal.styles';
import type { ModalFooterProps } from './Modal.types';

// Static style object
const FOOTER_STYLE = {
  gap: 'var(--component-modal-gap-compact)',
} as const;

export const ModalFooter = memo(
  forwardRef<HTMLDivElement, ModalFooterProps>(({ className, children, style, ...props }, ref) => {
    const footerStyle = useMemo(
      () => (style ? { ...FOOTER_STYLE, ...style } : FOOTER_STYLE),
      [style]
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

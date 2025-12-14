import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo } from 'react';
import { HEADER_CLASSES } from './Modal.styles';
import type { ModalHeaderProps } from './Modal.types';

// Static style object
const HEADER_STYLE = {
  gap: 'var(--component-modal-gap-compact)',
} as const;

export const ModalHeader = memo(
  forwardRef<HTMLDivElement, ModalHeaderProps>(({ className, children, style, ...props }, ref) => {
    const headerStyle = useMemo(
      () => (style ? { ...HEADER_STYLE, ...style } : HEADER_STYLE),
      [style]
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

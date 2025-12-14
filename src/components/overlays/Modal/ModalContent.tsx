import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo } from 'react';
import { CONTENT_CLASSES } from './Modal.styles';
import type { ModalContentProps } from './Modal.types';

// Static style object
const CONTENT_STYLE = {
  gap: 'var(--component-modal-gap-default)',
  // Negative margin + padding creates space for focus rings without affecting layout
  margin: 'calc(var(--component-modal-focus-ring-offset) * -1)',
  padding: 'var(--component-modal-focus-ring-offset)',
} as const;

export const ModalContent = memo(
  forwardRef<HTMLDivElement, ModalContentProps>(({ className, children, style, ...props }, ref) => {
    const contentStyle = useMemo(
      () => (style ? { ...CONTENT_STYLE, ...style } : CONTENT_STYLE),
      [style]
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

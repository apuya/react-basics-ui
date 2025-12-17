import { forwardRef, memo } from 'react';
import { BaseCardFooter } from '@/components/layout/BaseCardContainer';
import type { ModalFooterProps } from './Modal.types';

export const ModalFooter = memo(
  forwardRef<HTMLDivElement, ModalFooterProps>(({ className, style, children, ...props }, ref) => (
    <BaseCardFooter
      ref={ref}
      baseClasses="flex items-center justify-end shrink-0"
      className={className}
      style={style}
      {...props}
    >
      {children}
    </BaseCardFooter>
  ))
);
ModalFooter.displayName = 'Modal.Footer';

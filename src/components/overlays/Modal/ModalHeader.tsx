import { forwardRef, memo } from 'react';
import { BaseCardHeader } from '@/components/layout/BaseCardContainer';
import type { ModalHeaderProps } from './Modal.types';

export const ModalHeader = memo(
  forwardRef<HTMLDivElement, ModalHeaderProps>(({ className, style, children, ...props }, ref) => (
    <BaseCardHeader ref={ref} className={className} style={style} {...props}>
      {children}
    </BaseCardHeader>
  ))
);
ModalHeader.displayName = 'Modal.Header';

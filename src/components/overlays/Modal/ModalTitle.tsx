import { forwardRef, memo } from 'react';
import { Heading } from '@/components/typography/Heading';
import type { ModalTitleProps } from './Modal.types';

export const ModalTitle = memo(
  forwardRef<HTMLHeadingElement, ModalTitleProps>(
    ({ as = 'h2', level, className, style, children, ...props }, ref) => (
      <Heading ref={ref} as={as} level={level} className={className} style={style} {...props}>
        {children}
      </Heading>
    )
  )
);
ModalTitle.displayName = 'Modal.Title';

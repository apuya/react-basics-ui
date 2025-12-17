import { forwardRef, memo, useMemo } from 'react';
import { BaseCardContent } from '@/components/layout/BaseCardContainer';
import type { ModalContentProps } from './Modal.types';

// Modal-specific: negative margin for focus ring space
// Padding is inherited from BaseCardContainer, we just add focus ring offset
const MODAL_CONTENT_PADDING_STYLE = {
  paddingInline: 'calc(var(--component-base-card-padding-inline) + var(--component-modal-focus-ring-offset))',
  paddingBlock: 'calc(var(--component-base-card-padding-block) + var(--component-modal-focus-ring-offset))',
} as const;

const MODAL_CONTENT_MARGIN = {
  margin: 'calc(var(--component-modal-focus-ring-offset) * -1)',
} as const;

export const ModalContent = memo(
  forwardRef<HTMLDivElement, ModalContentProps>(({ className, style, children, ...props }, ref) => {
    const mergedStyle = useMemo(
      () => ({ ...MODAL_CONTENT_MARGIN, ...style }),
      [style]
    );

    return (
      <BaseCardContent
        ref={ref}
        baseClasses="flex flex-col flex-1 overflow-y-auto"
        paddingStyles={MODAL_CONTENT_PADDING_STYLE}
        className={className}
        style={mergedStyle}
        {...props}
      >
        {children}
      </BaseCardContent>
    );
  })
);
ModalContent.displayName = 'Modal.Content';

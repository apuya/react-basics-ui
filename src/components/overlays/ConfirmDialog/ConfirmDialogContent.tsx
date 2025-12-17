import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Modal } from '@/components/overlays/Modal';
import { Text } from '@/components/typography/Text';

export interface ConfirmDialogContentProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * ConfirmDialog Content - wraps string children in Text component.
 * Uses Modal.Content which wraps BaseCardContent.
 */
export const ConfirmDialogContent = forwardRef<HTMLDivElement, ConfirmDialogContentProps>(
  ({ children, className, ...props }, ref) => (
    <Modal.Content ref={ref} className={className} {...props}>
      {typeof children === 'string' ? (
        <Text as="p" size="body" color="secondary">
          {children}
        </Text>
      ) : (
        children
      )}
    </Modal.Content>
  )
);

ConfirmDialogContent.displayName = 'ConfirmDialog.Content';

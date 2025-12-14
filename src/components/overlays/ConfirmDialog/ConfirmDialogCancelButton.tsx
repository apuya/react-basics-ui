import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Button } from '@/components/actions/Button';
import { useConfirmDialogContext } from './ConfirmDialog';

export interface ConfirmDialogCancelButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'onClick'> {
  children?: ReactNode;
}

export const ConfirmDialogCancelButton = forwardRef<
  HTMLButtonElement,
  ConfirmDialogCancelButtonProps
>(({ children = 'Cancel', ...props }, ref) => {
  const { isLoading, onClose } = useConfirmDialogContext();

  return (
    <Button ref={ref} variant="secondary" onClick={onClose} disabled={isLoading} {...props}>
      {children}
    </Button>
  );
});

ConfirmDialogCancelButton.displayName = 'ConfirmDialog.CancelButton';

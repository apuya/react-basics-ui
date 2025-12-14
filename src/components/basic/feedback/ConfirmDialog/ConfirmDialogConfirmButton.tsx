import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Button } from '@/components/basic/forms/Button';
import { useConfirmDialogContext, VARIANT_CONFIG } from './ConfirmDialog';

export interface ConfirmDialogConfirmButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'onClick'> {
  children?: ReactNode;
}

export const ConfirmDialogConfirmButton = forwardRef<
  HTMLButtonElement,
  ConfirmDialogConfirmButtonProps
>(({ children = 'Confirm', ...props }, ref) => {
  const { variant, isLoading, onConfirm } = useConfirmDialogContext();

  return (
    <Button
      ref={ref}
      variant={VARIANT_CONFIG[variant].buttonVariant}
      onClick={onConfirm}
      loading={isLoading}
      {...props}
    >
      {children}
    </Button>
  );
});

ConfirmDialogConfirmButton.displayName = 'ConfirmDialog.ConfirmButton';

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Flex } from '@/components/basic/layout/Flex';
import { cn } from '@/lib/cn';
import { useConfirmDialogContext } from './ConfirmDialog';

export interface ConfirmDialogHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export const ConfirmDialogHeader = forwardRef<HTMLDivElement, ConfirmDialogHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const { variant, isLoading } = useConfirmDialogContext();

    return (
      <Flex
        ref={ref}
        align="start"
        className={cn('w-full gap-[length:var(--component-confirm-dialog-gap)]', className)}
        data-variant={variant}
        data-loading={isLoading || undefined}
        {...props}
      >
        {children}
      </Flex>
    );
  }
);

ConfirmDialogHeader.displayName = 'ConfirmDialog.Header';

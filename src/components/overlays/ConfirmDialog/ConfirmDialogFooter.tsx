import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Flex } from '@/components/layout/Flex';
import { cn } from '@/lib/cn';

export interface ConfirmDialogFooterProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export const ConfirmDialogFooter = forwardRef<HTMLDivElement, ConfirmDialogFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        align="center"
        justify="end"
        className={cn('gap-[length:var(--component-confirm-dialog-gap)]', className)}
        {...props}
      >
        {children}
      </Flex>
    );
  }
);

ConfirmDialogFooter.displayName = 'ConfirmDialog.Footer';

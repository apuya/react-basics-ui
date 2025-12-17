import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { BaseCardHeader } from '@/components/layout/BaseCardContainer';

export interface ConfirmDialogHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * ConfirmDialog Header - row layout for icon + title.
 * Uses BaseCardHeader directly with flex row layout.
 */
export const ConfirmDialogHeader = forwardRef<HTMLDivElement, ConfirmDialogHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <BaseCardHeader
      ref={ref}
      baseClasses="flex items-start shrink-0"
      className={className}
      {...props}
    >
      {children}
    </BaseCardHeader>
  )
);

ConfirmDialogHeader.displayName = 'ConfirmDialog.Header';

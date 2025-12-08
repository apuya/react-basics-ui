import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { TABLE_HEADER_CONTAINER_BASE_CLASSES, TABLE_HEADER_CONTAINER_STICKY_CLASS } from './Table.styles';

export interface TableHeaderContainerProps extends ComponentPropsWithoutRef<'thead'> {
  sticky?: boolean;
}

export const TableHeaderContainer = memo(
  forwardRef<HTMLTableSectionElement, TableHeaderContainerProps>(
    ({ sticky = false, className, children, ...props }, ref) => (
      <thead
        ref={ref}
        className={cn(TABLE_HEADER_CONTAINER_BASE_CLASSES, sticky && TABLE_HEADER_CONTAINER_STICKY_CLASS, className)}
        data-sticky={sticky || undefined}
        {...props}
      >
        {children}
      </thead>
    )
  )
);

TableHeaderContainer.displayName = 'Table.HeaderContainer';

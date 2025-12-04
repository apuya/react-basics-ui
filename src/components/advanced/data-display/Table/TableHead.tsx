import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { TABLE_HEAD_BASE_CLASSES, TABLE_HEAD_STICKY_CLASS } from './Table.styles';

export interface TableHeadProps extends ComponentPropsWithoutRef<'thead'> {
  sticky?: boolean;
}

export const TableHead = memo(
  forwardRef<HTMLTableSectionElement, TableHeadProps>(
    ({ sticky = false, className, children, ...props }, ref) => (
      <thead
        ref={ref}
        className={cn(TABLE_HEAD_BASE_CLASSES, sticky && TABLE_HEAD_STICKY_CLASS, className)}
        data-sticky={sticky || undefined}
        {...props}
      >
        {children}
      </thead>
    )
  )
);

TableHead.displayName = 'Table.Head';

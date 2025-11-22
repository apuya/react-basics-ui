import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useTableContext } from './Table';
import { TABLE_HEADER_BASE_CLASSES, TABLE_HEADER_SIZE_STYLES } from './Table.styles';

export interface TableHeaderProps extends ComponentPropsWithoutRef<'th'> {}

export const TableHeader = memo(
  forwardRef<HTMLTableCellElement, TableHeaderProps>(({ className, children, ...props }, ref) => {
    const { size } = useTableContext();

    const headerClasses = useMemo(
      () => cn(TABLE_HEADER_BASE_CLASSES, TABLE_HEADER_SIZE_STYLES[size], className),
      [size, className]
    );

    return (
      <th ref={ref} className={headerClasses} {...props}>
        {children}
      </th>
    );
  })
);

TableHeader.displayName = 'Table.Header';

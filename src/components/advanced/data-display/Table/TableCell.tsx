import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useTableContext } from './TableContext';
import { TABLE_CELL_BASE_CLASSES, TABLE_CELL_SIZE_STYLES } from './Table.styles';

export interface TableCellProps extends ComponentPropsWithoutRef<'td'> {}

export const TableCell = memo(
  forwardRef<HTMLTableCellElement, TableCellProps>(({ className, children, ...props }, ref) => {
    const { size } = useTableContext();

    const cellClasses = useMemo(
      () => cn(TABLE_CELL_BASE_CLASSES, TABLE_CELL_SIZE_STYLES[size], className),
      [size, className]
    );

    return (
      <td ref={ref} className={cellClasses} data-size={size} {...props}>
        {children}
      </td>
    );
  })
);

TableCell.displayName = 'Table.Cell';

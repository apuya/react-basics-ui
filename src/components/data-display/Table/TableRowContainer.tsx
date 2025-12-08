import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useTableContext } from './TableContext';
import { TABLE_ROW_BASE_CLASSES, TABLE_ROW_VARIANT_STYLES } from './Table.styles';

export interface TableRowContainerProps extends ComponentPropsWithoutRef<'tr'> {}

export const TableRowContainer = memo(
  forwardRef<HTMLTableRowElement, TableRowContainerProps>(({ className, children, ...props }, ref) => {
    const { variant } = useTableContext();

    const rowClasses = useMemo(
      () => cn(TABLE_ROW_BASE_CLASSES, TABLE_ROW_VARIANT_STYLES[variant], className),
      [variant, className]
    );

    return (
      <tr ref={ref} className={rowClasses} data-variant={variant} {...props}>
        {children}
      </tr>
    );
  })
);

TableRowContainer.displayName = 'Table.Row';

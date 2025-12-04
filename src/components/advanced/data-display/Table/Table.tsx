import {
  useMemo,
  type ComponentPropsWithoutRef,
  forwardRef,
  memo,
} from 'react';
import { cn } from '@/lib/cn';
import { TableContext, type TableSize, type TableVariant } from './TableContext';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import { TableFooter } from './TableFooter';
import { TableActionBar } from './TableActionBar';
import {
  TABLE_BASE_CLASSES,
  TABLE_WRAPPER_CLASSES,
  TABLE_WRAPPER_STICKY_CLASS,
} from './Table.styles';

export type { TableSize, TableVariant } from './TableContext';
export { useTableContext } from './TableContext';

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
  size?: TableSize;
  variant?: TableVariant;
  stickyHeader?: boolean;
}

const TableRoot = memo(
  forwardRef<HTMLTableElement, TableProps>(
    ({ size = 'md', variant = 'default', stickyHeader = false, className, children, ...props }, ref) => {
      const contextValue = useMemo(
        () => ({ size, variant }),
        [size, variant]
      );

      const tableClasses = useMemo(
        () => cn(TABLE_BASE_CLASSES, className),
        [className]
      );

      const wrapperClasses = useMemo(
        () => cn(TABLE_WRAPPER_CLASSES, stickyHeader && TABLE_WRAPPER_STICKY_CLASS),
        [stickyHeader]
      );

      return (
        <div className={wrapperClasses}>
          <TableContext.Provider value={contextValue}>
            <table
              ref={ref}
              className={tableClasses}
              data-size={size}
              data-variant={variant}
              data-sticky-header={stickyHeader || undefined}
              {...props}
            >
              {children}
            </table>
          </TableContext.Provider>
        </div>
      );
    }
  )
);

TableRoot.displayName = 'Table';

export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Header: TableHeader,
  Cell: TableCell,
  Footer: TableFooter,
  ActionBar: TableActionBar,
});

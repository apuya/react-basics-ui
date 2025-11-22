import {
  createContext,
  useContext,
  useMemo,
  type ComponentPropsWithoutRef,
  forwardRef,
  memo,
} from 'react';
import { cn } from '@/lib/cn';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import { TableFooter } from './TableFooter';
import { TABLE_BASE_CLASSES } from './Table.styles';

export type TableSize = 'sm' | 'md' | 'lg';
export type TableVariant = 'default' | 'striped' | 'bordered';

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
  size?: TableSize;
  variant?: TableVariant;
  stickyHeader?: boolean;
}

interface TableContextValue {
  size: TableSize;
  variant: TableVariant;
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('Table sub-components must be used within a Table component');
  }
  return context;
};

const TableRoot = memo(
  forwardRef<HTMLTableElement, TableProps>(
    ({ size = 'md', variant = 'default', stickyHeader = false, className, children, ...props }, ref) => {
      const contextValue = useMemo(
        () => ({
          size,
          variant,
        }),
        [size, variant]
      );

      const tableClasses = useMemo(
        () => cn(TABLE_BASE_CLASSES, className),
        [className]
      );

      const wrapperClasses = useMemo(
        () =>
          cn(
            'relative w-full overflow-auto',
            stickyHeader && 'max-h-[600px]'
          ),
        [stickyHeader]
      );

      return (
        <div className={wrapperClasses}>
          <TableContext.Provider value={contextValue}>
            <table ref={ref} className={tableClasses} {...props}>
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
});

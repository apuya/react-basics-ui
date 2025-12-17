/**
 * @file Table.tsx
 * @description Root Table component providing data table functionality.
 *
 * Implements the compound component pattern via Object.assign, exposing:
 * - Table.HeaderContainer - The thead wrapper
 * - Table.Body - The tbody wrapper
 * - Table.Row - Individual table rows
 * - Table.HeaderCell - Header cells (th) with sorting, checkbox, etc.
 * - Table.Cell - Data cells (td) with multiple variants
 * - Table.Footer - Footer with pagination/navigation
 * - Table.ActionBar - Search and action buttons in header
 *
 * Uses TableContext to share size and variant state with all sub-components.
 *
 * @example
 * ```tsx
 * <Table
 *   size="md"
 *   variant="striped"
 *   actionBar={{ variant: 'search', searchProps: { placeholder: 'Search...' } }}
 *   headerCells={<Table.HeaderCell>Name</Table.HeaderCell>}
 *   footer={{ variant: 'pagination', totalPages: 10 }}
 * >
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>John Doe</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 */

import {
  useMemo,
  type ComponentPropsWithoutRef,
  forwardRef,
  memo,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/cn';
import { TableContext, type TableSize, type TableVariant } from './TableContext';
import { TableHeaderContainer } from './TableHeaderContainer';
import { TableBody } from './TableBody';
import { TableRowContainer } from './TableRowContainer';
import { TableHeaderCell } from './TableHeaderCell';
import { TableCell } from './TableCell';
import { TableFooter, type TableFooterProps } from './TableFooter';
import { TableActionBar, type TableActionBarProps } from './TableActionBar';
import {
  TABLE_BASE_CLASSES,
  TABLE_WRAPPER_CLASSES,
  TABLE_WRAPPER_STICKY_CLASS,
} from './Table.styles';

export type { TableSize, TableVariant } from './TableContext';
export { useTableContext } from './TableContext';

export interface TableProps extends Omit<ComponentPropsWithoutRef<'table'>, 'children'> {
  size?: TableSize;
  variant?: TableVariant;
  stickyHeader?: boolean;
  /** Required: Props for the action bar in the header */
  actionBar: Omit<TableActionBarProps, 'ref'>;
  /** Required: Header cells to render in the header row (e.g., <Table.HeaderCell>Name</Table.HeaderCell>) */
  headerCells: ReactNode;
  /** Required: Props for the footer */
  footer: Omit<TableFooterProps, 'ref'>;
  /** Table body content (typically <Table.Body>...</Table.Body>) */
  children: ReactNode;
}

const TableRoot = memo(
  forwardRef<HTMLTableElement, TableProps>(
    ({ size = 'md', variant = 'default', stickyHeader = false, actionBar, headerCells, footer, className, children, ...props }, ref) => {
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
              <TableHeaderContainer sticky={stickyHeader}>
                <TableRowContainer>
                  <TableActionBar {...actionBar} />
                </TableRowContainer>
                <TableRowContainer>
                  {headerCells}
                </TableRowContainer>
              </TableHeaderContainer>
              {children}
              <TableFooter {...footer} />
            </table>
          </TableContext.Provider>
        </div>
      );
    }
  )
);

TableRoot.displayName = 'Table';

export const Table = Object.assign(TableRoot, {
  HeaderContainer: TableHeaderContainer,
  Body: TableBody,
  Row: TableRowContainer,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
  Footer: TableFooter,
  ActionBar: TableActionBar,
});

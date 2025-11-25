import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { TABLE_FOOTER_BASE_CLASSES } from './Table.styles';
import { Pagination } from '../../navigation/Pagination';

export interface TableFooterProps extends ComponentPropsWithoutRef<'tfoot'> {
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

export const TableFooter = memo(
  forwardRef<HTMLTableSectionElement, TableFooterProps>(
    (
      {
        className,
        children,
        currentPage = 1,
        totalPages = 1,
        itemsPerPage = 10,
        totalItems,
        onPageChange,
        ...props
      },
      ref
    ) => {
      const footerClasses = useMemo(
        () => cn(TABLE_FOOTER_BASE_CLASSES, className),
        [className]
      );

      const paddingStyle = useMemo(
        () => ({
          paddingInline: 'var(--component-table-padding-md)',
          paddingBlock: 'var(--component-table-padding-sm)',
          minHeight: '44px',
        }),
        []
      );

      const showPagination = totalPages > 1 || totalItems !== undefined;

      const startItem = (currentPage - 1) * itemsPerPage + 1;
      const endItem = totalItems
        ? Math.min(currentPage * itemsPerPage, totalItems)
        : currentPage * itemsPerPage;
      const total = totalItems ?? totalPages * itemsPerPage;

      return (
        <tfoot ref={ref} className={footerClasses} {...props}>
          <tr>
            <td style={paddingStyle}>
              {children || (
                <div className="flex items-center" style={{ justifyContent: 'space-between' }}>
                  {showPagination && (
                    <Pagination
                      totalPages={totalPages}
                      page={currentPage}
                      onChange={onPageChange}
                      size="sm"
                    >
                      <Pagination.List>
                        <Pagination.Previous />
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                          <Pagination.Item key={i + 1} page={i + 1} />
                        ))}
                        {totalPages > 5 && <Pagination.Ellipsis />}
                        <Pagination.Next />
                      </Pagination.List>
                    </Pagination>
                  )}
                  <div className="text-sm text-gray-600">
                    Showing {startItem} to {endItem} of {total} items
                  </div>
                </div>
              )}
            </td>
          </tr>
        </tfoot>
      );
    }
  )
);

TableFooter.displayName = 'Table.Footer';

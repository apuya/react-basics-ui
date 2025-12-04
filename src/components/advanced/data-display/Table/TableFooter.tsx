import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { TABLE_FOOTER_BASE_CLASSES, TABLE_CELL_SIZE_STYLES } from './Table.styles';
import { Pagination } from '../../navigation/Pagination';
import { Flex } from '@/components/basic/layout/Flex';
import { Text } from '@/components/basic/typography/Text';
import { useTableContext } from './TableContext';

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
      const { size } = useTableContext();

      const footerClasses = useMemo(
        () => cn(TABLE_FOOTER_BASE_CLASSES, className),
        [className]
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
            <td className={TABLE_CELL_SIZE_STYLES[size]}>
              {children || (
                <Flex align="center" justify="between">
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
                  <Text size="small" color="secondary">
                    Showing {startItem} to {endItem} of {total} items
                  </Text>
                </Flex>
              )}
            </td>
          </tr>
        </tfoot>
      );
    }
  )
);

TableFooter.displayName = 'Table.Footer';

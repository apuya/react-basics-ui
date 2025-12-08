import { forwardRef, memo, useCallback, useMemo, type ComponentPropsWithoutRef, type CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import { TABLE_FOOTER_BASE_CLASSES } from './Table.styles';
import { useTableContext } from './TableContext';
import { Button } from '@/components/forms/Button';
import { Icon } from '@/components/utility/Icon';
import { Text } from '@/components/typography/Text';
import { Pagination } from '@/components/navigation/Pagination';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

export type TableFooterVariant = 'default' | 'navigation' | 'pagination';

export interface TableFooterProps extends ComponentPropsWithoutRef<'tfoot'> {
  /** Footer variant */
  variant?: TableFooterVariant;
  /** Number of columns the footer should span */
  colSpan?: number;
  /** Current page (for navigation/pagination variants) */
  currentPage?: number;
  /** Total pages (for navigation/pagination variants) */
  totalPages?: number;
  /** Items per page (for navigation/pagination variants) */
  itemsPerPage?: number;
  /** Total items (for navigation/pagination variants) */
  totalItems?: number;
  /** Show page info text (for navigation/pagination variants) */
  showPageInfo?: boolean;
  /** Callback when page changes (for navigation/pagination variants) */
  onPageChange?: (page: number) => void;
}

// Inline style for default footer cell - fixed height, no padding
const DEFAULT_CELL_STYLE: CSSProperties = {
  height: 'var(--component-table-footer-min-height)',
  width: '100%',
};

// Inline style for navigation footer cell - fixed height with horizontal padding only
const NAVIGATION_CELL_STYLE: CSSProperties = {
  height: 'var(--component-table-footer-min-height)',
  paddingInline: 'var(--component-table-footer-padding-inline)',
  width: '100%',
};

// Inline style for pagination footer cell - flexible height with padding
const PAGINATION_CELL_STYLE: CSSProperties = {
  paddingBlock: 'var(--component-table-footer-padding-block)',
  paddingInline: 'var(--component-table-footer-padding-inline)',
  width: '100%',
};

// Inline style for navigation container
const NAVIGATION_CONTAINER_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
};

// Inline style for arrow buttons group
const ARROWS_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--component-table-footer-gap)',
};

// Inline style for page info - centered with flex-1
const PAGE_INFO_STYLE: CSSProperties = {
  flex: 1,
  textAlign: 'center',
};

// Inline style for pagination container - centered column layout
const PAGINATION_CONTAINER_STYLE: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--component-table-footer-gap)',
  width: '100%',
};

export const TableFooter = memo(
  forwardRef<HTMLTableSectionElement, TableFooterProps>(
    ({ 
      variant = 'default',
      className, 
      colSpan,
      currentPage = 1,
      totalPages = 1,
      itemsPerPage = 10,
      totalItems,
      showPageInfo = false,
      onPageChange,
      ...props 
    }, ref) => {
      const { size } = useTableContext();

      const footerClasses = useMemo(
        () => cn(TABLE_FOOTER_BASE_CLASSES, className),
        [className]
      );

      // Only compute handlers for navigation variant
      const handlePrevious = useCallback(() => {
        if (currentPage > 1 && onPageChange) {
          onPageChange(currentPage - 1);
        }
      }, [currentPage, onPageChange]);

      const handleNext = useCallback(() => {
        if (currentPage < totalPages && onPageChange) {
          onPageChange(currentPage + 1);
        }
      }, [currentPage, totalPages, onPageChange]);

      // Memoize page info calculation - only computed when needed
      const pageInfo = useMemo(() => {
        if (variant === 'default' || !showPageInfo) return null;
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const total = totalItems ?? totalPages * itemsPerPage;
        const endItem = Math.min(currentPage * itemsPerPage, total);
        return { startItem, endItem, total };
      }, [variant, showPageInfo, currentPage, itemsPerPage, totalItems, totalPages]);

      // Memoize pagination page numbers
      const paginationPages = useMemo(() => {
        if (variant !== 'pagination') return [];
        const count = Math.min(5, totalPages);
        return Array.from({ length: count }, (_, i) => {
          if (totalPages <= 5) return i + 1;
          if (currentPage <= 3) return i + 1;
          if (currentPage >= totalPages - 2) return totalPages - 4 + i;
          return currentPage - 2 + i;
        });
      }, [variant, totalPages, currentPage]);

      // Default variant - empty fixed height (early return for performance)
      if (variant === 'default') {
        return (
          <tfoot ref={ref} className={footerClasses} data-variant={variant} data-size={size} {...props}>
            <tr>
              <td colSpan={colSpan} style={DEFAULT_CELL_STYLE} />
            </tr>
          </tfoot>
        );
      }

      // Pagination variant
      if (variant === 'pagination') {
        return (
          <tfoot ref={ref} className={footerClasses} data-variant={variant} data-size={size} {...props}>
            <tr>
              <td colSpan={colSpan} style={PAGINATION_CELL_STYLE}>
                <div style={PAGINATION_CONTAINER_STYLE}>
                  <Pagination
                    totalPages={totalPages}
                    page={currentPage}
                    onChange={onPageChange}
                    size="sm"
                  >
                    <Pagination.List>
                      <Pagination.Previous />
                      {paginationPages.map((pageNum) => (
                        <Pagination.Item key={pageNum} page={pageNum} />
                      ))}
                      {totalPages > 5 && currentPage < totalPages - 2 && <Pagination.Ellipsis />}
                      <Pagination.Next />
                    </Pagination.List>
                  </Pagination>
                  {pageInfo && (
                    <Text size="small" color="secondary">
                      Showing {pageInfo.startItem} to {pageInfo.endItem} of {pageInfo.total}
                    </Text>
                  )}
                </div>
              </td>
            </tr>
          </tfoot>
        );
      }

      // Navigation variant
      return (
        <tfoot ref={ref} className={footerClasses} data-variant={variant} data-size={size} {...props}>
          <tr>
            <td colSpan={colSpan} style={NAVIGATION_CELL_STYLE}>
              <div style={NAVIGATION_CONTAINER_STYLE}>
                <div style={ARROWS_STYLE}>
                  <Button
                    size="small"
                    variant="tabs"
                    onClick={handlePrevious}
                    disabled={currentPage <= 1}
                    aria-label="Previous page"
                  >
                    <Icon icon={BiChevronLeft} size="sm" />
                  </Button>
                  <Button
                    size="small"
                    variant="tabs"
                    onClick={handleNext}
                    disabled={currentPage >= totalPages}
                    aria-label="Next page"
                  >
                    <Icon icon={BiChevronRight} size="sm" />
                  </Button>
                </div>
                {pageInfo && (
                  <div style={PAGE_INFO_STYLE}>
                    <Text size="small" color="secondary">
                      Showing {pageInfo.startItem} to {pageInfo.endItem} of {pageInfo.total}
                    </Text>
                  </div>
                )}
              </div>
            </td>
          </tr>
        </tfoot>
      );
    }
  )
);

TableFooter.displayName = 'Table.Footer';

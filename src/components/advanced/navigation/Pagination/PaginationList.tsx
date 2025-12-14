import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { PAGINATION_LIST_BASE_CLASSES } from './Pagination.styles';
import { usePaginationContext } from './Pagination';

export interface PaginationListProps extends ComponentPropsWithoutRef<'ul'> {}

/**
 * Container for pagination items. Renders as an unordered list.
 * Automatically includes accessible page information via aria-label.
 *
 * @example
 * ```tsx
 * <Pagination.List>
 *   <Pagination.Previous />
 *   <Pagination.Item page={1} />
 *   <Pagination.Next />
 * </Pagination.List>
 * ```
 */
export const PaginationList = memo(
  forwardRef<HTMLUListElement, PaginationListProps>(({ className, children, 'aria-label': ariaLabel, ...props }, ref) => {
    // Try to get context for enhanced accessibility, but don't require it
    let pageInfo: string | undefined;
    try {
      const { currentPage, totalPages } = usePaginationContext('List');
      pageInfo = `Page ${currentPage} of ${totalPages}`;
    } catch {
      // Context not available, skip enhanced aria-label
    }

    return (
      <ul
        ref={ref}
        className={cn(PAGINATION_LIST_BASE_CLASSES, className)}
        aria-label={ariaLabel ?? pageInfo}
        {...props}
      >
        {children}
      </ul>
    );
  })
);

PaginationList.displayName = 'Pagination.List';

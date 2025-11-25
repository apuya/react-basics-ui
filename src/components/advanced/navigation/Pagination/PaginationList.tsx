import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { PAGINATION_LIST_BASE_CLASSES } from './Pagination.styles';

export interface PaginationListProps extends ComponentPropsWithoutRef<'ul'> {}

/**
 * Container for pagination items. Renders as an unordered list.
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
  forwardRef<HTMLUListElement, PaginationListProps>(({ className, children, ...props }, ref) => (
    <ul ref={ref} className={cn(PAGINATION_LIST_BASE_CLASSES, className)} {...props}>
      {children}
    </ul>
  ))
);

PaginationList.displayName = 'Pagination.List';

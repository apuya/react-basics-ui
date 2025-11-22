import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { PAGINATION_LIST_BASE_CLASSES } from './Pagination.styles';

export interface PaginationListProps extends ComponentPropsWithoutRef<'ul'> {}

export const PaginationList = memo(
  forwardRef<HTMLUListElement, PaginationListProps>(({ className, children, ...props }, ref) => {
    const listClasses = useMemo(
      () => cn(PAGINATION_LIST_BASE_CLASSES, className),
      [className]
    );

    return (
      <ul ref={ref} className={listClasses} {...props}>
        {children}
      </ul>
    );
  })
);

PaginationList.displayName = 'Pagination.List';

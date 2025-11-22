import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { usePaginationContext } from './Pagination';
import {
  PAGINATION_ELLIPSIS_BASE_CLASSES,
  PAGINATION_ELLIPSIS_SIZE_STYLES,
} from './Pagination.styles';

export interface PaginationEllipsisProps extends ComponentPropsWithoutRef<'span'> {}

export const PaginationEllipsis = memo(
  forwardRef<HTMLSpanElement, PaginationEllipsisProps>(({ className, ...props }, ref) => {
    const { size } = usePaginationContext();

    const ellipsisClasses = useMemo(
      () => cn(PAGINATION_ELLIPSIS_BASE_CLASSES, PAGINATION_ELLIPSIS_SIZE_STYLES[size], className),
      [size, className]
    );

    return (
      <li>
        <span ref={ref} aria-hidden className={ellipsisClasses} {...props}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-4 w-4"
          >
            <path d="M6 12a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </span>
      </li>
    );
  })
);

PaginationEllipsis.displayName = 'Pagination.Ellipsis';

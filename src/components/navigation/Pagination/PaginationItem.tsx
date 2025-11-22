import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { usePaginationContext } from './Pagination';
import {
  PAGINATION_ITEM_BASE_CLASSES,
  PAGINATION_ITEM_SIZE_STYLES,
  PAGINATION_ITEM_VARIANT_STYLES,
} from './Pagination.styles';

export interface PaginationItemProps extends ComponentPropsWithoutRef<'button'> {
  page: number;
  children?: ReactNode;
}

export const PaginationItem = memo(
  forwardRef<HTMLButtonElement, PaginationItemProps>(
    ({ page, children, className, ...props }, ref) => {
      const { currentPage, goToPage, size } = usePaginationContext();
      const isActive = currentPage === page;

      const handleClick = useCallback(() => {
        goToPage(page);
      }, [goToPage, page]);

      const itemClasses = useMemo(
        () =>
          cn(
            PAGINATION_ITEM_BASE_CLASSES,
            PAGINATION_ITEM_SIZE_STYLES[size],
            isActive ? PAGINATION_ITEM_VARIANT_STYLES.active : PAGINATION_ITEM_VARIANT_STYLES.default,
            className
          ),
        [size, isActive, className]
      );

      return (
        <li>
          <button
            ref={ref}
            type="button"
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={handleClick}
            className={itemClasses}
            {...props}
          >
            {children || page}
          </button>
        </li>
      );
    }
  )
);

PaginationItem.displayName = 'Pagination.Item';

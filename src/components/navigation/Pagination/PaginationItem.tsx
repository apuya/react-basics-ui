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
  /** The page number this item represents */
  page: number;
  /** Custom content (defaults to page number) */
  children?: ReactNode;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * Individual page number button. Highlights when active.
 *
 * @example
 * ```tsx
 * <Pagination.Item page={1} />
 * <Pagination.Item page={2}>Two</Pagination.Item>
 * ```
 */
export const PaginationItem = memo(
  forwardRef<HTMLButtonElement, PaginationItemProps>(
    ({ page, children, className, disabled, ...props }, ref) => {
      const { currentPage, goToPage, size, totalPages } = usePaginationContext('Item');

      // Validate page prop
      const validPage = Math.max(1, Math.min(Math.floor(page), totalPages));
      const isActive = currentPage === validPage;

      const handleClick = useCallback(() => {
        goToPage(validPage);
      }, [goToPage, validPage]);

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
            aria-label={`Go to page ${validPage}`}
            aria-current={isActive ? 'page' : undefined}
            disabled={disabled}
            onClick={handleClick}
            className={itemClasses}
            {...props}
          >
            {children || validPage}
          </button>
        </li>
      );
    }
  )
);

PaginationItem.displayName = 'Pagination.Item';

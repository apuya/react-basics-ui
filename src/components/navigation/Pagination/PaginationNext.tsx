import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { usePaginationContext } from './Pagination';
import {
  PAGINATION_ITEM_BASE_CLASSES,
  PAGINATION_ITEM_SIZE_STYLES,
  PAGINATION_ITEM_VARIANT_STYLES,
  PAGINATION_NAV_BUTTON_CLASSES,
} from './Pagination.styles';

export interface PaginationNextProps extends ComponentPropsWithoutRef<'button'> {}

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const PaginationNext = memo(
  forwardRef<HTMLButtonElement, PaginationNextProps>(({ className, children, ...props }, ref) => {
    const { currentPage, totalPages, goToPage, size } = usePaginationContext();
    const isDisabled = currentPage === totalPages;

    const handleClick = useCallback(() => {
      goToPage(currentPage + 1);
    }, [goToPage, currentPage]);

    const buttonClasses = useMemo(
      () =>
        cn(
          PAGINATION_ITEM_BASE_CLASSES,
          PAGINATION_ITEM_SIZE_STYLES[size],
          PAGINATION_ITEM_VARIANT_STYLES.ghost,
          PAGINATION_NAV_BUTTON_CLASSES,
          className
        ),
      [size, className]
    );

    return (
      <li>
        <button
          ref={ref}
          type="button"
          aria-label="Go to next page"
          disabled={isDisabled}
          onClick={handleClick}
          className={buttonClasses}
          {...props}
        >
          {children || <span>Next</span>}
          <ChevronRightIcon />
        </button>
      </li>
    );
  })
);

PaginationNext.displayName = 'Pagination.Next';

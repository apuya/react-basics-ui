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

export interface PaginationPreviousProps extends ComponentPropsWithoutRef<'button'> {}

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const PaginationPrevious = memo(
  forwardRef<HTMLButtonElement, PaginationPreviousProps>(({ className, children, ...props }, ref) => {
    const { currentPage, goToPage, size } = usePaginationContext();
    const isDisabled = currentPage === 1;

    const handleClick = useCallback(() => {
      goToPage(currentPage - 1);
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
          aria-label="Go to previous page"
          disabled={isDisabled}
          onClick={handleClick}
          className={buttonClasses}
          {...props}
        >
          <ChevronLeftIcon />
          {children || <span>Previous</span>}
        </button>
      </li>
    );
  })
);

PaginationPrevious.displayName = 'Pagination.Previous';

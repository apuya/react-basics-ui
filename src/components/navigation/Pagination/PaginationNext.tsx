import { forwardRef, memo, useCallback, type ComponentPropsWithoutRef } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { usePaginationContext } from './Pagination';
import { Button } from '@/components/forms/Button';
import { Icon } from '@/components/utility/Icon';
import { PAGINATION_TO_BUTTON_SIZE } from './Pagination.styles';

export interface PaginationNextProps extends ComponentPropsWithoutRef<'button'> {}

/**
 * Next page navigation button. Disabled on last page.
 *
 * @example
 * ```tsx
 * <Pagination.Next />
 * <Pagination.Next>Forward →</Pagination.Next>
 * ```
 */
export const PaginationNext = memo(
  forwardRef<HTMLButtonElement, PaginationNextProps>(({ className, children, ...props }, ref) => {
    const { currentPage, totalPages, goToPage, size } = usePaginationContext('Next');
    const isDisabled = currentPage === totalPages;

    const handleClick = useCallback(() => {
      goToPage(currentPage + 1);
    }, [goToPage, currentPage]);

    return (
      <li>
        <Button
          ref={ref}
          variant="tabs"
          size={PAGINATION_TO_BUTTON_SIZE[size]}
          aria-label="Go to next page"
          disabled={isDisabled}
          onClick={handleClick}
          trailingIcon={<Icon icon={BiChevronRight} size="sm" color="inherit" />}
          className={className}
          {...props}
        >
          {children || 'Next'}
        </Button>
      </li>
    );
  })
);

PaginationNext.displayName = 'Pagination.Next';

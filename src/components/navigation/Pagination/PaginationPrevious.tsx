import { forwardRef, memo, useCallback, type ComponentPropsWithoutRef } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { usePaginationContext } from './Pagination';
import { Button } from '@/components/actions/Button';
import { Icon } from '@/components/utility/Icon';
import { PAGINATION_SIZE_MAPPINGS } from './Pagination.styles';

export interface PaginationPreviousProps extends ComponentPropsWithoutRef<'button'> {}

/**
 * Previous page navigation button. Disabled on first page.
 *
 * @example
 * ```tsx
 * <Pagination.Previous />
 * <Pagination.Previous>← Back</Pagination.Previous>
 * ```
 */
export const PaginationPrevious = memo(
  forwardRef<HTMLButtonElement, PaginationPreviousProps>(({ className, children, ...props }, ref) => {
    const { currentPage, goToPage, size } = usePaginationContext('Previous');
    const isDisabled = currentPage === 1;

    const handleClick = useCallback(() => {
      goToPage(currentPage - 1);
    }, [goToPage, currentPage]);

    return (
      <li>
        <Button
          ref={ref}
          variant="tabs"
          size={PAGINATION_SIZE_MAPPINGS[size].button}
          aria-label="Go to previous page"
          disabled={isDisabled}
          onClick={handleClick}
          leadingIcon={<Icon icon={BiChevronLeft} size={PAGINATION_SIZE_MAPPINGS[size].icon} color="inherit" />}
          className={className}
          {...props}
        >
          {children || 'Previous'}
        </Button>
      </li>
    );
  })
);

PaginationPrevious.displayName = 'Pagination.Previous';

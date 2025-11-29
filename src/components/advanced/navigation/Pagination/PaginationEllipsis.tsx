import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { usePaginationContext } from './Pagination';
import {
  PAGINATION_ELLIPSIS_BASE_CLASSES,
  PAGINATION_ELLIPSIS_SIZE_STYLES,
  PAGINATION_SIZE_MAPPINGS,
} from './Pagination.styles';
import { Icon } from '@/components/basic/utility/Icon';

export interface PaginationEllipsisProps extends ComponentPropsWithoutRef<'span'> {}

/**
 * Ellipsis indicator for truncated page ranges.
 *
 * @example
 * ```tsx
 * <Pagination.Item page={1} />
 * <Pagination.Ellipsis />
 * <Pagination.Item page={10} />
 * ```
 */
export const PaginationEllipsis = memo(
  forwardRef<HTMLSpanElement, PaginationEllipsisProps>(({ className, ...props }, ref) => {
    const { size } = usePaginationContext('Ellipsis');

    const ellipsisClasses = useMemo(
      () => cn(PAGINATION_ELLIPSIS_BASE_CLASSES, PAGINATION_ELLIPSIS_SIZE_STYLES[size], className),
      [size, className]
    );

    return (
      <li role="presentation">
        <span ref={ref} aria-hidden className={ellipsisClasses} {...props}>
          <Icon icon={BiDotsHorizontalRounded} size={PAGINATION_SIZE_MAPPINGS[size].icon} color="inherit" />
        </span>
      </li>
    );
  })
);

PaginationEllipsis.displayName = 'Pagination.Ellipsis';

import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo } from 'react';
import {
  BREADCRUMB_ITEM_CLASSES,
  BREADCRUMB_SEPARATOR_CLASSES,
  ITEM_GAP_STYLES,
  SEPARATOR_SPACING_STYLES,
} from './Breadcrumb.styles';
import { useBreadcrumbContext } from './Breadcrumb';
import type { BreadcrumbItemProps } from './Breadcrumb.types';

/**
 * Breadcrumb.Item - List item wrapper for a single breadcrumb entry.
 *
 * Automatically renders separator after the item unless `isCurrent` or `showSeparator={false}`.
 * Access parent's separator via `useBreadcrumbContext()`.
 *
 * @example
 * ```tsx
 * <Breadcrumb.Item>
 *   <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
 * </Breadcrumb.Item>
 *
 * // Current page (no separator)
 * <Breadcrumb.Item isCurrent>
 *   <Breadcrumb.Link isCurrent>Current Page</Breadcrumb.Link>
 * </Breadcrumb.Item>
 * ```
 */
export const BreadcrumbItem = memo(
  forwardRef<HTMLLIElement, BreadcrumbItemProps>(function BreadcrumbItem(
    { children, isCurrent = false, showSeparator = true, className, ...props },
    ref
  ) {
    const { separator } = useBreadcrumbContext();

    const itemClasses = useMemo(
      () => cn(BREADCRUMB_ITEM_CLASSES, className),
      [className]
    );

    return (
      <li
        ref={ref}
        className={itemClasses}
        style={ITEM_GAP_STYLES}
        data-current={isCurrent || undefined}
        {...props}
      >
        {children}
        {!isCurrent && showSeparator && (
          <span
            className={BREADCRUMB_SEPARATOR_CLASSES}
            style={SEPARATOR_SPACING_STYLES}
            aria-hidden="true"
          >
            {separator}
          </span>
        )}
      </li>
    );
  })
);

BreadcrumbItem.displayName = 'Breadcrumb.Item';

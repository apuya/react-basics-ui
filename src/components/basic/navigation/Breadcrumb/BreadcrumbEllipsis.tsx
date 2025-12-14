import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo } from 'react';
import { BREADCRUMB_ELLIPSIS_CLASSES, ELLIPSIS_TYPOGRAPHY_STYLES } from './Breadcrumb.styles';
import type { BreadcrumbEllipsisProps } from './Breadcrumb.types';

/**
 * Breadcrumb.Ellipsis - Indicator for collapsed/hidden breadcrumb items.
 *
 * Renders "..." by default. Use within `Breadcrumb.Item` for proper spacing.
 * Hidden from assistive technology (`aria-hidden="true"`).
 *
 * @example
 * ```tsx
 * <Breadcrumb.Item>
 *   <Breadcrumb.Ellipsis />
 * </Breadcrumb.Item>
 *
 * // Custom content
 * <Breadcrumb.Item>
 *   <Breadcrumb.Ellipsis>•••</Breadcrumb.Ellipsis>
 * </Breadcrumb.Item>
 * ```
 */
export const BreadcrumbEllipsis = memo(
  forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(function BreadcrumbEllipsis(
    { className, children = '...', ...props },
    ref
  ) {
    const ellipsisClasses = useMemo(
      () => cn(BREADCRUMB_ELLIPSIS_CLASSES, className),
      [className]
    );

    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={ellipsisClasses}
        style={ELLIPSIS_TYPOGRAPHY_STYLES}
        {...props}
      >
        {children}
      </span>
    );
  })
);

BreadcrumbEllipsis.displayName = 'Breadcrumb.Ellipsis';

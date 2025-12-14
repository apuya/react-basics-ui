import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo } from 'react';
import { createComponentContext } from '@/lib/createComponentContext';
import { BREADCRUMB_CLASSES, BREADCRUMB_LIST_CLASSES } from './Breadcrumb.styles';
import type { BreadcrumbContextValue, BreadcrumbProps } from './Breadcrumb.types';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';
import { BreadcrumbEllipsis } from './BreadcrumbEllipsis';

// =============================================================================
// Context
// =============================================================================

const { Context: BreadcrumbContext, useContext: useBreadcrumbContext } =
  createComponentContext<BreadcrumbContextValue>('Breadcrumb');

export { useBreadcrumbContext };

// =============================================================================
// Breadcrumb Root Component
// =============================================================================

/**
 * Breadcrumb - Navigation component showing hierarchical page structure.
 *
 * Compound component with `Breadcrumb.Item`, `Breadcrumb.Link`, `Breadcrumb.Ellipsis`.
 * Renders as semantic `<nav>` with `<ol>` for proper accessibility.
 *
 * @example
 * ```tsx
 * <Breadcrumb separator=">">
 *   <Breadcrumb.Item>
 *     <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
 *   </Breadcrumb.Item>
 *   <Breadcrumb.Item>
 *     <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
 *   </Breadcrumb.Item>
 *   <Breadcrumb.Item isCurrent>
 *     <Breadcrumb.Link isCurrent>Current Page</Breadcrumb.Link>
 *   </Breadcrumb.Item>
 * </Breadcrumb>
 *
 * // With ellipsis for collapsed items
 * <Breadcrumb>
 *   <Breadcrumb.Item>
 *     <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
 *   </Breadcrumb.Item>
 *   <Breadcrumb.Item>
 *     <Breadcrumb.Ellipsis />
 *   </Breadcrumb.Item>
 *   <Breadcrumb.Item isCurrent>
 *     <Breadcrumb.Link isCurrent>Deep Page</Breadcrumb.Link>
 *   </Breadcrumb.Item>
 * </Breadcrumb>
 * ```
 */
const BreadcrumbRoot = memo(
  forwardRef<HTMLElement, BreadcrumbProps>(function BreadcrumbRoot(
    { children, separator = '/', className, ...props },
    ref
  ) {
    const navClasses = useMemo(
      () => cn(BREADCRUMB_CLASSES, className),
      [className]
    );

    return (
      <BreadcrumbContext.Provider value={{ separator }}>
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={navClasses}
          {...props}
        >
          <ol className={BREADCRUMB_LIST_CLASSES}>{children}</ol>
        </nav>
      </BreadcrumbContext.Provider>
    );
  })
);

BreadcrumbRoot.displayName = 'Breadcrumb';

// =============================================================================
// Compound Component Export
// =============================================================================

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Ellipsis: BreadcrumbEllipsis,
});

// Re-export sub-components for named imports
export { BreadcrumbItem, BreadcrumbLink, BreadcrumbEllipsis };

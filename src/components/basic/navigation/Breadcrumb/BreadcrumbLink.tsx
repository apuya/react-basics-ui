import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo } from 'react';
import {
  BREADCRUMB_LINK_CLASSES,
  BREADCRUMB_LINK_CURRENT_CLASSES,
  LINK_CURRENT_TYPOGRAPHY_STYLES,
  LINK_TYPOGRAPHY_STYLES,
} from './Breadcrumb.styles';
import type { BreadcrumbLinkProps } from './Breadcrumb.types';

/**
 * Breadcrumb.Link - Clickable link or static text within a breadcrumb item.
 *
 * Renders as `<a>` when `href` is provided and not current page.
 * Renders as `<span>` when `isCurrent={true}` or no `href`.
 * Sets `aria-current="page"` for current page accessibility.
 *
 * @example
 * ```tsx
 * // Interactive link
 * <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
 *
 * // Current page (non-interactive span)
 * <Breadcrumb.Link isCurrent>Current Page</Breadcrumb.Link>
 * ```
 */
export const BreadcrumbLink = memo(
  forwardRef<HTMLAnchorElement | HTMLSpanElement, BreadcrumbLinkProps>(function BreadcrumbLink(
    { children, isCurrent = false, className, href, ...props },
    ref
  ) {
    const Component = isCurrent || !href ? 'span' : 'a';

    const linkClasses = useMemo(
      () => cn(
        isCurrent ? BREADCRUMB_LINK_CURRENT_CLASSES : BREADCRUMB_LINK_CLASSES,
        className
      ),
      [isCurrent, className]
    );

    const typographyStyles = useMemo(
      () => (isCurrent ? LINK_CURRENT_TYPOGRAPHY_STYLES : LINK_TYPOGRAPHY_STYLES),
      [isCurrent]
    );

    return (
      <Component
        ref={ref as any}
        href={!isCurrent ? href : undefined}
        className={linkClasses}
        style={typographyStyles}
        aria-current={isCurrent ? 'page' : undefined}
        data-current={isCurrent || undefined}
        {...(props as any)}
      >
        {children}
      </Component>
    );
  })
);

BreadcrumbLink.displayName = 'Breadcrumb.Link';

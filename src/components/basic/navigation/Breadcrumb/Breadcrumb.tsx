import { cn } from '@/lib/cn';
import { createContext, forwardRef, memo, useContext, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import {
  BREADCRUMB_CLASSES,
  BREADCRUMB_ELLIPSIS_CLASSES,
  BREADCRUMB_ITEM_CLASSES,
  BREADCRUMB_LINK_CLASSES,
  BREADCRUMB_LINK_CURRENT_CLASSES,
  BREADCRUMB_LIST_CLASSES,
  BREADCRUMB_SEPARATOR_CLASSES,
  ELLIPSIS_TYPOGRAPHY_STYLES,
  ITEM_GAP_STYLES,
  LINK_CURRENT_TYPOGRAPHY_STYLES,
  LINK_TYPOGRAPHY_STYLES,
  SEPARATOR_SPACING_STYLES,
} from './Breadcrumb.styles';

// Context for Breadcrumb configuration
interface BreadcrumbContextValue {
  separator?: ReactNode;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue>({ separator: '/' });

const useBreadcrumbContext = () => useContext(BreadcrumbContext);

// Main Breadcrumb component
export interface BreadcrumbProps extends ComponentPropsWithoutRef<'nav'> {
  /** Custom separator between breadcrumb items (default: '/') */
  separator?: ReactNode;
}

export const BreadcrumbRoot = memo(
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

// BreadcrumbItem component
export interface BreadcrumbItemProps extends ComponentPropsWithoutRef<'li'> {
  /** Whether this is the current/active item */
  isCurrent?: boolean;
  /** Whether to show separator after this item */
  showSeparator?: boolean;
}

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

// BreadcrumbLink component
export interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<'a'> {
  /** Whether this is the current/active page */
  isCurrent?: boolean;
}

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

    const typographyStyles = isCurrent
      ? LINK_CURRENT_TYPOGRAPHY_STYLES
      : LINK_TYPOGRAPHY_STYLES;

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

// BreadcrumbEllipsis component for collapsed items
export interface BreadcrumbEllipsisProps extends ComponentPropsWithoutRef<'span'> {}

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

// Compound component with sub-components
export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Ellipsis: BreadcrumbEllipsis,
});

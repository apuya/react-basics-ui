import { cn } from '@/lib/cn';
import { createContext, forwardRef, memo, useContext, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import {
  BREADCRUMB_CLASSES,
  BREADCRUMB_ITEM_CLASSES,
  BREADCRUMB_LINK_CLASSES,
  BREADCRUMB_LINK_CURRENT_CLASSES,
  BREADCRUMB_SEPARATOR_CLASSES,
  BREADCRUMB_ELLIPSIS_CLASSES,
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
    return (
      <BreadcrumbContext.Provider value={{ separator }}>
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(BREADCRUMB_CLASSES, className)}
          {...props}
        >
          <ol className="flex items-center">{children}</ol>
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

    return (
      <li
        ref={ref}
        className={cn(BREADCRUMB_ITEM_CLASSES, className)}
        aria-current={isCurrent ? 'page' : undefined}
        {...props}
      >
        {children}
        {!isCurrent && showSeparator && (
          <span className={BREADCRUMB_SEPARATOR_CLASSES} aria-hidden="true">
            {separator}
          </span>
        )}
      </li>
    );
  })
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

// BreadcrumbLink component
export interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<'a'> {
  /** Whether this is the current/active page */
  isCurrent?: boolean;
}

export const BreadcrumbLink = memo(
  forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(function BreadcrumbLink(
    { children, isCurrent = false, className, href, ...props },
    ref
  ) {
    const Component = isCurrent || !href ? 'span' : 'a';
    const linkClasses = isCurrent
      ? BREADCRUMB_LINK_CURRENT_CLASSES
      : BREADCRUMB_LINK_CLASSES;

    return (
      <Component
        ref={!isCurrent && href ? ref : undefined}
        href={!isCurrent ? href : undefined}
        className={cn(linkClasses, className)}
        aria-current={isCurrent ? 'page' : undefined}
        {...(props as any)}
      >
        {children}
      </Component>
    );
  })
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

// BreadcrumbEllipsis component for collapsed items
export interface BreadcrumbEllipsisProps extends ComponentPropsWithoutRef<'span'> {}

export const BreadcrumbEllipsis = memo(
  forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(function BreadcrumbEllipsis(
    { className, children = '...', ...props },
    ref
  ) {
    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn(BREADCRUMB_ELLIPSIS_CLASSES, className)}
        {...props}
      >
        {children}
      </span>
    );
  })
);

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

// Compound component with sub-components
export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Ellipsis: BreadcrumbEllipsis,
});

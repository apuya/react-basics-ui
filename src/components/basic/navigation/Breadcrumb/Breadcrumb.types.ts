import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// =============================================================================
// Context Types
// =============================================================================

/**
 * Context value for Breadcrumb compound components.
 * Provides separator configuration to sub-components.
 */
export interface BreadcrumbContextValue {
  /** Custom separator element between items */
  separator?: ReactNode;
}

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Breadcrumb root component.
 * Wraps navigation with semantic nav element and ordered list.
 */
export interface BreadcrumbProps extends ComponentPropsWithoutRef<'nav'> {
  /**
   * Custom separator between breadcrumb items.
   * @default '/'
   */
  separator?: ReactNode;
}

/**
 * Props for the Breadcrumb.Item sub-component.
 * Represents a single breadcrumb item in the navigation path.
 */
export interface BreadcrumbItemProps extends ComponentPropsWithoutRef<'li'> {
  /**
   * Whether this is the current/active item.
   * @default false
   */
  isCurrent?: boolean;
  /**
   * Whether to show separator after this item.
   * @default true
   */
  showSeparator?: boolean;
}

/**
 * Props for the Breadcrumb.Link sub-component.
 * Renders as an anchor or span based on current state.
 */
export interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<'a'> {
  /**
   * Whether this is the current/active page.
   * When true, renders as span instead of anchor.
   * @default false
   */
  isCurrent?: boolean;
}

/**
 * Props for the Breadcrumb.Ellipsis sub-component.
 * Used to indicate collapsed/hidden breadcrumb items.
 */
export interface BreadcrumbEllipsisProps extends ComponentPropsWithoutRef<'span'> {}

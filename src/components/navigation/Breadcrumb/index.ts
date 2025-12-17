/**
 * Breadcrumb - Navigation component for displaying hierarchical page structure.
 *
 * Compound component with `Breadcrumb.Item`, `Breadcrumb.Link`, `Breadcrumb.Ellipsis`.
 *
 * @example
 * ```tsx
 * import { Breadcrumb } from 'react-basics-ui';
 *
 * <Breadcrumb>
 *   <Breadcrumb.Item>
 *     <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
 *   </Breadcrumb.Item>
 *   <Breadcrumb.Item isCurrent>
 *     <Breadcrumb.Link isCurrent>Current</Breadcrumb.Link>
 *   </Breadcrumb.Item>
 * </Breadcrumb>
 * ```
 *
 * @module Breadcrumb
 */
export { Breadcrumb, useBreadcrumbContext, BreadcrumbItem, BreadcrumbLink, BreadcrumbEllipsis } from './Breadcrumb';
export type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbEllipsisProps,
  BreadcrumbContextValue,
} from './Breadcrumb.types';
export { ICON_SIZE_STYLES as BREADCRUMB_ICON_SIZE_STYLES } from './Breadcrumb.styles';

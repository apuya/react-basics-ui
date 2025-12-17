/**
 * Base classes for the EmptyState component container
 */
export const BASE_CLASSES =
  'flex flex-col items-center justify-center text-center';

/**
 * Container padding styles using design tokens
 */
export const CONTAINER_STYLES = {
  paddingBlock: 'var(--component-emptystate-padding-block)',
  paddingInline: 'var(--component-emptystate-padding-inline)',
} as const;

/**
 * Icon wrapper classes
 */
export const ICON_WRAPPER_CLASSES =
  'flex items-center justify-center text-[color:var(--component-emptystate-icon-color)]';

/**
 * Title spacing styles (typography handled by Heading component)
 */
export const TITLE_SPACING_STYLES = {
  marginBottom: 'var(--component-emptystate-title-gap)',
} as const;

/**
 * Description spacing styles (typography handled by Text component)
 */
export const DESCRIPTION_SPACING_STYLES = {
  marginBottom: 'var(--component-emptystate-description-gap)',
} as const;

/**
 * Action wrapper styles - margin applied inline
 */
export const ACTION_WRAPPER_STYLES = {
  marginTop: 'var(--component-emptystate-action-gap)',
} as const;

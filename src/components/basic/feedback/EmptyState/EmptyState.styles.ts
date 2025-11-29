/**
 * Base classes for the EmptyState component container
 */
export const BASE_CLASSES =
  'flex flex-col items-center justify-center text-center';

/**
 * Container padding styles using design tokens
 */
export const CONTAINER_STYLES = {
  paddingBlock: 'var(--semantic-space-comfortable)',
  paddingInline: 'var(--semantic-space-default)',
} as const;

/**
 * Icon wrapper classes
 */
export const ICON_WRAPPER_CLASSES =
  'flex items-center justify-center text-[var(--semantic-text-tertiary)]';

/**
 * Icon wrapper styles - margin applied inline
 */
export const ICON_WRAPPER_STYLES = {
  marginBottom: 'var(--semantic-space-default)',
} as const;

/**
 * Title spacing styles (typography handled by Heading component)
 */
export const TITLE_SPACING_STYLES = {
  marginBottom: 'var(--semantic-space-compact)',
} as const;

/**
 * Description spacing styles (typography handled by Text component)
 */
export const DESCRIPTION_SPACING_STYLES = {
  marginBottom: 'var(--semantic-space-default)',
} as const;

/**
 * Action wrapper styles - margin applied inline
 */
export const ACTION_WRAPPER_STYLES = {
  marginTop: 'var(--semantic-space-compact)',
} as const;

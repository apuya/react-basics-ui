/**
 * Alert variant type
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Base classes for the Alert component (extends BaseAlertBox defaults)
 */
export const BASE_CLASSES =
  'rounded-[length:var(--component-alert-radius)]';

/**
 * Variant-specific styles for the Alert component
 * Uses design tokens from global.css for backgrounds and text colors
 */
export const VARIANT_STYLES: Record<AlertVariant, string> = {
  info: 'bg-[color:var(--component-alert-bg-info)] text-[color:var(--component-alert-text-info)]',
  success:
    'bg-[color:var(--component-alert-bg-success)] text-[color:var(--component-alert-text-success)]',
  warning:
    'bg-[color:var(--component-alert-bg-warning)] text-[color:var(--component-alert-text-warning)]',
  error:
    'bg-[color:var(--component-alert-bg-error)] text-[color:var(--component-alert-text-error)]',
} as const;

/**
 * Icon color styles for each variant
 */
export const ICON_COLOR_STYLES: Record<AlertVariant, string> = {
  info: 'text-[color:var(--component-alert-icon-info)]',
  success: 'text-[color:var(--component-alert-icon-success)]',
  warning: 'text-[color:var(--component-alert-icon-warning)]',
  error: 'text-[color:var(--component-alert-icon-error)]',
} as const;

/**
 * Title content styles using design tokens
 */
export const TITLE_STYLES: React.CSSProperties = {
  fontSize: 'var(--component-alert-title-size)',
  lineHeight: 'var(--component-alert-title-line-height)',
} as const;

/**
 * Body content styles using design tokens
 */
export const BODY_STYLES: React.CSSProperties = {
  fontSize: 'var(--component-alert-body-size)',
  lineHeight: 'var(--component-alert-body-line-height)',
  marginTop: 'var(--component-alert-content-gap)',
} as const;

/**
 * Container layout styles using design tokens
 */
export const CONTAINER_STYLES: React.CSSProperties = {
  paddingBlock: 'var(--component-alert-padding-block)',
  paddingInline: 'var(--component-alert-padding-inline)',
  gap: 'var(--component-alert-gap)',
} as const;

/**
 * Icon size style using design tokens
 */
export const ICON_SIZE_STYLE: React.CSSProperties = {
  fontSize: 'var(--component-alert-icon-size)',
} as const;

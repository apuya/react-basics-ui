import type { ToastVariant } from './Toast';

/**
 * Base classes for the Toast component
 */
export const BASE_CLASSES =
  'flex items-start rounded-[var(--component-toast-radius)] shadow-[shadow:var(--component-toast-shadow)]';

/**
 * Variant-specific styles for the Toast component
 */
export const VARIANT_STYLES: Record<ToastVariant, string> = {
  success:
    'bg-[color:var(--component-toast-bg-success)] text-[color:var(--component-toast-text-success)]',
  error:
    'bg-[color:var(--component-toast-bg-error)] text-[color:var(--component-toast-text-error)]',
  warning:
    'bg-[color:var(--component-toast-bg-warning)] text-[color:var(--component-toast-text-warning)]',
  info:
    'bg-[color:var(--component-toast-bg-info)] text-[color:var(--component-toast-text-info)]',
  default:
    'bg-[color:var(--component-toast-bg)] text-[color:var(--component-toast-text-default)]',
} as const;

/**
 * Icon color styles for each variant
 */
export const ICON_COLOR_STYLES: Record<ToastVariant, string> = {
  success: 'text-[color:var(--component-toast-icon-success)]',
  error: 'text-[color:var(--component-toast-icon-error)]',
  warning: 'text-[color:var(--component-toast-icon-warning)]',
  info: 'text-[color:var(--component-toast-icon-info)]',
  default: 'text-[color:var(--component-toast-icon-info)]',
} as const;

/**
 * Icon size style using design tokens
 */
export const ICON_SIZE_STYLE = {
  fontSize: 'var(--component-toast-icon-size)',
} as const;

/**
 * Content container classes
 */
export const CONTENT_CLASSES = 'flex-1 min-w-0';

/**
 * Container layout styles using design tokens
 */
export const CONTAINER_STYLES = {
  paddingBlock: 'var(--component-toast-padding-block)',
  paddingInline: 'var(--component-toast-padding-inline)',
  gap: 'var(--component-toast-gap)',
} as const;

/**
 * Title content styles using design tokens
 */
export const TITLE_STYLES = {
  fontSize: 'var(--component-toast-title-size)',
  fontWeight: 'var(--component-toast-title-weight)',
  lineHeight: 'var(--component-toast-title-line-height)',
} as const;

/**
 * Body content styles using design tokens
 */
export const BODY_STYLES = {
  fontSize: 'var(--component-toast-body-size)',
  fontWeight: 'var(--component-toast-body-weight)',
  lineHeight: 'var(--component-toast-body-line-height)',
} as const;

/**
 * Close button classes
 */
export const CLOSE_BUTTON_CLASSES =
  'shrink-0 inline-flex items-center justify-center rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1';

/**
 * Close button size style
 */
export const CLOSE_BUTTON_SIZE_STYLE = {
  fontSize: 'var(--component-toast-icon-size)',
} as const;

import type { ToastVariant } from './Toast';

/**
 * Base classes for the Toast component
 */
export const BASE_CLASSES =
  'flex items-start rounded-lg shadow-lg';

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
 * Icon size class using Tailwind scale
 */
export const ICON_SIZE_CLASS = 'text-xl';

/**
 * Content container classes
 */
export const CONTENT_CLASSES = 'flex-1 min-w-0';

/**
 * Container layout classes using Tailwind scales
 */
export const CONTAINER_CLASSES = 'py-3 px-4 gap-3';

/**
 * Title content classes using Tailwind scales
 */
export const TITLE_CLASSES = 'text-sm font-medium leading-tight';

/**
 * Body content classes using Tailwind scales
 */
export const BODY_CLASSES = 'text-sm font-normal leading-snug';

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

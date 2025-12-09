import {
  BiCheckCircle,
  BiErrorCircle,
  BiInfoCircle,
  BiXCircle,
} from 'react-icons/bi';

/**
 * Base classes for the Alert component
 */
export const BASE_CLASSES =
  'flex items-start w-full rounded-lg';

/**
 * Variant-specific styles for the Alert component
 * Uses design tokens from global.css for backgrounds and text colors
 */
export const VARIANT_STYLES = {
  info: 'bg-[color:var(--component-alert-bg-info)] text-[color:var(--component-alert-text-info)]',
  success:
    'bg-[color:var(--component-alert-bg-success)] text-[color:var(--component-alert-text-success)]',
  warning:
    'bg-[color:var(--component-alert-bg-warning)] text-[color:var(--component-alert-text-warning)]',
  error:
    'bg-[color:var(--component-alert-bg-error)] text-[color:var(--component-alert-text-error)]',
} as const;

/**
 * Icon components mapped to each variant
 */
export const VARIANT_ICONS = {
  info: BiInfoCircle,
  success: BiCheckCircle,
  warning: BiErrorCircle,
  error: BiXCircle,
} as const;

/**
 * Icon color styles for each variant
 */
export const ICON_COLOR_STYLES = {
  info: 'text-[color:var(--component-alert-icon-info)]',
  success: 'text-[color:var(--component-alert-icon-success)]',
  warning: 'text-[color:var(--component-alert-icon-warning)]',
  error: 'text-[color:var(--component-alert-icon-error)]',
} as const;

/**
 * Alert variant type derived from VARIANT_STYLES keys
 */
export type AlertVariant = keyof typeof VARIANT_STYLES;

/**
 * Title content styles using Tailwind classes
 */
export const TITLE_CLASSES = 'text-base leading-normal font-semibold';

/**
 * Body content styles using Tailwind classes
 */
export const BODY_CLASSES = 'text-sm leading-normal font-normal';

/**
 * Container layout styles using Tailwind classes
 */
export const CONTAINER_CLASSES = 'p-4 gap-3';

/**
 * Icon size style using Tailwind classes
 */
export const ICON_SIZE_CLASSES = 'text-xl';

/**
 * Content gap for spacing between title and body
 */
export const CONTENT_GAP_CLASSES = 'mt-1';

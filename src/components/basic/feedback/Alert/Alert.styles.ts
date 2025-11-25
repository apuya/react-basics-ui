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
  'flex items-start w-full rounded-[var(--component-alert-radius)] border-[var(--component-alert-border-width)]';

/**
 * Variant-specific styles for the Alert component
 * Uses design tokens from global.css for backgrounds, borders, and text colors
 */
export const VARIANT_STYLES = {
  info: 'bg-[var(--component-alert-bg-info)] border-[var(--component-alert-border-info)] text-[var(--component-alert-text-info)]',
  success:
    'bg-[var(--component-alert-bg-success)] border-[var(--component-alert-border-success)] text-[var(--component-alert-text-success)]',
  warning:
    'bg-[var(--component-alert-bg-warning)] border-[var(--component-alert-border-warning)] text-[var(--component-alert-text-warning)]',
  error:
    'bg-[var(--component-alert-bg-error)] border-[var(--component-alert-border-error)] text-[var(--component-alert-text-error)]',
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
  info: 'text-[var(--component-alert-icon-info)]',
  success: 'text-[var(--component-alert-icon-success)]',
  warning: 'text-[var(--component-alert-icon-warning)]',
  error: 'text-[var(--component-alert-icon-error)]',
} as const;

/**
 * Alert variant type derived from VARIANT_STYLES keys
 */
export type AlertVariant = keyof typeof VARIANT_STYLES;

/**
 * @file Accordion.styles.ts
 * @description Style constants for the Accordion component family.
 *
 * Exports Tailwind class strings and CSSProperties objects for styling
 * accordion items, triggers, icons, and content regions.
 *
 * All styles use component-level design tokens (--component-accordion-*)
 * for consistent theming.
 */

import type React from 'react';

/* =============================================================================
 * ACCORDION ITEM STYLES
 * ============================================================================= */

/** Base classes applied to all accordion items */
export const ACCORDION_ITEM_BASE_CLASSES =
  'border-b border-[color:var(--component-accordion-item-border)] last:border-b-0';

/** Variant-specific classes for accordion items */
export const ACCORDION_ITEM_VARIANT_STYLES = {
  default: '',
  bordered: 'first:rounded-t-[length:var(--component-accordion-radius)] last:rounded-b-[length:var(--component-accordion-radius)]',
  separated: 'border border-[color:var(--component-accordion-border)] rounded-[length:var(--component-accordion-radius)]',
} as const;

/* =============================================================================
 * ACCORDION TRIGGER STYLES
 * ============================================================================= */

/** Base classes applied to all accordion triggers (the clickable header button) */
export const ACCORDION_TRIGGER_BASE_CLASSES =
  'flex w-full items-center justify-between bg-[color:var(--component-accordion-trigger-bg-default)] text-left text-[length:var(--component-accordion-font-size)] font-[number:var(--component-accordion-font-weight)] text-[color:var(--component-accordion-trigger-text-default)] transition-all duration-[var(--component-accordion-transition-duration)] hover:bg-[color:var(--component-accordion-trigger-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--semantic-brand-secondary-default)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

/** Variant-specific classes for accordion triggers */
export const ACCORDION_TRIGGER_VARIANT_STYLES = {
  default: '',
  bordered: 'first:rounded-t-[length:var(--component-accordion-radius)]',
  separated: 'rounded-t-[length:var(--component-accordion-radius)]',
} as const;

/** Base classes for the accordion expand/collapse icon */
export const ACCORDION_ICON_BASE_CLASSES =
  'h-[length:var(--component-accordion-icon-size)] w-[length:var(--component-accordion-icon-size)] shrink-0 transition-transform duration-[var(--component-accordion-transition-duration)]';

/** Class applied to rotate icon when accordion is open */
export const ACCORDION_ICON_OPEN_CLASS = 'rotate-180';

/* =============================================================================
 * ACCORDION CONTENT STYLES
 * ============================================================================= */

/** Base classes for accordion content region with CSS Grid animation */
export const ACCORDION_CONTENT_BASE_CLASSES =
  'overflow-hidden text-[length:var(--component-accordion-font-size)] text-[color:var(--component-accordion-content-text)] transition-all duration-[var(--component-accordion-transition-duration)] data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]';

/** Classes for the inner wrapper that enables CSS Grid height animation */
export const ACCORDION_CONTENT_INNER_CLASSES =
  'overflow-hidden';

/** @deprecated Use ACCORDION_CONTENT_PADDING_STYLE instead */
export const ACCORDION_CONTENT_PADDING_CLASSES = '';

/* =============================================================================
 * STATIC STYLE OBJECTS
 * These are defined as CSSProperties to avoid recreation on each render.
 * ============================================================================= */

/** Static padding style for accordion trigger - uses CSS custom properties */
export const ACCORDION_TRIGGER_PADDING_STYLE: React.CSSProperties = {
  paddingBlock: 'var(--component-accordion-padding-block)',
  paddingInline: 'var(--component-accordion-padding-inline)',
};

/** Static padding style for accordion content inner container */
export const ACCORDION_CONTENT_PADDING_STYLE: React.CSSProperties = {
  paddingBottom: 'var(--component-accordion-content-padding-block)',
  paddingTop: '0',
  paddingInline: 'var(--component-accordion-content-padding-inline)',
};

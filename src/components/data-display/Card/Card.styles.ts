import type React from 'react';
import type { CardVariant } from './Card.types';

// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES =
  'flex flex-col rounded-[length:var(--component-card-radius)] bg-[color:var(--component-card-bg)] text-[color:var(--component-card-text)] border-[length:var(--component-card-border-width)] border-[color:var(--component-card-border)]';

// =============================================================================
// VARIANT STYLES
// =============================================================================

export const VARIANT_STYLES: Record<CardVariant, string> = {
  default: '',
  elevated: 'shadow-[shadow:var(--component-card-shadow)]',
  outlined: 'border-[color:var(--component-card-border)]',
  interactive:
    'cursor-pointer transition-shadow duration-[var(--component-card-transition-duration)] hover:shadow-[shadow:var(--component-card-shadow-hover)]',
};

// =============================================================================
// SUBCOMPONENT STYLES
// =============================================================================

export const HEADER_CLASSES = 'flex flex-col';

export const CONTENT_CLASSES = 'flex-1';

export const FOOTER_CLASSES = 'flex items-center';

// =============================================================================
// STATIC STYLE OBJECTS
// =============================================================================

/** Static gap style for card container - uses CSS custom properties */
export const GAP_STYLE: React.CSSProperties = {
  gap: 'var(--component-card-gap)',
};

/** Static padding style for card header */
export const HEADER_PADDING_STYLE: React.CSSProperties = {
  paddingInline: 'var(--component-card-header-padding-inline)',
  paddingBlock: 'var(--component-card-header-padding-block)',
  gap: 'var(--component-card-gap-compact)',
};

/** Static padding style for card content */
export const CONTENT_PADDING_STYLE: React.CSSProperties = {
  paddingInline: 'var(--component-card-padding-inline)',
  paddingBlock: 'var(--component-card-padding-block)',
};

/** Static padding style for card footer */
export const FOOTER_PADDING_STYLE: React.CSSProperties = {
  paddingInline: 'var(--component-card-footer-padding-inline)',
  paddingBlock: 'var(--component-card-footer-padding-block)',
  gap: 'var(--component-card-gap-compact)',
};

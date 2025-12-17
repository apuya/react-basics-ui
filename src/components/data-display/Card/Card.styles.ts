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
// STATIC STYLE OBJECTS
// =============================================================================

/** Card-specific gap style override */
export const GAP_STYLE: React.CSSProperties = {
  gap: 'var(--component-card-gap)',
};

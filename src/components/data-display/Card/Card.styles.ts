// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES =
  'flex flex-col rounded-lg bg-[color:var(--component-card-bg)] text-[color:var(--component-card-text)] border border-[color:var(--component-card-border)]';

// =============================================================================
// VARIANT STYLES
// =============================================================================

export const VARIANT_STYLES: Record<CardVariant, string> = {
  default: '',
  elevated: 'shadow-md',
  outlined: 'border-[color:var(--component-card-border)]',
  interactive:
    'cursor-pointer transition-shadow duration-200 hover:shadow-lg',
};

// =============================================================================
// SUBCOMPONENT STYLES
// =============================================================================

export const HEADER_CLASSES = 'flex flex-col';

export const CONTENT_CLASSES = 'flex-1';

export const FOOTER_CLASSES = 'flex items-center';

export const TITLE_CLASSES =
  'text-lg font-semibold text-[color:var(--component-card-text)]';

export const DESCRIPTION_CLASSES =
  'text-sm font-normal text-[color:var(--component-card-description-color)]';

// =============================================================================
// TYPES
// =============================================================================

import type { CardVariant } from './Card';

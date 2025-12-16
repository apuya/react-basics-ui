import type React from 'react';
import type { TextListVariant } from './TextList.types';

// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES = 'flex flex-col';

// =============================================================================
// VARIANT STYLES
// =============================================================================

export const VARIANT_STYLES: Record<TextListVariant, string> = {
  default: 'bg-[color:var(--component-list-bg)]',
  divided:
    'bg-[color:var(--component-list-bg)] [&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-[color:var(--component-list-divider-color)]',
  bordered:
    'border border-[color:var(--component-list-border)] rounded-[length:var(--component-list-radius)] overflow-hidden',
  interactive: 'bg-[color:var(--component-list-bg)]',
};

// =============================================================================
// ITEM STYLES
// =============================================================================

export const ITEM_CLASSES =
  'flex items-center text-[color:var(--component-list-text-primary)]';

export const ITEM_INTERACTIVE_CLASSES =
  'hover:bg-[color:var(--component-list-bg-hover)] active:bg-[color:var(--component-list-bg-active)] cursor-pointer transition-colors';

// =============================================================================
// STATIC STYLE OBJECTS
// =============================================================================

/** Static gap style for list container - uses CSS custom properties */
export const GAP_STYLE: React.CSSProperties = {
  gap: 'var(--component-list-gap)',
};

/** Static padding style for list items */
export const ITEM_PADDING_STYLE: React.CSSProperties = {
  paddingInline: 'var(--component-list-item-padding-inline)',
  paddingBlock: 'var(--component-list-item-padding-block)',
  gap: 'var(--component-list-item-gap)',
};

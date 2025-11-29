// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES = 'flex flex-col';

// =============================================================================
// VARIANT STYLES
// =============================================================================

export const VARIANT_STYLES: Record<ListVariant, string> = {
  default: 'bg-[var(--component-list-bg)]',
  divided:
    'bg-[var(--component-list-bg)] [&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-[var(--component-list-divider-color)]',
  bordered:
    'border border-[var(--component-list-border)] rounded-[var(--component-list-item-radius)] overflow-hidden',
  interactive: 'bg-[var(--component-list-bg)]',
};

// =============================================================================
// ITEM STYLES
// =============================================================================

export const ITEM_CLASSES =
  'flex items-center text-[var(--component-list-text-primary)]';

export const ITEM_INTERACTIVE_CLASSES =
  '[&>li]:hover:bg-[var(--component-list-item-bg-hover)] [&>li]:active:bg-[var(--component-list-bg-active)] [&>li]:cursor-pointer [&>li]:transition-colors';

// =============================================================================
// TYPES
// =============================================================================

export type ListVariant = 'default' | 'divided' | 'bordered' | 'interactive';

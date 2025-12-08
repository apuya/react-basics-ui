// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES = 'flex flex-col';

// =============================================================================
// VARIANT STYLES
// =============================================================================

export const VARIANT_STYLES: Record<ListVariant, string> = {
  default: 'bg-[color:var(--component-list-bg)]',
  divided:
    'bg-[color:var(--component-list-bg)] [&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-[color:var(--component-list-divider-color)]',
  bordered:
    'border border-[color:var(--component-list-border)] rounded-lg overflow-hidden',
  interactive: 'bg-[color:var(--component-list-bg)]',
};

// =============================================================================
// ITEM STYLES
// =============================================================================

export const ITEM_CLASSES =
  'flex items-center text-[color:var(--component-list-text-primary)]';

export const ITEM_INTERACTIVE_CLASSES =
  '[&>li]:hover:bg-[color:var(--component-list-bg-hover)] [&>li]:active:bg-[color:var(--component-list-bg-active)] [&>li]:cursor-pointer [&>li]:transition-colors';

// =============================================================================
// TYPES
// =============================================================================

export type ListVariant = 'default' | 'divided' | 'bordered' | 'interactive';

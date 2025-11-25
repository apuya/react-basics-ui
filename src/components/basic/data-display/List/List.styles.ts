export const BASE_CLASSES = 'flex flex-col gap-[var(--component-list-gap)]';

export const VARIANT_STYLES = {
  default: 'bg-[var(--component-list-bg)]',
  divided:
    'bg-[var(--component-list-bg)] [&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-[var(--component-list-divider-color)]',
  bordered:
    'border border-[var(--component-list-border)] rounded-[var(--component-list-item-radius)] overflow-hidden',
  interactive: 'bg-[var(--component-list-bg)]',
} as const;

export const ITEM_CLASSES =
  'flex items-center gap-[var(--component-list-item-gap)] py-[var(--component-list-item-padding-block)] px-[var(--component-list-item-padding-inline)] text-[var(--component-list-text-primary)]';

export const ITEM_INTERACTIVE_CLASSES =
  'hover:bg-[var(--component-list-item-bg-hover)] active:bg-[var(--component-list-bg-active)] cursor-pointer transition-colors';

export type ListVariant = keyof typeof VARIANT_STYLES;

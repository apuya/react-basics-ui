import type { SidebarVariant } from './Sidebar';

export const BASE_CLASSES =
  'flex flex-col h-screen bg-[color:var(--semantic-surface-base)] text-[color:var(--semantic-text-primary)] transition-all duration-300 ease-in-out overflow-hidden relative shrink-0';

export const VARIANT_STYLES: Record<SidebarVariant, string> = {
  default: '',
  bordered: 'border-r border-[color:var(--semantic-border-default)]',
  elevated: 'shadow-lg',
};

export const HEADER_CLASSES =
  'flex items-center gap-3 px-6 py-4 border-b border-[color:var(--semantic-border-subtle)] shrink-0';

export const CONTENT_CLASSES = 'flex-1 overflow-y-auto overflow-x-hidden py-4';

export const FOOTER_CLASSES =
  'flex items-center gap-3 px-6 py-4 border-t border-[color:var(--semantic-border-subtle)] shrink-0';

export const SECTION_CLASSES = 'mb-4';

export const ITEM_CLASSES =
  'flex items-center gap-3 w-full px-6 py-3 text-left text-[color:var(--semantic-text-secondary)] hover:bg-[color:var(--semantic-surface-hover)] hover:text-[color:var(--semantic-text-primary)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--semantic-border-focus)] focus-visible:ring-inset';

export const ITEM_ACTIVE_CLASS =
  'bg-[color:var(--semantic-brand-primary-default)] bg-opacity-10 text-[color:var(--semantic-brand-primary-default)] font-medium hover:bg-[color:var(--semantic-brand-primary-default)] hover:bg-opacity-15';

export const TOGGLE_BUTTON_CLASSES =
  'absolute -right-3 top-6 w-6 h-6 flex items-center justify-center rounded-full bg-[color:var(--semantic-surface-elevated)] border border-[color:var(--semantic-border-default)] text-[color:var(--semantic-text-secondary)] hover:text-[color:var(--semantic-text-primary)] hover:bg-[color:var(--semantic-surface-hover)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--semantic-border-focus)] shadow-sm z-10';

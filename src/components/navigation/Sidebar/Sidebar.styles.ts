import type { SidebarVariant } from './Sidebar';

// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES =
  'flex flex-col h-screen bg-[color:var(--component-sidebar-bg)] text-[color:var(--component-sidebar-text)] overflow-hidden relative shrink-0';

export const VARIANT_STYLES: Record<SidebarVariant, string> = {
  default: '',
  bordered: 'border-r border-[color:var(--component-sidebar-border)]',
  elevated: 'shadow-lg',
} as const;

// =============================================================================
// CONTENT STYLES
// =============================================================================

export const CONTENT_CLASSES = 'flex-1 overflow-y-auto overflow-x-hidden';

// =============================================================================
// FOOTER STYLES
// =============================================================================

export const FOOTER_CLASSES = 'flex flex-col shrink-0';

// =============================================================================
// SECTION STYLES
// =============================================================================

export const SECTION_CLASSES = 'flex flex-col';

// =============================================================================
// SECTION HEADER STYLES
// =============================================================================

export const SECTION_HEADER_CLASSES =
  'uppercase tracking-wider text-xs font-semibold text-[color:var(--component-sidebar-section-header-text)]';

// =============================================================================
// ITEM STYLES
// =============================================================================

export const ITEM_BASE_CLASSES =
  'flex items-center w-full text-left text-[color:var(--component-sidebar-item-text)] hover:bg-[color:var(--component-sidebar-item-bg-hover)] hover:text-[color:var(--component-sidebar-item-text-hover)] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset';

export const ITEM_ACTIVE_CLASS =
  'bg-[color:var(--component-sidebar-item-active-bg)] text-[color:var(--component-sidebar-item-active-text)] font-medium hover:bg-[color:var(--component-sidebar-item-active-bg-hover)] hover:text-[color:var(--component-sidebar-item-active-text)]';

// =============================================================================
// ICON STYLES
// =============================================================================

export const ICON_CLASSES = 'shrink-0';

export const ICON_SIZE = 'sm' as const;


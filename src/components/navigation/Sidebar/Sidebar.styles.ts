import type { SidebarVariant } from './Sidebar';

// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES =
  'flex flex-col h-screen bg-[color:var(--component-sidebar-bg)] text-[color:var(--component-sidebar-text)] overflow-hidden relative shrink-0';

export const VARIANT_STYLES: Record<SidebarVariant, string> = {
  default: '',
  bordered: 'border-r border-[color:var(--component-sidebar-border)]',
  elevated: 'shadow-[shadow:var(--component-sidebar-shadow)]',
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
  'uppercase tracking-wider text-[length:var(--component-sidebar-section-header-font-size)] font-[number:var(--component-sidebar-section-header-font-weight)] text-[color:var(--component-sidebar-section-header-text)]';

// =============================================================================
// ITEM STYLES
// =============================================================================

export const ITEM_BASE_CLASSES =
  'flex items-center w-full text-left text-[color:var(--component-sidebar-item-text)] hover:bg-[color:var(--component-sidebar-item-bg-hover)] hover:text-[color:var(--component-sidebar-item-text-hover)] transition-colors duration-[var(--component-sidebar-item-transition-duration)] focus:outline-none focus-visible:ring-[length:var(--component-sidebar-focus-ring-width)] focus-visible:ring-[color:var(--component-sidebar-focus-ring-color)] focus-visible:ring-inset';

export const ITEM_ACTIVE_CLASS =
  'bg-[color:var(--component-sidebar-item-active-bg)] text-[color:var(--component-sidebar-item-active-text)] font-[number:var(--component-sidebar-item-active-font-weight)] hover:bg-[color:var(--component-sidebar-item-active-bg-hover)] hover:text-[color:var(--component-sidebar-item-active-text)]';

// =============================================================================
// ICON STYLES
// =============================================================================

export const ICON_CLASSES = 'shrink-0';

export const ICON_SIZE = 'sm' as const;


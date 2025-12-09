// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES =
  'w-full bg-[color:var(--component-navbar-bg)] text-[color:var(--component-navbar-text)] shadow-sm';

// =============================================================================
// VARIANT STYLES
// =============================================================================

export const FIXED_CLASSES =
  'fixed top-0 left-0 right-0 z-50';

export const BORDERED_CLASSES =
  'border-b border-[color:var(--component-navbar-border)]';

// =============================================================================
// CONTENT STYLES
// =============================================================================

export const CONTENT_CLASSES =
  'mx-auto flex items-center justify-between h-16 max-w-screen-2xl gap-6 px-4';

// =============================================================================
// BRAND STYLES
// =============================================================================

export const BRAND_CLASSES =
  'flex items-center gap-2 text-xl font-semibold text-[color:var(--component-navbar-brand-color)]';

// =============================================================================
// SECTION STYLES
// =============================================================================

export const SECTION_CLASSES = 'flex items-center gap-4';

// =============================================================================
// INTERACTIVE ELEMENT STYLES (for items within navbar)
// =============================================================================

export const FOCUS_RING_CLASSES =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--component-navbar-bg)] rounded-full';

// =============================================================================
// NOTIFICATION INDICATOR STYLES
// =============================================================================

export const NOTIFICATION_INDICATOR_CLASSES =
  'absolute -top-0.5 -right-0.5 rounded-full bg-[color:var(--component-navbar-notification-indicator-bg)] size-2';

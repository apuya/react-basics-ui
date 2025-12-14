// =============================================================================
// BASE STYLES
// =============================================================================

export const BASE_CLASSES =
  'w-full bg-[color:var(--component-navbar-bg)] text-[color:var(--component-navbar-text)] shadow-[shadow:var(--component-navbar-shadow)]';

// =============================================================================
// VARIANT STYLES
// =============================================================================

export const FIXED_CLASSES =
  'fixed top-0 left-0 right-0 z-[var(--component-navbar-z-index)]';

export const BORDERED_CLASSES =
  'border-b border-[color:var(--component-navbar-border)]';

// =============================================================================
// CONTENT STYLES
// =============================================================================

export const CONTENT_CLASSES =
  'mx-auto flex items-center justify-between';

// =============================================================================
// BRAND STYLES
// =============================================================================

export const BRAND_CLASSES =
  'flex items-center font-[number:var(--component-navbar-brand-weight)] text-[color:var(--component-navbar-brand-color)]';

// =============================================================================
// SECTION STYLES
// =============================================================================

export const SECTION_CLASSES = 'flex items-center';

// =============================================================================
// INTERACTIVE ELEMENT STYLES (for items within navbar)
// =============================================================================

export const FOCUS_RING_CLASSES =
  'focus-visible:outline-none focus-visible:ring-[length:var(--component-navbar-focus-ring-width)] focus-visible:ring-[color:var(--component-navbar-focus-ring-color)] focus-visible:ring-offset-[length:var(--component-navbar-focus-ring-offset)] focus-visible:ring-offset-[color:var(--component-navbar-bg)] rounded-full';

// =============================================================================
// NOTIFICATION INDICATOR STYLES
// =============================================================================

export const NOTIFICATION_INDICATOR_CLASSES =
  'absolute -top-0.5 -right-0.5 rounded-full bg-[color:var(--component-navbar-notification-indicator-bg)] h-[length:var(--component-navbar-notification-indicator-size)] w-[length:var(--component-navbar-notification-indicator-size)]';

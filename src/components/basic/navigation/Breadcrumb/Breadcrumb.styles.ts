// =============================================================================
// Breadcrumb Styles
// =============================================================================

// -----------------------------------------------------------------------------
// Container Styles
// -----------------------------------------------------------------------------

/** Nav wrapper - full width container */
export const BREADCRUMB_CLASSES = 'w-full';

/** Ordered list - horizontal flex layout for items */
export const BREADCRUMB_LIST_CLASSES = 'flex items-center';

// -----------------------------------------------------------------------------
// Item Styles
// -----------------------------------------------------------------------------

/** List item wrapper with inline-flex for proper alignment */
export const BREADCRUMB_ITEM_CLASSES = 'inline-flex items-center';

// -----------------------------------------------------------------------------
// Link Styles
// -----------------------------------------------------------------------------

/** Interactive link with hover, focus, and transition states */
export const BREADCRUMB_LINK_CLASSES =
  'text-[color:var(--component-breadcrumb-text-default)] hover:text-[color:var(--component-breadcrumb-text-hover)] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-[length:var(--component-breadcrumb-focus-ring-width)] focus-visible:ring-offset-[length:var(--component-breadcrumb-focus-ring-offset)] focus-visible:ring-[color:var(--component-breadcrumb-focus-ring-color)] focus-visible:rounded-[var(--component-breadcrumb-focus-radius)]';

/** Current page link - non-interactive with distinct color */
export const BREADCRUMB_LINK_CURRENT_CLASSES =
  'text-[color:var(--component-breadcrumb-text-current)] cursor-default';

// -----------------------------------------------------------------------------
// Separator & Ellipsis Styles
// -----------------------------------------------------------------------------

/** Separator between breadcrumb items */
export const BREADCRUMB_SEPARATOR_CLASSES =
  'inline-flex items-center justify-center select-none text-[color:var(--component-breadcrumb-separator-color)]';

/** Ellipsis indicator for collapsed items */
export const BREADCRUMB_ELLIPSIS_CLASSES =
  'text-[color:var(--component-breadcrumb-separator-color)]';

// =============================================================================
// INLINE STYLES (for proper token rendering)
// =============================================================================

/** Typography styles for link elements */
export const LINK_TYPOGRAPHY_STYLES = {
  fontSize: 'var(--component-breadcrumb-font-size)',
  fontWeight: 'var(--component-breadcrumb-font-weight)',
} as const;

/** Typography styles for current page element */
export const LINK_CURRENT_TYPOGRAPHY_STYLES = {
  fontSize: 'var(--component-breadcrumb-font-size)',
  fontWeight: 'var(--component-breadcrumb-font-weight-current)',
} as const;

/** Gap styles for breadcrumb items */
export const ITEM_GAP_STYLES = {
  gap: 'var(--component-breadcrumb-gap)',
} as const;

/** Margin styles for separator */
export const SEPARATOR_SPACING_STYLES = {
  marginInline: 'var(--component-breadcrumb-separator-gap)',
} as const;

/** Font size for ellipsis */
export const ELLIPSIS_TYPOGRAPHY_STYLES = {
  fontSize: 'var(--component-breadcrumb-font-size)',
} as const;

/** Icon size for separator icons */
export const ICON_SIZE_STYLES = {
  width: 'var(--component-breadcrumb-icon-size)',
  height: 'var(--component-breadcrumb-icon-size)',
} as const;

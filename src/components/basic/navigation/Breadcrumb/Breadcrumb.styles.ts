// =============================================================================
// BASE STYLES
// =============================================================================

export const BREADCRUMB_CLASSES = 'w-full';

export const BREADCRUMB_LIST_CLASSES = 'flex items-center';

export const BREADCRUMB_ITEM_CLASSES = 'inline-flex items-center';

export const BREADCRUMB_LINK_CLASSES =
  'text-[color:var(--component-breadcrumb-text-default)] hover:text-[color:var(--component-breadcrumb-text-hover)] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:rounded';

export const BREADCRUMB_LINK_CURRENT_CLASSES =
  'text-[color:var(--component-breadcrumb-text-current)] cursor-default';

export const BREADCRUMB_SEPARATOR_CLASSES =
  'inline-flex items-center justify-center select-none text-[color:var(--component-breadcrumb-separator-color)]';

export const BREADCRUMB_ELLIPSIS_CLASSES =
  'text-[color:var(--component-breadcrumb-separator-color)]';

// =============================================================================
// INLINE STYLES (for proper token rendering)
// =============================================================================

/** Typography classes for link elements */
export const LINK_TYPOGRAPHY_CLASSES = 'text-sm font-normal';

/** Typography classes for current page element */
export const LINK_CURRENT_TYPOGRAPHY_CLASSES = 'text-sm font-medium';

/** Gap classes for breadcrumb items */
export const ITEM_GAP_CLASSES = 'gap-1';

/** Margin classes for separator */
export const SEPARATOR_SPACING_CLASSES = 'mx-2';

/** Font size classes for ellipsis */
export const ELLIPSIS_TYPOGRAPHY_CLASSES = 'text-sm';

/** Icon size classes for separator icons */
export const ICON_SIZE_CLASSES = 'size-4';

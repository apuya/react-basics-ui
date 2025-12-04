import type { DrawerPlacement, DrawerSize } from './Drawer';

export const OVERLAY_CLASSES =
  'fixed inset-0 bg-[color:var(--component-drawer-overlay-bg)] z-[number:var(--component-drawer-z-index)] opacity-0 transition-opacity duration-[var(--component-drawer-transition-duration)]';

export const OVERLAY_VISIBLE_CLASS = 'opacity-100';

export const DRAWER_BASE_CLASSES =
  'fixed bg-[color:var(--component-drawer-bg)] text-[color:var(--component-drawer-text)] shadow-[shadow:var(--component-drawer-shadow)] border-[color:var(--component-drawer-border)] flex flex-col opacity-0 transition-all duration-[var(--component-drawer-transition-duration)] z-[calc(var(--component-drawer-z-index)+1)]';

export const DRAWER_VISIBLE_CLASS = 'opacity-100';

export const PLACEMENT_STYLES: Record<DrawerPlacement, string> = {
  left: 'top-0 left-0 h-full border-r-[length:var(--component-drawer-border-width)] -translate-x-full rounded-r-[length:var(--component-drawer-radius)]',
  right: 'top-0 right-0 h-full border-l-[length:var(--component-drawer-border-width)] translate-x-full rounded-l-[length:var(--component-drawer-radius)]',
  top: 'top-0 left-0 w-full border-b-[length:var(--component-drawer-border-width)] -translate-y-full rounded-b-[length:var(--component-drawer-radius)]',
  bottom: 'bottom-0 left-0 w-full border-t-[length:var(--component-drawer-border-width)] translate-y-full rounded-t-[length:var(--component-drawer-radius)]',
};

export const PLACEMENT_VISIBLE_STYLES: Record<DrawerPlacement, string> = {
  left: 'translate-x-0',
  right: 'translate-x-0',
  top: 'translate-y-0',
  bottom: 'translate-y-0',
};

export const SIZE_STYLES: Record<DrawerPlacement, Record<DrawerSize, string>> = {
  left: {
    sm: 'w-[length:var(--component-drawer-width-sm)]',
    md: 'w-[length:var(--component-drawer-width-md)]',
    lg: 'w-[length:var(--component-drawer-width-lg)]',
    full: 'w-full',
  },
  right: {
    sm: 'w-[length:var(--component-drawer-width-sm)]',
    md: 'w-[length:var(--component-drawer-width-md)]',
    lg: 'w-[length:var(--component-drawer-width-lg)]',
    full: 'w-full',
  },
  top: {
    sm: 'h-[length:var(--component-drawer-height-sm)]',
    md: 'h-[length:var(--component-drawer-height-md)]',
    lg: 'h-[length:var(--component-drawer-height-lg)]',
    full: 'h-full',
  },
  bottom: {
    sm: 'h-[length:var(--component-drawer-height-sm)]',
    md: 'h-[length:var(--component-drawer-height-md)]',
    lg: 'h-[length:var(--component-drawer-height-lg)]',
    full: 'h-full',
  },
};

// Close button styles - uses tabs variant pattern
export const CLOSE_BUTTON_CLASSES =
  'absolute inline-flex items-center justify-center p-1 rounded-[length:var(--component-button-radius)] bg-[color:var(--component-button-bg-tabs-default)] border border-[color:var(--component-button-border-tabs-default)] text-[color:var(--component-button-text-tabs-default)] hover:bg-[color:var(--component-button-bg-tabs-hover)] hover:border-[color:var(--component-button-border-tabs-hover)] hover:text-[color:var(--component-button-text-tabs-hover)] active:bg-[color:var(--component-button-bg-tabs-active)] active:border-[color:var(--component-button-border-tabs-active)] active:text-[color:var(--component-button-text-tabs-active)] transition-colors z-10';

export const CLOSE_BUTTON_POSITION_STYLE = {
  top: 'var(--component-drawer-header-padding-block)',
  right: 'var(--component-drawer-header-padding-inline)',
} as const;

export const CLOSE_BUTTON_ICON_STYLE = {
  width: 'var(--component-drawer-close-button-size)',
  height: 'var(--component-drawer-close-button-size)',
} as const;

// Header styles - inline for proper token usage
export const HEADER_CLASSES = 'flex items-center justify-between shrink-0';

export const HEADER_STYLE = {
  paddingBlock: 'var(--component-drawer-header-padding-block)',
  paddingInline: 'var(--component-drawer-header-padding-inline)',
  gap: 'var(--component-drawer-header-gap)',
} as const;

// Body styles - inline for proper token usage
export const BODY_CLASSES = 'flex-1 overflow-y-auto flex flex-col';

export const BODY_STYLE = {
  paddingBlock: 'var(--component-drawer-body-padding-block)',
  paddingInline: 'var(--component-drawer-body-padding-inline)',
  gap: 'var(--component-drawer-body-gap)',
} as const;

// Footer styles - inline for proper token usage
export const FOOTER_CLASSES = 'flex items-center justify-end shrink-0';

export const FOOTER_STYLE = {
  paddingBlock: 'var(--component-drawer-footer-padding-block)',
  paddingInline: 'var(--component-drawer-footer-padding-inline)',
  gap: 'var(--component-drawer-footer-gap)',
} as const;

// Title styles - inline for proper token usage
export const TITLE_CLASSES = 'm-0';

export const TITLE_STYLE = {
  fontSize: 'var(--component-drawer-title-size)',
  fontWeight: 'var(--component-drawer-title-weight)',
} as const;


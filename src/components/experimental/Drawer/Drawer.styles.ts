import type { DrawerPlacement } from './Drawer';

export const OVERLAY_CLASSES =
  'fixed inset-0 bg-[var(--component-modal-overlay-bg)] z-[var(--component-modal-z-index)] opacity-0 transition-opacity duration-[var(--component-modal-transition-duration)]';

export const OVERLAY_VISIBLE_CLASS = 'opacity-100';

export const DRAWER_BASE_CLASSES =
  'fixed bg-[var(--component-modal-bg)] text-[var(--component-modal-text)] shadow-[var(--component-modal-shadow)] border-[var(--component-modal-border)] flex flex-col opacity-0 transition-all duration-[var(--component-modal-transition-duration)] z-[calc(var(--component-modal-z-index)+1)]';

export const DRAWER_VISIBLE_CLASS = 'opacity-100';

export const PLACEMENT_STYLES: Record<DrawerPlacement, string> = {
  left: 'top-0 left-0 h-full border-r-[length:var(--component-modal-border-width)] -translate-x-full',
  right: 'top-0 right-0 h-full border-l-[length:var(--component-modal-border-width)] translate-x-full',
  top: 'top-0 left-0 w-full border-b-[length:var(--component-modal-border-width)] -translate-y-full',
  bottom: 'bottom-0 left-0 w-full border-t-[length:var(--component-modal-border-width)] translate-y-full',
};

export const PLACEMENT_VISIBLE_STYLES: Record<DrawerPlacement, string> = {
  left: 'translate-x-0',
  right: 'translate-x-0',
  top: 'translate-y-0',
  bottom: 'translate-y-0',
};

export const SIZE_STYLES: Record<DrawerPlacement, Record<string, string>> = {
  left: {
    sm: 'w-[var(--component-modal-width-sm)]',
    md: 'w-[var(--component-modal-width-md)]',
    lg: 'w-[var(--component-modal-width-lg)]',
    full: 'w-full',
  },
  right: {
    sm: 'w-[var(--component-modal-width-sm)]',
    md: 'w-[var(--component-modal-width-md)]',
    lg: 'w-[var(--component-modal-width-lg)]',
    full: 'w-full',
  },
  top: {
    sm: 'h-1/4',
    md: 'h-1/3',
    lg: 'h-1/2',
    full: 'h-full',
  },
  bottom: {
    sm: 'h-1/4',
    md: 'h-1/3',
    lg: 'h-1/2',
    full: 'h-full',
  },
};

export const HEADER_CLASSES = 'flex items-center justify-between border-b border-[var(--component-modal-border)] shrink-0';

export const CONTENT_CLASSES = 'flex-1 overflow-y-auto';

export const FOOTER_CLASSES = 'flex items-center justify-end border-t border-[var(--component-modal-border)] shrink-0';

export const TITLE_CLASSES = 'text-[length:var(--component-modal-title-size)] font-[var(--component-modal-title-weight)] text-[var(--component-modal-text)]';

export const CLOSE_BUTTON_CLASSES = 'p-1 rounded hover:bg-[var(--component-modal-close-button-hover)] transition-colors';

import type { ModalSize } from './Modal';

export const OVERLAY_CLASSES =
  'fixed inset-0 bg-[var(--component-modal-overlay-bg)] z-[var(--component-modal-z-index)] flex items-center justify-center opacity-0 transition-opacity duration-[var(--component-modal-transition-duration)]';

export const OVERLAY_VISIBLE_CLASS = 'opacity-100';

export const MODAL_BASE_CLASSES =
  'relative bg-[var(--component-modal-bg)] text-[var(--component-modal-text)] rounded-[var(--component-modal-radius)] shadow-[var(--component-modal-shadow)] border-[length:var(--component-modal-border-width)] border-[var(--component-modal-border)] max-h-[90vh] flex flex-col opacity-0 scale-95 transition-all duration-[var(--component-modal-transition-duration)]';

export const MODAL_VISIBLE_CLASS = 'opacity-100 scale-100';

export const SIZE_STYLES: Record<ModalSize, string> = {
  sm: 'w-full max-w-[var(--component-modal-width-sm)]',
  md: 'w-full max-w-[var(--component-modal-width-md)]',
  lg: 'w-full max-w-[var(--component-modal-width-lg)]',
  xl: 'w-full max-w-[var(--semantic-max-width-lg)]',
  full: 'w-full h-full max-w-none max-h-none rounded-none',
};

export const HEADER_CLASSES = 'flex items-center justify-between border-b border-[var(--component-modal-border)] shrink-0';

export const CONTENT_CLASSES = 'flex-1 overflow-y-auto';

export const FOOTER_CLASSES = 'flex items-center justify-end border-t border-[var(--component-modal-border)] shrink-0';

export const TITLE_CLASSES = 'text-[length:var(--component-modal-title-size)] font-[var(--component-modal-title-weight)] text-[var(--component-modal-text)]';

export const CLOSE_BUTTON_CLASSES = 'p-1 rounded hover:bg-[var(--component-modal-close-button-hover)] transition-colors';

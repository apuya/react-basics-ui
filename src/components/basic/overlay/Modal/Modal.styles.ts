import type { ModalSize } from './Modal';

export const OVERLAY_CLASSES =
  'fixed inset-0 bg-[color:var(--component-modal-overlay-bg)] z-[number:var(--component-modal-z-index)] flex items-center justify-center opacity-0 transition-opacity duration-[var(--component-modal-transition-duration)]';

export const OVERLAY_VISIBLE_CLASS = 'opacity-100';

export const MODAL_BASE_CLASSES =
  'relative bg-[color:var(--component-modal-bg)] text-[color:var(--component-modal-text)] rounded-[length:var(--component-modal-radius)] shadow-[shadow:var(--component-modal-shadow)] border-[length:var(--component-modal-border-width)] border-[color:var(--component-modal-border)] max-h-[90vh] flex flex-col opacity-0 scale-95 transition-all duration-[var(--component-modal-transition-duration)]';

export const MODAL_VISIBLE_CLASS = 'opacity-100 scale-100';

export const SIZE_STYLES: Record<ModalSize, string> = {
  sm: 'w-full max-w-[length:var(--component-modal-width-sm)]',
  md: 'w-full max-w-[length:var(--component-modal-width-md)]',
  lg: 'w-full max-w-[length:var(--component-modal-width-lg)]',
  xl: 'w-full max-w-[length:var(--component-modal-width-xl)]',
  full: 'w-full h-full max-w-none max-h-none rounded-none',
};

export const HEADER_CLASSES = 'flex items-center justify-between shrink-0';

export const CONTENT_CLASSES = 'flex flex-col flex-1 overflow-y-auto';

export const FOOTER_CLASSES = 'flex items-center justify-end shrink-0';

export const TITLE_CLASSES = 'text-[length:var(--component-modal-title-size)] font-[number:var(--component-modal-title-weight)] text-[color:var(--component-modal-text)]';

// Close button uses Button component with 'tabs' variant - no custom classes needed

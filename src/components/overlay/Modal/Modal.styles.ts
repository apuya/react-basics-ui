import type { ModalSize } from './Modal';

export const OVERLAY_CLASSES =
  'fixed inset-0 bg-[color:var(--component-modal-overlay-bg)] z-50 flex items-center justify-center opacity-0 transition-opacity duration-300';

export const OVERLAY_VISIBLE_CLASS = 'opacity-100';

export const MODAL_BASE_CLASSES =
  'relative bg-[color:var(--component-modal-bg)] text-[color:var(--component-modal-text)] rounded-lg shadow-lg border border-[color:var(--component-modal-border)] max-h-[90vh] flex flex-col opacity-0 scale-95 transition-all duration-300 mx-4 p-6 gap-6';

export const MODAL_VISIBLE_CLASS = 'opacity-100 scale-100';

export const SIZE_STYLES: Record<ModalSize, string> = {
  sm: 'w-full max-w-sm',
  md: 'w-full max-w-md',
  lg: 'w-full max-w-lg',
  xl: 'w-full max-w-xl',
  full: 'w-full h-full max-w-none max-h-none rounded-none mx-0',
};

export const HEADER_CLASSES = 'flex items-center justify-between shrink-0 gap-2';

export const CONTENT_CLASSES = 'flex flex-col flex-1 overflow-y-auto gap-4 -m-0.5 p-0.5';

export const FOOTER_CLASSES = 'flex items-center justify-end shrink-0 gap-2';

export const TITLE_CLASSES = 'text-lg font-semibold text-[color:var(--component-modal-text)]';

// Close button uses Button component with 'tabs' variant - no custom classes needed

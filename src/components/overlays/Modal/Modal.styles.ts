import type { ModalSize } from './Modal.types';

// =============================================================================
// OVERLAY STYLES
// =============================================================================

export const OVERLAY_CLASSES =
  'fixed inset-0 bg-[color:var(--component-modal-overlay-bg)] z-[number:var(--component-modal-z-index)] flex items-center justify-center opacity-0 transition-opacity duration-[var(--component-modal-transition-duration)]';

export const OVERLAY_VISIBLE_CLASS = 'opacity-100';

// =============================================================================
// MODAL BASE STYLES (Applied to BaseCardContainer)
// =============================================================================

/**
 * Modal-specific visual styling for BaseCardContainer
 */
export const MODAL_BASE_CLASSES =
  'flex flex-col bg-[color:var(--component-modal-bg)] text-[color:var(--component-modal-text)] rounded-[length:var(--component-modal-radius)] shadow-[shadow:var(--component-modal-shadow)] border-[length:var(--component-modal-border-width)] border-[color:var(--component-modal-border)] max-h-[90vh] opacity-0 scale-95 transition-all duration-[var(--component-modal-transition-duration)]';

export const MODAL_VISIBLE_CLASS = 'opacity-100 scale-100';

// =============================================================================
// SIZE STYLES
// =============================================================================

export const SIZE_STYLES: Record<ModalSize, string> = {
  sm: 'w-full max-w-[length:var(--component-modal-width-sm)]',
  md: 'w-full max-w-[length:var(--component-modal-width-md)]',
  lg: 'w-full max-w-[length:var(--component-modal-width-lg)]',
  xl: 'w-full max-w-[length:var(--component-modal-width-xl)]',
  full: 'w-full h-full max-w-none max-h-none rounded-none',
};

import type { ToastVariant } from './Toast';

export const BASE_CLASSES =
  'flex items-start gap-3 rounded-[var(--component-toast-radius)] shadow-[var(--component-toast-shadow)]';

export const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: 'bg-[var(--component-toast-bg-success)] text-[var(--component-toast-text-success)] [--toast-icon-color:var(--component-toast-icon-success)]',
  error: 'bg-[var(--component-toast-bg-error)] text-[var(--component-toast-text-error)] [--toast-icon-color:var(--component-toast-icon-error)]',
  warning: 'bg-[var(--component-toast-bg-warning)] text-[var(--component-toast-text-warning)] [--toast-icon-color:var(--component-toast-icon-warning)]',
  info: 'bg-[var(--component-toast-bg-info)] text-[var(--component-toast-text-info)] [--toast-icon-color:var(--component-toast-icon-info)]',
  default: 'bg-[var(--component-toast-bg)] text-[var(--component-toast-text-default)] [--toast-icon-color:var(--component-toast-icon-info)]',
};

export const ICON_CLASSES = 'shrink-0 w-5 h-5 mt-0.5 text-[color:var(--toast-icon-color)]';

export const CONTENT_CLASSES = 'flex-1 min-w-0';

export const CLOSE_BUTTON_CLASSES =
  'shrink-0 p-1 -mr-1 -mt-1 rounded hover:bg-black/10 transition-colors';

export const CLOSE_ICON_CLASSES = 'w-4 h-4';

import type { PopoverSide, PopoverAlign } from './Popover';

export const BASE_CLASSES =
  'absolute flex flex-col gap-2 py-3 px-4 bg-[color:var(--component-popover-bg)] text-[color:var(--component-popover-text)] border border-[color:var(--component-popover-border)] rounded-lg shadow-lg z-50 min-w-48 max-w-80 opacity-0 pointer-events-none transition-opacity duration-200';

export const VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

export const SIDE_STYLES: Record<PopoverSide, string> = {
  top: 'bottom-full mb-2',
  bottom: 'top-full mt-2',
  left: 'right-full mr-2',
  right: 'left-full ml-2',
};

// Combined side + align positioning
export const POSITION_STYLES: Record<PopoverSide, Record<PopoverAlign, string>> = {
  top: {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  },
  bottom: {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  },
  left: {
    start: 'top-0',
    center: 'top-1/2 -translate-y-1/2',
    end: 'bottom-0',
  },
  right: {
    start: 'top-0',
    center: 'top-1/2 -translate-y-1/2',
    end: 'bottom-0',
  },
};

export const TRIGGER_WRAPPER_CLASSES = 'relative inline-block';

export const TITLE_CLASSES = 'text-base font-semibold text-[color:var(--component-popover-text)]';

export const DESCRIPTION_CLASSES = 'text-sm font-normal text-[color:var(--component-popover-text-secondary)]';

export const CLOSE_BUTTON_CLASSES = 'absolute top-2 right-2 p-1 rounded-md hover:bg-[color:var(--component-popover-close-hover-bg)] transition-colors';

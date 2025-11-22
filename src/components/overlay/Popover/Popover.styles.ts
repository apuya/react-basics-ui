import type { PopoverSide, PopoverAlign } from './Popover';

export const BASE_CLASSES =
  'absolute bg-[var(--component-popover-bg)] text-[var(--component-popover-text)] border-[length:var(--component-popover-border-width)] border-[var(--component-popover-border)] rounded-[var(--component-popover-radius)] shadow-[var(--component-popover-shadow)] z-[var(--component-popover-z-index)] min-w-[var(--component-popover-min-width)] max-w-[var(--component-popover-max-width)] opacity-0 pointer-events-none transition-opacity duration-[var(--component-popover-transition-duration)]';

export const VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

export const SIDE_STYLES: Record<PopoverSide, string> = {
  top: 'bottom-full mb-2',
  bottom: 'top-full mt-2',
  left: 'right-full mr-2',
  right: 'left-full ml-2',
};

export const ALIGN_STYLES: Record<PopoverAlign, string> = {
  start: '',
  center: '',
  end: '',
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

export const TITLE_CLASSES = 'text-[length:var(--component-popover-title-size)] font-[var(--component-popover-title-weight)] text-[var(--component-popover-text)]';

export const DESCRIPTION_CLASSES = 'text-[length:var(--component-popover-description-size)] font-[var(--component-popover-description-weight)] text-[var(--semantic-text-secondary)]';

export const CLOSE_BUTTON_CLASSES = 'absolute top-2 right-2 p-1 rounded hover:bg-[var(--semantic-surface-hover)] transition-colors';

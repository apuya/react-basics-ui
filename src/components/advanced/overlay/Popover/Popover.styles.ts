import type { PopoverSide, PopoverAlign } from './Popover';

export const BASE_CLASSES =
  'absolute flex flex-col gap-[length:var(--component-popover-gap)] bg-[color:var(--component-popover-bg)] text-[color:var(--component-popover-text)] border-[length:var(--component-popover-border-width)] border-[color:var(--component-popover-border)] rounded-[length:var(--component-popover-radius)] shadow-[shadow:var(--component-popover-shadow)] z-[var(--component-popover-z-index)] min-w-[length:var(--component-popover-min-width)] max-w-[length:var(--component-popover-max-width)] opacity-0 pointer-events-none transition-opacity duration-[var(--component-popover-transition-duration)]';

export const VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

export const SIDE_STYLES: Record<PopoverSide, string> = {
  top: 'bottom-full mb-[length:var(--component-popover-offset)]',
  bottom: 'top-full mt-[length:var(--component-popover-offset)]',
  left: 'right-full mr-[length:var(--component-popover-offset)]',
  right: 'left-full ml-[length:var(--component-popover-offset)]',
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

export const TITLE_CLASSES = 'text-[length:var(--component-popover-title-size)] font-[number:var(--component-popover-title-weight)] text-[color:var(--component-popover-text)]';

export const DESCRIPTION_CLASSES = 'text-[length:var(--component-popover-description-size)] font-[number:var(--component-popover-description-weight)] text-[color:var(--component-popover-text-secondary)]';

export const CLOSE_BUTTON_CLASSES = 'absolute top-[length:var(--component-popover-close-offset)] right-[length:var(--component-popover-close-offset)] p-[length:var(--component-popover-close-offset)] rounded-[length:var(--component-popover-radius)] hover:bg-[color:var(--component-popover-close-hover-bg)] transition-colors';

export type DropdownItemState = 'default' | 'hover' | 'active' | 'disabled';

export const BASE_CLASSES =
  'absolute bg-[var(--component-dropdown-bg)] border-[length:var(--component-dropdown-border-width)] border-[var(--component-dropdown-border)] rounded-[var(--component-dropdown-radius)] shadow-[var(--component-dropdown-shadow)] z-[var(--component-dropdown-z-index)] min-w-[var(--component-dropdown-min-width)] max-w-[var(--component-dropdown-max-width)] opacity-0 pointer-events-none transition-opacity duration-[var(--component-dropdown-transition-duration)]';

export const VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

export const SIDE_STYLES = {
  top: 'bottom-full mb-2',
  bottom: 'top-full mt-2',
  left: 'right-full mr-2',
  right: 'left-full ml-2',
} as const;

export const ALIGN_STYLES = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
} as const;

export const TRIGGER_WRAPPER_CLASSES = 'relative inline-block';

export const MENU_WRAPPER_CLASSES = 'flex flex-col';

export const ITEM_BASE_CLASSES =
  'flex items-center text-[length:var(--component-dropdown-item-font-size)] font-[var(--component-dropdown-item-font-weight)] leading-[var(--component-dropdown-item-line-height)] cursor-pointer transition-colors outline-none';

export const ITEM_STATE_STYLES: Record<DropdownItemState, string> = {
  default: 'bg-[var(--component-dropdown-item-bg-default)] text-[var(--component-dropdown-item-text-default)]',
  hover: 'bg-[var(--component-dropdown-item-bg-hover)] text-[var(--component-dropdown-item-text-hover)]',
  active: 'bg-[var(--component-dropdown-item-bg-active)] text-[var(--component-dropdown-item-text-active)]',
  disabled: 'bg-[var(--component-dropdown-item-bg-disabled)] text-[var(--component-dropdown-item-text-disabled)] cursor-not-allowed opacity-50',
};

export const DIVIDER_CLASSES = 'h-px bg-[var(--component-dropdown-divider)]';

export const ICON_WRAPPER_CLASSES = 'shrink-0';

export const SHORTCUT_CLASSES = 'ml-auto text-[var(--semantic-text-tertiary)] text-[length:var(--semantic-text-size-small)]';

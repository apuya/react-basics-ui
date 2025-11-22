export type DropdownItemState = 'default' | 'hover' | 'active' | 'disabled';
export type DropdownItemVariant = 'default' | 'danger' | 'warning' | 'success' | 'info';

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
  disabled: 'bg-[var(--component-dropdown-item-bg-disabled)] text-[var(--component-dropdown-item-text-disabled)] cursor-not-allowed opacity-[var(--semantic-opacity-disabled)]',
};

export const ITEM_VARIANT_STYLES: Record<DropdownItemVariant, { default: string; hover: string; active: string }> = {
  default: {
    default: 'bg-[var(--component-dropdown-item-bg-default)] text-[var(--component-dropdown-item-text-default)]',
    hover: 'bg-[var(--component-dropdown-item-bg-hover)] text-[var(--component-dropdown-item-text-hover)]',
    active: 'bg-[var(--component-dropdown-item-bg-active)] text-[var(--component-dropdown-item-text-active)]',
  },
  danger: {
    default: 'bg-[var(--component-dropdown-item-bg-danger-default)] text-[var(--component-dropdown-item-text-danger)]',
    hover: 'bg-[var(--component-dropdown-item-bg-danger-hover)] text-[var(--component-dropdown-item-text-danger)]',
    active: 'bg-[var(--component-dropdown-item-bg-danger-active)] text-[var(--component-dropdown-item-text-danger)]',
  },
  warning: {
    default: 'bg-[var(--component-dropdown-item-bg-warning-default)] text-[var(--component-dropdown-item-text-warning)]',
    hover: 'bg-[var(--component-dropdown-item-bg-warning-hover)] text-[var(--component-dropdown-item-text-warning)]',
    active: 'bg-[var(--component-dropdown-item-bg-warning-active)] text-[var(--component-dropdown-item-text-warning)]',
  },
  success: {
    default: 'bg-[var(--component-dropdown-item-bg-success-default)] text-[var(--component-dropdown-item-text-success)]',
    hover: 'bg-[var(--component-dropdown-item-bg-success-hover)] text-[var(--component-dropdown-item-text-success)]',
    active: 'bg-[var(--component-dropdown-item-bg-success-active)] text-[var(--component-dropdown-item-text-success)]',
  },
  info: {
    default: 'bg-[var(--component-dropdown-item-bg-info-default)] text-[var(--component-dropdown-item-text-info)]',
    hover: 'bg-[var(--component-dropdown-item-bg-info-hover)] text-[var(--component-dropdown-item-text-info)]',
    active: 'bg-[var(--component-dropdown-item-bg-info-active)] text-[var(--component-dropdown-item-text-info)]',
  },
};

export const ICON_VARIANT_STYLES: Record<DropdownItemVariant, { default: string; hover: string; active: string }> = {
  default: {
    default: 'text-[var(--component-dropdown-item-icon-default)]',
    hover: 'text-[var(--component-dropdown-item-icon-hover)]',
    active: 'text-[var(--component-dropdown-item-icon-active)]',
  },
  danger: {
    default: 'text-[var(--component-dropdown-item-icon-danger)]',
    hover: 'text-[var(--component-dropdown-item-icon-danger)]',
    active: 'text-[var(--component-dropdown-item-icon-danger)]',
  },
  warning: {
    default: 'text-[var(--component-dropdown-item-icon-warning)]',
    hover: 'text-[var(--component-dropdown-item-icon-warning)]',
    active: 'text-[var(--component-dropdown-item-icon-warning)]',
  },
  success: {
    default: 'text-[var(--component-dropdown-item-icon-success)]',
    hover: 'text-[var(--component-dropdown-item-icon-success)]',
    active: 'text-[var(--component-dropdown-item-icon-success)]',
  },
  info: {
    default: 'text-[var(--component-dropdown-item-icon-info)]',
    hover: 'text-[var(--component-dropdown-item-icon-info)]',
    active: 'text-[var(--component-dropdown-item-icon-info)]',
  },
};

export const DIVIDER_CLASSES = 'h-px bg-[var(--component-dropdown-divider)]';

export const ICON_WRAPPER_CLASSES = 'shrink-0';

export const SHORTCUT_CLASSES = 'ml-auto text-[var(--semantic-text-tertiary)] text-[length:var(--semantic-text-size-small)]';

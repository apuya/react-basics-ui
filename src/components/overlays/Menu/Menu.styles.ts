// Container styles
export const CONTAINER_BASE_CLASSES =
  'flex flex-col overflow-hidden';

export const CONTAINER_STYLE = {
  backgroundColor: 'var(--component-menu-bg)',
  borderWidth: 'var(--component-menu-border-width)',
  borderStyle: 'solid',
  borderColor: 'var(--component-menu-border)',
  borderRadius: 'var(--component-menu-radius)',
  boxShadow: 'var(--component-menu-shadow)',
  paddingInline: 'var(--component-menu-padding-inline)',
  paddingBlock: 'var(--component-menu-padding-block)',
} as const;

// Item styles
export const ITEM_BASE_CLASSES =
  'flex items-center cursor-pointer transition-colors outline-none w-full text-left';

export const ITEM_STATE_STYLES = {
  default: 'bg-[color:var(--component-menu-item-bg-default)] text-[color:var(--component-menu-item-text-default)]',
  hover: 'bg-[color:var(--component-menu-item-bg-hover)] text-[color:var(--component-menu-item-text-hover)]',
  active: 'bg-[color:var(--component-menu-item-bg-active)] text-[color:var(--component-menu-item-text-active)]',
  disabled: 'bg-[color:var(--component-menu-item-bg-disabled)] text-[color:var(--component-menu-item-text-disabled)] cursor-not-allowed opacity-50',
} as const;

export const ITEM_STYLE = {
  minHeight: 'var(--component-menu-item-height)',
  paddingInline: 'var(--component-menu-item-padding-inline)',
  paddingBlock: 'var(--component-menu-item-padding-block)',
  gap: 'var(--component-menu-item-gap)',
  borderRadius: 'var(--component-menu-item-radius)',
} as const;

// Variant styles for semantic coloring - applied as inline styles with state management
export const ITEM_VARIANT_STYLES = {
  default: { color: undefined, hoverBg: undefined },
  success: { 
    color: 'var(--component-menu-item-text-success)',
    hoverBg: 'var(--component-menu-item-bg-success-hover)',
  },
  info: { 
    color: 'var(--component-menu-item-text-info)',
    hoverBg: 'var(--component-menu-item-bg-info-hover)',
  },
  warning: { 
    color: 'var(--component-menu-item-text-warning)',
    hoverBg: 'var(--component-menu-item-bg-warning-hover)',
  },
  danger: { 
    color: 'var(--component-menu-item-text-danger)',
    hoverBg: 'var(--component-menu-item-bg-danger-hover)',
  },
} as const;

export type MenuItemVariant = keyof typeof ITEM_VARIANT_STYLES;

// Divider styles
export const DIVIDER_CLASSES = 'h-px my-1';

export const DIVIDER_STYLE = {
  backgroundColor: 'var(--component-menu-divider)',
} as const;

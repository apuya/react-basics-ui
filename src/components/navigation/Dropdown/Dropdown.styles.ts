/**
 * Style constants and utilities for Dropdown components.
 * 
 * Provides:
 * - CSS class strings for Tailwind
 * - CSS-in-JS style objects for design tokens
 * - Variant style definitions for theming
 * - Positioning and layout utilities
 * 
 * All styles use CSS variables from the design token system for consistency.
 */

export type DropdownItemVariant = 'default' | 'danger' | 'warning' | 'success' | 'info';

export const BASE_CLASSES =
  'absolute bg-[color:var(--component-dropdown-bg)] border border-solid border-[color:var(--component-dropdown-border)] rounded-lg shadow-lg z-50 min-w-48 max-w-80 opacity-0 pointer-events-none transition-opacity duration-200';

export const VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

export const SIDE_STYLES = {
  top: 'bottom-full',
  bottom: 'top-full',
  left: 'right-full',
  right: 'left-full',
} as const;

export const SIDE_GAP_CLASSES = {
  top: 'mb-1',
  bottom: 'mt-1',
  left: 'mr-1',
  right: 'ml-1',
} as const;

// Horizontal alignment (for top/bottom sides)
export const ALIGN_STYLES = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
} as const;

// Vertical alignment (for left/right sides)
export const VERTICAL_ALIGN_STYLES = {
  start: 'top-0',
  center: 'top-1/2 -translate-y-1/2',
  end: 'bottom-0',
} as const;

export const TRIGGER_WRAPPER_CLASSES = 'relative inline-block';

export const MENU_WRAPPER_CLASSES = 'flex flex-col';

export const ITEM_BASE_CLASSES =
  'flex items-center text-sm font-normal leading-5 cursor-pointer transition-colors outline-none';

export const ITEM_VARIANT_STYLES: Record<DropdownItemVariant, { default: string; hoverClasses: string; activeClasses: string }> = {
  default: {
    default: 'bg-[color:var(--component-dropdown-item-bg-default)] text-[color:var(--component-dropdown-item-text-default)]',
    hoverClasses: 'hover:bg-[color:var(--component-dropdown-item-bg-hover)] hover:text-[color:var(--component-dropdown-item-text-hover)]',
    activeClasses: 'active:bg-[color:var(--component-dropdown-item-bg-active)] active:text-[color:var(--component-dropdown-item-text-active)]',
  },
  danger: {
    default: 'bg-[color:var(--component-dropdown-item-bg-danger-default)] text-[color:var(--component-dropdown-item-text-danger)]',
    hoverClasses: 'hover:bg-[color:var(--component-dropdown-item-bg-danger-hover)] hover:text-[color:var(--component-dropdown-item-text-danger)]',
    activeClasses: 'active:bg-[color:var(--component-dropdown-item-bg-danger-active)] active:text-[color:var(--component-dropdown-item-text-danger)]',
  },
  warning: {
    default: 'bg-[color:var(--component-dropdown-item-bg-warning-default)] text-[color:var(--component-dropdown-item-text-warning)]',
    hoverClasses: 'hover:bg-[color:var(--component-dropdown-item-bg-warning-hover)] hover:text-[color:var(--component-dropdown-item-text-warning)]',
    activeClasses: 'active:bg-[color:var(--component-dropdown-item-bg-warning-active)] active:text-[color:var(--component-dropdown-item-text-warning)]',
  },
  success: {
    default: 'bg-[color:var(--component-dropdown-item-bg-success-default)] text-[color:var(--component-dropdown-item-text-success)]',
    hoverClasses: 'hover:bg-[color:var(--component-dropdown-item-bg-success-hover)] hover:text-[color:var(--component-dropdown-item-text-success)]',
    activeClasses: 'active:bg-[color:var(--component-dropdown-item-bg-success-active)] active:text-[color:var(--component-dropdown-item-text-success)]',
  },
  info: {
    default: 'bg-[color:var(--component-dropdown-item-bg-info-default)] text-[color:var(--component-dropdown-item-text-info)]',
    hoverClasses: 'hover:bg-[color:var(--component-dropdown-item-bg-info-hover)] hover:text-[color:var(--component-dropdown-item-text-info)]',
    activeClasses: 'active:bg-[color:var(--component-dropdown-item-bg-info-active)] active:text-[color:var(--component-dropdown-item-text-info)]',
  },
};

export const ICON_VARIANT_STYLES: Record<DropdownItemVariant, { default: string; hoverClasses: string; activeClasses: string }> = {
  default: {
    default: 'text-[color:var(--component-dropdown-item-icon-default)]',
    hoverClasses: 'group-hover:text-[color:var(--component-dropdown-item-icon-hover)]',
    activeClasses: 'group-active:text-[color:var(--component-dropdown-item-icon-active)]',
  },
  danger: {
    default: 'text-[color:var(--component-dropdown-item-icon-danger)]',
    hoverClasses: 'group-hover:text-[color:var(--component-dropdown-item-icon-danger)]',
    activeClasses: 'group-active:text-[color:var(--component-dropdown-item-icon-danger)]',
  },
  warning: {
    default: 'text-[color:var(--component-dropdown-item-icon-warning)]',
    hoverClasses: 'group-hover:text-[color:var(--component-dropdown-item-icon-warning)]',
    activeClasses: 'group-active:text-[color:var(--component-dropdown-item-icon-warning)]',
  },
  success: {
    default: 'text-[color:var(--component-dropdown-item-icon-success)]',
    hoverClasses: 'group-hover:text-[color:var(--component-dropdown-item-icon-success)]',
    activeClasses: 'group-active:text-[color:var(--component-dropdown-item-icon-success)]',
  },
  info: {
    default: 'text-[color:var(--component-dropdown-item-icon-info)]',
    hoverClasses: 'group-hover:text-[color:var(--component-dropdown-item-icon-info)]',
    activeClasses: 'group-active:text-[color:var(--component-dropdown-item-icon-info)]',
  },
};

export const DIVIDER_CLASSES = 'h-px bg-[color:var(--component-dropdown-divider)]';

export const ICON_WRAPPER_CLASSES = 'shrink-0';

export const SHORTCUT_CLASSES = 'ml-auto';

export const DISABLED_ITEM_CLASSES = 'bg-[color:var(--component-dropdown-item-bg-disabled)] text-[color:var(--component-dropdown-item-text-disabled)] cursor-not-allowed opacity-50';

export const DISABLED_ICON_CLASSES = 'text-[color:var(--component-dropdown-item-icon-disabled)]';

// MenuItem padding and gap classes using Tailwind
export const MENU_ITEM_PADDING_CLASSES = 'px-3 py-2';

export const MENU_ITEM_GAP_CLASSES = 'my-0.5';

// SearchBar container padding
export const SEARCH_CONTAINER_PADDING_CLASSES = 'px-3 py-1.5';

// Header text classes
export const HEADER_TEXT_CLASSES = 'text-[color:var(--component-dropdown-header-text-color)] text-xs font-semibold leading-4 tracking-wide';

// Description text classes
export const DESCRIPTION_TEXT_CLASSES = 'text-[color:var(--component-dropdown-description-text-color)] text-xs font-normal leading-4 tracking-normal';

// Item classes
export const ITEM_CLASSES = 'min-h-8 px-3 py-2 gap-2 rounded';

// Icon classes
export const ICON_CLASSES = 'size-4';

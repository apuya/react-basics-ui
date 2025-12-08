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
  'absolute bg-[color:var(--component-dropdown-bg)] border-[length:var(--component-dropdown-border-width)] border-solid border-[color:var(--component-dropdown-border)] rounded-[length:var(--component-dropdown-radius)] shadow-[shadow:var(--component-dropdown-shadow)] z-[var(--component-dropdown-z-index)] min-w-[length:var(--component-dropdown-min-width)] max-w-[length:var(--component-dropdown-max-width)] opacity-0 pointer-events-none transition-opacity duration-[var(--component-dropdown-transition-duration)]';

export const VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

export const SIDE_STYLES = {
  top: 'bottom-full',
  bottom: 'top-full',
  left: 'right-full',
  right: 'left-full',
} as const;

export const SIDE_GAP_STYLE = {
  marginTop: 'var(--component-dropdown-gap)',
  marginBottom: 'var(--component-dropdown-gap)',
  marginLeft: 'var(--component-dropdown-gap)',
  marginRight: 'var(--component-dropdown-gap)',
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
  'flex items-center text-[length:var(--component-dropdown-item-font-size)] font-[number:var(--component-dropdown-item-font-weight)] leading-[number:var(--component-dropdown-item-line-height)] cursor-pointer transition-colors outline-none';

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

export const DISABLED_ITEM_CLASSES = 'bg-[color:var(--component-dropdown-item-bg-disabled)] text-[color:var(--component-dropdown-item-text-disabled)] cursor-not-allowed opacity-[var(--semantic-opacity-disabled)]';

export const DISABLED_ICON_CLASSES = 'text-[color:var(--component-dropdown-item-icon-disabled)]';

// MenuItem padding and gap styles using tokens
export const MENU_ITEM_PADDING_STYLE = {
  paddingInline: 'var(--component-dropdown-item-padding-inline)',
  paddingBlock: 'var(--component-dropdown-item-padding-block)',
} as const;

export const MENU_ITEM_GAP_STYLE = {
  marginBlock: 'var(--component-dropdown-gap)',
} as const;

// SearchBar container padding
export const SEARCH_CONTAINER_PADDING_STYLE = {
  paddingInline: 'var(--component-dropdown-padding-inline)',
  paddingBlock: 'calc(var(--component-dropdown-item-padding-block) * 0.75)',
} as const;

// Header text styles
export const HEADER_TEXT_STYLE = {
  color: 'var(--component-dropdown-header-text-color)',
  fontSize: 'var(--component-dropdown-header-font-size)',
  fontWeight: 'var(--component-dropdown-header-font-weight)',
  lineHeight: 'var(--component-dropdown-header-line-height)',
  letterSpacing: 'var(--component-dropdown-header-letter-spacing)',
  fontFamily: 'var(--semantic-font-family-base)',
} as const;

// Description text styles
export const DESCRIPTION_TEXT_STYLE = {
  color: 'var(--component-dropdown-description-text-color)',
  fontSize: 'var(--component-dropdown-description-font-size)',
  fontWeight: 'var(--component-dropdown-description-font-weight)',
  lineHeight: 'var(--component-dropdown-description-line-height)',
  letterSpacing: 'var(--component-dropdown-description-letter-spacing)',
  fontFamily: 'var(--semantic-font-family-base)',
} as const;

// Item style generator
export const ITEM_STYLE = (hasDescription: boolean) => ({
  minHeight: '32px',
  height: hasDescription ? 'auto' : '32px',
  paddingInline: 'var(--component-dropdown-item-padding-inline)',
  paddingBlock: 'var(--component-dropdown-item-padding-block)',
  gap: 'var(--component-dropdown-item-gap)',
  borderRadius: 'var(--component-dropdown-item-radius)',
} as const);

// Icon style
export const ICON_STYLE = {
  width: 'var(--component-dropdown-icon-size)',
  height: 'var(--component-dropdown-icon-size)',
} as const;

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

// Positioning wrapper - handles absolute positioning, visibility, and z-index only
// Visual styling (bg, border, shadow, radius) is applied by Menu.Container
export const BASE_CLASSES =
  'absolute z-[var(--component-dropdown-z-index)] min-w-[length:var(--component-dropdown-min-width)] max-w-[length:var(--component-dropdown-max-width)] opacity-0 pointer-events-none transition-opacity duration-[var(--component-dropdown-transition-duration)]';

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

// Note: Item styling is handled by Menu component.
// Dropdown only manages positioning and interaction.

// MenuItem padding for header/footer variants
export const MENU_ITEM_PADDING_STYLE = {
  paddingInline: 'var(--component-dropdown-item-padding-inline)',
  paddingBlock: 'var(--component-dropdown-item-padding-block)',
} as const;

// SearchBar container padding
export const SEARCH_CONTAINER_PADDING_STYLE = {
  paddingInline: 'var(--component-dropdown-padding-inline)',
  paddingBlock: 'calc(var(--component-dropdown-item-padding-block) * 0.75)',
} as const;

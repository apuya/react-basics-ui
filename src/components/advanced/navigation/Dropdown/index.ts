/**
 * Dropdown Component Exports
 * 
 * A fully accessible dropdown menu with compound component pattern.
 * Supports keyboard navigation, flexible positioning, and semantic variants.
 */

export { Dropdown } from './Dropdown';
export { DropdownErrorBoundary } from './DropdownErrorBoundary';

// Type exports
export type { DropdownProps, DropdownSide, DropdownAlign } from './Dropdown';
export type { DropdownTriggerProps } from './DropdownTrigger';
export type { DropdownMenuProps } from './DropdownMenu';
export type { DropdownItemProps } from './DropdownItem';
export type { DropdownMenuItemProps, DropdownMenuItemVariant } from './DropdownMenuItem';
export type { DropdownItemVariant } from './Dropdown.styles';

// Deprecated exports
/** @deprecated Use DropdownMenuItemProps instead */
export type { DropdownMenuItemProps as DropdownDividerProps } from './DropdownMenuItem';

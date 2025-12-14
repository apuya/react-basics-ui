import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// =============================================================================
// Checkbox Types
// =============================================================================

// -----------------------------------------------------------------------------
// Size Types
// -----------------------------------------------------------------------------

/** Available checkbox sizes */
export type CheckboxSize = 'small' | 'default' | 'large';

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Checkbox component.
 * A checkbox for binary choices or multiple selections.
 */
export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  /**
   * The size of the checkbox.
   * @default 'default'
   */
  size?: CheckboxSize;
  /**
   * Label content for the checkbox.
   */
  label?: ReactNode;
  /**
   * Whether the checkbox is in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * Whether the checkbox is in an indeterminate state.
   * Used for "select all" scenarios.
   * @default false
   */
  indeterminate?: boolean;
}

import type { ComponentPropsWithoutRef } from 'react';

// =============================================================================
// Size & Variant Types
// =============================================================================

/** Available label size variants */
export type LabelSize = 'caption' | 'small' | 'body';

/** Available label weight variants */
export type LabelWeight = 'normal' | 'medium' | 'semibold';

/** Available label color variants */
export type LabelColor = 'primary' | 'secondary' | 'error' | 'disabled';

// =============================================================================
// Props
// =============================================================================

/**
 * Props for the Label component.
 */
export interface LabelProps extends Omit<ComponentPropsWithoutRef<'label'>, 'color'> {
  /**
   * Size variant of the label.
   * @default 'small'
   */
  size?: LabelSize;
  /**
   * Font weight of the label.
   * @default 'medium'
   */
  weight?: LabelWeight;
  /**
   * Color variant of the label.
   * @default 'primary'
   */
  color?: LabelColor;
  /**
   * Whether to show required indicator (*).
   * @default false
   */
  required?: boolean;
  /**
   * Whether the label is disabled.
   * @default false
   */
  disabled?: boolean;
}

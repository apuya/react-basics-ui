import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// =============================================================================
// Variant Types
// =============================================================================

/** Divider orientation */
export type DividerOrientation = 'horizontal' | 'vertical';

/** Divider line style */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/** Divider spacing size */
export type DividerSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Label position for horizontal dividers */
export type DividerLabelPosition = 'left' | 'center' | 'right';

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Divider component.
 * A visual separator with optional label support.
 */
export interface DividerProps extends ComponentPropsWithoutRef<'hr'> {
  /**
   * Orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;
  /**
   * Line style variant.
   * @default 'solid'
   */
  variant?: DividerVariant;
  /**
   * Spacing around the divider.
   * @default 'md'
   */
  spacing?: DividerSpacing;
  /** Optional label text to display on the divider */
  label?: ReactNode;
  /**
   * Position of the label (horizontal dividers only).
   * @default 'center'
   */
  labelPosition?: DividerLabelPosition;
}

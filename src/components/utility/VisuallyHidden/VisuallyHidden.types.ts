import type { ReactNode } from 'react';

// =============================================================================
// Element Types
// =============================================================================

/** Available HTML elements for VisuallyHidden */
export type VisuallyHiddenElement = 'span' | 'div';

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the VisuallyHidden component.
 * Hides content visually while keeping it accessible to screen readers.
 */
export interface VisuallyHiddenProps {
  /**
   * Content to hide visually but keep accessible.
   */
  children: ReactNode;
  /**
   * HTML element to render.
   * @default 'span'
   */
  as?: VisuallyHiddenElement;
}

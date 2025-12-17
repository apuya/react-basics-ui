import type { ReactNode } from 'react';

// =============================================================================
// Position Types
// =============================================================================

/** Available tooltip positions relative to the trigger element */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Tooltip component.
 * Displays contextual information on hover or focus.
 */
export interface TooltipProps {
  /**
   * Content to display in the tooltip.
   */
  content: ReactNode;
  /**
   * Position of the tooltip relative to the trigger.
   * @default 'top'
   */
  position?: TooltipPosition;
  /**
   * The trigger element that activates the tooltip.
   */
  children: ReactNode;
  /**
   * Additional CSS classes for the tooltip.
   */
  className?: string;
  /**
   * Offset from the trigger element in pixels.
   * @default 8
   */
  offset?: number;
  /**
   * Custom ID for the tooltip (auto-generated if not provided).
   * Used for aria-describedby accessibility.
   */
  id?: string;
}

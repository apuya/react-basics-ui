import type { HTMLAttributes, ReactNode } from 'react';
import type { CommonRatioName } from './AspectRatio.styles';

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the AspectRatio component.
 * Maintains a consistent aspect ratio for its children.
 */
export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Aspect ratio (width / height) - can be a number or a common ratio name.
   * @default 1
   */
  ratio?: number | CommonRatioName;
  /** Children to render inside the aspect ratio container */
  children?: ReactNode;
}

import type { ReactNode } from 'react';

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Portal component.
 * Renders children into a DOM node outside the parent component hierarchy.
 */
export interface PortalProps {
  /**
   * Content to render in the portal.
   */
  children: ReactNode;
  /**
   * ID of the container element to render into.
   * Creates the container if it doesn't exist.
   * @default 'portal-root'
   */
  containerId?: string;
}

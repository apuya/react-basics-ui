import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { PADDING_STYLES, SIZE_STYLES } from './Container.styles';

// =============================================================================
// Size & Variant Types
// =============================================================================

/** Available container max-width sizes */
export type ContainerSize = keyof typeof SIZE_STYLES;

/** Available container padding sizes */
export type ContainerPadding = keyof typeof PADDING_STYLES;

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Container component.
 * A responsive container that centers content and constrains width.
 */
export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Maximum width of the container.
   * @default 'xl'
   */
  size?: ContainerSize;
  /**
   * Horizontal padding of the container.
   * @default 'md'
   */
  padding?: ContainerPadding;
  /**
   * Whether to center the container.
   * @default true
   */
  centered?: boolean;
  /** Children elements */
  children?: ReactNode;
}

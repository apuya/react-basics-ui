import type { IconType } from 'react-icons';

// =============================================================================
// Size & Color Types
// =============================================================================

/** Available icon sizes */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Available icon color variants */
export type IconColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'disabled'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'inherit';

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Icon component.
 * Wraps react-icons with consistent sizing, colors, and accessibility.
 */
export interface IconProps {
  /**
   * The icon component from react-icons to render.
   */
  icon: IconType;
  /**
   * Size of the icon.
   * @default 'md'
   */
  size?: IconSize;
  /**
   * Color variant of the icon.
   * @default 'inherit'
   */
  color?: IconColor;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Accessible label for the icon. When provided, icon is treated as meaningful.
   * When omitted, icon is decorative and hidden from assistive technology.
   */
  'aria-label'?: string;
  /**
   * Whether the icon is hidden from assistive technology.
   * Defaults to true when no aria-label is provided.
   */
  'aria-hidden'?: boolean;
}

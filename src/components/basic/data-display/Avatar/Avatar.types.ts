import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { IconType } from 'react-icons';

// =============================================================================
// Shape & Size Types
// =============================================================================

/** Available avatar shapes */
export type AvatarShape = 'circular' | 'square';

/** Available avatar sizes */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// =============================================================================
// Context Types
// =============================================================================

/** Context value shared between Avatar and its sub-components */
export interface AvatarContextValue {
  /** Current size of the avatar */
  size: AvatarSize;
  /** Current shape of the avatar */
  shape: AvatarShape;
}

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Avatar component.
 */
export interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Size of the avatar.
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * Shape of the avatar.
   * @default 'circular'
   */
  shape?: AvatarShape;
  /**
   * Avatar content (Image, Fallback, or both).
   */
  children?: ReactNode;
}

/**
 * Props for the Avatar.Image sub-component.
 */
export interface AvatarImageProps extends Omit<ComponentPropsWithoutRef<'img'>, 'onError'> {
  /**
   * Image source URL.
   */
  src: string;
  /**
   * Alternative text for accessibility.
   */
  alt: string;
  /**
   * Callback when image fails to load.
   */
  onLoadError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

/**
 * Props for the Avatar.Fallback sub-component.
 */
export interface AvatarFallbackProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Custom icon to display (defaults to BiUser).
   */
  icon?: IconType;
  /**
   * Content to display (initials or custom content).
   */
  children?: ReactNode;
  /**
   * @deprecated Size is now inherited from Avatar context. This prop will be removed in a future version.
   */
  size?: AvatarSize;
}

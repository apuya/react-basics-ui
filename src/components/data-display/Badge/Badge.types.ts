import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// =============================================================================
// Size & Variant Types
// =============================================================================

/** Available badge sizes */
export type BadgeSize = 'small' | 'default' | 'large';

/** Available badge colors */
export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'blue'
  | 'cyan'
  | 'emerald'
  | 'fuchsia'
  | 'gold'
  | 'green'
  | 'indigo'
  | 'lime'
  | 'navy'
  | 'amber'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'rose'
  | 'sand'
  | 'sky'
  | 'slate'
  | 'teal'
  | 'violet'
  | 'yellow'
  | 'zinc';

/** Available badge style variants */
export type BadgeStyleVariant = 'subtle' | 'solid' | 'outline' | 'subtle-outline';

// =============================================================================
// Legacy Type Aliases (backwards compatibility)
// =============================================================================

/** @deprecated Use `BadgeColor` instead */
export type BadgeVariant = BadgeColor;

// =============================================================================
// Props
// =============================================================================

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  /** Badge color theme */
  color?: BadgeColor;
  /** @deprecated Use `color` instead */
  variant?: BadgeColor;
  /** Style variant (subtle, solid, outline, subtle-outline) */
  styleVariant?: BadgeStyleVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Visual element displayed before content (icon, avatar, etc.) */
  leadingVisual?: ReactNode;
  /** @deprecated Use `leadingVisual` instead */
  leadingIcon?: ReactNode;
  /** Visual element displayed after content (icon, etc.) */
  trailingVisual?: ReactNode;
  /** @deprecated Use `trailingVisual` instead */
  trailingIcon?: ReactNode;
  /** Whether badge can be dismissed */
  dismissible?: boolean;
  /** Callback when badge is dismissed */
  onDismiss?: () => void;
  /** Whether badge is disabled */
  disabled?: boolean;
}

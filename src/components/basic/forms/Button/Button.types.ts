import type { ReactNode } from 'react';

// ============================================================================
// Shared Types - Reusable across all button variants
// ============================================================================

/** Size options for button components */
export type ButtonSize = 'small' | 'default' | 'large';

/** Style variant options for button components */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'destructive'
  | 'tabs'
  | 'nav';

// ============================================================================
// Base Props - Shared across all button variants
// ============================================================================

/**
 * Base props shared by all button components.
 * These are the core behavioral props that ButtonBase handles.
 */
export interface ButtonBaseProps {
  /** The visual style variant of the button */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Screen reader announcement for loading state */
  loadingAnnouncement?: string;
  /** Whether the button should take full width */
  block?: boolean;
  /** Additional CSS class names */
  className?: string;
}

// ============================================================================
// Component-Specific Props
// ============================================================================

/**
 * Props for the standard Button component.
 * Extends base props with icon and content support.
 */
export interface ButtonProps extends ButtonBaseProps {
  /** Icon or visual element to display before the content */
  leadingVisual?: ReactNode;
  /** Icon or visual element to display after the content */
  trailingVisual?: ReactNode;
  /** Button content */
  children?: ReactNode;
}

/**
 * Props for the IconButton component.
 * Enforces accessibility by requiring either aria-label or aria-labelledby.
 */
export type IconButtonProps = ButtonBaseProps & {
  /** The icon to display */
  icon: ReactNode;
  /** The shape of the button */
  shape?: 'square' | 'circle';
} & (
    | { 'aria-label': string; 'aria-labelledby'?: never }
    | { 'aria-label'?: never; 'aria-labelledby': string }
  );

import type { HTMLAttributes, ReactNode } from 'react';
import type {
  ALIGN_STYLES,
  DIRECTION_STYLES,
  JUSTIFY_STYLES,
  SPACING_STYLES,
  WRAP_STYLES,
} from './Stack.styles';

// =============================================================================
// Variant Types
// =============================================================================

/** Stack direction options */
export type StackDirection = keyof typeof DIRECTION_STYLES;

/** Preset spacing sizes */
export type StackSpacing = keyof typeof SPACING_STYLES;

/** Stack align-items options */
export type StackAlign = keyof typeof ALIGN_STYLES;

/** Stack justify-content options */
export type StackJustify = keyof typeof JUSTIFY_STYLES;

/** Stack wrap options */
export type StackWrap = keyof typeof WRAP_STYLES;

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Stack component.
 * A flexbox container for stacking elements with consistent spacing.
 */
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the stack.
   * @default 'vertical'
   */
  direction?: StackDirection;
  /** Spacing between items - can be a preset size or custom value */
  spacing?: StackSpacing | number | string;
  /** Align items along the cross axis */
  align?: StackAlign;
  /** Justify content along the main axis */
  justify?: StackJustify;
  /** Wrap behavior */
  wrap?: StackWrap;
  /**
   * Display as inline-flex instead of flex.
   * @default false
   */
  inline?: boolean;
  /** Divider element to place between items */
  divider?: ReactNode;
  /** Children elements */
  children?: ReactNode;
}

// =============================================================================
// Variant Component Props
// =============================================================================

/**
 * Props for HStack (horizontal stack).
 * Shorthand for Stack with direction="horizontal".
 */
export interface HStackProps extends Omit<StackProps, 'direction'> {}

/**
 * Props for VStack (vertical stack).
 * Shorthand for Stack with direction="vertical".
 */
export interface VStackProps extends Omit<StackProps, 'direction'> {}

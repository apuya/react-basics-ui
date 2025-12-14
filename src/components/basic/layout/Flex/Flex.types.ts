import type { HTMLAttributes, ReactNode } from 'react';
import type {
  ALIGN_STYLES,
  DIRECTION_STYLES,
  GAP_STYLES,
  JUSTIFY_STYLES,
  WRAP_STYLES,
} from './Flex.styles';

// =============================================================================
// Variant Types
// =============================================================================

/** Flex direction options */
export type FlexDirection = keyof typeof DIRECTION_STYLES;

/** Flex align-items options */
export type FlexAlign = keyof typeof ALIGN_STYLES;

/** Flex justify-content options */
export type FlexJustify = keyof typeof JUSTIFY_STYLES;

/** Flex wrap options */
export type FlexWrap = keyof typeof WRAP_STYLES;

/** Preset gap sizes */
export type FlexGap = keyof typeof GAP_STYLES;

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Flex component.
 * A flexbox container with preset alignment and spacing options.
 */
export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Flex direction.
   * @default 'row'
   */
  direction?: FlexDirection;
  /** Align items along the cross axis */
  align?: FlexAlign;
  /** Justify content along the main axis */
  justify?: FlexJustify;
  /** Flex wrap behavior */
  wrap?: FlexWrap;
  /** Gap between items - can be a preset size or custom value */
  gap?: FlexGap | number | string;
  /**
   * Display as inline-flex instead of flex.
   * @default false
   */
  inline?: boolean;
  /** Children elements */
  children?: ReactNode;
}

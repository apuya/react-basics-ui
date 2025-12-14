import type { HTMLAttributes, ReactNode } from 'react';
import type {
  ALIGN_STYLES,
  COLS_STYLES,
  FLOW_STYLES,
  GAP_STYLES,
  GAP_X_STYLES,
  GAP_Y_STYLES,
  JUSTIFY_STYLES,
  ROWS_STYLES,
} from './Grid.styles';

// =============================================================================
// Variant Types
// =============================================================================

/** Number of grid columns */
export type GridCols = keyof typeof COLS_STYLES;

/** Number of grid rows */
export type GridRows = keyof typeof ROWS_STYLES;

/** Preset gap sizes */
export type GridGap = keyof typeof GAP_STYLES;

/** Grid align-items options */
export type GridAlign = keyof typeof ALIGN_STYLES;

/** Grid justify-items options */
export type GridJustify = keyof typeof JUSTIFY_STYLES;

/** Grid auto-flow options */
export type GridFlow = keyof typeof FLOW_STYLES;

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Grid component.
 * A CSS Grid container with preset column, row, and gap options.
 */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  cols?: GridCols;
  /** Number of rows */
  rows?: GridRows;
  /** Gap between items (both horizontal and vertical) */
  gap?: GridGap | number | string;
  /** Horizontal gap between items */
  gapX?: keyof typeof GAP_X_STYLES | number | string;
  /** Vertical gap between items */
  gapY?: keyof typeof GAP_Y_STYLES | number | string;
  /** Align items */
  align?: GridAlign;
  /** Justify items */
  justify?: GridJustify;
  /** Grid auto flow */
  flow?: GridFlow;
  /**
   * Display as inline-grid instead of grid.
   * @default false
   */
  inline?: boolean;
  /** Children elements */
  children?: ReactNode;
}

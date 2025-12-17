/**
 * @file Card.types.ts
 * @description Type definitions for the Card component family.
 *
 * Exports:
 * - Variant types (CardVariant)
 * - Props interfaces for all sub-components
 */

import type { ComponentPropsWithoutRef } from 'react';

// ============================================================================
// Shared Types - Reusable across Card components
// ============================================================================

/** Visual style variant for the card */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive';

// ============================================================================
// Component Props
// ============================================================================

/** Props for the root Card component */
export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  /** Visual variant of the card. @default 'default' */
  variant?: CardVariant;
}

/** Props for the CardHeader component */
export interface CardHeaderProps extends ComponentPropsWithoutRef<'div'> {}

/** Props for the CardContent component */
export interface CardContentProps extends ComponentPropsWithoutRef<'div'> {}

/** Props for the CardFooter component */
export interface CardFooterProps extends ComponentPropsWithoutRef<'div'> {}

/** Props for the CardTitle component */
export interface CardTitleProps extends ComponentPropsWithoutRef<'h3'> {
  /** Heading level to render as. @default 'h3' */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Visual styling level (independent of HTML element). Allows semantic and visual hierarchy to differ. */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/** Props for the CardDescription component */
export interface CardDescriptionProps extends ComponentPropsWithoutRef<'p'> {}

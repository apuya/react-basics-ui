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

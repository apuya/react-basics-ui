/**
 * @file BaseCardContainer.types.ts
 * @description Type definitions for the BaseCardContainer component.
 * 
 * BaseCardContainer is a foundational component for building card-like containers
 * such as Card, Modal panels, Popover content, Drawer panels, etc.
 */

import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

// ============================================================================
// Shared Types
// ============================================================================

/** Visual style variant for card containers */
export type BaseCardVariant = 'default' | 'elevated' | 'outlined';

/** Semantic color variant for card containers */
export type BaseCardColorVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info';

// ============================================================================
// Component Props
// ============================================================================

/**
 * Props for the BaseCardContainer component.
 * 
 * Provides a flexible container with consistent structure that can be
 * customized through style and class props for different use cases.
 */
export interface BaseCardContainerProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /** 
   * Visual variant of the container
   * @default 'default'
   */
  variant?: BaseCardVariant;

  /**
   * Semantic color variant
   * @default 'neutral'
   */
  colorVariant?: BaseCardColorVariant;

  /**
   * Base CSS classes for container structure (flex, rounded, etc.)
   * Consumer provides these to customize appearance.
   */
  baseClasses?: string;

  /**
   * Variant-specific CSS classes (shadows, borders, etc.)
   * Mapped by variant name.
   */
  variantClasses?: Record<string, string>;

  /**
   * Color variant CSS classes (background, text colors)
   * Mapped by color variant name.
   */
  colorClasses?: Record<string, string>;

  /**
   * Container inline styles (padding, gap, etc.)
   * Uses CSS custom properties for theming.
   */
  containerStyles?: CSSProperties;

  /**
   * Whether the container should have interactive styles (cursor, hover)
   * @default false
   */
  interactive?: boolean;

  /**
   * CSS classes for interactive state
   */
  interactiveClasses?: string;

  /**
   * Data attributes to pass to the container
   */
  dataAttributes?: Record<string, string | undefined>;
}

/**
 * Props for BaseCardHeader sub-component
 */
export interface BaseCardHeaderProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Base CSS classes for header
   */
  baseClasses?: string;

  /**
   * Header padding styles
   */
  paddingStyles?: CSSProperties;
}

/**
 * Props for BaseCardContent sub-component
 */
export interface BaseCardContentProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Base CSS classes for content
   */
  baseClasses?: string;

  /**
   * Content padding styles
   */
  paddingStyles?: CSSProperties;
}

/**
 * Props for BaseCardFooter sub-component
 */
export interface BaseCardFooterProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Base CSS classes for footer
   */
  baseClasses?: string;

  /**
   * Footer padding styles
   */
  paddingStyles?: CSSProperties;
}

/**
 * Props for BaseCardTitle sub-component
 */
export interface BaseCardTitleProps extends ComponentPropsWithoutRef<'h2'> {
  /**
   * Element to render as (h1, h2, h3, etc.)
   * @default 'h2'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /**
   * Base CSS classes for title
   */
  baseClasses?: string;

  /**
   * Title text styles (font-size, weight, etc.)
   */
  textStyles?: CSSProperties;
}

/**
 * Props for BaseCardDescription sub-component
 */
export interface BaseCardDescriptionProps extends ComponentPropsWithoutRef<'p'> {
  /**
   * Base CSS classes for description
   */
  baseClasses?: string;

  /**
   * Description text styles (font-size, color, etc.)
   */
  textStyles?: CSSProperties;
}

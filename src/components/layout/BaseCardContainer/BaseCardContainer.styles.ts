/**
 * @file BaseCardContainer.styles.ts
 * @description Default styles for the BaseCardContainer component.
 * 
 * These are sensible defaults that can be overridden by consuming components.
 * Consumers (Card, Modal, Popover) pass their own token-based styles.
 */

import type { BaseCardVariant, BaseCardColorVariant } from './BaseCardContainer.types';
import type { CSSProperties } from 'react';

// ============================================================================
// BASE CLASSES
// ============================================================================

/**
 * Default base classes for card container structure - includes outer border
 */
export const DEFAULT_BASE_CLASSES = 'flex flex-col';

/**
 * Default container styles (gap between sections, outer border)
 */
export const DEFAULT_CONTAINER_STYLES: CSSProperties = {
  gap: 'var(--component-base-card-gap, 0)',
  border: '1px solid var(--component-base-card-border, var(--semantic-border-subtle))',
  borderRadius: 'var(--component-base-card-radius, 0.5rem)',
};

/**
 * Default header classes
 */
export const DEFAULT_HEADER_CLASSES = 'flex flex-col shrink-0';

/**
 * Default header padding styles
 */
export const DEFAULT_HEADER_PADDING: CSSProperties = {
  paddingInline: 'var(--component-base-card-padding-inline, 1rem)',
  paddingBlock: 'var(--component-base-card-padding-block, 0.75rem)',
  gap: 'var(--component-base-card-gap-compact, 0.5rem)',
};

/**
 * Default content classes
 */
export const DEFAULT_CONTENT_CLASSES = 'flex flex-col flex-1';

/**
 * Default content padding styles
 */
export const DEFAULT_CONTENT_PADDING: CSSProperties = {
  paddingInline: 'var(--component-base-card-padding-inline, 1rem)',
  paddingBlock: 'var(--component-base-card-padding-block, 1rem)',
  gap: 'var(--component-base-card-gap-compact, 0.5rem)',
};

/**
 * Default footer classes
 */
export const DEFAULT_FOOTER_CLASSES = 'flex items-center shrink-0';

/**
 * Default footer padding styles
 */
export const DEFAULT_FOOTER_PADDING: CSSProperties = {
  paddingInline: 'var(--component-base-card-padding-inline, 1rem)',
  paddingBlock: 'var(--component-base-card-padding-block, 0.75rem)',
  gap: 'var(--component-base-card-gap-compact, 0.5rem)',
};

/**
 * Default title classes
 */
export const DEFAULT_TITLE_CLASSES = '';

/**
 * Default description classes
 */
export const DEFAULT_DESCRIPTION_CLASSES = '';

// ============================================================================
// VARIANT CLASSES
// ============================================================================

/**
 * Default variant classes (can be overridden by consumer)
 */
export const DEFAULT_VARIANT_CLASSES: Record<BaseCardVariant, string> = {
  default: '',
  elevated: '',
  outlined: '',
};

// ============================================================================
// COLOR VARIANT CLASSES
// ============================================================================

/**
 * Default color variant classes (can be overridden by consumer)
 */
export const DEFAULT_COLOR_CLASSES: Record<BaseCardColorVariant, string> = {
  neutral: '',
  primary: '',
  success: '',
  warning: '',
  error: '',
  info: '',
};

// ============================================================================
// INTERACTIVE CLASSES
// ============================================================================

/**
 * Default interactive classes for hover/focus states
 */
export const DEFAULT_INTERACTIVE_CLASSES = 'cursor-pointer transition-shadow';

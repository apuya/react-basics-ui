import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// =============================================================================
// VARIANT TYPES
// =============================================================================

export type TextListVariant = 'default' | 'divided' | 'bordered' | 'interactive';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface TextListProps extends ComponentPropsWithoutRef<'ul'> {
  /** Visual variant of the list */
  variant?: TextListVariant;
  /** Render as ordered list (ol) instead of unordered (ul) */
  ordered?: boolean;
  /** TextList items */
  children?: ReactNode;
}

export interface TextListItemProps extends ComponentPropsWithoutRef<'li'> {
  /** Item content */
  children: ReactNode;
}

// =============================================================================
// CONTEXT TYPES
// =============================================================================

export interface TextListContextValue {
  /** Current variant from parent TextList */
  variant: TextListVariant;
}

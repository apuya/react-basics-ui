import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// =============================================================================
// VARIANT TYPES
// =============================================================================

export type ListVariant = 'default' | 'divided' | 'bordered' | 'interactive';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface ListProps extends ComponentPropsWithoutRef<'ul'> {
  /** Visual variant of the list */
  variant?: ListVariant;
  /** Render as ordered list (ol) instead of unordered (ul) */
  ordered?: boolean;
  /** List items */
  children?: ReactNode;
}

export interface ListItemProps extends ComponentPropsWithoutRef<'li'> {
  /** Item content */
  children: ReactNode;
}

// =============================================================================
// CONTEXT TYPES
// =============================================================================

export interface ListContextValue {
  /** Current variant from parent List */
  variant: ListVariant;
}

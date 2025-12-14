/**
 * @file Accordion.types.ts
 * @description Type definitions for the Accordion component family.
 *
 * Exports:
 * - Variant types (AccordionType, AccordionVariant)
 * - Props interfaces for all sub-components
 * - Context value types
 */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { TextSize, TextWeight } from '@/components/typography/Text';

// ============================================================================
// Shared Types - Reusable across Accordion components
// ============================================================================

/** Expansion mode for the accordion - single or multiple items */
export type AccordionType = 'single' | 'multiple';

/** Visual style variant for the accordion */
export type AccordionVariant = 'default' | 'bordered' | 'separated';

// ============================================================================
// Context Value Types
// ============================================================================

/** Context value for root Accordion component */
export interface AccordionContextValue {
  type: AccordionType;
  activeItems: string[];
  toggleItem: (value: string) => void;
  variant: AccordionVariant;
  disabledItems: Map<string, boolean>;
  registerTrigger: (itemValue: string, element: HTMLElement | null) => void;
  unregisterTrigger: (itemValue: string) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

/** Context value for individual AccordionItem component */
export interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  disabled: boolean;
}

// ============================================================================
// Component Props
// ============================================================================

/** Props for the root Accordion component */
export interface AccordionProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Type of accordion - 'single' allows one item open, 'multiple' allows multiple items */
  type?: AccordionType;
  /** Default active value(s) when uncontrolled */
  defaultValue?: string | string[];
  /** Controlled active value(s) */
  value?: string | string[];
  /** Callback when value changes (standardized to onChange) */
  onChange?: (value: string | string[]) => void;
  /** @deprecated Use onChange instead. Will be removed in v2.0 */
  onValueChange?: (value: string | string[]) => void;
  /** Visual variant of the accordion */
  variant?: AccordionVariant;
  /** Whether items can be collapsed in single mode */
  collapsible?: boolean;
  /** Size variant - currently only 'md' is supported */
  size?: 'md';
}

/** Props for the AccordionItem component */
export interface AccordionItemProps extends ComponentPropsWithoutRef<'div'> {
  /** Unique value identifying this accordion item */
  value: string;
  children: ReactNode;
  /** Whether this item is disabled */
  disabled?: boolean;
}

/** Props for the AccordionTrigger component */
export interface AccordionTriggerProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  icon?: ReactNode;
  /** Text size for the trigger label. @default 'body' */
  textSize?: TextSize;
  /** Text weight for the trigger label. @default 'medium' */
  textWeight?: TextWeight;
}

/** Props for the AccordionContent component */
export interface AccordionContentProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

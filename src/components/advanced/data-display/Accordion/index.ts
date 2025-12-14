/**
 * @file index.ts
 * @description Public API exports for the Accordion component family.
 *
 * Exports:
 * - Accordion: Compound component with Item, Trigger, Content
 * - useAccordionContext: Hook to access root-level accordion state
 * - useAccordionItemContext: Hook to access item-level state
 * - Type definitions for all props interfaces
 */

export { Accordion, useAccordionContext } from './Accordion';
export { useAccordionItemContext } from './AccordionItem';

// Types - all exported from centralized types file
export type {
  AccordionType,
  AccordionVariant,
  AccordionProps,
  AccordionContextValue,
  AccordionItemProps,
  AccordionItemContextValue,
  AccordionTriggerProps,
  AccordionContentProps,
} from './Accordion.types';

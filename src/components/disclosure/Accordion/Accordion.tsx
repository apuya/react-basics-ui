/**
 * @file Accordion.tsx
 * @description Root Accordion component providing collapsible content panel functionality.
 *
 * Implements the compound component pattern via Object.assign, exposing:
 * - Accordion.Item - Container for each accordion section
 * - Accordion.Trigger - Clickable button to expand/collapse
 * - Accordion.Content - Collapsible content region
 *
 * Uses a two-level context system:
 * - AccordionContext: Root-level state (active items, variant, keyboard nav)
 * - AccordionItemContext: Item-level state (value, isOpen, disabled)
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger>Section 1</Accordion.Trigger>
 *     <Accordion.Content>
 *       <p>Content for section 1</p>
 *     </Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 */

import { useMemo } from 'react';
import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import { useDisclosureState } from '@/hooks/useDisclosureState';
import { useDisclosureKeyboardNav } from '@/hooks/useDisclosureKeyboardNav';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';
import type { AccordionProps, AccordionContextValue } from './Accordion.types';

const { Context: AccordionContext, useContext: useAccordionContext } =
  createComponentContext<AccordionContextValue>('Accordion');

export { useAccordionContext };

/**
 * Accordion component for organizing collapsible content panels.
 * 
 * A fully accessible accordion implementation following WAI-ARIA authoring practices.
 * Supports both controlled and uncontrolled modes, single/multiple expansion,
 * keyboard navigation (Arrow Up/Down, Home, End), and three visual variants.
 * 
 * Features:
 * - Single or multiple item expansion
 * - Controlled and uncontrolled modes
 * - Full keyboard navigation support
 * - Three visual variants (default, bordered, separated)
 * - Disabled state support for individual items
 * - Smooth CSS Grid-based animations
 */
const AccordionRoot = ({
  type = 'single',
  defaultValue,
  value,
  onChange,
  onValueChange,
  variant = 'default',
  collapsible = false,
  size = 'md',
  className,
  children,
  ...props
}: AccordionProps) => {
  // Support both onChange and deprecated onValueChange
  const handleChange = onChange || onValueChange;

  // Use shared disclosure state management
  const { activeItems, toggle } = useDisclosureState({
    mode: type,
    defaultValue,
    value,
    onChange: handleChange,
    collapsible,
  });

  // Track disabled items
  const disabledItems = useMemo(() => new Map<string, boolean>(), []);

  // Set up keyboard navigation
  const { handleKeyDown, registerTrigger, unregisterTrigger } = useDisclosureKeyboardNav({
    items: activeItems,
    activeItem: activeItems[0] || null,
    setActiveItem: toggle,
    orientation: 'vertical',
    loop: true,
    disabledItems,
  });

  const contextValue = useMemo(
    () => ({
      type,
      activeItems,
      toggleItem: toggle,
      variant,
      disabledItems,
      registerTrigger,
      unregisterTrigger,
      handleKeyDown,
    }),
    [type, activeItems, toggle, variant, disabledItems, registerTrigger, unregisterTrigger, handleKeyDown]
  );

  const accordionClasses = useMemo(
    () =>
      cn(
        'w-full',
        variant === 'bordered' && 'border border-[color:var(--component-accordion-border)] rounded-[length:var(--component-accordion-radius)]',
        className
      ),
    [variant, className]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        className={accordionClasses}
        data-type={type}
        data-variant={variant}
        data-collapsible={collapsible || undefined}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

AccordionRoot.displayName = 'Accordion';

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

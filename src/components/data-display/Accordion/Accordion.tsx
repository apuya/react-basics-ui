import {
  useMemo,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import { useDisclosureState } from '@/hooks/useDisclosureState';
import { useDisclosureKeyboardNav } from '@/hooks/useDisclosureKeyboardNav';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';
import { AccordionTitle } from './AccordionTitle';
import { AccordionDescription } from './AccordionDescription';

export type AccordionType = 'single' | 'multiple';
export type AccordionVariant = 'default' | 'bordered' | 'separated';

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

interface AccordionContextValue {
  type: AccordionType;
  activeItems: string[];
  toggleItem: (value: string) => void;
  variant: AccordionVariant;
  disabledItems: Map<string, boolean>;
  registerTrigger: (itemValue: string, element: HTMLElement | null) => void;
  unregisterTrigger: (itemValue: string) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

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
  Title: AccordionTitle,
  Description: AccordionDescription,
});

/**
 * @file AccordionItem.tsx
 * @description Individual accordion item container providing item-level context.
 *
 * Wraps each accordion section and provides AccordionItemContext to child
 * Trigger and Content components. Handles disabled state registration with
 * the parent Accordion for keyboard navigation.
 *
 * @example
 * ```tsx
 * <Accordion.Item value="unique-id" disabled={false}>
 *   <Accordion.Trigger>Click to expand</Accordion.Trigger>
 *   <Accordion.Content>Hidden content</Accordion.Content>
 * </Accordion.Item>
 * ```
 */

import {
  useMemo,
  useEffect,
  useRef,
  forwardRef,
  memo,
} from 'react';
import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { createComponentContext } from '@/lib/createComponentContext';
import { useAccordionContext } from './Accordion';
import { ACCORDION_ITEM_BASE_CLASSES, ACCORDION_ITEM_VARIANT_STYLES } from './Accordion.styles';
import type { AccordionItemProps, AccordionItemContextValue } from './Accordion.types';

const { Context: AccordionItemContext, useContext: useAccordionItemContext } =
  createComponentContext<AccordionItemContextValue>('AccordionItem');

export { useAccordionItemContext };

export const AccordionItem = memo(
  forwardRef<HTMLDivElement, AccordionItemProps>(({ value, children, className, style, disabled = false, ...props }, forwardedRef) => {
    const { activeItems, variant, disabledItems } = useAccordionContext();
    const isOpen = activeItems.includes(value);
    const itemRef = useRef<HTMLDivElement>(null!);
    const mergedRef = useMergedRefs(forwardedRef, itemRef);

    // Register/unregister disabled state with parent
    useEffect(() => {
      disabledItems.set(value, disabled);
      return () => {
        disabledItems.delete(value);
      };
    }, [value, disabled, disabledItems]);

    const contextValue = useMemo(
      () => ({
        value,
        isOpen,
        disabled,
      }),
      [value, isOpen, disabled]
    );

    const itemClasses = useMemo(
      () => cn(
        ACCORDION_ITEM_BASE_CLASSES,
        ACCORDION_ITEM_VARIANT_STYLES[variant as keyof typeof ACCORDION_ITEM_VARIANT_STYLES],
        disabled && 'opacity-50 pointer-events-none',
        className
      ),
      [variant, disabled, className]
    );

    // Apply inline spacing for separated variant to ensure JIT compilation
    const inlineStyle = useMemo(
      () => ({
        ...style,
        ...(variant === 'separated' && {
          marginBottom: 'var(--component-accordion-gap)',
        }),
      }),
      [style, variant]
    );

    return (
      <AccordionItemContext.Provider value={contextValue}>
        <div
          ref={mergedRef}
          className={itemClasses}
          style={inlineStyle}
          data-value={value}
          data-open={isOpen || undefined}
          data-disabled={disabled || undefined}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  })
);

AccordionItem.displayName = 'Accordion.Item';

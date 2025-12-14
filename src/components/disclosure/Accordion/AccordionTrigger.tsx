/**
 * @file AccordionTrigger.tsx
 * @description Clickable trigger button for expanding/collapsing accordion items.
 *
 * Renders as a semantic button element with full accessibility support including
 * aria-expanded, aria-controls, and keyboard navigation. Registers with parent
 * Accordion for Arrow key navigation between triggers.
 *
 * Features:
 * - Customizable text size and weight via Text component
 * - Custom icon support (defaults to chevron)
 * - Animated icon rotation on open state
 * - Full keyboard navigation support
 *
 * @example
 * ```tsx
 * <Accordion.Trigger textSize="body" textWeight="semibold">
 *   Section Title
 * </Accordion.Trigger>
 * ```
 */

import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { cn } from '@/lib/cn';
import { Text } from '@/components/typography/Text';
import { BiChevronDown } from 'react-icons/bi';
import { useAccordionContext } from './Accordion';
import { useAccordionItemContext } from './AccordionItem';
import {
  ACCORDION_TRIGGER_BASE_CLASSES,
  ACCORDION_TRIGGER_VARIANT_STYLES,
  ACCORDION_TRIGGER_PADDING_STYLE,
  ACCORDION_ICON_BASE_CLASSES,
  ACCORDION_ICON_OPEN_CLASS,
} from './Accordion.styles';
import type { AccordionTriggerProps } from './Accordion.types';

export const AccordionTrigger = memo(
  forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, icon, textSize = 'body', textWeight = 'medium', className, ...props }, ref) => {
      const { toggleItem, variant, registerTrigger, unregisterTrigger, handleKeyDown } = useAccordionContext();
      const { value, isOpen, disabled } = useAccordionItemContext();

      const handleClick = useCallback(() => {
        if (!disabled) {
          toggleItem(value);
        }
      }, [toggleItem, value, disabled]);

      // Register trigger for keyboard navigation
      const triggerRef = useCallback(
        (element: HTMLButtonElement | null) => {
          registerTrigger(value, element);
          if (typeof ref === 'function') {
            ref(element);
          } else if (ref) {
            ref.current = element;
          }
        },
        [value, registerTrigger, ref]
      );

      // Cleanup on unmount
      useEffect(() => {
        return () => {
          unregisterTrigger(value);
        };
      }, [value, unregisterTrigger]);

      const triggerClasses = useMemo(
        () => cn(ACCORDION_TRIGGER_BASE_CLASSES, ACCORDION_TRIGGER_VARIANT_STYLES[variant], className),
        [variant, className]
      );

      const iconClasses = useMemo(
        () => cn(ACCORDION_ICON_BASE_CLASSES, isOpen && ACCORDION_ICON_OPEN_CLASS),
        [isOpen]
      );

      return (
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${value}`}
          id={`accordion-trigger-${value}`}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={triggerClasses}
          style={ACCORDION_TRIGGER_PADDING_STYLE}
          data-open={isOpen || undefined}
          data-disabled={disabled || undefined}
          {...props}
        >
          <Text as="span" size={textSize} weight={textWeight} className="flex-1">
            {children}
          </Text>
          <span className={iconClasses}>{icon || <BiChevronDown />}</span>
        </button>
      );
    }
  )
);

AccordionTrigger.displayName = 'Accordion.Trigger';

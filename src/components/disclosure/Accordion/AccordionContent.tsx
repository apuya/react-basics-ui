/**
 * @file AccordionContent.tsx
 * @description Collapsible content region for accordion items.
 *
 * Uses CSS Grid animation (grid-rows: 0fr/1fr) for smooth height transitions.
 * Implements WAI-ARIA region role with proper labelling from the trigger.
 *
 * The three-div structure enables smooth animation:
 * 1. Outer div: CSS Grid container with row transition
 * 2. Middle div: overflow-hidden wrapper
 * 3. Inner div: padding container for content
 *
 * @example
 * ```tsx
 * <Accordion.Content>
 *   <p>Your content here...</p>
 * </Accordion.Content>
 * ```
 */

import {
  forwardRef,
  memo,
  useMemo,
  useRef,
} from 'react';
import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useAccordionItemContext } from './AccordionItem';
import {
  ACCORDION_CONTENT_BASE_CLASSES,
  ACCORDION_CONTENT_INNER_CLASSES,
  ACCORDION_CONTENT_PADDING_STYLE,
} from './Accordion.styles';
import type { AccordionContentProps } from './Accordion.types';

export const AccordionContent = memo(
  forwardRef<HTMLDivElement, AccordionContentProps>(({ children, className, ...props }, forwardedRef) => {
    const { value, isOpen } = useAccordionItemContext();
    const contentRef = useRef<HTMLDivElement>(null!);
    const mergedRef = useMergedRefs(forwardedRef, contentRef);

    const contentClasses = useMemo(
      () => cn('grid', ACCORDION_CONTENT_BASE_CLASSES, className),
      [className]
    );

    return (
      <div
        ref={mergedRef}
        id={`accordion-content-${value}`}
        role="region"
        aria-labelledby={`accordion-trigger-${value}`}
        data-state={isOpen ? 'open' : 'closed'}
        data-open={isOpen || undefined}
        className={contentClasses}
        {...props}
      >
        <div className={ACCORDION_CONTENT_INNER_CLASSES}>
          <div style={ACCORDION_CONTENT_PADDING_STYLE}>{children}</div>
        </div>
      </div>
    );
  })
);

AccordionContent.displayName = 'Accordion.Content';

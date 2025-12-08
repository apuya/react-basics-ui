import {
  forwardRef,
  memo,
  useMemo,
  useRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useAccordionItemContext } from './AccordionItem';
import {
  ACCORDION_CONTENT_BASE_CLASSES,
  ACCORDION_CONTENT_INNER_CLASSES,
} from './Accordion.styles';

export interface AccordionContentProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export const AccordionContent = memo(
  forwardRef<HTMLDivElement, AccordionContentProps>(({ children, className, ...props }, forwardedRef) => {
    const { value, isOpen } = useAccordionItemContext();
    const contentRef = useRef<HTMLDivElement>(null!);
    const mergedRef = useMergedRefs(forwardedRef, contentRef);

    const contentClasses = useMemo(
      () => cn('grid', ACCORDION_CONTENT_BASE_CLASSES, className),
      [className]
    );

    const contentStyle = useMemo(
      () => ({
        paddingBottom: 'var(--component-accordion-content-padding-block)',
        paddingTop: '0',
        paddingInline: 'var(--component-accordion-content-padding-inline)',
      }),
      []
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
          <div style={contentStyle}>{children}</div>
        </div>
      </div>
    );
  })
);

AccordionContent.displayName = 'Accordion.Content';

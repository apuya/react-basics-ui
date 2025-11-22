import {
  forwardRef,
  memo,
  useMemo,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { useAccordionItemContext } from './AccordionItem';
import {
  ACCORDION_CONTENT_BASE_CLASSES,
  ACCORDION_CONTENT_INNER_CLASSES,
  ACCORDION_CONTENT_PADDING_CLASSES,
} from './Accordion.styles';

export interface AccordionContentProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export const AccordionContent = memo(
  forwardRef<HTMLDivElement, AccordionContentProps>(({ children, className, ...props }, ref) => {
    const { value, isOpen } = useAccordionItemContext();

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
        ref={ref}
        id={`accordion-content-${value}`}
        role="region"
        aria-labelledby={`accordion-trigger-${value}`}
        data-state={isOpen ? 'open' : 'closed'}
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

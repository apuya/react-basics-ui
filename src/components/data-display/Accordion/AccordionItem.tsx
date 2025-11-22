import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
  type ComponentPropsWithoutRef,
  forwardRef,
  memo,
} from 'react';
import { cn } from '@/lib/cn';
import { useAccordionContext } from './Accordion';
import { ACCORDION_ITEM_BASE_CLASSES, ACCORDION_ITEM_VARIANT_STYLES } from './Accordion.styles';

export interface AccordionItemProps extends ComponentPropsWithoutRef<'div'> {
  value: string;
  children: ReactNode;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | undefined>(undefined);

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionTrigger and AccordionContent must be used within AccordionItem');
  }
  return context;
};

export const AccordionItem = memo(
  forwardRef<HTMLDivElement, AccordionItemProps>(({ value, children, className, style, ...props }, ref) => {
    const { activeItems, variant } = useAccordionContext();
    const isOpen = activeItems.includes(value);

    const contextValue = useMemo(
      () => ({
        value,
        isOpen,
      }),
      [value, isOpen]
    );

    const itemClasses = useMemo(
      () => cn(ACCORDION_ITEM_BASE_CLASSES, ACCORDION_ITEM_VARIANT_STYLES[variant], className),
      [variant, className]
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
        <div ref={ref} className={itemClasses} style={inlineStyle} {...props}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  })
);

AccordionItem.displayName = 'Accordion.Item';

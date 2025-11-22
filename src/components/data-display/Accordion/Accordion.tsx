import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';

export type AccordionType = 'single' | 'multiple';
export type AccordionVariant = 'default' | 'bordered' | 'separated';

export interface AccordionProps extends ComponentPropsWithoutRef<'div'> {
  type?: AccordionType;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: AccordionVariant;
  collapsible?: boolean;
}

interface AccordionContextValue {
  type: AccordionType;
  activeItems: string[];
  toggleItem: (value: string) => void;
  variant: AccordionVariant;
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion sub-components must be used within an Accordion component');
  }
  return context;
};

const AccordionRoot = ({
  type = 'single',
  defaultValue,
  value,
  onValueChange,
  variant = 'default',
  collapsible = false,
  className,
  children,
  ...props
}: AccordionProps) => {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue === undefined) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const isControlled = value !== undefined;
  const activeItems = useMemo(() => {
    if (isControlled) {
      return Array.isArray(value) ? value : value ? [value] : [];
    }
    return internalValue;
  }, [isControlled, value, internalValue]);

  const toggleItem = useCallback(
    (itemValue: string) => {
      const newValue = (() => {
        if (type === 'single') {
          // Single mode: only one item open at a time
          if (activeItems.includes(itemValue)) {
            // Close if collapsible, otherwise keep it open
            return collapsible ? [] : [itemValue];
          }
          return [itemValue];
        } else {
          // Multiple mode: toggle the item
          if (activeItems.includes(itemValue)) {
            return activeItems.filter((v) => v !== itemValue);
          }
          return [...activeItems, itemValue];
        }
      })();

      if (!isControlled) {
        setInternalValue(newValue);
      }

      // Call onValueChange with appropriate format
      if (onValueChange) {
        onValueChange(type === 'single' ? (newValue[0] || '') : newValue);
      }
    },
    [type, activeItems, collapsible, isControlled, onValueChange]
  );

  const contextValue = useMemo(
    () => ({
      type,
      activeItems,
      toggleItem,
      variant,
    }),
    [type, activeItems, toggleItem, variant]
  );

  const accordionClasses = useMemo(
    () =>
      cn(
        'w-full',
        variant === 'bordered' && 'border border-[var(--component-accordion-border)] rounded-[var(--component-accordion-radius)]',
        className
      ),
    [variant, className]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={accordionClasses} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { Text } from '../../typography/Text/Text';
import { BiChevronDown } from 'react-icons/bi';
import { useAccordionContext } from './Accordion';
import { useAccordionItemContext } from './AccordionItem';
import {
  ACCORDION_TRIGGER_BASE_CLASSES,
  ACCORDION_TRIGGER_VARIANT_STYLES,
  ACCORDION_ICON_BASE_CLASSES,
  ACCORDION_ICON_OPEN_CLASS,
} from './Accordion.styles';

export interface AccordionTriggerProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  icon?: ReactNode;
}

export const AccordionTrigger = memo(
  forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, icon, className, ...props }, ref) => {
      const { toggleItem, variant } = useAccordionContext();
      const { value, isOpen } = useAccordionItemContext();

      const handleClick = useCallback(() => {
        toggleItem(value);
      }, [toggleItem, value]);

      const triggerClasses = useMemo(
        () => cn(ACCORDION_TRIGGER_BASE_CLASSES, ACCORDION_TRIGGER_VARIANT_STYLES[variant], className),
        [variant, className]
      );

      const iconClasses = useMemo(
        () => cn(ACCORDION_ICON_BASE_CLASSES, isOpen && ACCORDION_ICON_OPEN_CLASS),
        [isOpen]
      );

      const triggerStyle = useMemo(
        () => ({
          paddingBlock: 'var(--component-accordion-padding-block)',
          paddingInline: 'var(--component-accordion-padding-inline)',
        }),
        []
      );

      return (
        <button
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${value}`}
          id={`accordion-trigger-${value}`}
          onClick={handleClick}
          className={triggerClasses}
          style={triggerStyle}
          {...props}
        >
          <Text as="span" size="body" weight="medium" className="flex-1">
            {children}
          </Text>
          <span className={iconClasses}>{icon || <BiChevronDown />}</span>
        </button>
      );
    }
  )
);

AccordionTrigger.displayName = 'Accordion.Trigger';

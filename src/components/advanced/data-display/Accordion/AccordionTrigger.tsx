import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { Text, type TextSize, type TextWeight } from '@/components/basic/typography/Text';
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
  /** Text size for the trigger label. @default 'body' */
  textSize?: TextSize;
  /** Text weight for the trigger label. @default 'medium' */
  textWeight?: TextWeight;
}

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

      const triggerStyle = useMemo(
        () => ({
          paddingBlock: 'var(--component-accordion-padding-block)',
          paddingInline: 'var(--component-accordion-padding-inline)',
        }),
        []
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
          style={triggerStyle}
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

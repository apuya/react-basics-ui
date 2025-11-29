import { cn } from '@/lib/cn';
import { forwardRef, memo, useCallback, useEffect } from 'react';
import { useDatePickerContext } from './DatePickerContext';
import {
  CONTENT_BASE_CLASSES,
  CONTENT_BASE_STYLE,
  CONTENT_VISIBLE_CLASS,
  CONTENT_POSITION_STYLES,
  CONTENT_LAYOUT_CLASSES,
} from './DatePicker.styles';
import type { DatePickerContentProps } from './DatePicker.types';

/**
 * DatePickerContent - Popover container for the date picker
 * 
 * @example
 * ```tsx
 * <DatePicker>
 *   <DatePickerTrigger placeholder="Select date" />
 *   <DatePickerContent side="bottom" align="start">
 *     <Calendar />
 *   </DatePickerContent>
 * </DatePicker>
 * ```
 */
export const DatePickerContent = memo(
  forwardRef<HTMLDivElement, DatePickerContentProps>(function DatePickerContent(
    {
      side = 'bottom',
      align = 'start',
      className,
      children,
      ...rest
    },
    ref
  ) {
    const {
      isOpen,
      setIsOpen,
      variant,
      contentRef,
      triggerRef,
      contentId,
      triggerId,
    } = useDatePickerContext();

    // Merge refs
    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        if (contentRef) {
          (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref, contentRef]
    );

    // Handle click outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const content = contentRef?.current;
        const trigger = triggerRef?.current;

        if (
          content &&
          !content.contains(target) &&
          trigger &&
          !trigger.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, setIsOpen, contentRef, triggerRef]);

    // Handle escape key
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
          triggerRef?.current?.focus();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, setIsOpen, triggerRef]);

    const positionClasses = CONTENT_POSITION_STYLES[side][align];
    const layoutClasses = CONTENT_LAYOUT_CLASSES[variant];

    return (
      <div
        ref={setRef}
        id={contentId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={triggerId}
        className={cn(
          CONTENT_BASE_CLASSES,
          layoutClasses,
          positionClasses,
          isOpen && CONTENT_VISIBLE_CLASS,
          className
        )}
        style={CONTENT_BASE_STYLE}
        {...rest}
      >
        {children}
      </div>
    );
  })
);

DatePickerContent.displayName = 'DatePickerContent';

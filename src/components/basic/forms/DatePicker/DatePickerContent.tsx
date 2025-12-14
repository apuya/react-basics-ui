import { cn } from '@/lib/cn';
import { forwardRef, memo, useCallback } from 'react';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useClickOutsideWithExclusions } from '@/hooks/useClickOutsideWithExclusions';
import { useEscapeKey } from '@/hooks/useEscapeKey';
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
 * DatePicker.Content - Popover container for the date picker calendar and controls.
 *
 * Handles positioning, click-outside detection, and escape key closing.
 * Uses `useClickOutsideWithExclusions` and `useEscapeKey` hooks for behavior.
 *
 * @example
 * ```tsx
 * <DatePicker>
 *   <DatePicker.Trigger placeholder="Select date" />
 *   <DatePicker.Content side="bottom" align="start">
 *     <DatePicker.Calendar />
 *   </DatePicker.Content>
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

    const mergedRef = useMergedRefs(ref, contentRef);

    // Close on click outside (excluding trigger)
    useClickOutsideWithExclusions(
      contentRef as React.RefObject<HTMLDivElement>,
      () => setIsOpen(false),
      [triggerRef as React.RefObject<HTMLElement>]
    );

    // Close on escape and return focus to trigger
    const handleEscape = useCallback(() => {
      setIsOpen(false);
      triggerRef?.current?.focus();
    }, [setIsOpen, triggerRef]);

    useEscapeKey(handleEscape, isOpen);

    return (
      <div
        ref={mergedRef}
        id={contentId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={triggerId}
        className={cn(
          CONTENT_BASE_CLASSES,
          CONTENT_LAYOUT_CLASSES[variant],
          CONTENT_POSITION_STYLES[side][align],
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

DatePickerContent.displayName = 'DatePicker.Content';

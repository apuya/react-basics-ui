import {
  forwardRef,
  memo,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { useClickOutsideWithExclusions } from '@/hooks/useClickOutsideWithExclusions';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useResponsivePosition } from '@/hooks/useResponsivePosition';
import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import { BiX } from 'react-icons/bi';
import {
  BASE_CLASSES,
  CLOSE_BUTTON_CLASSES,
  DESCRIPTION_CLASSES,
  POSITION_STYLES,
  SIDE_STYLES,
  TITLE_CLASSES,
  TRIGGER_WRAPPER_CLASSES,
  VISIBLE_CLASS,
} from './Popover.styles';

export type PopoverSide = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'center' | 'end';

export interface PopoverProps {
  children: ReactNode;
  /** Initial open state for uncontrolled mode */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

export interface PopoverTriggerProps extends ComponentPropsWithoutRef<'button'> {}

export interface PopoverContentProps extends ComponentPropsWithoutRef<'div'> {
  /** Which side of the trigger to position the popover. Defaults to 'bottom'. */
  side?: PopoverSide;
  /** How to align the popover along the trigger's edge. Defaults to 'center'. */
  align?: PopoverAlign;
  /** Show arrow pointing to trigger (not implemented yet) */
  showArrow?: boolean;
  /** 
   * When enabled, automatically repositions the popover to stay within the viewport.
   * If the preferred `side` would cause the popover to overflow, it flips to the opposite side.
   * If the preferred `align` would cause overflow, it adjusts alignment accordingly.
   * Useful for popovers near screen edges. Defaults to false.
   */
  responsive?: boolean;
  /** 
   * Minimum distance (in pixels) to maintain from viewport edges when `responsive` is enabled.
   * Defaults to 8.
   */
  viewportPadding?: number;
}

export interface PopoverTitleProps extends ComponentPropsWithoutRef<'h3'> {}
export interface PopoverDescriptionProps extends ComponentPropsWithoutRef<'p'> {}
export interface PopoverCloseProps extends ComponentPropsWithoutRef<'button'> {}

export interface PopoverContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  contentId: string;
  titleId: string;
  descriptionId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const { Context: PopoverContext, useContext: usePopoverContext } =
  createComponentContext<PopoverContextValue>('Popover');

export { usePopoverContext };

// Popover Trigger Component
const PopoverTrigger = memo(
  forwardRef<HTMLButtonElement, PopoverTriggerProps>(
    ({ children, className, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
      const { isOpen, setIsOpen, contentId, triggerRef, contentRef } = usePopoverContext();
      const mergedRef = useMergedRefs(ref, triggerRef);

      const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
          setIsOpen(true);
          onMouseEnter?.(e);
        },
        [setIsOpen, onMouseEnter]
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
          setIsOpen(false);
          onMouseLeave?.(e);
        },
        [setIsOpen, onMouseLeave]
      );

      const handleFocus = useCallback(
        (e: React.FocusEvent<HTMLButtonElement>) => {
          setIsOpen(true);
          onFocus?.(e);
        },
        [setIsOpen, onFocus]
      );

      const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLButtonElement>) => {
          // Don't close if focus moves to content
          const relatedTarget = e.relatedTarget as Node | null;
          if (contentRef.current?.contains(relatedTarget)) {
            return;
          }
          setIsOpen(false);
          onBlur?.(e);
        },
        [setIsOpen, onBlur, contentRef]
      );

      return (
        <button
          ref={mergedRef}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-controls={isOpen ? contentId : undefined}
          className={className}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          {children}
        </button>
      );
    }
  )
);
PopoverTrigger.displayName = 'Popover.Trigger';

// Popover Content Component
const PopoverContent = memo(
  forwardRef<HTMLDivElement, PopoverContentProps>(
    ({ 
      side: preferredSide = 'bottom', 
      align: preferredAlign = 'center', 
      responsive = false,
      viewportPadding = 8,
      className, 
      children, 
      onMouseEnter, 
      onMouseLeave, 
      ...props 
    }, ref) => {
      const { isOpen, setIsOpen, contentId, titleId, descriptionId, triggerRef, contentRef } = usePopoverContext();
      const mergedRef = useMergedRefs(ref, contentRef);

      // Use responsive positioning if enabled
      // Pass isOpen so the hook knows when to calculate position
      const { side: responsiveSide, align: responsiveAlign } = useResponsivePosition(
        triggerRef,
        contentRef,
        {
          preferredSide,
          preferredAlign,
          viewportPadding,
          enabled: responsive,
          isOpen,
        }
      );

      // Use responsive values if enabled, otherwise use provided values
      const side = responsive ? responsiveSide : preferredSide;
      const align = responsive ? responsiveAlign : preferredAlign;

      const popoverStyle = useMemo(
        () => ({
          paddingInline: 'var(--component-popover-padding-inline)',
          paddingBlock: 'var(--component-popover-padding-block)',
        }),
        []
      );

      const popoverClasses = useMemo(
        () => cn(
          BASE_CLASSES,
          SIDE_STYLES[side],
          POSITION_STYLES[side][align],
          isOpen && VISIBLE_CLASS,
          className
        ),
        [side, align, isOpen, className]
      );

      const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
          setIsOpen(true);
          onMouseEnter?.(e);
        },
        [setIsOpen, onMouseEnter]
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
          setIsOpen(false);
          onMouseLeave?.(e);
        },
        [setIsOpen, onMouseLeave]
      );

      useEscapeKey(() => setIsOpen(false), isOpen);

      if (!isOpen) return null;

      return (
        <div
          ref={mergedRef}
          id={contentId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={popoverClasses}
          style={popoverStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);
PopoverContent.displayName = 'Popover.Content';

// Popover Title Component
const PopoverTitle = memo(
  forwardRef<HTMLHeadingElement, PopoverTitleProps>(
    ({ className, children, ...props }, ref) => {
      const { titleId } = usePopoverContext();

      return (
        <h3 ref={ref} id={titleId} className={cn(TITLE_CLASSES, className)} {...props}>
          {children}
        </h3>
      );
    }
  )
);
PopoverTitle.displayName = 'Popover.Title';

// Popover Description Component
const PopoverDescription = memo(
  forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
    ({ className, children, ...props }, ref) => {
      const { descriptionId } = usePopoverContext();

      return (
        <p
          ref={ref}
          id={descriptionId}
          className={cn(DESCRIPTION_CLASSES, className)}
          {...props}
        >
          {children}
        </p>
      );
    }
  )
);
PopoverDescription.displayName = 'Popover.Description';

// Popover Close Component
const PopoverClose = memo(
  forwardRef<HTMLButtonElement, PopoverCloseProps>(
    ({ className, children, onClick, ...props }, ref) => {
      const { setIsOpen } = usePopoverContext();

      const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
          setIsOpen(false);
          onClick?.(e);
        },
        [setIsOpen, onClick]
      );

      const iconStyle = useMemo(
        () => ({
          width: 'var(--component-popover-close-size, 1rem)',
          height: 'var(--component-popover-close-size, 1rem)',
        }),
        []
      );

      return (
        <button
          ref={ref}
          type="button"
          aria-label="Close popover"
          className={cn(CLOSE_BUTTON_CLASSES, className)}
          onClick={handleClick}
          {...props}
        >
          {children || <BiX style={iconStyle} />}
        </button>
      );
    }
  )
);
PopoverClose.displayName = 'Popover.Close';

// Main Popover Component
const PopoverRoot = ({ children, defaultOpen = false, open, onOpenChange }: PopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  // Generate unique IDs for ARIA
  const uniqueId = useId();
  const contentId = `popover-content-${uniqueId}`;
  const titleId = `popover-title-${uniqueId}`;
  const descriptionId = `popover-desc-${uniqueId}`;

  const setIsOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  // Close on click outside (excluding trigger to prevent race conditions)
  useClickOutsideWithExclusions(
    contentRef as React.RefObject<HTMLDivElement>,
    () => {
      if (isOpen) {
        setIsOpen(false);
      }
    },
    [triggerRef]
  );

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, contentId, titleId, descriptionId, triggerRef, contentRef }),
    [isOpen, setIsOpen, contentId, titleId, descriptionId]
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      <div className={TRIGGER_WRAPPER_CLASSES}>{children}</div>
    </PopoverContext.Provider>
  );
};

// Compound Component Pattern
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
});

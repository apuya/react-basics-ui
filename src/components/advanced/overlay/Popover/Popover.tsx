import {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/cn';
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
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface PopoverTriggerProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export interface PopoverContentProps extends ComponentPropsWithoutRef<'div'> {
  side?: PopoverSide;
  align?: PopoverAlign;
  showArrow?: boolean;
}

export interface PopoverTitleProps extends ComponentPropsWithoutRef<'h3'> {}
export interface PopoverDescriptionProps extends ComponentPropsWithoutRef<'p'> {}
export interface PopoverCloseProps extends ComponentPropsWithoutRef<'button'> {}

export interface PopoverContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextValue | undefined>(undefined);

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within a Popover');
  }
  return context;
};

// Popover Trigger Component
const PopoverTrigger = memo(
  forwardRef<HTMLButtonElement, PopoverTriggerProps>(
    ({ asChild, children, onMouseEnter, onMouseLeave, ...props }, ref) => {
      const { isOpen, setIsOpen } = usePopoverContext();

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

      return (
        <button
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
    ({ side = 'bottom', align = 'center', className, children, onMouseEnter, onMouseLeave, ...props }, _ref) => {
      const { isOpen, setIsOpen } = usePopoverContext();
      const contentRef = useRef<HTMLDivElement>(null!);

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
          ref={contentRef}
          role="dialog"
          aria-modal="false"
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
    ({ className, children, ...props }, ref) => (
      <h3 ref={ref} className={cn(TITLE_CLASSES, className)} {...props}>
        {children}
      </h3>
    )
  )
);
PopoverTitle.displayName = 'Popover.Title';

// Popover Description Component
const PopoverDescription = memo(
  forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
    ({ className, children, ...props }, ref) => {
      const descriptionStyle = useMemo(
        () => ({ marginTop: 'var(--component-popover-gap)' }),
        []
      );

      return (
        <p
          ref={ref}
          className={cn(DESCRIPTION_CLASSES, className)}
          style={descriptionStyle}
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
          width: 'var(--component-popover-arrow-size)',
          height: 'var(--component-popover-arrow-size)',
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
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setIsOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen }),
    [isOpen, setIsOpen]
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

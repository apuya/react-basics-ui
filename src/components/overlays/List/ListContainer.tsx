import { forwardRef, memo, useCallback, useRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useMenuKeyboardNavigation } from '@/hooks/useMenuKeyboardNavigation';
import { useListContext } from './ListContext';
import {
  CONTAINER_BASE_CLASSES,
  CONTAINER_VISIBLE_CLASS,
  CONTAINER_STYLE,
} from './List.styles';

export interface ListContainerProps extends ComponentPropsWithoutRef<'div'> {}

export const ListContainer = memo(
  forwardRef<HTMLDivElement, ListContainerProps>(
    ({ className, children, ...props }, forwardedRef) => {
      const { isOpen, setIsOpen, menuId } = useListContext();
      const menuRef = useRef<HTMLDivElement>(null!);
      const mergedRef = useMergedRefs(menuRef, forwardedRef);

      const handleClose = useCallback(() => {
        // Only close if standalone (not inside Autocomplete)
        if (!menuRef.current?.closest('[data-autocomplete-container]')) {
          setIsOpen(false);
        }
      }, [setIsOpen]);
      
      useClickOutside(menuRef, handleClose);
      useEscapeKey(handleClose, isOpen);
      useMenuKeyboardNavigation(menuRef, isOpen, '[role="option"]:not([disabled])');

      // Early return before computing classes
      if (!isOpen) return null;

      const menuClasses = cn(
        CONTAINER_BASE_CLASSES,
        CONTAINER_VISIBLE_CLASS,
        className
      );

      return (
        <div
          ref={mergedRef}
          id={menuId}
          role="listbox"
          className={cn(menuClasses, 'flex flex-col')}
          style={CONTAINER_STYLE}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);

ListContainer.displayName = 'List.Container';

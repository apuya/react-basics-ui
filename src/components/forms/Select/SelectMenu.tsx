import { forwardRef, memo, useCallback, useRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useMenuKeyboardNavigation } from '@/hooks/useMenuKeyboardNavigation';
import { useSelectContext } from './SelectContext';
import {
  MENU_BASE_CLASSES,
  MENU_VISIBLE_CLASS,
  MENU_WRAPPER_CLASSES,
  MENU_STYLE,
} from './Select.styles';

export interface SelectMenuProps extends ComponentPropsWithoutRef<'div'> {}

export const SelectMenu = memo(
  forwardRef<HTMLDivElement, SelectMenuProps>(
    ({ className, children, ...props }, forwardedRef) => {
      const { isOpen, setIsOpen, menuId } = useSelectContext();
      const menuRef = useRef<HTMLDivElement>(null!);
      const mergedRef = useMergedRefs(menuRef, forwardedRef);

      const handleClose = useCallback(() => {
        setIsOpen(false);
      }, [setIsOpen]);

      useClickOutside(menuRef, handleClose);
      useEscapeKey(handleClose, isOpen);
      useMenuKeyboardNavigation(menuRef, isOpen, '[role="option"]:not([disabled])');

      // Early return before computing classes
      if (!isOpen) return null;

      const menuClasses = cn(
        MENU_BASE_CLASSES,
        MENU_VISIBLE_CLASS,
        className
      );

      return (
        <div
          ref={mergedRef}
          id={menuId}
          role="listbox"
          className={menuClasses}
          style={MENU_STYLE}
          {...props}
        >
          <div className={MENU_WRAPPER_CLASSES}>
            {children}
          </div>
        </div>
      );
    }
  )
);

SelectMenu.displayName = 'Select.Menu';

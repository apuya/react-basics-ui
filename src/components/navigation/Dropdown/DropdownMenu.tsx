import { cn } from '@/lib/cn';
import { useClickOutside } from '@/lib/useClickOutside';
import { useEscapeKey } from '@/lib/useEscapeKey';
import { forwardRef, memo, useEffect, useMemo, useRef, type ComponentPropsWithoutRef } from 'react';
import { useDropdownContext, type DropdownSide, type DropdownAlign } from './Dropdown';
import {
  ALIGN_STYLES,
  BASE_CLASSES,
  MENU_WRAPPER_CLASSES,
  SIDE_STYLES,
  VISIBLE_CLASS,
} from './Dropdown.styles';

export interface DropdownMenuProps extends ComponentPropsWithoutRef<'div'> {
  side?: DropdownSide;
  align?: DropdownAlign;
}

export const DropdownMenu = memo(
  forwardRef<HTMLDivElement, DropdownMenuProps>(
    ({ side = 'bottom', align = 'start', className, children, ...props }, forwardedRef) => {
      const { isOpen, setIsOpen } = useDropdownContext();
      const menuRef = useRef<HTMLDivElement>(null!);

      const menuStyle = useMemo(
        () => ({
          paddingInline: 'var(--component-dropdown-padding-inline)',
          paddingBlock: 'var(--component-dropdown-padding-block)',
        }),
        []
      );

      const menuClasses = useMemo(
        () => cn(
          BASE_CLASSES,
          SIDE_STYLES[side],
          ALIGN_STYLES[align],
          isOpen && VISIBLE_CLASS,
          className
        ),
        [side, align, isOpen, className]
      );

      useClickOutside(menuRef, () => setIsOpen(false));
      useEscapeKey(() => setIsOpen(false), isOpen);

      // Keyboard navigation
      useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
          const items = menuRef.current?.querySelectorAll<HTMLButtonElement>(
            '[role="menuitem"]:not([disabled])'
          );
          if (!items || items.length === 0) return;

          const currentIndex = Array.from(items).indexOf(document.activeElement as HTMLButtonElement);

          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
              items[nextIndex]?.focus();
              break;
            case 'ArrowUp':
              e.preventDefault();
              const prevIndex = currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
              items[prevIndex]?.focus();
              break;
            case 'Home':
              e.preventDefault();
              items[0]?.focus();
              break;
            case 'End':
              e.preventDefault();
              items[items.length - 1]?.focus();
              break;
          }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }, [isOpen]);

      if (!isOpen) return null;

      return (
        <div
          ref={(node) => {
            if (node) menuRef.current = node;
            if (typeof forwardedRef === 'function') {
              forwardedRef(node);
            } else if (forwardedRef) {
              forwardedRef.current = node;
            }
          }}
          id="dropdown-menu"
          role="menu"
          aria-orientation="vertical"
          className={menuClasses}
          style={menuStyle}
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

DropdownMenu.displayName = 'Dropdown.Menu';

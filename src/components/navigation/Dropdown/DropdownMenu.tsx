import { forwardRef, useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useClickOutsideWithExclusions } from '@/hooks/useClickOutsideWithExclusions';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useMenuKeyboardNavigation } from '@/hooks/useMenuKeyboardNavigation';
import { useDropdownContext, type DropdownAlign, type DropdownSide } from './Dropdown';
import {
  ALIGN_STYLES,
  BASE_CLASSES,
  MENU_WRAPPER_CLASSES,
  SIDE_GAP_STYLE,
  SIDE_STYLES,
  VISIBLE_CLASS,
} from './Dropdown.styles';

/**
 * Props for the DropdownMenu component.
 */
export interface DropdownMenuProps extends ComponentPropsWithoutRef<'div'> {
  /** Position of the menu relative to the trigger */
  side?: DropdownSide;
  /** Alignment of the menu relative to the trigger */
  align?: DropdownAlign;
  /** Maximum height of the menu (enables scrolling). Defaults to token value. */
  maxHeight?: string | number;
  /** Enable enter/exit animations. Defaults to true. */
  enableAnimation?: boolean;
}

/**
 * Menu container that displays dropdown items with positioning and keyboard navigation.
 * 
 * Features:
 * - Click-outside detection to close menu
 * - Escape key to close
 * - Arrow key navigation between items
 * - Home/End key navigation to first/last items
 * - Flexible positioning (top/bottom/left/right)
 * - Flexible alignment (start/center/end)
 * 
 * @example
 * ```tsx
 * <Dropdown.Menu side="bottom" align="start">
 *   <Dropdown.Item>Option 1</Dropdown.Item>
 *   <Dropdown.Item>Option 2</Dropdown.Item>
 * </Dropdown.Menu>
 * ```
 */

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ side = 'bottom', align = 'start', maxHeight, enableAnimation = true, className, children, ...props }, forwardedRef) => {
      const { isOpen, setIsOpen, triggerRef, menuId } = useDropdownContext();
      const menuRef = useRef<HTMLDivElement>(null!);
      
      // Merge external ref with internal menu ref
      const mergedRef = useMergedRefs(forwardedRef, menuRef);

      // Calculate menu wrapper style with optional max-height and scrolling
      const menuWrapperStyle: React.CSSProperties = {
        maxHeight: maxHeight
          ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight)
          : 'var(--component-dropdown-max-height)',
        overflowY: 'auto',
      };

      const menuStyle: React.CSSProperties = {
        paddingInline: 'var(--component-dropdown-padding-inline)',
        paddingBlock: 'var(--component-dropdown-padding-block)',
        ...(side === 'top' || side === 'bottom'
          ? { marginTop: SIDE_GAP_STYLE.marginTop, marginBottom: SIDE_GAP_STYLE.marginBottom }
          : { marginLeft: SIDE_GAP_STYLE.marginLeft, marginRight: SIDE_GAP_STYLE.marginRight }),
      };

      const menuClasses = cn(
        BASE_CLASSES,
        SIDE_STYLES[side],
        ALIGN_STYLES[align],
        enableAnimation && 'transition-all duration-[var(--component-dropdown-transition-duration)]',
        enableAnimation && !isOpen && 'scale-[var(--component-dropdown-animation-scale)]',
        isOpen && VISIBLE_CLASS,
        className
      );

      // Close menu when clicking outside (excluding trigger) or pressing Escape
      useClickOutsideWithExclusions(menuRef, () => setIsOpen(false), [triggerRef]);
      useEscapeKey(() => setIsOpen(false), isOpen);
      
      /**
       * Focus management: Move focus to first menu item when menu opens.
       * Returns focus to trigger when menu closes.
       */
      useEffect(() => {
        if (!isOpen || !menuRef.current) return;

        // Focus first enabled menu item when menu opens
        const firstItem = menuRef.current.querySelector<HTMLButtonElement>(
          '[role="menuitem"]:not([disabled])'
        );
        
        if (firstItem) {
          // Small delay to ensure DOM is ready
          requestAnimationFrame(() => {
            firstItem.focus();
          });
        }
      }, [isOpen]);

      // Keyboard navigation for menu items
      useMenuKeyboardNavigation(menuRef, isOpen);

      if (!isOpen) return null;

      return (
        <div
          ref={mergedRef}
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          className={menuClasses}
          style={menuStyle}
          {...props}
        >
          <div className={MENU_WRAPPER_CLASSES} style={menuWrapperStyle}>
            {children}
          </div>
        </div>
      );
    }
);

DropdownMenu.displayName = 'Dropdown.Menu';
import { forwardRef, useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useClickOutsideWithExclusions } from '@/hooks/useClickOutsideWithExclusions';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useMenuKeyboardNavigation } from '@/hooks/useMenuKeyboardNavigation';
import { useResponsivePosition } from '@/hooks/useResponsivePosition';
import { useDropdownContext, type DropdownAlign, type DropdownSide } from './Dropdown';
import {
  ALIGN_STYLES,
  BASE_CLASSES,
  MENU_WRAPPER_CLASSES,
  SIDE_GAP_CLASSES,
  SIDE_STYLES,
  VERTICAL_ALIGN_STYLES,
  VISIBLE_CLASS,
} from './Dropdown.styles';

/**
 * Props for the DropdownMenu component.
 */
export interface DropdownMenuProps extends ComponentPropsWithoutRef<'div'> {
  /** Which side of the trigger to position the menu. Defaults to 'bottom'. */
  side?: DropdownSide;
  /** How to align the menu along the trigger's edge. Defaults to 'start'. */
  align?: DropdownAlign;
  /** Maximum height of the menu (enables scrolling). Defaults to token value. */
  maxHeight?: string | number;
  /** Enable enter/exit animations. Defaults to true. */
  enableAnimation?: boolean;
  /** 
   * When enabled, automatically repositions the menu to stay within the viewport.
   * If the preferred `side` would cause the menu to overflow, it flips to the opposite side.
   * If the preferred `align` would cause overflow, it adjusts alignment accordingly.
   * Useful for menus near screen edges. Defaults to false.
   */
  responsive?: boolean;
  /** 
   * Minimum distance (in pixels) to maintain from viewport edges when `responsive` is enabled.
   * Defaults to 8.
   */
  viewportPadding?: number;
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
  ({ 
    side: preferredSide = 'bottom', 
    align: preferredAlign = 'start', 
    maxHeight, 
    enableAnimation = true, 
    responsive = false,
    viewportPadding = 8,
    className, 
    children, 
    ...props 
  }, forwardedRef) => {
      const { isOpen, setIsOpen, triggerRef, menuId } = useDropdownContext();
      const menuRef = useRef<HTMLDivElement>(null!);
      
      // Merge external ref with internal menu ref
      const mergedRef = useMergedRefs(forwardedRef, menuRef);

      // Use responsive positioning if enabled
      // Pass isOpen so the hook knows when to calculate position
      const { side: responsiveSide, align: responsiveAlign } = useResponsivePosition(
        triggerRef,
        menuRef,
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
      };

      // Use horizontal alignment for top/bottom, vertical alignment for left/right
      const alignStyles = (side === 'top' || side === 'bottom') 
        ? ALIGN_STYLES[align] 
        : VERTICAL_ALIGN_STYLES[align];

      const menuClasses = cn(
        BASE_CLASSES,
        SIDE_STYLES[side],
        SIDE_GAP_CLASSES[side],
        alignStyles,
        enableAnimation && 'transition-all duration-[var(--component-dropdown-transition-duration)]',
        enableAnimation && !isOpen && 'scale-[var(--component-dropdown-animation-scale)]',
        isOpen && VISIBLE_CLASS,
        className
      );

      // Close menu when clicking outside (excluding trigger) or pressing Escape
      useClickOutsideWithExclusions(menuRef, () => setIsOpen(false), [triggerRef]);
      useEscapeKey(() => setIsOpen(false), isOpen);
      
      // Track previous open state for focus management
      const prevIsOpenRef = useRef(isOpen);
      
      /**
       * Focus management: 
       * - Move focus to first menu item when menu opens
       * - Return focus to trigger when menu closes
       */
      useEffect(() => {
        const wasOpen = prevIsOpenRef.current;
        prevIsOpenRef.current = isOpen;
        
        if (isOpen && !wasOpen && menuRef.current) {
          // Menu just opened - focus first enabled menu item
          const firstItem = menuRef.current.querySelector<HTMLButtonElement>(
            '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled])'
          );
          
          if (firstItem) {
            requestAnimationFrame(() => {
              firstItem.focus();
            });
          }
        } else if (!isOpen && wasOpen && triggerRef.current) {
          // Menu just closed - return focus to trigger
          triggerRef.current.focus();
        }
      }, [isOpen, triggerRef]);

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
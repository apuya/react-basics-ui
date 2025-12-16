import { forwardRef, memo, useRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useMenuKeyboardNavigation } from '@/hooks/useMenuKeyboardNavigation';
import { useMenuContext } from './MenuContext';
import { CONTAINER_BASE_CLASSES, CONTAINER_STYLE } from './Menu.styles';

export interface MenuContainerProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * Menu.Container - The menu popup container.
 * 
 * Renders a `role="menu"` container with keyboard navigation.
 * Parent components (Dropdown, ContextMenu) handle positioning and visibility.
 */
export const MenuContainer = memo(
  forwardRef<HTMLDivElement, MenuContainerProps>(
    ({ className, children, ...props }, forwardedRef) => {
      const { isOpen, menuId } = useMenuContext();
      const menuRef = useRef<HTMLDivElement>(null!);
      const mergedRef = useMergedRefs(menuRef, forwardedRef);

      useMenuKeyboardNavigation(menuRef, isOpen, '[role="menuitem"]:not([aria-disabled="true"])');

      return (
        <div
          ref={mergedRef}
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          className={cn(CONTAINER_BASE_CLASSES, className)}
          style={CONTAINER_STYLE}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);

MenuContainer.displayName = 'Menu.Container';

import { useEffect, type RefObject } from 'react';

/**
 * Custom hook for handling keyboard navigation within a menu.
 * 
 * Implements ARIA menu pattern:
 * - ArrowDown: Move focus to next item (wraps to first)
 * - ArrowUp: Move focus to previous item (wraps to last)
 * - Home: Move focus to first item
 * - End: Move focus to last item
 * 
 * @param menuRef - Reference to the menu container element
 * @param isOpen - Whether the menu is currently open
 * @param itemSelector - CSS selector for focusable items (default: '[role="menuitem"]:not([disabled])')
 * 
 * @example
 * ```tsx
 * const menuRef = useRef<HTMLDivElement>(null);
 * // For ARIA menu pattern
 * useMenuKeyboardNavigation(menuRef, isOpen);
 * // For ARIA listbox pattern
 * useMenuKeyboardNavigation(menuRef, isOpen, '[role="option"]:not([disabled])');
 * ```
 */
export const useMenuKeyboardNavigation = (
  menuRef: RefObject<HTMLElement>,
  isOpen: boolean,
  itemSelector: string = '[role="menuitem"]:not([disabled])'
) => {
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events when focus is within the menu
      if (!menuRef.current?.contains(document.activeElement)) return;
      
      const items = menuRef.current?.querySelectorAll<HTMLButtonElement>(
        itemSelector
      );
      if (!items || items.length === 0) return;

      const currentIndex = Array.from(items).indexOf(document.activeElement as HTMLButtonElement);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          // If no item is focused, focus first item; otherwise wrap to next
          const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
          items[nextIndex]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          // If no item is focused, focus last item; otherwise wrap to previous
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

    // Attach listener to menu element
    const currentMenu = menuRef.current;
    currentMenu.addEventListener('keydown', handleKeyDown);
    return () => currentMenu.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, menuRef, itemSelector]);
};

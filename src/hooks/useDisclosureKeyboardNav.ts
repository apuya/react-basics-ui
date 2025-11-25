import { useCallback, useRef, useEffect } from 'react';

export type Orientation = 'horizontal' | 'vertical';

export interface UseDisclosureKeyboardNavOptions {
  /**
   * List of item values in order
   */
  items: string[];
  
  /**
   * Currently active/focused item value
   */
  activeItem: string | null;
  
  /**
   * Callback to set the active item
   */
  setActiveItem: (itemValue: string) => void;
  
  /**
   * Orientation of the disclosure component
   * - 'horizontal': Use Left/Right arrow keys (e.g., Tabs)
   * - 'vertical': Use Up/Down arrow keys (e.g., Accordion)
   */
  orientation?: Orientation;
  
  /**
   * Whether to loop navigation (from last to first and vice versa)
   */
  loop?: boolean;
  
  /**
   * Map of disabled items (value -> boolean)
   */
  disabledItems?: Map<string, boolean>;
}

export interface UseDisclosureKeyboardNavReturn {
  /**
   * Keyboard event handler for the container/trigger elements
   */
  handleKeyDown: (event: React.KeyboardEvent) => void;
  
  /**
   * Register a trigger element for focus management
   */
  registerTrigger: (itemValue: string, element: HTMLElement | null) => void;
  
  /**
   * Unregister a trigger element
   */
  unregisterTrigger: (itemValue: string) => void;
  
  /**
   * Programmatically focus a specific item
   */
  focusItem: (itemValue: string) => void;
}

/**
 * Keyboard navigation hook for disclosure components (Accordion, Tabs, etc.)
 * Provides Arrow key navigation, Home/End keys, and focus management.
 * 
 * @example
 * ```tsx
 * const { handleKeyDown, registerTrigger, focusItem } = useDisclosureKeyboardNav({
 *   items: ['item-1', 'item-2', 'item-3'],
 *   activeItem: currentItem,
 *   setActiveItem: setCurrentItem,
 *   orientation: 'vertical',
 *   loop: true,
 * });
 * 
 * // In trigger component
 * <button
 *   onKeyDown={handleKeyDown}
 *   ref={(el) => registerTrigger(itemValue, el)}
 * >
 *   Trigger
 * </button>
 * ```
 */
export function useDisclosureKeyboardNav({
  items,
  activeItem,
  setActiveItem,
  orientation = 'vertical',
  loop = false,
  disabledItems = new Map(),
}: UseDisclosureKeyboardNavOptions): UseDisclosureKeyboardNavReturn {
  // Store refs to trigger elements for focus management
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Register a trigger element
  const registerTrigger = useCallback((itemValue: string, element: HTMLElement | null) => {
    if (element) {
      triggerRefs.current.set(itemValue, element);
    } else {
      triggerRefs.current.delete(itemValue);
    }
  }, []);

  // Unregister a trigger element
  const unregisterTrigger = useCallback((itemValue: string) => {
    triggerRefs.current.delete(itemValue);
  }, []);

  // Focus a specific item
  const focusItem = useCallback((itemValue: string) => {
    const element = triggerRefs.current.get(itemValue);
    if (element) {
      element.focus();
    }
  }, []);

  // Get next enabled item in direction
  const getNextItem = useCallback(
    (currentIndex: number, direction: 1 | -1): string | null => {
      let nextIndex = currentIndex + direction;
      let attempts = 0;
      const maxAttempts = items.length;

      while (attempts < maxAttempts) {
        // Handle looping or boundaries
        if (nextIndex < 0) {
          if (loop) {
            nextIndex = items.length - 1;
          } else {
            return null;
          }
        } else if (nextIndex >= items.length) {
          if (loop) {
            nextIndex = 0;
          } else {
            return null;
          }
        }

        const nextItem = items[nextIndex];
        
        // Skip disabled items
        if (!disabledItems.get(nextItem)) {
          return nextItem;
        }

        nextIndex += direction;
        attempts++;
      }

      return null;
    },
    [items, loop, disabledItems]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const currentIndex = activeItem ? items.indexOf(activeItem) : -1;
      
      // Define navigation keys based on orientation
      const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
      const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

      let targetItem: string | null = null;

      switch (event.key) {
        case nextKey:
          event.preventDefault();
          targetItem = getNextItem(currentIndex, 1);
          break;

        case prevKey:
          event.preventDefault();
          targetItem = getNextItem(currentIndex, -1);
          break;

        case 'Home':
          event.preventDefault();
          // Find first enabled item
          targetItem = items.find((item) => !disabledItems.get(item)) || null;
          break;

        case 'End':
          event.preventDefault();
          // Find last enabled item
          targetItem = [...items].reverse().find((item) => !disabledItems.get(item)) || null;
          break;

        default:
          return;
      }

      if (targetItem) {
        setActiveItem(targetItem);
        // Focus will be managed by the calling component or via focusItem
        requestAnimationFrame(() => {
          focusItem(targetItem);
        });
      }
    },
    [items, activeItem, orientation, getNextItem, setActiveItem, focusItem, disabledItems]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      triggerRefs.current.clear();
    };
  }, []);

  return {
    handleKeyDown,
    registerTrigger,
    unregisterTrigger,
    focusItem,
  };
}

import { useEffect, type RefObject } from 'react';

/**
 * Hook that triggers a handler when clicking outside of specified elements.
 * Supports excluding specific elements from triggering the handler.
 * 
 * @param ref - Reference to the main element to detect clicks outside of
 * @param handler - Callback function to execute when clicking outside
 * @param excludeRefs - Optional array of refs to exclude from click-outside detection
 * 
 * @example
 * ```tsx
 * const menuRef = useRef(null);
 * const triggerRef = useRef(null);
 * 
 * // Don't close menu when clicking the trigger
 * useClickOutsideWithExclusions(
 *   menuRef,
 *   () => setIsOpen(false),
 *   [triggerRef]
 * );
 * ```
 */
export const useClickOutsideWithExclusions = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  excludeRefs: RefObject<HTMLElement | null>[] = []
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      const target = event.target as Node;
      
      // Don't trigger if clicking inside the main element
      if (!el || el.contains(target)) {
        return;
      }
      
      // Don't trigger if clicking any excluded elements
      const isClickingExcludedElement = excludeRefs.some(
        (excludeRef) => excludeRef.current?.contains(target)
      );
      
      if (isClickingExcludedElement) {
        return;
      }
      
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, excludeRefs]);
};

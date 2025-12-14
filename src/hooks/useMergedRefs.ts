import { useRef, useCallback, type MutableRefObject, type Ref } from 'react';

/**
 * Merges multiple refs into a single ref callback.
 * Handles both callback refs and ref objects, including cleanup on unmount.
 * 
 * @param refs - Array of refs to merge
 * @returns A callback ref that updates all provided refs
 * 
 * @example
 * ```tsx
 * const Component = forwardRef((props, ref) => {
 *   const internalRef = useRef(null);
 *   const mergedRef = useMergedRefs(ref, internalRef);
 *   
 *   return <div ref={mergedRef}>Content</div>;
 * });
 * ```
 */
export function useMergedRefs<T = unknown>(...refs: (Ref<T> | undefined)[]): Ref<T> {
  // Store refs in a ref to avoid recreating the callback on every render
  const refsRef = useRef(refs);
  
  // Update the stored refs on each render
  refsRef.current = refs;
  
  return useCallback(
    (node: T | null) => {
      refsRef.current.forEach((ref) => {
        if (ref == null) return;

        if (typeof ref === 'function') {
          // Callback ref - call with the node (or null on unmount)
          ref(node);
        } else {
          // Mutable ref object - assign to current
          (ref as MutableRefObject<T | null>).current = node;
        }
      });
    },
    [] // Empty deps - we use refsRef.current which is always up-to-date
  );
}

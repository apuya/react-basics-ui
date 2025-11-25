import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

/**
 * Portal component for rendering children into a DOM node outside the parent component hierarchy.
 * 
 * Uses React's createPortal to render content at the document root level, breaking out of 
 * CSS constraints like overflow: hidden or z-index stacking contexts.
 * 
 * Automatically creates the target container if it doesn't exist and cleans up on unmount.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Portal>
 *   <div>This renders at document.body</div>
 * </Portal>
 * 
 * // Custom container
 * <Portal containerId="modal-root">
 *   <Modal />
 * </Portal>
 * ```
 */
export const Portal = ({ children, containerId = 'portal-root' }: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let portalRoot = document.getElementById(containerId);

    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.id = containerId;
      document.body.appendChild(portalRoot);
    }

    elRef.current = portalRoot;
    setMounted(true);

    return () => {
      // Only remove if empty and we created it
      if (portalRoot && portalRoot.childNodes.length === 0 && portalRoot.id === containerId) {
        portalRoot.remove();
      }
    };
  }, [containerId]);

  return mounted && elRef.current ? createPortal(children, elRef.current) : null;
};

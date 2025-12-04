import { memo, useEffect, useRef, useState, type ReactNode } from 'react';
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
export const Portal = memo(({ children, containerId = 'portal-root' }: PortalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const createdByUs = useRef(false);

  useEffect(() => {
    let portalRoot = document.getElementById(containerId);

    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.id = containerId;
      document.body.appendChild(portalRoot);
      createdByUs.current = true;
    } else {
      createdByUs.current = false;
    }

    setContainer(portalRoot);

    return () => {
      // Only remove if we created it and it's empty
      if (createdByUs.current && portalRoot && portalRoot.childNodes.length === 0) {
        portalRoot.remove();
      }
    };
  }, [containerId]);

  return container ? createPortal(children, container) : null;
});

Portal.displayName = 'Portal';

/**
 * Portal - Renders children into a DOM node outside the parent hierarchy.
 * Uses React's createPortal to break out of CSS constraints like overflow or z-index.
 */
import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { PortalProps } from './Portal.types';

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

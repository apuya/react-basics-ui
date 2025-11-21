import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

export const Portal = ({ children, containerId = 'portal-root' }: PortalProps) => {
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let portalRoot = document.getElementById(containerId);

    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.id = containerId;
      document.body.appendChild(portalRoot);
    }

    elRef.current = portalRoot;

    return () => {
      // Only remove if empty and we created it
      if (portalRoot && portalRoot.childNodes.length === 0 && portalRoot.id === containerId) {
        portalRoot.remove();
      }
    };
  }, [containerId]);

  return elRef.current ? createPortal(children, elRef.current) : null;
};

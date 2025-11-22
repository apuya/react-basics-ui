import { useEffect } from 'react';

export const useEscapeKey = (handler: () => void, isEnabled: boolean = true) => {
  useEffect(() => {
    if (!isEnabled) return;

    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler();
      }
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [handler, isEnabled]);
};

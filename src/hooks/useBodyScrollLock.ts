import { useEffect } from 'react';

export const useBodyScrollLock = (isEnabled: boolean = true) => {
  useEffect(() => {
    if (!isEnabled) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isEnabled]);
};

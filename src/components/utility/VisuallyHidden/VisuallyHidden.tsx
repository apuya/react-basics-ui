import { forwardRef, memo, type ReactNode } from 'react';
import { VISUALLY_HIDDEN_CLASSES } from './VisuallyHidden.styles';

export interface VisuallyHiddenProps {
  /** Content to hide visually but keep accessible */
  children: ReactNode;
  /** HTML element to render */
  as?: 'span' | 'div';
}

/**
 * Hides content visually while keeping it accessible to screen readers.
 * Useful for icon-only buttons, skip links, and form labels.
 */
export const VisuallyHidden = memo(
  forwardRef<HTMLSpanElement | HTMLDivElement, VisuallyHiddenProps>(
    ({ children, as: Component = 'span' }, ref) => (
      <Component ref={ref as React.RefObject<HTMLSpanElement & HTMLDivElement>} className={VISUALLY_HIDDEN_CLASSES}>
        {children}
      </Component>
    )
  )
);

VisuallyHidden.displayName = 'VisuallyHidden';

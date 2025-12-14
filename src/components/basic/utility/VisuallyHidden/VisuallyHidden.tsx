/**
 * VisuallyHidden - Hides content visually while keeping it accessible to screen readers.
 * Useful for icon-only buttons, skip links, and form labels.
 */
import { forwardRef, memo } from 'react';
import { VISUALLY_HIDDEN_STYLE } from './VisuallyHidden.styles';
import type { VisuallyHiddenProps } from './VisuallyHidden.types';

export const VisuallyHidden = memo(
  forwardRef<HTMLSpanElement | HTMLDivElement, VisuallyHiddenProps>(
    ({ children, as: Component = 'span' }, ref) => (
      <Component ref={ref as React.RefObject<HTMLSpanElement & HTMLDivElement>} style={VISUALLY_HIDDEN_STYLE}>
        {children}
      </Component>
    )
  )
);

VisuallyHidden.displayName = 'VisuallyHidden';

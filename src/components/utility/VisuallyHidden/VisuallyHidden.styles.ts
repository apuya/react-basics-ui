import type { CSSProperties } from 'react';

/**
 * Visually hidden styles using component tokens.
 * These styles hide content visually while keeping it accessible to screen readers.
 */
export const VISUALLY_HIDDEN_STYLE: CSSProperties = {
  position: 'absolute',
  width: 'var(--component-visually-hidden-width)',
  height: 'var(--component-visually-hidden-height)',
  padding: 'var(--component-visually-hidden-padding)',
  margin: 'var(--component-visually-hidden-margin)',
  overflow: 'hidden',
  clip: 'var(--component-visually-hidden-clip)',
  whiteSpace: 'nowrap',
  borderWidth: 'var(--component-visually-hidden-border-width)',
};

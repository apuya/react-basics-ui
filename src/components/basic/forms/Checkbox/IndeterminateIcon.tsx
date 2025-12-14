import { memo } from 'react';
import { ICON_CLASSES } from './Checkbox.styles';

/**
 * IndeterminateIcon - Horizontal line SVG for indeterminate checkbox state.
 *
 * Renders a minus/dash line. Visibility controlled by parent via
 * CSS `peer-indeterminate:opacity-*` classes. Used for "select all"
 * scenarios when some but not all items are selected.
 *
 * @internal Not exported publicly - used only within Checkbox component.
 */
export const IndeterminateIcon = memo(function IndeterminateIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={ICON_CLASSES}
      aria-hidden="true"
    >
      <line x1="4" y1="8" x2="12" y2="8" />
    </svg>
  );
});

IndeterminateIcon.displayName = 'Checkbox.IndeterminateIcon';

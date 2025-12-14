import { memo } from 'react';
import { ICON_CLASSES } from './Checkbox.styles';

/**
 * CheckIcon - Checkmark SVG displayed when checkbox is checked.
 *
 * Renders a polyline checkmark. Visibility controlled by parent via
 * CSS `peer-checked:opacity-*` classes.
 *
 * @internal Not exported publicly - used only within Checkbox component.
 */
export const CheckIcon = memo(function CheckIcon() {
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
      <polyline points="3,8 6,11 13,4" />
    </svg>
  );
});

CheckIcon.displayName = 'Checkbox.CheckIcon';

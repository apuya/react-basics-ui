import { memo, type ReactNode } from 'react';
import { useTimePickerContext } from './TimePickerContext';
import { HELPER_CLASSES, HELPER_ERROR_CLASSES } from './TimePicker.styles';

// ============================================================================
// TimePickerHelper Component
// ============================================================================

export interface TimePickerHelperProps {
  /** Helper text content */
  children: ReactNode;
  /** ID for the helper element (used for aria-describedby) */
  id?: string;
}

export const TimePickerHelper = memo(function TimePickerHelper({
  children,
  id,
}: TimePickerHelperProps) {
  const { error } = useTimePickerContext();

  return (
    <p
      id={id}
      className={error ? HELPER_ERROR_CLASSES : HELPER_CLASSES}
      role={error ? 'alert' : undefined}
    >
      {children}
    </p>
  );
});

TimePickerHelper.displayName = 'TimePicker.Helper';

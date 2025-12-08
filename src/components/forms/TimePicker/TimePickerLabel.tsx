import { memo, type ReactNode } from 'react';
import { useTimePickerContext } from './TimePickerContext';
import { LABEL_CLASSES, LABEL_ERROR_CLASSES } from './TimePicker.styles';

// ============================================================================
// TimePickerLabel Component
// ============================================================================

export interface TimePickerLabelProps {
  /** Label text content */
  children: ReactNode;
  /** Whether the field is required */
  required?: boolean;
}

export const TimePickerLabel = memo(function TimePickerLabel({
  children,
  required,
}: TimePickerLabelProps) {
  const { error, triggerId, labelId } = useTimePickerContext();

  return (
    <label
      id={labelId}
      htmlFor={triggerId}
      className={error ? LABEL_ERROR_CLASSES : LABEL_CLASSES}
    >
      {children}
      {required && (
        <span
          className="ml-1 text-[color:var(--semantic-status-error-default)]"
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  );
});

TimePickerLabel.displayName = 'TimePicker.Label';

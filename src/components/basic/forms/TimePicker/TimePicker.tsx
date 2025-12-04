import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { generateFormId } from '@/lib/generateFormId';
import { useControlledState } from '@/hooks/useControlledState';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/cn';
import { TimePickerContext, type TimePickerContextValue } from './TimePickerContext';
import { TimePickerTrigger } from './TimePickerTrigger';
import { TimePickerMenu } from './TimePickerMenu';
import { TimePickerOption } from './TimePickerOption';
import { TimePickerLabel } from './TimePickerLabel';
import { TimePickerHelper } from './TimePickerHelper';
import {
  parseTimeToComponents,
  componentsToTimeString,
  type Meridiem,
} from './timePickerUtils';
import { type TimePickerSize } from './TimePicker.styles';

// ============================================================================
// Main TimePicker Component
// ============================================================================

export interface TimePickerProps {
  /** Selected time value in HH:MM format (24-hour) */
  value?: string;
  /** Default time value */
  defaultValue?: string;
  /** Callback when time changes */
  onChange?: (value: string) => void;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Whether the picker has an error */
  error?: boolean;
  /** Size variant */
  size?: TimePickerSize;
  /** Label text */
  label?: string;
  /** Helper text shown below the picker */
  helperText?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Additional class name for wrapper */
  className?: string;
  /** ID for the component */
  id?: string;
  /** Minimum time (HH:MM) */
  min?: string;
  /** Maximum time (HH:MM) */
  max?: string;
  /** Step in seconds (default: 1800 = 30 minutes) */
  step?: number;
  /** Whether the field is required */
  required?: boolean;
  /** Show confirmation footer with Cancel/Save buttons */
  showConfirmation?: boolean;
  /** Label for cancel button (when showConfirmation is true) */
  cancelLabel?: string;
  /** Label for save button (when showConfirmation is true) */
  saveLabel?: string;
  /** Callback when cancel is clicked (when showConfirmation is true) */
  onCancel?: () => void;
  /** Callback when save is clicked (when showConfirmation is true) */
  onSave?: () => void;
}

const TimePickerRoot = memo(function TimePickerRoot({
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  error = false,
  size = 'default',
  label,
  helperText,
  placeholder = 'Select time',
  className,
  id,
  min,
  max,
  step = 1800,
  required = false,
  showConfirmation = false,
  cancelLabel,
  saveLabel,
  onCancel,
  onSave,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null!);

  // Main value state (24-hour format string)
  const [value, setValue] = useControlledState(
    controlledValue,
    defaultValue || '',
    onChange
  );

  // Parse initial value into components
  const initialComponents = useMemo(
    () => parseTimeToComponents(value || ''),
    // Only compute on mount, not on every value change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Separate state for hour, minute, meridiem (for column selections)
  const [selectedHour, setSelectedHour] = useState<number | undefined>(
    initialComponents?.hour
  );
  const [selectedMinute, setSelectedMinute] = useState<number | undefined>(
    initialComponents?.minute
  );
  const [selectedMeridiem, setSelectedMeridiem] = useState<Meridiem>(
    initialComponents?.meridiem || 'AM'
  );

  // Sync internal state when controlled value changes externally
  useEffect(() => {
    const components = parseTimeToComponents(value || '');
    if (components) {
      setSelectedHour(components.hour);
      setSelectedMinute(components.minute);
      setSelectedMeridiem(components.meridiem);
    }
  }, [value]);

  // Update the main value when all components are selected
  useEffect(() => {
    if (selectedHour !== undefined && selectedMinute !== undefined) {
      const newValue = componentsToTimeString({
        hour: selectedHour,
        minute: selectedMinute,
        meridiem: selectedMeridiem,
      });
      if (newValue !== value) {
        setValue(newValue);
      }
    }
  }, [selectedHour, selectedMinute, selectedMeridiem, setValue, value]);

  // Close on click outside
  useClickOutside(wrapperRef, () => setIsOpen(false));
  useEscapeKey(() => setIsOpen(false), isOpen);

  const baseId = id || generateFormId('timepicker', label);
  const triggerId = `${baseId}-trigger`;
  const menuId = `${baseId}-menu`;
  const labelId = label ? `${baseId}-label` : undefined;
  const helperId = helperText ? `${baseId}-helper` : undefined;

  const contextValue = useMemo<TimePickerContextValue>(
    () => ({
      isOpen,
      setIsOpen,
      value,
      setValue,
      selectedHour,
      setSelectedHour,
      selectedMinute,
      setSelectedMinute,
      selectedMeridiem,
      setSelectedMeridiem,
      disabled,
      error,
      size,
      step,
      min,
      max,
      triggerId,
      menuId,
      labelId,
    }),
    [
      isOpen,
      value,
      setValue,
      selectedHour,
      selectedMinute,
      selectedMeridiem,
      disabled,
      error,
      size,
      step,
      min,
      max,
      triggerId,
      menuId,
      labelId,
    ]
  );

  return (
    <TimePickerContext.Provider value={contextValue}>
      <div
        ref={wrapperRef}
        className={cn('relative w-full', className)}
        data-size={size}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
        data-open={isOpen}
      >
        {label && <TimePickerLabel required={required}>{label}</TimePickerLabel>}

        <TimePickerTrigger placeholder={placeholder} helperId={helperId} required={required} />
        <TimePickerMenu
          showConfirmation={showConfirmation}
          cancelLabel={cancelLabel}
          saveLabel={saveLabel}
          onCancel={onCancel}
          onSave={onSave}
        />

        {helperText && <TimePickerHelper id={helperId}>{helperText}</TimePickerHelper>}
      </div>
    </TimePickerContext.Provider>
  );
});

TimePickerRoot.displayName = 'TimePicker';

// ============================================================================
// Export
// ============================================================================

export const TimePicker = Object.assign(TimePickerRoot, {
  Trigger: TimePickerTrigger,
  Menu: TimePickerMenu,
  Option: TimePickerOption,
  Label: TimePickerLabel,
  Helper: TimePickerHelper,
});

export type { TimePickerSize };


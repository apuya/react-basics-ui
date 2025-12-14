import { type ComponentPropsWithoutRef, memo, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useControlledState } from '@/hooks/useControlledState';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/cn';
import { TimePickerContext, type TimePickerContextValue } from './TimePickerContext';
import { TimePickerTrigger } from './TimePickerTrigger';
import { TimePickerMenu } from './TimePickerMenu';
import { TimePickerOption } from './TimePickerOption';
import {
  parseTimeToComponents,
  componentsToTimeString,
  type Meridiem,
} from './timePickerUtils';
import { type TimePickerSize } from './TimePicker.styles';

// ============================================================================
// Main TimePicker Component
// ============================================================================

export interface TimePickerProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'onChange'> {
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
  /** Children components (Trigger, Menu) - use FormField for Label/Helper */
  children: React.ReactNode;
}

const TimePickerRoot = memo(function TimePickerRoot({
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  error = false,
  size = 'default',
  className,
  id,
  children,
  ...rest
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

  const reactId = useId();
  const baseId = id || reactId;
  const triggerId = `${baseId}-trigger`;
  const menuId = `${baseId}-menu`;

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
      triggerId,
      menuId,
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
      triggerId,
      menuId,
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
        {...rest}
      >
        {children}
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
});

export type { TimePickerSize };


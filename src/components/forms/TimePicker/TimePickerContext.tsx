import { createComponentContext } from '@/lib/createComponentContext';
import type { TimePickerSize } from './TimePicker.styles';
import type { Meridiem } from './timePickerUtils';

// ============================================================================
// Context
// ============================================================================

export interface TimePickerContextValue {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Function to set open state */
  setIsOpen: (open: boolean) => void;
  /** Currently selected time value (HH:MM 24-hour format) */
  value: string | undefined;
  /** Function to set the complete value */
  setValue: (value: string) => void;
  /** Currently selected hour (1-12) */
  selectedHour: number | undefined;
  /** Function to set hour */
  setSelectedHour: (hour: number) => void;
  /** Currently selected minute */
  selectedMinute: number | undefined;
  /** Function to set minute */
  setSelectedMinute: (minute: number) => void;
  /** Currently selected meridiem */
  selectedMeridiem: Meridiem;
  /** Function to set meridiem */
  setSelectedMeridiem: (meridiem: Meridiem) => void;
  /** Whether the picker is disabled */
  disabled: boolean;
  /** Whether the picker has an error */
  error: boolean;
  /** Size variant */
  size: TimePickerSize;
  /** Step interval in seconds (affects minute options) */
  step: number;
  /** Minimum time constraint */
  min?: string;
  /** Maximum time constraint */
  max?: string;
  /** ID for the trigger element */
  triggerId: string;
  /** ID for the menu element */
  menuId: string;
  /** ID for the label element */
  labelId: string | undefined;
}

const { Context: TimePickerContext, useContext: useTimePickerContext } =
  createComponentContext<TimePickerContextValue>('TimePicker');

export { TimePickerContext, useTimePickerContext };

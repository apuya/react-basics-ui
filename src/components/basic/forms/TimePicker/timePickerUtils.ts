// ============================================================================
// TimePicker Utility Functions
// ============================================================================

/** Meridiem type */
export type Meridiem = 'AM' | 'PM';

/** Parsed time components */
export interface TimeComponents {
  hour: number; // 1-12 for display
  minute: number; // 0-59
  meridiem: Meridiem;
}

/**
 * Parse 24-hour time string (HH:MM) to components
 */
export const parseTimeToComponents = (time: string): TimeComponents | null => {
  if (!time) return null;
  const [hoursStr, minsStr] = time.split(':');
  const hours24 = parseInt(hoursStr, 10);
  const minutes = parseInt(minsStr, 10);
  
  const meridiem: Meridiem = hours24 >= 12 ? 'PM' : 'AM';
  const hour = hours24 % 12 || 12;
  
  return { hour, minute: minutes, meridiem };
};

/**
 * Convert components back to 24-hour time string (HH:MM)
 */
export const componentsToTimeString = (components: TimeComponents): string => {
  let hours24 = components.hour;
  
  if (components.meridiem === 'AM') {
    hours24 = components.hour === 12 ? 0 : components.hour;
  } else {
    hours24 = components.hour === 12 ? 12 : components.hour + 12;
  }
  
  return `${hours24.toString().padStart(2, '0')}:${components.minute.toString().padStart(2, '0')}`;
};

/**
 * Parse time string (HH:MM) to total minutes
 */
export const parseTimeToMinutes = (time: string): number => {
  const [hours, mins] = time.split(':').map(Number);
  return hours * 60 + mins;
};

/**
 * Format time for display (12-hour format with AM/PM)
 */
export const formatTimeDisplay = (time: string): string => {
  if (!time) return '';
  const components = parseTimeToComponents(time);
  if (!components) return '';
  return `${components.hour}:${components.minute.toString().padStart(2, '0')} ${components.meridiem}`;
};

/**
 * Hour options for 12-hour format (12, 1-11)
 */
export const HOUR_OPTIONS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

/**
 * Generate minute options based on step
 * @param step - Step interval in seconds
 */
export const generateMinuteOptions = (step: number): number[] => {
  const options: number[] = [];
  const stepMinutes = Math.max(1, Math.floor(step / 60));
  
  for (let m = 0; m < 60; m += stepMinutes) {
    options.push(m);
  }
  
  return options;
};

/**
 * Generate meridiem options
 */
export const generateMeridiemOptions = (): Meridiem[] => {
  return ['AM', 'PM'];
};

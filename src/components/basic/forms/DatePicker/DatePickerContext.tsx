import { createContext, useContext } from 'react';
import type { DatePickerContextValue } from './DatePicker.types';

/**
 * Context for sharing state between DatePicker components
 */
export const DatePickerContext = createContext<DatePickerContextValue | null>(null);

/**
 * Hook to access DatePicker context
 * @throws Error if used outside of DatePicker
 */
export function useDatePickerContext(): DatePickerContextValue {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error('DatePicker components must be used within a <DatePicker> provider');
  }
  return context;
}

DatePickerContext.displayName = 'DatePickerContext';

import { createComponentContext } from '@/lib/createComponentContext';
import type { DatePickerContextValue } from './DatePicker.types';

/**
 * Context for sharing state between DatePicker components
 * Uses the createComponentContext factory for consistent error handling
 */
const { Context, useContext: useDatePickerContext } = createComponentContext<DatePickerContextValue>('DatePicker');

export const DatePickerContext = Context;
export { useDatePickerContext };

DatePickerContext.displayName = 'DatePickerContext';

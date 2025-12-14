import { createComponentContext } from '@/lib/createComponentContext';
import type { DatePickerContextValue } from './DatePicker.types';

/**
 * DatePicker Context - Shares state between DatePicker compound components.
 *
 * Created using `createComponentContext` factory for consistent error handling.
 * Sub-components access context via `useDatePickerContext()` hook.
 *
 * @internal Used internally by DatePicker sub-components
 */
const { Context, useContext: useDatePickerContext } = createComponentContext<DatePickerContextValue>('DatePicker');

export const DatePickerContext = Context;
export { useDatePickerContext };

DatePickerContext.displayName = 'DatePickerContext';

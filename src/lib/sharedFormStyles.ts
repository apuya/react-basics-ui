/**
 * Shared styling constants for form components
 * Eliminates duplicate style definitions across Input, Textarea, Select, FileInput, DatePicker, TimePicker
 */

export const LABEL_CLASSES =
  'block text-sm font-medium text-[color:var(--component-input-label-default)] mb-1.5';

export const LABEL_ERROR_CLASSES =
  'block text-sm font-medium text-[color:var(--component-input-label-error)] mb-1.5';

export const HELPER_CLASSES =
  'mt-1.5 text-xs font-normal text-[color:var(--component-input-helper-default)]';

export const HELPER_ERROR_CLASSES =
  'mt-1.5 text-xs font-normal text-[color:var(--component-input-helper-error)]';

/**
 * Get label classes based on error state
 */
export const getLabelClasses = (hasError: boolean): string =>
  hasError ? LABEL_ERROR_CLASSES : LABEL_CLASSES;

/**
 * Get helper text classes based on error state
 */
export const getHelperClasses = (hasError: boolean): string =>
  hasError ? HELPER_ERROR_CLASSES : HELPER_CLASSES;

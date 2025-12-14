/**
 * Shared styling constants for form components
 * Eliminates duplicate style definitions across Input, Textarea, Select, FileInput, DatePicker, TimePicker
 */

export const LABEL_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-input-label-default)] mb-[length:var(--component-input-gap-compact)]';

export const LABEL_ERROR_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-input-label-error)] mb-[length:var(--component-input-gap-compact)]';

export const HELPER_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-input-helper-default)]';

export const HELPER_ERROR_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-input-helper-error)]';

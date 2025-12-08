export const WRAPPER_BASE_CLASSES =
  'inline-flex items-center gap-2 cursor-pointer';

export const CHECKBOX_BASE_CLASSES =
  'relative inline-flex items-center justify-center rounded border border-[color:var(--component-checkbox-border-default)] bg-[color:var(--component-checkbox-bg-default)] transition-all duration-200 hover:border-[color:var(--component-checkbox-border-hover)] hover:bg-[color:var(--component-checkbox-bg-hover)] has-[:checked]:border-[color:var(--component-checkbox-border-checked)] has-[:checked]:bg-[color:var(--component-checkbox-bg-checked)] has-[:indeterminate]:border-[color:var(--component-checkbox-border-indeterminate)] has-[:indeterminate]:bg-[color:var(--component-checkbox-bg-indeterminate)] has-[:disabled]:cursor-not-allowed has-[:disabled]:border-[color:var(--component-checkbox-border-disabled)] has-[:disabled]:bg-[color:var(--component-checkbox-bg-disabled)] has-[:focus-visible]:ring-focus has-[:focus-visible]:ring-offset-focus has-[:focus-visible]:ring-ring-focus data-[error=true]:border-[color:var(--component-checkbox-border-error)]';

export const HIDDEN_INPUT_CLASSES = 'absolute inset-0 opacity-0 cursor-pointer';

export const CHECK_ICON_CLASSES =
  'absolute inset-0 flex items-center justify-center text-[color:var(--component-checkbox-check-default)] opacity-0 transition-opacity peer-checked:opacity-100 peer-indeterminate:opacity-100 peer-disabled:text-[color:var(--component-checkbox-check-disabled)]';

export const ICON_CLASSES = 'size-3';

export const LABEL_CLASSES =
  'text-sm font-medium text-[color:var(--component-checkbox-label-color)] peer-disabled:text-[color:var(--component-checkbox-label-color-disabled)] peer-disabled:cursor-not-allowed';

export const CHECKBOX_SIZE_STYLES = {
  small: 'size-4',
  default: 'size-5',
  large: 'size-6',
} as const;

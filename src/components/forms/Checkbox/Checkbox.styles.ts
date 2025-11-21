export const WRAPPER_BASE_CLASSES =
  'inline-flex items-center gap-[length:var(--component-checkbox-gap)] cursor-pointer';

export const CHECKBOX_BASE_CLASSES =
  'relative inline-flex items-center justify-center border-[color:var(--component-checkbox-border-default)] bg-[color:var(--component-checkbox-bg-default)] transition-all duration-[var(--component-checkbox-transition-duration)] hover:border-[color:var(--component-checkbox-border-hover)] hover:bg-[color:var(--component-checkbox-bg-hover)] has-[:checked]:border-[color:var(--component-checkbox-border-checked)] has-[:checked]:bg-[color:var(--component-checkbox-bg-checked)] has-[:indeterminate]:border-[color:var(--component-checkbox-border-indeterminate)] has-[:indeterminate]:bg-[color:var(--component-checkbox-bg-indeterminate)] has-[:disabled]:cursor-not-allowed has-[:disabled]:border-[color:var(--component-checkbox-border-disabled)] has-[:disabled]:bg-[color:var(--component-checkbox-bg-disabled)] has-[:focus-visible]:ring-[length:var(--semantic-focus-ring-width)] has-[:focus-visible]:ring-offset-[length:var(--semantic-focus-ring-offset)] has-[:focus-visible]:ring-[color:var(--component-checkbox-border-focus)] data-[error=true]:border-[color:var(--component-checkbox-border-error)]';

export const SIZE_STYLES = {
  small: '',
  default: '',
  large: '',
} as const;

export const HIDDEN_INPUT_CLASSES = 'absolute inset-0 opacity-0 cursor-pointer';

export const CHECK_ICON_CLASSES =
  'absolute inset-0 flex items-center justify-center text-[color:var(--component-checkbox-check-default)] opacity-[var(--component-checkbox-check-opacity-hidden)] transition-opacity peer-checked:opacity-[var(--component-checkbox-check-opacity-visible)] peer-indeterminate:opacity-[var(--component-checkbox-check-opacity-visible)] peer-disabled:text-[color:var(--component-checkbox-check-disabled)]';

export const LABEL_CLASSES =
  'text-[length:var(--component-checkbox-label-size)] font-[number:var(--component-checkbox-label-weight)] text-[color:var(--component-checkbox-label-color)] peer-disabled:text-[color:var(--component-checkbox-label-color-disabled)] peer-disabled:cursor-not-allowed';

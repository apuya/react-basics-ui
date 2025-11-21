export const BASE_CLASSES =
  'inline-flex items-center justify-center gap-[length:var(--component-button-gap)] rounded-[length:var(--component-button-radius)] border border-transparent font-[number:var(--component-button-font-weight-default)] transition-colors duration-[var(--component-button-transition-duration)] focus-visible:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:ring-[color:var(--semantic-border-focus)] disabled:cursor-not-allowed disabled:opacity-[var(--component-button-disabled-opacity)]';

export const SIZE_STYLES = {
  small:
    'h-[length:var(--component-button-height-small)] text-[length:var(--component-button-font-size-small)] font-[number:var(--component-button-font-weight-small)]',
  default:
    'h-[length:var(--component-button-height-default)] text-[length:var(--component-button-font-size-default)] font-[number:var(--component-button-font-weight-default)]',
  large:
    'h-[length:var(--component-button-height-large)] text-[length:var(--component-button-font-size-large)] font-[number:var(--component-button-font-weight-large)]',
} as const;

export const VARIANT_STYLES = {
  primary:
    'bg-[color:var(--component-button-bg-primary-default)] text-[color:var(--component-button-text-primary-default)] hover:bg-[color:var(--component-button-bg-primary-hover)] hover:text-[color:var(--component-button-text-primary-hover)] active:bg-[color:var(--component-button-bg-primary-active)] disabled:bg-[color:var(--component-button-bg-primary-disabled)] disabled:text-[color:var(--component-button-text-primary-disabled)]',
  secondary:
    'bg-[color:var(--component-button-bg-secondary-default)] text-[color:var(--component-button-text-secondary-default)] hover:bg-[color:var(--component-button-bg-secondary-hover)] hover:text-[color:var(--component-button-text-secondary-hover)] active:bg-[color:var(--component-button-bg-secondary-active)] disabled:bg-[color:var(--component-button-bg-secondary-disabled)] disabled:text-[color:var(--component-button-text-secondary-disabled)]',
  tertiary:
    'bg-[color:var(--component-button-bg-tertiary-default)] border-[color:var(--component-button-border-tertiary-default)] text-[color:var(--component-button-text-tertiary-default)] hover:bg-[color:var(--component-button-bg-tertiary-hover)] hover:border-[color:var(--component-button-border-tertiary-hover)] hover:text-[color:var(--component-button-text-tertiary-hover)] active:bg-[color:var(--component-button-bg-tertiary-active)] disabled:bg-[color:var(--component-button-bg-tertiary-disabled)] disabled:border-[color:var(--component-button-border-tertiary-disabled)] disabled:text-[color:var(--component-button-text-tertiary-disabled)]',
  ghost:
    'bg-[color:var(--component-button-bg-ghost-default)] border-[color:var(--component-button-border-ghost-default)] text-[color:var(--component-button-text-ghost-default)] hover:bg-[color:var(--component-button-bg-ghost-hover)] hover:border-[color:var(--component-button-border-ghost-hover)] hover:text-[color:var(--component-button-text-ghost-hover)] active:bg-[color:var(--component-button-bg-ghost-active)] active:border-[color:var(--component-button-border-ghost-active)] active:text-[color:var(--component-button-text-ghost-active)] disabled:bg-[color:var(--component-button-bg-ghost-disabled)] disabled:border-[color:var(--component-button-border-ghost-disabled)] disabled:text-[color:var(--component-button-text-ghost-disabled)]',
  destructive:
    'bg-[color:var(--component-button-bg-destructive-default)] border-[color:var(--component-button-border-destructive-default)] text-[color:var(--component-button-text-destructive-default)] hover:bg-[color:var(--component-button-bg-destructive-hover)] hover:border-[color:var(--component-button-border-destructive-hover)] hover:text-[color:var(--component-button-text-destructive-hover)] disabled:bg-[color:var(--component-button-bg-destructive-disabled)] disabled:border-[color:var(--component-button-border-destructive-disabled)] disabled:text-[color:var(--component-button-text-destructive-disabled)]',
} as const;

export const ICON_WRAPPER_CLASSES = 'inline-flex items-center justify-center shrink-0';

export const ICON_SIZE_STYLES = {
  small: 'w-[length:var(--component-button-icon-size-small)] h-[length:var(--component-button-icon-size-small)]',
  default: 'w-[length:var(--component-button-icon-size-default)] h-[length:var(--component-button-icon-size-default)]',
  large: 'w-[length:var(--component-button-icon-size-large)] h-[length:var(--component-button-icon-size-large)]',
} as const;

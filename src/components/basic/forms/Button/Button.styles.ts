export const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-md border border-transparent font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-offset-focus focus-visible:ring-ring-focus disabled:cursor-not-allowed disabled:opacity-disabled';

export const SIZE_STYLES = {
  small: 'h-8 px-3 text-sm font-medium',
  default: 'h-10 px-4 text-sm font-medium',
  large: 'h-12 px-6 text-base font-medium',
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
  tabs:
    'bg-[color:var(--component-button-bg-tabs-default)] border-[color:var(--component-button-border-tabs-default)] text-[color:var(--component-button-text-tabs-default)] hover:bg-[color:var(--component-button-bg-tabs-hover)] hover:border-[color:var(--component-button-border-tabs-hover)] hover:text-[color:var(--component-button-text-tabs-hover)] active:bg-[color:var(--component-button-bg-tabs-active)] active:border-[color:var(--component-button-border-tabs-active)] active:text-[color:var(--component-button-text-tabs-active)] disabled:bg-[color:var(--component-button-bg-tabs-disabled)] disabled:border-[color:var(--component-button-border-tabs-disabled)] disabled:text-[color:var(--component-button-text-tabs-disabled)]',
  nav:
    'bg-[color:var(--component-button-bg-nav-default)] border-[color:var(--component-button-border-nav-default)] text-[color:var(--component-button-text-nav-default)] hover:bg-[color:var(--component-button-bg-nav-hover)] hover:text-[color:var(--component-button-text-nav-hover)] active:bg-[color:var(--component-button-bg-nav-active)] active:text-[color:var(--component-button-text-nav-active)] disabled:bg-[color:var(--component-button-bg-nav-disabled)] disabled:text-[color:var(--component-button-text-nav-disabled)]',
} as const;

export const ICON_WRAPPER_CLASSES = 'inline-flex items-center justify-center shrink-0';

export const SPINNER_WRAPPER_CLASSES = 'inline-flex items-center justify-center shrink-0 animate-spin';

export const SPINNER_CLASSES = 'h-full w-full rounded-full border-2 border-current border-t-transparent';

export const CONTENT_CLASSES = 'inline-flex items-center justify-center';

export const ICON_SIZE_STYLES = {
  small: 'size-4',
  default: 'size-5',
  large: 'size-6',
} as const;

export type SelectSize = 'small' | 'default' | 'large';

// =============================================================================
// Trigger Styles
// =============================================================================

export const TRIGGER_BASE_CLASSES =
  'w-full flex items-center justify-between appearance-none rounded-[length:var(--component-input-radius)] border bg-[color:var(--component-select-bg-default)] text-[color:var(--component-select-text-default)] transition-colors duration-[var(--component-input-transition-duration)] focus:outline-none focus-visible:ring-[length:var(--component-select-focus-ring-width)] focus-visible:ring-offset-[length:var(--component-select-focus-ring-offset)] focus-visible:ring-[color:var(--component-select-focus-ring-color)] disabled:cursor-not-allowed disabled:bg-[color:var(--component-select-bg-disabled)] disabled:text-[color:var(--component-select-text-disabled)] disabled:opacity-[number:var(--component-select-disabled-opacity)]';

export const TRIGGER_SIZE_STYLES = {
  small: 'text-[length:var(--component-input-font-size-small)]',
  default: 'text-[length:var(--component-input-font-size-default)]',
  large: 'text-[length:var(--component-input-font-size-large)]',
} as const;

export const TRIGGER_STATE_STYLES = {
  default:
    'border-[color:var(--component-select-border-default)] hover:border-[color:var(--component-input-border-hover)] focus:border-[color:var(--component-select-border-focus)]',
  error:
    'border-[color:var(--component-select-border-error)] focus:border-[color:var(--component-select-border-error)]',
  open:
    'border-[color:var(--component-select-border-focus)]',
} as const;

export const TRIGGER_STYLE = (size: SelectSize) => ({
  height: `var(--component-input-height-${size})`,
  paddingInline: 'var(--component-input-padding-inline)',
} as const);

// =============================================================================
// Icon Styles
// =============================================================================

export const ICON_BASE_CLASSES =
  'w-[length:var(--component-input-icon-size-default)] h-[length:var(--component-input-icon-size-default)] shrink-0';

export const ICON_STATE_STYLES = {
  default: 'text-[color:var(--component-select-icon-default)] transition-transform duration-200',
  disabled: 'text-[color:var(--component-select-icon-disabled)]',
} as const;

export const ICON_OPEN_CLASSES = 'rotate-180';

// =============================================================================
// Text Styles
// =============================================================================

export const PLACEHOLDER_CLASSES = 'text-[color:var(--component-select-text-placeholder)]';

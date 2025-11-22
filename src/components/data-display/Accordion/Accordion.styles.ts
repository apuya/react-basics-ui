export const ACCORDION_ITEM_BASE_CLASSES =
  'border-b border-[var(--component-accordion-item-border)] last:border-b-0';

export const ACCORDION_ITEM_VARIANT_STYLES = {
  default: '',
  bordered: 'first:rounded-t-[var(--component-accordion-radius)] last:rounded-b-[var(--component-accordion-radius)]',
  separated: 'border border-[var(--component-accordion-border)] rounded-[var(--component-accordion-radius)]',
} as const;

export const ACCORDION_TRIGGER_BASE_CLASSES =
  'flex w-full items-center justify-between bg-[var(--component-accordion-trigger-bg-default)] text-left text-[length:var(--component-accordion-font-size)] font-[var(--component-accordion-font-weight)] text-[var(--component-accordion-trigger-text-default)] transition-all duration-[var(--component-accordion-transition-duration)] hover:bg-[var(--component-accordion-trigger-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-brand-secondary-default)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export const ACCORDION_TRIGGER_VARIANT_STYLES = {
  default: '',
  bordered: 'first:rounded-t-[var(--component-accordion-radius)]',
  separated: 'rounded-t-[var(--component-accordion-radius)]',
} as const;

export const ACCORDION_ICON_BASE_CLASSES =
  'h-[var(--component-accordion-icon-size)] w-[var(--component-accordion-icon-size)] shrink-0 transition-transform duration-[var(--component-accordion-transition-duration)]';

export const ACCORDION_ICON_OPEN_CLASS = 'rotate-180';

export const ACCORDION_CONTENT_BASE_CLASSES =
  'overflow-hidden text-[length:var(--component-accordion-font-size)] text-[var(--component-accordion-content-text)] transition-all duration-[var(--component-accordion-transition-duration)] data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]';

export const ACCORDION_CONTENT_INNER_CLASSES =
  'overflow-hidden';

export const ACCORDION_CONTENT_PADDING_CLASSES = '';

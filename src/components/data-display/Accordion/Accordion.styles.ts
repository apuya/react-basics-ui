export const ACCORDION_ITEM_BASE_CLASSES =
  'border-b border-[color:var(--component-accordion-item-border)] last:border-b-0';

export const ACCORDION_ITEM_VARIANT_STYLES = {
  default: '',
  bordered: 'first:rounded-t last:rounded-b',
  separated: 'border border-[color:var(--component-accordion-border)] rounded mb-2 last:mb-0',
} as const;

export const ACCORDION_TRIGGER_BASE_CLASSES =
  'flex w-full items-center justify-between p-4 bg-[color:var(--component-accordion-trigger-bg-default)] text-left text-sm font-medium text-[color:var(--component-accordion-trigger-text-default)] transition-all duration-200 hover:bg-[color:var(--component-accordion-trigger-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export const ACCORDION_TRIGGER_VARIANT_STYLES = {
  default: '',
  bordered: 'first:rounded-t',
  separated: 'rounded-t',
} as const;

export const ACCORDION_ICON_BASE_CLASSES =
  'size-4 shrink-0 transition-transform duration-200';

export const ACCORDION_ICON_OPEN_CLASS = 'rotate-180';

export const ACCORDION_CONTENT_BASE_CLASSES =
  'overflow-hidden text-sm text-[color:var(--component-accordion-content-text)] transition-all duration-200 data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]';

export const ACCORDION_CONTENT_INNER_CLASSES =
  'overflow-hidden pb-4 px-4';

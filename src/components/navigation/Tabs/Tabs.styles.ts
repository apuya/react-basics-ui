export const TAB_LIST_BASE_CLASSES =
  'flex gap-[var(--component-tabs-list-gap)]';

export const TAB_LIST_ORIENTATION_STYLES = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
} as const;

export const TAB_BASE_CLASSES =
  'relative inline-flex items-center justify-center font-[number:var(--component-tabs-font-weight)] rounded-[length:var(--component-tabs-radius)] border transition-all duration-[var(--component-tabs-transition)] cursor-pointer outline-none';

export const TAB_SIZE_STYLES = {
  sm: 'h-[length:var(--component-tabs-height-sm)] text-[length:var(--component-tabs-font-size-sm)] gap-[length:var(--component-tabs-gap-sm)]',
  md: 'h-[length:var(--component-tabs-height-md)] text-[length:var(--component-tabs-font-size-md)] gap-[length:var(--component-tabs-gap-md)]',
  lg: 'h-[length:var(--component-tabs-height-lg)] text-[length:var(--component-tabs-font-size-lg)] gap-[length:var(--component-tabs-gap-lg)]',
} as const;

export const TAB_STATE_STYLES = {
  default: 'bg-[color:var(--component-tabs-bg-default)] border-[color:var(--component-tabs-border-default)] text-[color:var(--component-tabs-text-default)] hover:bg-[color:var(--component-tabs-bg-hover)] hover:border-[color:var(--component-tabs-border-hover)]',
  active: 'bg-[color:var(--component-tabs-bg-active)] border-[color:var(--component-tabs-border-active)] text-[color:var(--component-tabs-text-active)]',
  disabled: 'bg-[color:var(--component-tabs-bg-disabled)] border-[color:var(--component-tabs-border-disabled)] text-[color:var(--component-tabs-text-disabled)] cursor-not-allowed opacity-50',
} as const;

export const TAB_PANEL_BASE_CLASSES =
  'outline-none';

export const TAB_PANELS_BASE_CLASSES =
  'mt-[var(--component-tabs-panels-margin)]';

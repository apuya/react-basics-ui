export const TAB_LIST_BASE_CLASSES =
  'flex gap-1';

export const TAB_LIST_ORIENTATION_STYLES = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
} as const;

export const TAB_BASE_CLASSES =
  'relative inline-flex items-center justify-center font-medium rounded border border-solid transition-all duration-200 cursor-pointer outline-none';

export const TAB_SIZE_STYLES = {
  sm: 'h-8 text-sm gap-1.5',
  md: 'h-10 text-sm gap-2',
  lg: 'h-12 text-base gap-2.5',
} as const;

export const TAB_STATE_STYLES = {
  default: 'bg-[color:var(--component-tabs-bg-default)] border-[color:var(--component-tabs-border-default)] text-[color:var(--component-tabs-text-default)] hover:bg-[color:var(--component-tabs-bg-hover)] hover:border-[color:var(--component-tabs-border-hover)]',
  active: 'bg-[color:var(--component-tabs-bg-active)] border-[color:var(--component-tabs-border-active)] text-[color:var(--component-tabs-text-active)]',
  disabled: 'bg-[color:var(--component-tabs-bg-disabled)] border-[color:var(--component-tabs-border-disabled)] text-[color:var(--component-tabs-text-disabled)] cursor-not-allowed opacity-50',
} as const;

export const TAB_PANEL_BASE_CLASSES =
  'outline-none';

export const TAB_PANELS_BASE_CLASSES =
  'mt-4';

export const TAB_PANELS_ORIENTATION_STYLES = {
  horizontal: 'mt-4',
  vertical: 'mt-0 ml-4',
} as const;

export const TABS_ROOT_ORIENTATION_STYLES = {
  horizontal: 'flex-col',
  vertical: 'flex-row gap-4',
} as const;

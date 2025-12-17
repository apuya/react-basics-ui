// Container styles
export const CONTAINER_BASE_CLASSES =
  'absolute overflow-hidden w-full opacity-0 pointer-events-none transition-opacity';

export const CONTAINER_VISIBLE_CLASS = 'opacity-100 pointer-events-auto';

// Item styles
export const ITEM_BASE_CLASSES =
  'flex items-center cursor-pointer transition-colors outline-none';

export const ITEM_STATE_STYLES = {
  default: 'bg-[color:var(--component-list-item-bg-default)] text-[color:var(--component-list-item-text-default)]',
  hover: 'bg-[color:var(--component-list-item-bg-hover)] text-[color:var(--component-list-item-text-hover)]',
  selected: 'bg-[color:var(--component-list-item-bg-active)] text-[color:var(--component-list-item-text-active)]',
  disabled: 'bg-[color:var(--component-list-item-bg-disabled)] text-[color:var(--component-list-item-text-disabled)] cursor-not-allowed opacity-50',
} as const;

export const CONTAINER_STYLE = {
  backgroundColor: 'var(--component-list-bg)',
  borderWidth: 'var(--component-list-border-width)',
  borderStyle: 'solid',
  borderColor: 'var(--component-list-border)',
  borderRadius: 'var(--component-list-radius)',
  boxShadow: 'var(--component-list-shadow)',
  zIndex: 'var(--component-list-z-index)',
  paddingInline: 'var(--component-list-padding-inline)',
  paddingBlock: 'var(--component-list-padding-block)',
  transitionDuration: 'var(--component-list-transition-duration)',
  top: '100%',
  marginTop: 'var(--component-list-menu-gap)',
} as const;

export const ITEM_STYLE = {
  height: 'var(--component-list-item-height)',
  paddingInline: 'var(--component-list-item-padding-inline)',
  paddingBlock: 'var(--component-list-item-padding-block)',
  gap: 'var(--component-list-item-gap)',
  borderRadius: 'var(--component-list-item-radius)',
} as const;

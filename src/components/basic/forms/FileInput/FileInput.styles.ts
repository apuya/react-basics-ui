export const BASE_CLASSES = 'sr-only';

export const SIZE_STYLES = {
  small: 'p-4',
  default: 'p-6',
  large: 'p-8',
} as const;

export const DROPZONE_CLASSES =
  'w-full rounded-[length:var(--component-input-radius)] border-2 border-dashed border-[color:var(--component-input-border-default)] bg-[color:var(--component-input-bg-default)] transition-colors duration-[var(--component-input-transition-duration)] hover:border-[color:var(--component-input-border-hover)] hover:bg-[color:var(--semantic-bg-secondary)] focus:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:ring-[color:var(--semantic-border-focus)] cursor-pointer flex flex-col items-center justify-center gap-3';

export const DROPZONE_DRAG_ACTIVE_CLASSES =
  'border-[color:var(--component-input-border-focus)] bg-[color:var(--semantic-bg-secondary)]';

export const DROPZONE_ERROR_CLASSES =
  'border-[color:var(--component-input-border-error)] hover:border-[color:var(--component-input-border-error)]';

export const LABEL_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-input-label-default)] mb-[length:var(--component-input-gap-compact)]';

export const LABEL_ERROR_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-input-label-error)] mb-[length:var(--component-input-gap-compact)]';

export const HELPER_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-input-helper-default)]';

export const HELPER_ERROR_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-input-helper-error)]';

export const UPLOAD_ICON_CLASSES =
  'w-12 h-12 text-[color:var(--component-input-text-placeholder)]';

export const UPLOAD_TEXT_CLASSES =
  'text-center text-[color:var(--component-input-text-default)]';

export const FILE_LIST_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] space-y-2';

export const FILE_ITEM_CLASSES =
  'flex items-center gap-3 p-3 rounded-[length:var(--component-input-radius)] bg-[color:var(--semantic-bg-secondary)] border border-[color:var(--component-input-border-default)]';

export const FILE_NAME_CLASSES =
  'text-[length:var(--component-input-font-size-default)] font-medium text-[color:var(--component-input-text-default)] truncate';

export const FILE_SIZE_CLASSES =
  'text-[length:var(--component-input-helper-font-size)] text-[color:var(--component-input-text-placeholder)] mt-0.5';

export const FILE_REMOVE_BUTTON_CLASSES =
  'flex-shrink-0 p-1 rounded hover:bg-[color:var(--semantic-bg-tertiary)] text-[color:var(--component-input-text-placeholder)] hover:text-[color:var(--semantic-text-error)] transition-colors duration-[var(--component-input-transition-duration)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--semantic-border-focus)]';

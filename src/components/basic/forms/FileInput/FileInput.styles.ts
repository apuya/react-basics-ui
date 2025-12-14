export const BASE_CLASSES = 'sr-only';

/** Container query wrapper for responsive sizing */
export const CONTAINER_CLASSES = '@container w-full';

/** Responsive icon classes using container queries */
export const RESPONSIVE_ICON_CLASSES =
  '@[0px]:w-8 @[0px]:h-8 @[200px]:w-10 @[200px]:h-10 @[300px]:w-12 @[300px]:h-12 text-[color:var(--component-fileinput-icon-default)]';

/** Responsive text classes using container queries */
export const RESPONSIVE_TEXT_CLASSES =
  '@[0px]:text-sm @[200px]:text-base @[300px]:text-lg';

/** Responsive helper text classes using container queries */
export const RESPONSIVE_HELPER_TEXT_CLASSES =
  '@[0px]:text-xs @[200px]:text-sm @[300px]:text-base';

export const DROPZONE_CLASSES =
  'w-full rounded-[length:var(--component-input-radius)] border-2 border-dashed border-[color:var(--component-fileinput-border-default)] bg-[color:var(--component-fileinput-bg-default)] transition-colors duration-[var(--component-fileinput-transition-duration)] hover:border-[color:var(--component-fileinput-border-hover)] hover:bg-[color:var(--component-fileinput-bg-hover)] focus:outline-none focus-visible:ring-[length:var(--component-fileinput-focus-ring-width)] focus-visible:ring-offset-[length:var(--component-fileinput-focus-ring-offset)] focus-visible:ring-[color:var(--component-fileinput-focus-ring-color)] cursor-pointer flex flex-col items-center justify-center gap-3';

export const DROPZONE_DRAG_ACTIVE_CLASSES =
  'border-[color:var(--component-fileinput-border-focus)] bg-[color:var(--component-fileinput-bg-drag-active)]';

export const DROPZONE_ERROR_CLASSES =
  'border-[color:var(--component-fileinput-border-error)] hover:border-[color:var(--component-fileinput-border-error)]';

export const LABEL_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-input-label-default)] mb-[length:var(--component-input-gap-compact)]';

export const LABEL_ERROR_CLASSES =
  'block text-[length:var(--component-input-label-font-size)] font-[number:var(--component-input-label-font-weight)] text-[color:var(--component-input-label-error)] mb-[length:var(--component-input-gap-compact)]';

export const HELPER_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-input-helper-default)]';

export const HELPER_ERROR_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] text-[length:var(--component-input-helper-font-size)] font-[number:var(--component-input-helper-font-weight)] text-[color:var(--component-input-helper-error)]';

export const UPLOAD_ICON_CLASSES =
  'text-[color:var(--component-fileinput-icon-default)]';

export const UPLOAD_TEXT_CLASSES =
  'text-center text-[color:var(--component-fileinput-text-default)] flex flex-col gap-1';

export const FILE_LIST_CLASSES =
  'mt-[length:var(--component-input-gap-compact)] space-y-2';

export const FILE_ITEM_CLASSES =
  'flex items-center gap-4 rounded-[length:var(--component-input-radius)] bg-[color:var(--component-fileitem-bg-default)] border border-[color:var(--component-fileitem-border-default)] transition-colors duration-[var(--component-fileinput-transition-duration)] hover:bg-[color:var(--component-fileitem-bg-hover)] has-[button:hover]:bg-[color:var(--component-fileitem-bg-error-hover)] has-[button:hover]:border-transparent';

export const FILE_ITEM_STATE_CLASSES = {
  default: '',
  uploading: 'opacity-70',
} as const;

export const FILE_REMOVE_BUTTON_CLASSES =
  'flex-shrink-0 p-1.5 rounded-[length:var(--component-input-radius)] hover:bg-[color:var(--component-fileitem-remove-bg-hover)] text-[color:var(--component-fileitem-remove-text)] hover:text-[color:var(--component-fileitem-remove-text-hover)] transition-colors duration-[var(--component-fileinput-transition-duration)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--component-fileinput-focus-ring-color)]';

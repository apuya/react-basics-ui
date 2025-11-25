export const BASE_CLASSES =
  'inline-flex items-center gap-[var(--component-tag-gap)] rounded-[var(--component-tag-radius)] font-medium transition-colors';

export const SIZE_STYLES = {
  sm: 'h-[var(--component-tag-height-sm)] px-[var(--component-tag-padding-sm)] text-[length:var(--component-tag-text-size-sm)]',
  md: 'h-[var(--component-tag-height-md)] px-[var(--component-tag-padding-md)] text-[length:var(--component-tag-text-size-md)]',
  lg: 'h-[var(--component-tag-height-lg)] px-[var(--component-tag-padding-lg)] text-[length:var(--component-tag-text-size-lg)]',
} as const;

export const VARIANT_COLOR_STYLES = {
  solid: {
    default: 'bg-gray-500 text-white border border-transparent',
    primary: 'bg-blue-600 text-white border border-transparent',
    success: 'bg-green-600 text-white border border-transparent',
    warning: 'bg-amber-500 text-white border border-transparent',
    error: 'bg-red-600 text-white border border-transparent',
    info: 'bg-blue-500 text-white border border-transparent',
  },
  outline: {
    default: 'bg-transparent text-gray-700 border border-gray-300',
    primary: 'bg-transparent text-blue-600 border border-blue-600',
    success: 'bg-transparent text-green-600 border border-green-600',
    warning: 'bg-transparent text-amber-600 border border-amber-600',
    error: 'bg-transparent text-red-600 border border-red-600',
    info: 'bg-transparent text-blue-600 border border-blue-600',
  },
  subtle: {
    default: 'bg-gray-100 text-gray-700 border border-transparent',
    primary: 'bg-blue-50 text-blue-700 border border-transparent',
    success: 'bg-green-50 text-green-700 border border-transparent',
    warning: 'bg-amber-50 text-amber-700 border border-transparent',
    error: 'bg-red-50 text-red-700 border border-transparent',
    info: 'bg-blue-50 text-blue-700 border border-transparent',
  },
} as const;

export const REMOVE_BUTTON_CLASSES =
  'ml-1 -mr-1 inline-flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer';

export type TagVariant = keyof typeof VARIANT_COLOR_STYLES;
export type TagColor = keyof typeof VARIANT_COLOR_STYLES.solid;
export type TagSize = keyof typeof SIZE_STYLES;

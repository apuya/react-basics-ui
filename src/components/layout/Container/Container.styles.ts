export const BASE_CLASSES = 'w-full mx-auto px-[length:var(--component-container-padding-inline-md)]';

export const SIZE_STYLES = {
  sm: 'max-w-[length:var(--component-container-max-width-sm)]',
  md: 'max-w-[length:var(--component-container-max-width-md)]',
  lg: 'max-w-[length:var(--component-container-max-width-lg)]',
  xl: 'max-w-[length:var(--component-container-max-width-xl)]',
  '2xl': 'max-w-[length:var(--component-container-max-width-2xl)]',
  full: 'max-w-[length:var(--component-container-max-width-full)]',
  prose: 'max-w-[65ch]',
} as const;

export const PADDING_STYLES = {
  none: 'px-0',
  sm: 'px-[length:var(--component-container-padding-inline-sm)]',
  md: 'px-[length:var(--component-container-padding-inline-md)]',
  lg: 'px-[length:var(--component-container-padding-inline-lg)]',
  xl: 'px-[length:var(--component-container-padding-inline-xl)]',
} as const;

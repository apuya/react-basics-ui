export const BASE_CLASSES = 'w-full mx-auto px-[length:var(--semantic-space-default)]';

export const SIZE_STYLES = {
  sm: 'max-w-[640px]',
  md: 'max-w-[768px]',
  lg: 'max-w-[1024px]',
  xl: 'max-w-[1280px]',
  '2xl': 'max-w-[1536px]',
  full: 'max-w-full',
  prose: 'max-w-[65ch]',
} as const;

export const PADDING_STYLES = {
  none: 'px-0',
  sm: 'px-[length:var(--semantic-space-compact)]',
  md: 'px-[length:var(--semantic-space-default)]',
  lg: 'px-[length:var(--semantic-space-comfortable)]',
  xl: 'px-[length:var(--semantic-space-loose)]',
} as const;

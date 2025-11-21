export const BASE_CLASSES = 'border-0 m-0';

export const ORIENTATION_STYLES = {
  horizontal: 'h-px w-full',
  vertical: 'w-px h-full',
} as const;

export const VARIANT_STYLES = {
  solid: 'bg-[color:var(--component-divider-color)]',
  dashed: 'border-t border-dashed border-[color:var(--component-divider-color)]',
  dotted: 'border-t border-dotted border-[color:var(--component-divider-color)]',
} as const;

export const SPACING_STYLES = {
  none: '',
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
} as const;

export const SPACING_STYLES_HORIZONTAL = {
  none: 'my-0',
  xs: 'my-[length:var(--semantic-spacing-xs)]',
  sm: 'my-[length:var(--semantic-spacing-sm)]',
  md: 'my-[length:var(--semantic-spacing-md)]',
  lg: 'my-[length:var(--semantic-spacing-lg)]',
  xl: 'my-[length:var(--semantic-spacing-xl)]',
} as const;

export const SPACING_STYLES_VERTICAL = {
  none: 'mx-0',
  xs: 'mx-[length:var(--semantic-spacing-xs)]',
  sm: 'mx-[length:var(--semantic-spacing-sm)]',
  md: 'mx-[length:var(--semantic-spacing-md)]',
  lg: 'mx-[length:var(--semantic-spacing-lg)]',
  xl: 'mx-[length:var(--semantic-spacing-xl)]',
} as const;

export const LABEL_WRAPPER_CLASSES = 'flex items-center w-full';

export const LABEL_CLASSES = 'text-[length:var(--component-text-font-size-small)] text-[color:var(--semantic-text-secondary)] px-[length:var(--semantic-spacing-md)]';

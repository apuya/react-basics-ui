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
  xs: 'my-1',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-6',
  xl: 'my-8',
} as const;

export const SPACING_STYLES_VERTICAL = {
  none: 'mx-0',
  xs: 'mx-1',
  sm: 'mx-2',
  md: 'mx-4',
  lg: 'mx-6',
  xl: 'mx-8',
} as const;

export const LABEL_WRAPPER_CLASSES = 'flex items-center w-full';

export const LABEL_CLASSES = 'text-sm text-[color:var(--semantic-text-secondary)] px-4';

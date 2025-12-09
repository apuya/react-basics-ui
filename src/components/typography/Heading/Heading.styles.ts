export const COLOR_STYLES = {
  primary: 'text-[color:var(--component-heading-color-primary)]',
  secondary: 'text-[color:var(--component-heading-color-secondary)]',
  tertiary: 'text-[color:var(--component-heading-color-tertiary)]',
  inverse: 'text-[color:var(--component-heading-color-inverse)]',
  inherit: 'text-inherit',
} as const;

export const LEVEL_STYLES = {
  h1: 'text-5xl font-bold leading-tight',
  h2: 'text-4xl font-semibold leading-tight',
  h3: 'text-3xl font-semibold leading-snug',
  h4: 'text-2xl font-semibold leading-snug',
  h5: 'text-xl font-medium leading-normal',
  h6: 'text-lg font-medium leading-normal',
} as const;

export const ALIGN_STYLES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export const FONT_FAMILY_STYLES = {
  heading: 'font-[family-name:var(--component-heading-font-family)]',
  body: 'font-[family-name:var(--component-text-font-family)]',
  mono: 'font-[family-name:var(--component-text-font-family-mono)]',
} as const;

export const COLOR_STYLES = {
  primary: 'text-[color:var(--component-heading-color-primary)]',
  secondary: 'text-[color:var(--component-heading-color-secondary)]',
  tertiary: 'text-[color:var(--component-heading-color-tertiary)]',
  inverse: 'text-[color:var(--component-heading-color-inverse)]',
  inherit: 'text-inherit',
} as const;

export const LEVEL_STYLES = {
  h1: 'text-[length:var(--component-heading-font-size-h1)] font-[number:var(--component-heading-font-weight-h1)] leading-[var(--component-heading-line-height-h1)]',
  h2: 'text-[length:var(--component-heading-font-size-h2)] font-[number:var(--component-heading-font-weight-h2)] leading-[var(--component-heading-line-height-h2)]',
  h3: 'text-[length:var(--component-heading-font-size-h3)] font-[number:var(--component-heading-font-weight-h3)] leading-[var(--component-heading-line-height-h3)]',
  h4: 'text-[length:var(--component-heading-font-size-h4)] font-[number:var(--component-heading-font-weight-h4)] leading-[var(--component-heading-line-height-h4)]',
  h5: 'text-[length:var(--component-heading-font-size-h5)] font-[number:var(--component-heading-font-weight-h5)] leading-[var(--component-heading-line-height-h5)]',
  h6: 'text-[length:var(--component-heading-font-size-h6)] font-[number:var(--component-heading-font-weight-h6)] leading-[var(--component-heading-line-height-h6)]',
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

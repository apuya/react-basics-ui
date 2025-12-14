export const BASE_CLASSES =
  'inline-flex justify-center items-center content-center flex-wrap rounded-[length:var(--component-badge-radius)] transition-colors duration-[var(--component-badge-transition-duration)] whitespace-nowrap';

export const SIZE_STYLES = {
  small:
    'min-h-[length:var(--component-badge-height-min-small)] gap-[length:var(--component-badge-gap-space-small)] text-[length:var(--component-badge-font-size-small)] font-[number:var(--component-badge-font-weight-small)] leading-[var(--component-badge-line-height-small)]',
  default:
    'min-h-[length:var(--component-badge-height-min-default)] gap-[length:var(--component-badge-gap-space-default)] text-[length:var(--component-badge-font-size-default)] font-[number:var(--component-badge-font-weight-default)] leading-[var(--component-badge-line-height-default)]',
  large:
    'h-[length:var(--component-badge-height-large)] min-h-[length:var(--component-badge-height-min-large)] gap-[length:var(--component-badge-gap-space-large)] text-[length:var(--component-badge-font-size-large)] font-[number:var(--component-badge-font-weight-large)] leading-[var(--component-badge-line-height-large)] flex-shrink-0',
} as const;

// =============================================================================
// STYLE VARIANTS (subtle, solid, outline, subtle-outline)
// =============================================================================

export const STYLE_VARIANT_CLASSES = {
  subtle: '',
  solid: '',
  outline: 'bg-transparent border',
  'subtle-outline': 'bg-transparent border',
} as const;

// =============================================================================
// COLOR VARIANTS - Subtle (default background style)
// =============================================================================

export const SUBTLE_COLOR_STYLES = {
  primary: 'bg-[color:var(--component-badge-bg-primary)] text-[color:var(--component-badge-text-primary)]',
  secondary: 'bg-[color:var(--component-badge-bg-secondary)] text-[color:var(--component-badge-text-secondary)]',
  neutral: 'bg-[color:var(--component-badge-bg-neutral)] text-[color:var(--component-badge-text-neutral)]',
  success: 'bg-[color:var(--component-badge-bg-success)] text-[color:var(--component-badge-text-success)]',
  warning: 'bg-[color:var(--component-badge-bg-warning)] text-[color:var(--component-badge-text-warning)]',
  error: 'bg-[color:var(--component-badge-bg-error)] text-[color:var(--component-badge-text-error)]',
  info: 'bg-[color:var(--component-badge-bg-info)] text-[color:var(--component-badge-text-info)]',
  blue: 'bg-[color:var(--component-badge-bg-blue)] text-[color:var(--component-badge-text-blue)]',
  cyan: 'bg-[color:var(--component-badge-bg-cyan)] text-[color:var(--component-badge-text-cyan)]',
  emerald: 'bg-[color:var(--component-badge-bg-emerald)] text-[color:var(--component-badge-text-emerald)]',
  fuchsia: 'bg-[color:var(--component-badge-bg-fuchsia)] text-[color:var(--component-badge-text-fuchsia)]',
  gold: 'bg-[color:var(--component-badge-bg-gold)] text-[color:var(--component-badge-text-gold)]',
  green: 'bg-[color:var(--component-badge-bg-green)] text-[color:var(--component-badge-text-green)]',
  indigo: 'bg-[color:var(--component-badge-bg-indigo)] text-[color:var(--component-badge-text-indigo)]',
  lime: 'bg-[color:var(--component-badge-bg-lime)] text-[color:var(--component-badge-text-lime)]',
  navy: 'bg-[color:var(--component-badge-bg-navy)] text-[color:var(--component-badge-text-navy)]',
  amber: 'bg-[color:var(--component-badge-bg-amber)] text-[color:var(--component-badge-text-amber)]',
  orange: 'bg-[color:var(--component-badge-bg-orange)] text-[color:var(--component-badge-text-orange)]',
  pink: 'bg-[color:var(--component-badge-bg-pink)] text-[color:var(--component-badge-text-pink)]',
  purple: 'bg-[color:var(--component-badge-bg-purple)] text-[color:var(--component-badge-text-purple)]',
  red: 'bg-[color:var(--component-badge-bg-red)] text-[color:var(--component-badge-text-red)]',
  rose: 'bg-[color:var(--component-badge-bg-rose)] text-[color:var(--component-badge-text-rose)]',
  sand: 'bg-[color:var(--component-badge-bg-sand)] text-[color:var(--component-badge-text-sand)]',
  sky: 'bg-[color:var(--component-badge-bg-sky)] text-[color:var(--component-badge-text-sky)]',
  slate: 'bg-[color:var(--component-badge-bg-slate)] text-[color:var(--component-badge-text-slate)]',
  teal: 'bg-[color:var(--component-badge-bg-teal)] text-[color:var(--component-badge-text-teal)]',
  violet: 'bg-[color:var(--component-badge-bg-violet)] text-[color:var(--component-badge-text-violet)]',
  yellow: 'bg-[color:var(--component-badge-bg-yellow)] text-[color:var(--component-badge-text-yellow)]',
  zinc: 'bg-[color:var(--component-badge-bg-zinc)] text-[color:var(--component-badge-text-zinc)]',
} as const;

// =============================================================================
// COLOR VARIANTS - Solid (inverted/filled style)
// =============================================================================

export const SOLID_COLOR_STYLES = {
  primary: 'bg-[color:var(--component-badge-solid-bg-primary)] text-[color:var(--component-badge-solid-text-light)]',
  secondary: 'bg-[color:var(--component-badge-solid-bg-secondary)] text-[color:var(--component-badge-solid-text-light)]',
  neutral: 'bg-[color:var(--component-badge-solid-bg-neutral)] text-[color:var(--component-badge-solid-text-light)]',
  success: 'bg-[color:var(--component-badge-solid-bg-success)] text-[color:var(--component-badge-solid-text-light)]',
  warning: 'bg-[color:var(--component-badge-solid-bg-warning)] text-[color:var(--component-badge-solid-text-light)]',
  error: 'bg-[color:var(--component-badge-solid-bg-error)] text-[color:var(--component-badge-solid-text-light)]',
  info: 'bg-[color:var(--component-badge-solid-bg-info)] text-[color:var(--component-badge-solid-text-light)]',
  blue: 'bg-[color:var(--component-badge-solid-bg-blue)] text-[color:var(--component-badge-solid-text-light)]',
  cyan: 'bg-[color:var(--component-badge-solid-bg-cyan)] text-[color:var(--component-badge-solid-text-light)]',
  emerald: 'bg-[color:var(--component-badge-solid-bg-emerald)] text-[color:var(--component-badge-solid-text-light)]',
  fuchsia: 'bg-[color:var(--component-badge-solid-bg-fuchsia)] text-[color:var(--component-badge-solid-text-light)]',
  gold: 'bg-[color:var(--component-badge-solid-bg-gold)] text-[color:var(--component-badge-solid-text-light)]',
  green: 'bg-[color:var(--component-badge-solid-bg-green)] text-[color:var(--component-badge-solid-text-light)]',
  indigo: 'bg-[color:var(--component-badge-solid-bg-indigo)] text-[color:var(--component-badge-solid-text-light)]',
  lime: 'bg-[color:var(--component-badge-solid-bg-lime)] text-[color:var(--component-badge-solid-text-light)]',
  navy: 'bg-[color:var(--component-badge-solid-bg-navy)] text-[color:var(--component-badge-solid-text-light)]',
  amber: 'bg-[color:var(--component-badge-solid-bg-amber)] text-[color:var(--component-badge-solid-text-light)]',
  orange: 'bg-[color:var(--component-badge-solid-bg-orange)] text-[color:var(--component-badge-solid-text-light)]',
  pink: 'bg-[color:var(--component-badge-solid-bg-pink)] text-[color:var(--component-badge-solid-text-light)]',
  purple: 'bg-[color:var(--component-badge-solid-bg-purple)] text-[color:var(--component-badge-solid-text-light)]',
  red: 'bg-[color:var(--component-badge-solid-bg-red)] text-[color:var(--component-badge-solid-text-light)]',
  rose: 'bg-[color:var(--component-badge-solid-bg-rose)] text-[color:var(--component-badge-solid-text-light)]',
  sand: 'bg-[color:var(--component-badge-solid-bg-sand)] text-[color:var(--component-badge-solid-text-dark)]',
  sky: 'bg-[color:var(--component-badge-solid-bg-sky)] text-[color:var(--component-badge-solid-text-light)]',
  slate: 'bg-[color:var(--component-badge-solid-bg-slate)] text-[color:var(--component-badge-solid-text-light)]',
  teal: 'bg-[color:var(--component-badge-solid-bg-teal)] text-[color:var(--component-badge-solid-text-light)]',
  violet: 'bg-[color:var(--component-badge-solid-bg-violet)] text-[color:var(--component-badge-solid-text-light)]',
  yellow: 'bg-[color:var(--component-badge-solid-bg-yellow)] text-[color:var(--component-badge-solid-text-dark)]',
  zinc: 'bg-[color:var(--component-badge-solid-bg-zinc)] text-[color:var(--component-badge-solid-text-light)]',
} as const;

// =============================================================================
// COLOR VARIANTS - Outline (border only, transparent background)
// =============================================================================

export const OUTLINE_COLOR_STYLES = {
  primary: 'border-[color:var(--component-badge-outline-border-primary)] text-[color:var(--component-badge-outline-border-primary)]',
  secondary: 'border-[color:var(--component-badge-outline-border-secondary)] text-[color:var(--component-badge-outline-border-secondary)]',
  neutral: 'border-[color:var(--component-badge-outline-border-neutral)] text-[color:var(--component-badge-outline-border-neutral)]',
  success: 'border-[color:var(--component-badge-outline-border-success)] text-[color:var(--component-badge-outline-border-success)]',
  warning: 'border-[color:var(--component-badge-outline-border-warning)] text-[color:var(--component-badge-outline-border-warning)]',
  error: 'border-[color:var(--component-badge-outline-border-error)] text-[color:var(--component-badge-outline-border-error)]',
  info: 'border-[color:var(--component-badge-outline-border-info)] text-[color:var(--component-badge-outline-border-info)]',
  blue: 'border-[color:var(--component-badge-outline-border-blue)] text-[color:var(--component-badge-outline-border-blue)]',
  cyan: 'border-[color:var(--component-badge-outline-border-cyan)] text-[color:var(--component-badge-outline-border-cyan)]',
  emerald: 'border-[color:var(--component-badge-outline-border-emerald)] text-[color:var(--component-badge-outline-border-emerald)]',
  fuchsia: 'border-[color:var(--component-badge-outline-border-fuchsia)] text-[color:var(--component-badge-outline-border-fuchsia)]',
  gold: 'border-[color:var(--component-badge-outline-border-gold)] text-[color:var(--component-badge-outline-border-gold)]',
  green: 'border-[color:var(--component-badge-outline-border-green)] text-[color:var(--component-badge-outline-border-green)]',
  indigo: 'border-[color:var(--component-badge-outline-border-indigo)] text-[color:var(--component-badge-outline-border-indigo)]',
  lime: 'border-[color:var(--component-badge-outline-border-lime)] text-[color:var(--component-badge-outline-border-lime)]',
  navy: 'border-[color:var(--component-badge-outline-border-navy)] text-[color:var(--component-badge-outline-border-navy)]',
  amber: 'border-[color:var(--component-badge-outline-border-amber)] text-[color:var(--component-badge-outline-border-amber)]',
  orange: 'border-[color:var(--component-badge-outline-border-orange)] text-[color:var(--component-badge-outline-border-orange)]',
  pink: 'border-[color:var(--component-badge-outline-border-pink)] text-[color:var(--component-badge-outline-border-pink)]',
  purple: 'border-[color:var(--component-badge-outline-border-purple)] text-[color:var(--component-badge-outline-border-purple)]',
  red: 'border-[color:var(--component-badge-outline-border-red)] text-[color:var(--component-badge-outline-border-red)]',
  rose: 'border-[color:var(--component-badge-outline-border-rose)] text-[color:var(--component-badge-outline-border-rose)]',
  sand: 'border-[color:var(--component-badge-outline-border-sand)] text-[color:var(--component-badge-outline-border-sand)]',
  sky: 'border-[color:var(--component-badge-outline-border-sky)] text-[color:var(--component-badge-outline-border-sky)]',
  slate: 'border-[color:var(--component-badge-outline-border-slate)] text-[color:var(--component-badge-outline-border-slate)]',
  teal: 'border-[color:var(--component-badge-outline-border-teal)] text-[color:var(--component-badge-outline-border-teal)]',
  violet: 'border-[color:var(--component-badge-outline-border-violet)] text-[color:var(--component-badge-outline-border-violet)]',
  yellow: 'border-[color:var(--component-badge-outline-border-yellow)] text-[color:var(--component-badge-outline-border-yellow)]',
  zinc: 'border-[color:var(--component-badge-outline-border-zinc)] text-[color:var(--component-badge-outline-border-zinc)]',
} as const;

// =============================================================================
// COLOR VARIANTS - Subtle Outline (transparent background + colored border)
// Uses CSS variables consistently for theming support
// =============================================================================

export const SUBTLE_OUTLINE_COLOR_STYLES = {
  primary: 'text-[color:var(--component-badge-bg-primary)] border-[color:var(--component-badge-bg-primary)]',
  secondary: 'text-[color:var(--component-badge-bg-secondary)] border-[color:var(--component-badge-bg-secondary)]',
  neutral: 'text-[color:var(--component-badge-bg-neutral)] border-[color:var(--component-badge-bg-neutral)]',
  success: 'text-[color:var(--component-badge-bg-success)] border-[color:var(--component-badge-bg-success)]',
  warning: 'text-[color:var(--component-badge-bg-warning)] border-[color:var(--component-badge-bg-warning)]',
  error: 'text-[color:var(--component-badge-bg-error)] border-[color:var(--component-badge-bg-error)]',
  info: 'text-[color:var(--component-badge-bg-info)] border-[color:var(--component-badge-bg-info)]',
  blue: 'text-[color:var(--component-badge-bg-blue)] border-[color:var(--component-badge-bg-blue)]',
  cyan: 'text-[color:var(--component-badge-bg-cyan)] border-[color:var(--component-badge-bg-cyan)]',
  emerald: 'text-[color:var(--component-badge-bg-emerald)] border-[color:var(--component-badge-bg-emerald)]',
  fuchsia: 'text-[color:var(--component-badge-bg-fuchsia)] border-[color:var(--component-badge-bg-fuchsia)]',
  gold: 'text-[color:var(--component-badge-bg-gold)] border-[color:var(--component-badge-bg-gold)]',
  green: 'text-[color:var(--component-badge-bg-green)] border-[color:var(--component-badge-bg-green)]',
  indigo: 'text-[color:var(--component-badge-bg-indigo)] border-[color:var(--component-badge-bg-indigo)]',
  lime: 'text-[color:var(--component-badge-bg-lime)] border-[color:var(--component-badge-bg-lime)]',
  navy: 'text-[color:var(--component-badge-bg-navy)] border-[color:var(--component-badge-bg-navy)]',
  amber: 'text-[color:var(--component-badge-bg-amber)] border-[color:var(--component-badge-bg-amber)]',
  orange: 'text-[color:var(--component-badge-bg-orange)] border-[color:var(--component-badge-bg-orange)]',
  pink: 'text-[color:var(--component-badge-bg-pink)] border-[color:var(--component-badge-bg-pink)]',
  purple: 'text-[color:var(--component-badge-bg-purple)] border-[color:var(--component-badge-bg-purple)]',
  red: 'text-[color:var(--component-badge-bg-red)] border-[color:var(--component-badge-bg-red)]',
  rose: 'text-[color:var(--component-badge-bg-rose)] border-[color:var(--component-badge-bg-rose)]',
  sand: 'text-[color:var(--component-badge-bg-sand)] border-[color:var(--component-badge-bg-sand)]',
  sky: 'text-[color:var(--component-badge-bg-sky)] border-[color:var(--component-badge-bg-sky)]',
  slate: 'text-[color:var(--component-badge-bg-slate)] border-[color:var(--component-badge-bg-slate)]',
  teal: 'text-[color:var(--component-badge-bg-teal)] border-[color:var(--component-badge-bg-teal)]',
  violet: 'text-[color:var(--component-badge-bg-violet)] border-[color:var(--component-badge-bg-violet)]',
  yellow: 'text-[color:var(--component-badge-bg-yellow)] border-[color:var(--component-badge-bg-yellow)]',
  zinc: 'text-[color:var(--component-badge-bg-zinc)] border-[color:var(--component-badge-bg-zinc)]',
} as const;

// =============================================================================
// STYLE VARIANT TO COLOR STYLES MAP - Optimized lookup
// =============================================================================

export const COLOR_STYLES_BY_VARIANT = {
  subtle: SUBTLE_COLOR_STYLES,
  solid: SOLID_COLOR_STYLES,
  outline: OUTLINE_COLOR_STYLES,
  'subtle-outline': SUBTLE_OUTLINE_COLOR_STYLES,
} as const;

// Legacy export for backwards compatibility
export const VARIANT_STYLES = SUBTLE_COLOR_STYLES;

export const PADDING_TOKENS = {
  small: {
    paddingInline: 'var(--component-badge-padding-inline-small)',
    paddingBlock: 'var(--component-badge-padding-block-small)',
  },
  default: {
    paddingInline: 'var(--component-badge-padding-inline-default)',
    paddingBlock: 'var(--component-badge-padding-block-default)',
  },
  large: {
    paddingInline: 'var(--component-badge-padding-inline-large)',
    paddingBlock: 'var(--component-badge-padding-block-large)',
  },
} as const;

export const ICON_SIZE_TOKENS = {
  small: {
    height: 'var(--component-badge-icon-size-small)',
    width: 'var(--component-badge-icon-size-small)',
  },
  default: {
    height: 'var(--component-badge-icon-size-default)',
    width: 'var(--component-badge-icon-size-default)',
  },
  large: {
    height: 'var(--component-badge-icon-size-large)',
    width: 'var(--component-badge-icon-size-large)',
  },
} as const;

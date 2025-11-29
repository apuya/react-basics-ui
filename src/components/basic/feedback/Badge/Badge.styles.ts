export const BASE_CLASSES =
  'inline-flex justify-center items-center content-center flex-wrap rounded-[var(--component-badge-radius)] transition-colors duration-[var(--component-badge-transition-duration)] whitespace-nowrap';

export const SIZE_STYLES = {
  small:
    'min-h-[var(--component-badge-height-min-small)] gap-[var(--component-badge-gap-space-small)] text-[length:var(--component-badge-font-size-small)] font-[var(--component-badge-font-weight-small)] leading-[var(--component-badge-line-height-small)]',
  default:
    'min-h-[var(--component-badge-height-min-default)] gap-[var(--component-badge-gap-space-default)] text-[length:var(--component-badge-font-size-default)] font-[var(--component-badge-font-weight-default)] leading-[var(--component-badge-line-height-default)]',
  large:
    'h-[var(--component-badge-height-large)] min-h-[var(--component-badge-height-min-large)] gap-[var(--component-badge-gap-space-large)] text-[length:var(--component-badge-font-size-large)] font-[var(--component-badge-font-weight-large)] leading-[var(--component-badge-line-height-large)] flex-shrink-0',
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
  primary: 'bg-[var(--component-badge-bg-primary)] text-[var(--component-badge-text-primary)]',
  secondary: 'bg-[var(--component-badge-bg-secondary)] text-[var(--component-badge-text-secondary)]',
  neutral: 'bg-[var(--component-badge-bg-neutral)] text-[var(--component-badge-text-neutral)]',
  success: 'bg-[var(--component-badge-bg-success)] text-[var(--component-badge-text-success)]',
  warning: 'bg-[var(--component-badge-bg-warning)] text-[var(--component-badge-text-warning)]',
  error: 'bg-[var(--component-badge-bg-error)] text-[var(--component-badge-text-error)]',
  info: 'bg-[var(--component-badge-bg-info)] text-[var(--component-badge-text-info)]',
  blue: 'bg-[var(--component-badge-bg-blue)] text-[var(--component-badge-text-blue)]',
  cyan: 'bg-[var(--component-badge-bg-cyan)] text-[var(--component-badge-text-cyan)]',
  emerald: 'bg-[var(--component-badge-bg-emerald)] text-[var(--component-badge-text-emerald)]',
  fuchsia: 'bg-[var(--component-badge-bg-fuchsia)] text-[var(--component-badge-text-fuchsia)]',
  gold: 'bg-[var(--component-badge-bg-gold)] text-[var(--component-badge-text-gold)]',
  green: 'bg-[var(--component-badge-bg-green)] text-[var(--component-badge-text-green)]',
  indigo: 'bg-[var(--component-badge-bg-indigo)] text-[var(--component-badge-text-indigo)]',
  lime: 'bg-[var(--component-badge-bg-lime)] text-[var(--component-badge-text-lime)]',
  navy: 'bg-[var(--component-badge-bg-navy)] text-[var(--component-badge-text-navy)]',
  amber: 'bg-[var(--component-badge-bg-amber)] text-[var(--component-badge-text-amber)]',
  orange: 'bg-[var(--component-badge-bg-orange)] text-[var(--component-badge-text-orange)]',
  pink: 'bg-[var(--component-badge-bg-pink)] text-[var(--component-badge-text-pink)]',
  purple: 'bg-[var(--component-badge-bg-purple)] text-[var(--component-badge-text-purple)]',
  red: 'bg-[var(--component-badge-bg-red)] text-[var(--component-badge-text-red)]',
  rose: 'bg-[var(--component-badge-bg-rose)] text-[var(--component-badge-text-rose)]',
  sand: 'bg-[var(--component-badge-bg-sand)] text-[var(--component-badge-text-sand)]',
  sky: 'bg-[var(--component-badge-bg-sky)] text-[var(--component-badge-text-sky)]',
  slate: 'bg-[var(--component-badge-bg-slate)] text-[var(--component-badge-text-slate)]',
  teal: 'bg-[var(--component-badge-bg-teal)] text-[var(--component-badge-text-teal)]',
  violet: 'bg-[var(--component-badge-bg-violet)] text-[var(--component-badge-text-violet)]',
  yellow: 'bg-[var(--component-badge-bg-yellow)] text-[var(--component-badge-text-yellow)]',
  zinc: 'bg-[var(--component-badge-bg-zinc)] text-[var(--component-badge-text-zinc)]',
} as const;

// =============================================================================
// COLOR VARIANTS - Solid (inverted/filled style)
// =============================================================================

export const SOLID_COLOR_STYLES = {
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-600 text-white',
  neutral: 'bg-gray-500 text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-amber-500 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-blue-500 text-white',
  blue: 'bg-blue-600 text-white',
  cyan: 'bg-cyan-600 text-white',
  emerald: 'bg-emerald-600 text-white',
  fuchsia: 'bg-fuchsia-600 text-white',
  gold: 'bg-yellow-600 text-white',
  green: 'bg-green-600 text-white',
  indigo: 'bg-indigo-600 text-white',
  lime: 'bg-lime-600 text-white',
  navy: 'bg-blue-900 text-white',
  amber: 'bg-amber-600 text-white',
  orange: 'bg-orange-600 text-white',
  pink: 'bg-pink-600 text-white',
  purple: 'bg-purple-600 text-white',
  red: 'bg-red-600 text-white',
  rose: 'bg-rose-600 text-white',
  sand: 'bg-amber-200 text-amber-900',
  sky: 'bg-sky-600 text-white',
  slate: 'bg-slate-600 text-white',
  teal: 'bg-teal-600 text-white',
  violet: 'bg-violet-600 text-white',
  yellow: 'bg-yellow-500 text-black',
  zinc: 'bg-zinc-600 text-white',
} as const;

// =============================================================================
// COLOR VARIANTS - Outline (border only, transparent background)
// =============================================================================

export const OUTLINE_COLOR_STYLES = {
  primary: 'border-blue-600 text-blue-600',
  secondary: 'border-gray-600 text-gray-600',
  neutral: 'border-gray-400 text-gray-600',
  success: 'border-green-600 text-green-600',
  warning: 'border-amber-500 text-amber-600',
  error: 'border-red-600 text-red-600',
  info: 'border-blue-500 text-blue-600',
  blue: 'border-blue-600 text-blue-600',
  cyan: 'border-cyan-600 text-cyan-600',
  emerald: 'border-emerald-600 text-emerald-600',
  fuchsia: 'border-fuchsia-600 text-fuchsia-600',
  gold: 'border-yellow-600 text-yellow-600',
  green: 'border-green-600 text-green-600',
  indigo: 'border-indigo-600 text-indigo-600',
  lime: 'border-lime-600 text-lime-600',
  navy: 'border-blue-900 text-blue-900',
  amber: 'border-amber-600 text-amber-600',
  orange: 'border-orange-600 text-orange-600',
  pink: 'border-pink-600 text-pink-600',
  purple: 'border-purple-600 text-purple-600',
  red: 'border-red-600 text-red-600',
  rose: 'border-rose-600 text-rose-600',
  sand: 'border-amber-400 text-amber-700',
  sky: 'border-sky-600 text-sky-600',
  slate: 'border-slate-600 text-slate-600',
  teal: 'border-teal-600 text-teal-600',
  violet: 'border-violet-600 text-violet-600',
  yellow: 'border-yellow-500 text-yellow-600',
  zinc: 'border-zinc-600 text-zinc-600',
} as const;

// =============================================================================
// COLOR VARIANTS - Subtle Outline (transparent background + colored border)
// Uses CSS variables consistently for theming support
// =============================================================================

export const SUBTLE_OUTLINE_COLOR_STYLES = {
  primary: 'text-[var(--component-badge-bg-primary)] border-[var(--component-badge-bg-primary)]',
  secondary: 'text-[var(--component-badge-bg-secondary)] border-[var(--component-badge-bg-secondary)]',
  neutral: 'text-[var(--component-badge-bg-neutral)] border-[var(--component-badge-bg-neutral)]',
  success: 'text-[var(--component-badge-bg-success)] border-[var(--component-badge-bg-success)]',
  warning: 'text-[var(--component-badge-bg-warning)] border-[var(--component-badge-bg-warning)]',
  error: 'text-[var(--component-badge-bg-error)] border-[var(--component-badge-bg-error)]',
  info: 'text-[var(--component-badge-bg-info)] border-[var(--component-badge-bg-info)]',
  blue: 'text-[var(--component-badge-bg-blue)] border-[var(--component-badge-bg-blue)]',
  cyan: 'text-[var(--component-badge-bg-cyan)] border-[var(--component-badge-bg-cyan)]',
  emerald: 'text-[var(--component-badge-bg-emerald)] border-[var(--component-badge-bg-emerald)]',
  fuchsia: 'text-[var(--component-badge-bg-fuchsia)] border-[var(--component-badge-bg-fuchsia)]',
  gold: 'text-[var(--component-badge-bg-gold)] border-[var(--component-badge-bg-gold)]',
  green: 'text-[var(--component-badge-bg-green)] border-[var(--component-badge-bg-green)]',
  indigo: 'text-[var(--component-badge-bg-indigo)] border-[var(--component-badge-bg-indigo)]',
  lime: 'text-[var(--component-badge-bg-lime)] border-[var(--component-badge-bg-lime)]',
  navy: 'text-[var(--component-badge-bg-navy)] border-[var(--component-badge-bg-navy)]',
  amber: 'text-[var(--component-badge-bg-amber)] border-[var(--component-badge-bg-amber)]',
  orange: 'text-[var(--component-badge-bg-orange)] border-[var(--component-badge-bg-orange)]',
  pink: 'text-[var(--component-badge-bg-pink)] border-[var(--component-badge-bg-pink)]',
  purple: 'text-[var(--component-badge-bg-purple)] border-[var(--component-badge-bg-purple)]',
  red: 'text-[var(--component-badge-bg-red)] border-[var(--component-badge-bg-red)]',
  rose: 'text-[var(--component-badge-bg-rose)] border-[var(--component-badge-bg-rose)]',
  sand: 'text-[var(--component-badge-bg-sand)] border-[var(--component-badge-bg-sand)]',
  sky: 'text-[var(--component-badge-bg-sky)] border-[var(--component-badge-bg-sky)]',
  slate: 'text-[var(--component-badge-bg-slate)] border-[var(--component-badge-bg-slate)]',
  teal: 'text-[var(--component-badge-bg-teal)] border-[var(--component-badge-bg-teal)]',
  violet: 'text-[var(--component-badge-bg-violet)] border-[var(--component-badge-bg-violet)]',
  yellow: 'text-[var(--component-badge-bg-yellow)] border-[var(--component-badge-bg-yellow)]',
  zinc: 'text-[var(--component-badge-bg-zinc)] border-[var(--component-badge-bg-zinc)]',
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

// Derive types from style objects
export type BadgeColor = keyof typeof SUBTLE_COLOR_STYLES;
export type BadgeSize = keyof typeof SIZE_STYLES;
export type BadgeStyleVariant = keyof typeof STYLE_VARIANT_CLASSES;

// Legacy type alias for backwards compatibility
export type BadgeVariant = BadgeColor;

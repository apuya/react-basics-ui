import type { BadgeVariant, BadgeSize } from './Badge';

export const BASE_CLASSES =
  'inline-flex justify-center items-center content-center flex-wrap rounded-[var(--component-badge-radius)] transition-colors duration-[var(--component-badge-transition-duration)] whitespace-nowrap';

export const SIZE_STYLES: Record<BadgeSize, string> = {
  small: 
    'min-h-[var(--component-badge-height-min-small)] gap-[var(--component-badge-gap-space-small)] text-[length:var(--component-badge-font-size-small)] font-[var(--component-badge-font-weight-small)] leading-[var(--component-badge-line-height-small)]',
  default: 
    'min-h-[var(--component-badge-height-min-default)] gap-[var(--component-badge-gap-space-default)] text-[length:var(--component-badge-font-size-default)] font-[var(--component-badge-font-weight-default)] leading-[var(--component-badge-line-height-default)]',
  large: 
    'h-[var(--component-badge-height-large)] min-h-[var(--component-badge-height-min-large)] gap-[var(--component-badge-gap-space-large)] text-[length:var(--component-badge-font-size-large)] font-[var(--component-badge-font-weight-large)] leading-[var(--component-badge-line-height-large)] flex-shrink-0',
};

export const VARIANT_STYLES: Record<Exclude<BadgeVariant, `${string}-dismissible`>, string> = {
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
};

export const ICON_STYLES = 'w-[1em] h-[1em]';

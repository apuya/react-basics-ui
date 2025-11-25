import type { CardVariant } from './Card';

export const BASE_CLASSES =
  'rounded-[var(--component-card-radius)] bg-[var(--component-card-bg)] text-[var(--component-card-text)] border-[length:var(--component-card-border-width)] border-[var(--component-card-border)]';

export const VARIANT_STYLES: Record<CardVariant, string> = {
  default: '',
  elevated: 'shadow-[var(--component-card-shadow)]',
  outlined: 'border-[var(--component-card-border)]',
  interactive: 'cursor-pointer transition-shadow duration-[var(--component-card-transition-duration)] hover:shadow-[var(--component-card-shadow-hover)]',
};

export const HEADER_CLASSES = 'flex flex-col border-b border-[var(--component-card-border)]';

export const CONTENT_CLASSES = 'flex-1';

export const FOOTER_CLASSES = 'flex items-center gap-[var(--component-card-gap-compact)] border-t border-[var(--component-card-border)]';

export const TITLE_CLASSES = 'text-[length:var(--component-card-title-size)] font-[var(--component-card-title-weight)] text-[var(--component-card-text)]';

export const DESCRIPTION_CLASSES = 'text-[length:var(--component-card-description-size)] font-[var(--component-card-description-weight)] text-[var(--semantic-text-secondary)] mt-[var(--component-card-gap-compact)]';

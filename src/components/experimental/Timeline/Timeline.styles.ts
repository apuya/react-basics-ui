import type { TimelineVariant, TimelinePosition } from './Timeline';

export const TIMELINE_BASE_CLASSES = 'relative';

export const TIMELINE_POSITION_STYLES: Record<TimelinePosition, string> = {
  left: 'flex flex-col items-start',
  right: 'flex flex-col items-end',
  alternate: 'flex flex-col',
};

export const ITEM_BASE_CLASSES = 'relative flex gap-4 pb-8 last:pb-0';

export const ITEM_POSITION_STYLES: Record<TimelinePosition, string> = {
  left: 'flex-row',
  right: 'flex-row-reverse',
  alternate: '', // Applied dynamically
};

export const DOT_CONTAINER_CLASSES = 'relative flex flex-col items-center shrink-0';

export const DOT_BASE_CLASSES =
  'relative z-10 flex items-center justify-center rounded-full border-[length:var(--component-timeline-dot-border-width)] border-[var(--component-timeline-dot-border)] bg-[var(--component-timeline-dot-bg)] transition-colors';

export const DOT_VARIANT_STYLES: Record<TimelineVariant, string> = {
  default: '',
  primary: 'bg-[var(--semantic-color-primary)] border-[var(--semantic-color-primary)]',
  success: 'bg-[var(--semantic-color-success)] border-[var(--semantic-color-success)]',
  warning: 'bg-[var(--semantic-color-warning)] border-[var(--semantic-color-warning)]',
  error: 'bg-[var(--semantic-color-error)] border-[var(--semantic-color-error)]',
  info: 'bg-[var(--semantic-color-info)] border-[var(--semantic-color-info)]',
};

export const DOT_SIZE_STYLES = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export const DOT_ICON_SIZE_STYLES = {
  sm: 'w-6 h-6 p-1',
  md: 'w-8 h-8 p-1.5',
  lg: 'w-10 h-10 p-2',
};

export const CONNECTOR_CLASSES =
  'absolute top-0 left-1/2 -translate-x-1/2 w-[var(--component-timeline-connector-width)] bg-[var(--component-timeline-connector-bg)]';

export const CONNECTOR_VARIANT_STYLES: Record<TimelineVariant, string> = {
  default: '',
  primary: 'bg-[var(--semantic-color-primary)]',
  success: 'bg-[var(--semantic-color-success)]',
  warning: 'bg-[var(--semantic-color-warning)]',
  error: 'bg-[var(--semantic-color-error)]',
  info: 'bg-[var(--semantic-color-info)]',
};

export const CONTENT_BASE_CLASSES = 'flex-1 min-w-0';

export const TITLE_CLASSES = 'text-[length:var(--component-timeline-title-size)] font-[var(--component-timeline-title-weight)] text-[var(--component-timeline-title-color)] mb-1';

export const TIMESTAMP_CLASSES = 'text-[length:var(--component-timeline-timestamp-size)] text-[var(--component-timeline-timestamp-color)] mb-2';

export const DESCRIPTION_CLASSES = 'text-[length:var(--component-timeline-description-size)] text-[var(--component-timeline-description-color)]';

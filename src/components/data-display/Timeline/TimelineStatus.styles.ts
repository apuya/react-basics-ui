import type { TimelineStatusVariant, TimelineStatusSize } from './TimelineStatus';
import type { IconSize } from '@/components/utility/Icon';

// Status area container
export const STATUS_BASE_CLASSES =
  'flex w-full items-start transition-colors duration-200 text-left';

export const STATUS_INTERACTIVE_CLASSES =
  'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--component-timeline-item-focus-ring)] focus-visible:ring-offset-1';

export const STATUS_DISABLED_CLASSES =
  'opacity-50 pointer-events-none cursor-not-allowed';

// Status variant classes - bg and icon colors from variant, text always dark
export const STATUS_VARIANT_STYLES: Record<TimelineStatusVariant, string> = {
  default:
    'bg-[color:var(--component-timeline-status-bg-default)] hover:bg-[color:var(--component-timeline-status-bg-default-hover)] [--status-icon-color:var(--component-timeline-status-icon-default)]',
  info: 'bg-[color:var(--component-timeline-status-bg-info)] hover:bg-[color:var(--component-timeline-status-bg-info-hover)] [--status-icon-color:var(--component-timeline-status-icon-info)]',
  success:
    'bg-[color:var(--component-timeline-status-bg-success)] hover:bg-[color:var(--component-timeline-status-bg-success-hover)] [--status-icon-color:var(--component-timeline-status-icon-success)]',
  warning:
    'bg-[color:var(--component-timeline-status-bg-warning)] hover:bg-[color:var(--component-timeline-status-bg-warning-hover)] [--status-icon-color:var(--component-timeline-status-icon-warning)]',
  error:
    'bg-[color:var(--component-timeline-status-bg-error)] hover:bg-[color:var(--component-timeline-status-bg-error-hover)] [--status-icon-color:var(--component-timeline-status-icon-error)]',
} as const;

// Status icon container - uses the CSS custom property set by variant
export const STATUS_ICON_CLASSES = 'shrink-0 text-[color:var(--status-icon-color)]';

// Status content container
export const STATUS_CONTENT_CLASSES = 'flex-1 min-w-0 text-left';

// =============================================================================
// INLINE STYLE TOKENS
// =============================================================================

export const STATUS_STYLE = {
  marginTop: 'var(--component-timeline-status-margin-top)',
  padding: 'var(--component-timeline-status-padding)',
  borderRadius: 'var(--component-timeline-status-border-radius)',
  gap: 'var(--component-timeline-status-gap)',
} as const;

// Icon size mapping based on status size
export const ICON_SIZE_MAP: Record<TimelineStatusSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'md',
} as const;

// Text size mapping based on status size
export const TEXT_SIZE_MAP: Record<TimelineStatusSize, 'small' | 'body'> = {
  sm: 'small',
  md: 'small',
  lg: 'body',
} as const;

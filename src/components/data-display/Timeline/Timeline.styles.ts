import type React from 'react';
import type { TimelineVariant, TimelinePosition, TimelineSize } from './Timeline.context';

// Timeline container
export const TIMELINE_BASE_CLASSES = 'relative';

export const TIMELINE_POSITION_STYLES: Record<TimelinePosition, string> = {
  left: 'flex flex-col items-start',
  right: 'flex flex-col items-end',
  alternate: 'flex flex-col',
};

// Timeline item
export const ITEM_BASE_CLASSES = 'relative flex items-start';

export const ITEM_DISABLED_CLASSES = 'opacity-50 pointer-events-none';

export const ITEM_POSITION_STYLES: Record<TimelinePosition, string> = {
  left: 'flex-row',
  right: 'flex-row-reverse',
  alternate: '', // Applied dynamically
};

// Dot container
export const DOT_CONTAINER_CLASSES = 'relative flex flex-col items-center shrink-0';

// Dot base classes
export const DOT_BASE_CLASSES =
  'relative z-10 inline-flex items-center justify-center rounded-full border-2 border-[color:var(--component-timeline-dot-border)] bg-[color:var(--component-timeline-dot-bg)] transition-colors duration-200';

export const DOT_SIZE_STYLES: Record<TimelineSize, string> = {
  sm: 'size-2',
  md: 'size-3',
  lg: 'size-4',
};

// Dot container sizes when containing an icon - larger to accommodate icon
export const DOT_ICON_CONTAINER_SIZE_STYLES: Record<TimelineSize, string> = {
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-8',
};

export const DOT_VARIANT_STYLES: Record<TimelineVariant, string> = {
  default: '',
  primary:
    'bg-[color:var(--component-timeline-dot-bg-primary)] border-[color:var(--component-timeline-dot-border-primary)] text-[color:var(--component-timeline-dot-icon-color)]',
  success:
    'bg-[color:var(--component-timeline-dot-bg-success)] border-[color:var(--component-timeline-dot-border-success)] text-[color:var(--component-timeline-dot-icon-color)]',
  warning:
    'bg-[color:var(--component-timeline-dot-bg-warning)] border-[color:var(--component-timeline-dot-border-warning)] text-[color:var(--component-timeline-dot-icon-color)]',
  error:
    'bg-[color:var(--component-timeline-dot-bg-error)] border-[color:var(--component-timeline-dot-border-error)] text-[color:var(--component-timeline-dot-icon-color)]',
  info:
    'bg-[color:var(--component-timeline-dot-bg-info)] border-[color:var(--component-timeline-dot-border-info)] text-[color:var(--component-timeline-dot-icon-color)]',
};

// Connector base - position set via inline style based on dot size
export const CONNECTOR_CLASSES =
  'absolute w-0.5 bg-[color:var(--component-timeline-connector-bg)]';

// Left-aligned connector (default) - uses left position with negative translate
export const CONNECTOR_LEFT_CLASSES = '-translate-x-1/2';

// Right-aligned connector - uses right position with positive translate
export const CONNECTOR_RIGHT_CLASSES = 'translate-x-1/2';

export const CONNECTOR_VARIANT_STYLES: Record<TimelineVariant, string> = {
  default: '',
  primary: 'bg-[color:var(--component-timeline-connector-bg-primary)]',
  success: 'bg-[color:var(--component-timeline-connector-bg-success)]',
  warning: 'bg-[color:var(--component-timeline-connector-bg-warning)]',
  error: 'bg-[color:var(--component-timeline-connector-bg-error)]',
  info: 'bg-[color:var(--component-timeline-connector-bg-info)]',
};

// Content
export const CONTENT_BASE_CLASSES = 'flex-1 min-w-0 flex flex-col';

// Content header (title area)
export const CONTENT_HEADER_CLASSES = 'flex items-start justify-between';

// Header content wrapper (leading + title)
export const HEADER_CONTENT_WRAPPER_CLASSES = 'flex items-center min-w-0 flex-1';

// Leading area
export const LEADING_CLASSES = 'shrink-0 flex items-center justify-center';

// Loading/Skeleton
export const SKELETON_DOT_CLASSES = 'rounded-full bg-[color:var(--component-timeline-skeleton-bg)]';

export const SKELETON_LINE_CLASSES = 'h-4 rounded bg-[color:var(--component-timeline-skeleton-bg)]';

// =============================================================================
// INLINE STYLE TOKENS
// =============================================================================

// Item spacing - use Tailwind classes for simple spacing
export const ITEM_SPACING_CLASSES = 'gap-3 pb-4';
export const ITEM_LAST_SPACING_CLASSES = 'gap-3 pb-0';

export const TITLE_SPACING_CLASSES = 'mb-1';

export const TIMESTAMP_SPACING_CLASSES = 'mb-2';

export const LEADING_SPACING_CLASSES = 'mr-2';

// Dot container width - Tailwind classes matching icon container sizes
export const DOT_CONTAINER_WIDTH_CLASSES: Record<TimelineSize, string> = {
  sm: 'w-5',   // 20px - matches icon container
  md: 'w-6',   // 24px
  lg: 'w-8',   // 32px
} as const;

// Icon wrapper classes - Tailwind sizing
export const ICON_WRAPPER_CLASSES: Record<TimelineSize, string> = {
  sm: 'flex items-center justify-center size-3', // 12px icon
  md: 'flex items-center justify-center size-3.5', // 14px icon
  lg: 'flex items-center justify-center size-4', // 16px icon
} as const;

// Skeleton dot classes - Tailwind sizing
export const SKELETON_DOT_SIZE_CLASSES: Record<TimelineSize, string> = {
  sm: 'size-2',   // 8px
  md: 'size-3',   // 12px
  lg: 'size-4',   // 16px
} as const;

// Skeleton line width styles - width as style, margin as classes
export const SKELETON_TIMESTAMP_STYLE = { width: '30%' } as const;
export const SKELETON_TIMESTAMP_CLASSES = 'mb-2';
export const SKELETON_TITLE_STYLE = { width: '60%' } as const;
export const SKELETON_TITLE_CLASSES = 'mb-1';
export const SKELETON_DESCRIPTION_STYLE = { width: '80%' } as const;

// Connector positioning styles - using Tailwind pixel values
// These need inline styles because they use calc() with size-dependent values
// Dot sizes: sm=8px, md=12px, lg=16px | Icon container sizes: sm=20px, md=24px, lg=32px
const createConnectorDotStyles = (side: 'left' | 'right'): Record<TimelineSize, React.CSSProperties> => ({
  sm: {
    top: '8px',  // size-2 = 8px
    bottom: 0,
    [side]: '10px', // (20px icon container) / 2 = 10px
  },
  md: {
    top: '12px', // size-3 = 12px
    bottom: 0,
    [side]: '12px', // (24px icon container) / 2 = 12px
  },
  lg: {
    top: '16px', // size-4 = 16px
    bottom: 0,
    [side]: '16px', // (32px icon container) / 2 = 16px
  },
});

const createConnectorIconStyles = (side: 'left' | 'right'): Record<TimelineSize, React.CSSProperties> => ({
  sm: {
    top: '20px',  // size-5 = 20px (icon container)
    bottom: 0,
    [side]: '10px', // (20px icon container) / 2 = 10px
  },
  md: {
    top: '24px', // size-6 = 24px (icon container)
    bottom: 0,
    [side]: '12px', // (24px icon container) / 2 = 12px
  },
  lg: {
    top: '32px', // size-8 = 32px (icon container)
    bottom: 0,
    [side]: '16px', // (32px icon container) / 2 = 16px
  },
});

export const CONNECTOR_DOT_LEFT_STYLES = createConnectorDotStyles('left');
export const CONNECTOR_DOT_RIGHT_STYLES = createConnectorDotStyles('right');
export const CONNECTOR_ICON_LEFT_STYLES = createConnectorIconStyles('left');
export const CONNECTOR_ICON_RIGHT_STYLES = createConnectorIconStyles('right');

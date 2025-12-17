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

export const ITEM_DISABLED_CLASSES = 'opacity-[number:var(--component-timeline-disabled-opacity)] pointer-events-none';

export const ITEM_POSITION_STYLES: Record<TimelinePosition, string> = {
  left: 'flex-row',
  right: 'flex-row-reverse',
  alternate: '', // Applied dynamically
};

// Dot container
export const DOT_CONTAINER_CLASSES = 'relative flex flex-col items-center shrink-0';

// Dot base classes
export const DOT_BASE_CLASSES =
  'relative z-10 inline-flex items-center justify-center rounded-full border-[length:var(--component-timeline-dot-border-width)] border-[color:var(--component-timeline-dot-border)] bg-[color:var(--component-timeline-dot-bg)] transition-colors duration-[var(--component-timeline-transition)]';

export const DOT_SIZE_STYLES: Record<TimelineSize, string> = {
  sm: 'w-[length:var(--component-timeline-dot-size-sm)] h-[length:var(--component-timeline-dot-size-sm)]',
  md: 'w-[length:var(--component-timeline-dot-size-md)] h-[length:var(--component-timeline-dot-size-md)]',
  lg: 'w-[length:var(--component-timeline-dot-size-lg)] h-[length:var(--component-timeline-dot-size-lg)]',
};

// Dot container sizes when containing an icon - larger to accommodate icon
export const DOT_ICON_CONTAINER_SIZE_STYLES: Record<TimelineSize, string> = {
  sm: 'w-[length:var(--component-timeline-dot-icon-container-size-sm)] h-[length:var(--component-timeline-dot-icon-container-size-sm)]',
  md: 'w-[length:var(--component-timeline-dot-icon-container-size-md)] h-[length:var(--component-timeline-dot-icon-container-size-md)]',
  lg: 'w-[length:var(--component-timeline-dot-icon-container-size-lg)] h-[length:var(--component-timeline-dot-icon-container-size-lg)]',
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
  'absolute w-[length:var(--component-timeline-connector-width)] bg-[color:var(--component-timeline-connector-bg)]';

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

// Item spacing tokens
export const ITEM_STYLE = {
  gap: 'var(--component-timeline-item-gap)',
  paddingBottom: 'var(--component-timeline-item-padding-bottom)',
} as const;

export const ITEM_LAST_STYLE = {
  gap: 'var(--component-timeline-item-gap)',
  paddingBottom: 0,
} as const;

export const TITLE_STYLE = {
  marginBottom: 'var(--component-timeline-title-margin-bottom)',
} as const;

export const TIMESTAMP_STYLE = {
  marginBottom: 'var(--component-timeline-timestamp-margin-bottom)',
} as const;

export const LEADING_STYLE = {
  marginRight: 'var(--component-timeline-leading-gap)',
} as const;

// Dot container width - always use icon container size for consistent connector alignment
export const DOT_CONTAINER_WIDTH: Record<TimelineSize, React.CSSProperties> = {
  sm: { width: 'var(--component-timeline-dot-icon-container-size-sm)' },
  md: { width: 'var(--component-timeline-dot-icon-container-size-md)' },
  lg: { width: 'var(--component-timeline-dot-icon-container-size-lg)' },
} as const;

// Icon wrapper styles for dot content
const ICON_WRAPPER_BASE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const ICON_WRAPPER_STYLES: Record<TimelineSize, React.CSSProperties> = {
  sm: { ...ICON_WRAPPER_BASE, width: 'var(--component-timeline-dot-icon-size-sm)', height: 'var(--component-timeline-dot-icon-size-sm)' },
  md: { ...ICON_WRAPPER_BASE, width: 'var(--component-timeline-dot-icon-size-md)', height: 'var(--component-timeline-dot-icon-size-md)' },
  lg: { ...ICON_WRAPPER_BASE, width: 'var(--component-timeline-dot-icon-size-lg)', height: 'var(--component-timeline-dot-icon-size-lg)' },
} as const;

// Skeleton dot sizes
export const SKELETON_DOT_SIZE: Record<TimelineSize, React.CSSProperties> = {
  sm: { width: 'var(--component-timeline-dot-size-sm)', height: 'var(--component-timeline-dot-size-sm)' },
  md: { width: 'var(--component-timeline-dot-size-md)', height: 'var(--component-timeline-dot-size-md)' },
  lg: { width: 'var(--component-timeline-dot-size-lg)', height: 'var(--component-timeline-dot-size-lg)' },
} as const;

// Skeleton line width styles
export const SKELETON_TIMESTAMP_STYLE = { width: '30%', marginBottom: 'var(--component-timeline-timestamp-margin-bottom)' } as const;
export const SKELETON_TITLE_STYLE = { width: '60%', marginBottom: 'var(--component-timeline-title-margin-bottom)' } as const;
export const SKELETON_DESCRIPTION_STYLE = { width: '80%' } as const;

// Connector positioning styles
const createConnectorDotStyles = (side: 'left' | 'right'): Record<TimelineSize, React.CSSProperties> => ({
  sm: {
    top: 'var(--component-timeline-dot-size-sm)',
    bottom: 0,
    [side]: 'calc(var(--component-timeline-dot-icon-container-size-sm) / 2)',
  },
  md: {
    top: 'var(--component-timeline-dot-size-md)',
    bottom: 0,
    [side]: 'calc(var(--component-timeline-dot-icon-container-size-md) / 2)',
  },
  lg: {
    top: 'var(--component-timeline-dot-size-lg)',
    bottom: 0,
    [side]: 'calc(var(--component-timeline-dot-icon-container-size-lg) / 2)',
  },
});

const createConnectorIconStyles = (side: 'left' | 'right'): Record<TimelineSize, React.CSSProperties> => ({
  sm: {
    top: 'var(--component-timeline-dot-icon-container-size-sm)',
    bottom: 0,
    [side]: 'calc(var(--component-timeline-dot-icon-container-size-sm) / 2)',
  },
  md: {
    top: 'var(--component-timeline-dot-icon-container-size-md)',
    bottom: 0,
    [side]: 'calc(var(--component-timeline-dot-icon-container-size-md) / 2)',
  },
  lg: {
    top: 'var(--component-timeline-dot-icon-container-size-lg)',
    bottom: 0,
    [side]: 'calc(var(--component-timeline-dot-icon-container-size-lg) / 2)',
  },
});

export const CONNECTOR_DOT_LEFT_STYLES = createConnectorDotStyles('left');
export const CONNECTOR_DOT_RIGHT_STYLES = createConnectorDotStyles('right');
export const CONNECTOR_ICON_LEFT_STYLES = createConnectorIconStyles('left');
export const CONNECTOR_ICON_RIGHT_STYLES = createConnectorIconStyles('right');

// ============================================================================
// DatePicker Styles
// ============================================================================

// ----------------------------------------------------------------------------
// Wrapper
// ----------------------------------------------------------------------------

export const WRAPPER_CLASSES = 'relative inline-flex';

// ----------------------------------------------------------------------------
// Trigger Button (uses Button component with tertiary variant)
// ----------------------------------------------------------------------------

export const TRIGGER_PLACEHOLDER_CLASSES =
  'text-current opacity-70';

export const TRIGGER_VALUE_CLASSES =
  'text-current';

/** Error state override for Button's tertiary variant */
export const TRIGGER_ERROR_CLASSES =
  'border-[color:var(--semantic-status-error-default)]';

// ----------------------------------------------------------------------------
// Content / Popover (hugs content, children define their own min sizes)
// ----------------------------------------------------------------------------

export const CONTENT_BASE_CLASSES =
  'absolute z-50 bg-[color:var(--component-datepicker-bg-default)] border border-[color:var(--component-datepicker-border-default)] shadow-[var(--component-datepicker-shadow)] opacity-0 pointer-events-none transition-opacity ease-out';

/** Inline styles for content container */
export const CONTENT_BASE_STYLE: React.CSSProperties = {
  borderRadius: 'var(--component-datepicker-radius)',
  transitionDuration: 'var(--component-datepicker-transition-duration)',
  width: 'max-content',
};

export const CONTENT_VISIBLE_CLASS =
  'opacity-100 pointer-events-auto';

// Layout variants for content
export const CONTENT_LAYOUT_CLASSES = {
  // Single calendar layouts (vertical stack)
  'single': 'flex flex-col',
  'single-range': 'flex flex-col',
  // Double calendar layouts
  'double-range': 'flex flex-col',
  // Double with presets: column layout with footer spanning full width
  'double-presets': 'flex flex-col',
} as const;

// Row container for presets + calendars (used in double-presets)
export const CONTENT_ROW_CLASSES = 'flex flex-row relative';

export const CONTENT_ROW_STYLE: React.CSSProperties = {
  alignItems: 'stretch',
};

// Wrapper for presets to enable scrolling within calendar height
export const PRESETS_WRAPPER_CLASSES = 'relative self-stretch shrink-0 border-r border-[color:var(--component-datepicker-border-default)]';

export const PRESETS_WRAPPER_STYLE: React.CSSProperties = {
  width: 'var(--component-datepicker-preset-width-min)',
};

// Inner container for calendars (used with presets)
export const CONTENT_MAIN_CLASSES = 'flex flex-col';

// Container for dual calendars side by side
export const CONTENT_CALENDARS_CLASSES = 'flex flex-row';

export const CONTENT_POSITION_STYLES = {
  top: {
    start: 'bottom-full left-0 mb-2',
    center: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    end: 'bottom-full right-0 mb-2',
  },
  bottom: {
    start: 'top-full left-0 mt-2',
    center: 'top-full left-1/2 -translate-x-1/2 mt-2',
    end: 'top-full right-0 mt-2',
  },
  left: {
    start: 'right-full top-0 mr-2',
    center: 'right-full top-1/2 -translate-y-1/2 mr-2',
    end: 'right-full bottom-0 mr-2',
  },
  right: {
    start: 'left-full top-0 ml-2',
    center: 'left-full top-1/2 -translate-y-1/2 ml-2',
    end: 'left-full bottom-0 ml-2',
  },
} as const;

// ----------------------------------------------------------------------------
// Calendar
// ----------------------------------------------------------------------------

export const CALENDAR_BASE_CLASSES =
  'flex flex-col items-stretch select-none shrink-0';

/** Inline styles for calendar container */
export const CALENDAR_BASE_STYLE: React.CSSProperties = {
  width: 'fit-content',
  padding: 'var(--component-datepicker-padding)',
};

export const DUAL_CALENDAR_CLASSES =
  'flex flex-row items-stretch shrink-0';

/** Inline styles for DualCalendar container */
export const DUAL_CALENDAR_STYLE: React.CSSProperties = {
  gap: 'var(--component-datepicker-gap)',
};

export const CALENDAR_GRID_CLASSES =
  'grid grid-cols-7 w-full';

/** Inline styles for calendar grid */
export const CALENDAR_GRID_STYLE: React.CSSProperties = {
  gap: 'var(--component-datepicker-cell-gap)',
};

export const CALENDAR_WEEKDAY_HEADER_CLASSES =
  'grid grid-cols-7 w-full';

/** Inline styles for weekday header */
export const CALENDAR_WEEKDAY_HEADER_STYLE: React.CSSProperties = {
  gap: 'var(--component-datepicker-cell-gap)',
  marginBottom: 'var(--component-datepicker-cell-gap)',
};

// ----------------------------------------------------------------------------
// Calendar Header
// ----------------------------------------------------------------------------

export const HEADER_BASE_CLASSES =
  'flex items-center justify-between w-full shrink-0';

/** Inline styles for header */
export const HEADER_BASE_STYLE: React.CSSProperties = {
  width: '100%',
  height: 'var(--component-datepicker-header-height)',
  paddingBlock: 'var(--component-datepicker-header-padding-block)',
  paddingInline: 'var(--component-datepicker-header-padding-inline)',
  gap: 'var(--component-datepicker-header-gap)',
};

export const HEADER_TITLE_WRAPPER_CLASSES =
  'flex-1 flex items-center justify-center gap-1 text-[color:var(--component-datepicker-header-text)]';

/** Inline styles for header title wrapper */
export const HEADER_TITLE_WRAPPER_STYLE: React.CSSProperties = {
  fontWeight: 'var(--component-datepicker-header-font-weight)',
  minWidth: 0, // Allow flex shrinking
};

/** Inline styles for header title */
export const HEADER_TITLE_STYLE: React.CSSProperties = {
  fontSize: 'var(--component-datepicker-header-font-size)',
};

export const HEADER_SELECT_CLASSES =
  'appearance-none bg-transparent border-none text-[color:var(--component-datepicker-header-text)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--semantic-border-focus)] rounded px-1';

/** Inline styles for header select */
export const HEADER_SELECT_STYLE: React.CSSProperties = {
  fontWeight: 'var(--component-datepicker-header-font-weight)',
};

// ----------------------------------------------------------------------------
// Date Cell
// ----------------------------------------------------------------------------

export const CELL_BASE_CLASSES =
  'flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--semantic-border-focus)] focus-visible:ring-inset transition-colors aspect-square';

/** Inline styles for cell base */
export const CELL_BASE_STYLE: React.CSSProperties = {
  minWidth: 'var(--component-datepicker-cell-min-width)',
  minHeight: 'var(--component-datepicker-cell-min-height)',
  maxWidth: 'var(--component-datepicker-cell-min-width)',
  maxHeight: 'var(--component-datepicker-cell-min-height)',
  padding: 'var(--component-datepicker-cell-padding-block)',
  fontSize: 'var(--component-datepicker-cell-font-size)',
  fontWeight: 'var(--component-datepicker-cell-font-weight)',
  transitionDuration: 'var(--component-datepicker-transition-duration)',
};

export const CELL_STATE_STYLES = {
  default:
    'text-[color:var(--component-datepicker-cell-text-default)] bg-[color:var(--component-datepicker-cell-bg-default)] hover:bg-[color:var(--component-datepicker-cell-bg-hover)] hover:text-[color:var(--component-datepicker-cell-text-hover)]',
  selected:
    'bg-[color:var(--component-datepicker-cell-bg-selected)] text-[color:var(--component-datepicker-cell-text-selected)]',
  'range-start':
    'bg-[color:var(--component-datepicker-cell-bg-selected)] text-[color:var(--component-datepicker-cell-text-selected)]',
  'range-end':
    'bg-[color:var(--component-datepicker-cell-bg-selected)] text-[color:var(--component-datepicker-cell-text-selected)]',
  'in-range':
    'bg-[color:var(--component-datepicker-cell-bg-range)] text-[color:var(--component-datepicker-cell-text-default)]',
  today:
    'bg-[color:var(--component-datepicker-cell-bg-today)] text-[color:var(--component-datepicker-cell-text-default)] hover:bg-[color:var(--component-datepicker-cell-bg-today-hover)] hover:text-[color:var(--component-datepicker-cell-text-today-hover)]',
  disabled:
    'text-[color:var(--component-datepicker-cell-text-disabled)] cursor-not-allowed opacity-50',
  'outside-month':
    'text-[color:var(--component-datepicker-cell-text-disabled)] opacity-40 hover:bg-transparent cursor-default',
  header:
    'text-[color:var(--component-datepicker-cell-header-text)] cursor-default',
} as const;

/** Inline styles for cell states with border radius */
export const CELL_STATE_RADIUS_STYLES = {
  default: {
    borderRadius: 'var(--component-datepicker-cell-radius-selected)',
  } as React.CSSProperties,
  selected: {
    borderRadius: 'var(--component-datepicker-cell-radius-selected)',
  } as React.CSSProperties,
  'range-start': {
    borderTopLeftRadius: 'var(--component-datepicker-cell-radius-selected)',
    borderBottomLeftRadius: 'var(--component-datepicker-cell-radius-selected)',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  } as React.CSSProperties,
  'range-end': {
    borderTopRightRadius: 'var(--component-datepicker-cell-radius-selected)',
    borderBottomRightRadius: 'var(--component-datepicker-cell-radius-selected)',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  } as React.CSSProperties,
  'in-range': {
    borderRadius: 0,
  } as React.CSSProperties,
  today: {
    borderRadius: 'var(--component-datepicker-cell-radius-selected)',
  } as React.CSSProperties,
  disabled: {
    borderRadius: 'var(--component-datepicker-cell-radius-selected)',
  } as React.CSSProperties,
  'outside-month': {
    borderRadius: 'var(--component-datepicker-cell-radius-selected)',
  } as React.CSSProperties,
  header: {} as React.CSSProperties,
} as const;

/** Inline styles for header cell */
export const CELL_HEADER_STYLE: React.CSSProperties = {
  ...CELL_BASE_STYLE,
  fontSize: 'var(--component-datepicker-cell-header-font-size)',
  fontWeight: 'var(--component-datepicker-cell-header-font-weight)',
};

/** Pre-computed cell styles with radius for each state */
export const CELL_COMBINED_STYLES = {
  default: { ...CELL_BASE_STYLE, ...CELL_STATE_RADIUS_STYLES.default },
  selected: { ...CELL_BASE_STYLE, ...CELL_STATE_RADIUS_STYLES.selected },
  'range-start': { ...CELL_BASE_STYLE, ...CELL_STATE_RADIUS_STYLES['range-start'] },
  'range-end': { ...CELL_BASE_STYLE, ...CELL_STATE_RADIUS_STYLES['range-end'] },
  'in-range': { ...CELL_BASE_STYLE, ...CELL_STATE_RADIUS_STYLES['in-range'] },
  today: { ...CELL_BASE_STYLE, ...CELL_STATE_RADIUS_STYLES.today },
  disabled: { ...CELL_BASE_STYLE, ...CELL_STATE_RADIUS_STYLES.disabled },
  'outside-month': { ...CELL_BASE_STYLE, ...CELL_STATE_RADIUS_STYLES['outside-month'] },
  header: CELL_HEADER_STYLE,
} as const;

// ----------------------------------------------------------------------------
// Presets
// ----------------------------------------------------------------------------

export const PRESETS_BASE_CLASSES =
  'flex flex-col gap-0 overflow-y-auto overflow-x-hidden absolute inset-0';

export const PRESETS_BASE_STYLE: React.CSSProperties = {
  padding: 'var(--component-datepicker-preset-padding-block)',
  minHeight: 'var(--component-datepicker-preset-min-height)',
};

// Static presets (for standalone display without wrapper)
export const PRESETS_STATIC_CLASSES =
  'flex flex-col gap-0 overflow-y-auto overflow-x-hidden';

export const PRESETS_STATIC_STYLE: React.CSSProperties = {
  padding: 'var(--component-datepicker-preset-padding-block)',
  minWidth: 'var(--component-datepicker-preset-width-min)',
  minHeight: 'var(--component-datepicker-preset-min-height)',
};

export const PRESETS_DIVIDER_CLASSES =
  'w-full shrink-0';

export const PRESETS_DIVIDER_STYLE: React.CSSProperties = {
  height: 'var(--component-datepicker-divider-height)',
  minHeight: 'var(--component-datepicker-divider-height)',
  marginTop: 'var(--component-datepicker-preset-gap)',
  marginBottom: 'var(--component-datepicker-preset-gap)',
  backgroundColor: 'var(--component-datepicker-divider)',
};

export const PRESETS_ITEM_CLASSES =
  'flex items-center justify-start self-stretch text-sm rounded text-[color:var(--component-datepicker-preset-text)] hover:bg-[color:var(--component-datepicker-preset-bg-hover)] hover:text-[color:var(--component-datepicker-preset-text-hover)] active:bg-[color:var(--component-datepicker-preset-bg-active)] active:text-[color:var(--component-datepicker-preset-text-active)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--semantic-border-focus)]';

export const PRESETS_ITEM_STYLE: React.CSSProperties = {
  minHeight: 'var(--component-datepicker-preset-item-height-min)',
  paddingInline: 'var(--component-datepicker-preset-padding-inline)',
  paddingBlock: 'var(--component-datepicker-preset-padding-block)',
  transitionDuration: 'var(--component-datepicker-transition-duration)',
};

export const PRESETS_ITEM_ACTIVE_CLASSES =
  'bg-[color:var(--component-datepicker-cell-bg-range)] text-[color:var(--component-datepicker-preset-text)]';

// ----------------------------------------------------------------------------
// Confirmation Footer
// ----------------------------------------------------------------------------

export const CONFIRMATION_BASE_CLASSES =
  'flex items-center border-t border-[color:var(--component-datepicker-border-default)] shrink-0';

export const CONFIRMATION_BASE_STYLE: React.CSSProperties = {
  paddingBlock: 'var(--component-datepicker-footer-padding)',
  paddingInline: 'var(--component-datepicker-footer-padding)',
  gap: 'var(--component-datepicker-footer-gap)',
};

// Stacked layout for single-range variant
export const CONFIRMATION_STACKED_CLASSES =
  'flex flex-col items-center border-t border-[color:var(--component-datepicker-border-default)] shrink-0';

export const CONFIRMATION_STACKED_STYLE: React.CSSProperties = {
  paddingBlock: 'var(--component-datepicker-footer-padding)',
  paddingInline: 'var(--component-datepicker-footer-padding)',
  gap: 'var(--component-datepicker-footer-gap)',
};

export const CONFIRMATION_DATE_INPUTS_CLASSES =
  'flex items-center flex-1';

export const CONFIRMATION_DATE_INPUTS_STYLE: React.CSSProperties = {
  gap: 'var(--component-datepicker-footer-gap)',
};

// Stacked inputs for single-range (vertical stack, full width)
export const CONFIRMATION_DATE_INPUTS_STACKED_CLASSES =
  'flex flex-col w-full';

export const CONFIRMATION_DATE_INPUTS_STACKED_STYLE: React.CSSProperties = {
  gap: 'var(--component-datepicker-footer-gap)',
};

// Input wrapper for stacked layout (full width)
export const CONFIRMATION_DATE_INPUT_STACKED_CLASSES =
  'w-full';

export const CONFIRMATION_DATE_INPUT_CLASSES =
  'flex-1 w-0 min-w-0';

export const CONFIRMATION_BUTTONS_CLASSES =
  'flex justify-end items-center';

export const CONFIRMATION_BUTTONS_STYLE: React.CSSProperties = {
  gap: 'var(--component-datepicker-footer-gap)',
};

// Stacked buttons for single-range (full width, side by side)
export const CONFIRMATION_BUTTONS_STACKED_CLASSES =
  'flex w-full';

export const CONFIRMATION_BUTTONS_STACKED_STYLE: React.CSSProperties = {
  gap: 'var(--component-datepicker-footer-gap)',
};


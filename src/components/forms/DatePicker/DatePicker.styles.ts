// ============================================================================
// DatePicker Styles
// ============================================================================

// ----------------------------------------------------------------------------
// Wrapper
// ----------------------------------------------------------------------------

export const WRAPPER_CLASSES = 'relative inline-flex';

// ----------------------------------------------------------------------------
// Trigger Button (uses button tertiary variant styling)
// ----------------------------------------------------------------------------

export const TRIGGER_BASE_CLASSES =
  'inline-flex items-center justify-between border transition-colors focus-visible:outline-none cursor-pointer whitespace-nowrap gap-2 rounded-md duration-200';

export const TRIGGER_SIZE_CLASSES = {
  small: 'text-sm font-medium h-8 px-3',
  default: 'text-sm font-medium h-10 px-4',
  large: 'text-base font-medium h-12 px-6',
} as const;

export const TRIGGER_STATE_STYLES = {
  default:
    'bg-[color:var(--component-button-bg-tertiary-default)] border-[color:var(--component-button-border-tertiary-default)] text-[color:var(--component-button-text-tertiary-default)] hover:bg-[color:var(--component-button-bg-tertiary-hover)] hover:border-[color:var(--component-button-border-tertiary-hover)] hover:text-[color:var(--component-button-text-tertiary-hover)] active:bg-[color:var(--component-button-bg-tertiary-active)]',
  error:
    'bg-[color:var(--component-button-bg-tertiary-default)] border-[color:var(--semantic-status-error-default)] text-[color:var(--component-button-text-tertiary-default)] hover:bg-[color:var(--component-button-bg-tertiary-hover)]',
  disabled:
    'cursor-not-allowed opacity-disabled bg-[color:var(--component-button-bg-tertiary-disabled)] border-[color:var(--component-button-border-tertiary-disabled)] text-[color:var(--component-button-text-tertiary-disabled)]',
} as const;

export const TRIGGER_ICON_CLASSES =
  'text-current shrink-0';

export const TRIGGER_PLACEHOLDER_CLASSES =
  'text-current opacity-70';

export const TRIGGER_VALUE_CLASSES =
  'text-current';

// ----------------------------------------------------------------------------
// Content / Popover (hugs content, children define their own min sizes)
// ----------------------------------------------------------------------------

export const CONTENT_BASE_CLASSES =
  'absolute z-50 bg-[color:var(--component-datepicker-bg-default)] border border-[color:var(--component-datepicker-border-default)] shadow-lg opacity-0 pointer-events-none transition-opacity ease-out duration-200 rounded-lg w-max';

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
export const CONTENT_ROW_CLASSES = 'flex flex-row relative items-stretch';

// Wrapper for presets to enable scrolling within calendar height
export const PRESETS_WRAPPER_CLASSES = 'relative self-stretch shrink-0 border-r border-[color:var(--component-datepicker-border-default)] w-40';

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
  'flex flex-col items-stretch select-none shrink-0 w-fit p-4';

export const DUAL_CALENDAR_CLASSES =
  'flex flex-row items-stretch shrink-0 gap-4';

export const CALENDAR_GRID_CLASSES =
  'grid grid-cols-7 w-full gap-1';

export const CALENDAR_WEEKDAY_HEADER_CLASSES =
  'grid grid-cols-7 w-full gap-1 mb-1';

// ----------------------------------------------------------------------------
// Calendar Header
// ----------------------------------------------------------------------------

export const HEADER_BASE_CLASSES =
  'flex items-center justify-between w-full shrink-0 h-10 py-2 px-3 gap-2';

export const HEADER_TITLE_WRAPPER_CLASSES =
  'flex-1 flex items-center justify-center gap-1 text-[color:var(--component-datepicker-header-text)] font-semibold min-w-0';

/** Classes for header title (font size via Tailwind) */
export const HEADER_TITLE_CLASSES = 'text-base';

export const HEADER_SELECT_CLASSES =
  'appearance-none bg-transparent border-none text-[color:var(--component-datepicker-header-text)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--semantic-border-focus)] rounded px-1 font-semibold';

// ----------------------------------------------------------------------------
// Date Cell
// ----------------------------------------------------------------------------

export const CELL_BASE_CLASSES =
  'flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--semantic-border-focus)] focus-visible:ring-inset transition-colors aspect-square text-sm font-normal size-9 p-1 duration-200';

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
export const CELL_STATE_RADIUS_CLASSES = {
  default: 'rounded-md',
  selected: 'rounded-md',
  'range-start': 'rounded-l-md rounded-r-none',
  'range-end': 'rounded-r-md rounded-l-none',
  'in-range': 'rounded-none',
  today: 'rounded-md',
  disabled: 'rounded-md',
  'outside-month': 'rounded-md',
  header: '',
} as const;

/** Classes for header cell (font via Tailwind) */
export const CELL_HEADER_CLASSES = 'text-xs font-semibold';

// ----------------------------------------------------------------------------
// Presets
// ----------------------------------------------------------------------------

export const PRESETS_BASE_CLASSES =
  'flex flex-col gap-0 p-2 min-h-48 overflow-y-auto overflow-x-hidden absolute inset-0';

// Static presets (for standalone display without wrapper)
export const PRESETS_STATIC_CLASSES =
  'flex flex-col gap-0 p-2 min-w-36 min-h-48 overflow-y-auto overflow-x-hidden';

export const PRESETS_DIVIDER_CLASSES =
  'w-full shrink-0 h-px my-2 bg-[color:var(--component-datepicker-border-default)]';

export const PRESETS_ITEM_CLASSES =
  'flex items-center justify-start self-stretch min-h-9 px-3 py-2 text-sm rounded duration-200 text-[color:var(--component-datepicker-preset-text)] hover:bg-[color:var(--component-datepicker-preset-bg-hover)] hover:text-[color:var(--component-datepicker-preset-text-hover)] active:bg-[color:var(--component-datepicker-preset-bg-active)] active:text-[color:var(--component-datepicker-preset-text-active)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus';

export const PRESETS_ITEM_ACTIVE_CLASSES =
  'bg-[color:var(--component-datepicker-cell-bg-range)] text-[color:var(--component-datepicker-preset-text)]';

// ----------------------------------------------------------------------------
// Confirmation Footer
// ----------------------------------------------------------------------------

export const CONFIRMATION_BASE_CLASSES =
  'flex items-center p-3 gap-3 border-t border-[color:var(--component-datepicker-border-default)] shrink-0';

// Stacked layout for single-range variant
export const CONFIRMATION_STACKED_CLASSES =
  'flex flex-col items-center p-3 gap-3 border-t border-[color:var(--component-datepicker-border-default)] shrink-0';

export const CONFIRMATION_DATE_INPUTS_CLASSES =
  'flex items-center flex-1 gap-3';

// Stacked inputs for single-range (vertical stack, full width)
export const CONFIRMATION_DATE_INPUTS_STACKED_CLASSES =
  'flex flex-col w-full gap-3';

// Input wrapper for stacked layout (full width)
export const CONFIRMATION_DATE_INPUT_STACKED_CLASSES =
  'w-full';

export const CONFIRMATION_DATE_INPUT_CLASSES =
  'flex-1 w-0 min-w-0';

export const CONFIRMATION_BUTTONS_CLASSES =
  'flex justify-end items-center gap-3';

// Stacked buttons for single-range (full width, side by side)
export const CONFIRMATION_BUTTONS_STACKED_CLASSES =
  'flex w-full gap-3';


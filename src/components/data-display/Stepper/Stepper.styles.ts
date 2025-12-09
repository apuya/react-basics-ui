// Stepper container
export const STEPPER_BASE_CLASSES = 'flex';

export const STEPPER_ORIENTATION = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
} as const;

// Step container
export const STEP_BASE_CLASSES = 'flex';

export const STEP_ORIENTATION = {
  horizontal: 'flex-1 flex-row items-start',
  vertical: 'flex-row',
} as const;

// =============================================================================
// STYLE GENERATORS
// =============================================================================

/** Generates indicator state classes for a given status */
const indicatorState = (status: string, borderWidth = '2') =>
  `bg-[color:var(--component-stepper-indicator-bg-${status})] text-[color:var(--component-stepper-indicator-text-${status})] border-[${borderWidth}px] border-[color:var(--component-stepper-indicator-border-${status})]`;

// Step indicator (circle with number/icon)
export const STEP_INDICATOR_BASE_CLASSES =
  'flex items-center justify-center rounded-full transition-all duration-200 font-medium shrink-0';

export const STEP_INDICATOR_SIZE: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'size-6 text-xs',
  md: 'size-8 text-sm',
  lg: 'size-10 text-base',
};

export const STEP_INDICATOR_STATES: Record<'completed' | 'active' | 'upcoming' | 'error', string> = {
  completed: indicatorState('completed'),
  active: indicatorState('active', '3'),
  upcoming: indicatorState('upcoming'),
  error: indicatorState('error'),
};

// Step connector (line between steps)
export const STEP_CONNECTOR_BASE_CLASSES = 'transition-colors duration-200';

export const STEP_CONNECTOR_ORIENTATION = {
  horizontal: 'flex-1 h-0.5',
  vertical: 'w-0.5 h-16',
} as const;

/** Generates connector background class for a given status */
const connectorState = (status: string) => `bg-[color:var(--component-stepper-connector-bg-${status})]`;

export const STEP_CONNECTOR_STATES = {
  completed: connectorState('completed'),
  upcoming: connectorState('upcoming'),
} as const;

// Step content (label and description) - base classes only, spacing via inline styles
export const STEP_CONTENT_ORIENTATION = {
  horizontal: 'text-center',
  vertical: 'text-left',
} as const;

// Label base classes - transition only, Text component handles typography
export const STEP_LABEL_BASE_CLASSES = 'transition-colors duration-200';

// =============================================================================
// LAYOUT CLASSES - Tailwind scales
// =============================================================================

// Connector spacing - vertical only (horizontal uses flex wrapper)
export const CONNECTOR_VERTICAL_CLASSES = 'my-1';

// Content spacing - Tailwind classes
export const CONTENT_HORIZONTAL_CLASSES = 'mt-2';
export const CONTENT_VERTICAL_CLASSES = 'ml-3';

// Description spacing
export const DESCRIPTION_CLASSES = 'mt-1';

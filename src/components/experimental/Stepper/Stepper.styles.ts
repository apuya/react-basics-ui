// Stepper container
export const STEPPER_BASE_CLASSES = 'flex';

export const STEPPER_ORIENTATION = {
  horizontal: 'flex-row items-center',
  vertical: 'flex-col',
} as const;

// Step container
export const STEP_BASE_CLASSES = 'flex flex-1';

export const STEP_ORIENTATION = {
  horizontal: 'flex-col items-center',
  vertical: 'flex-row',
} as const;

// Step indicator (circle with number/icon)
export const STEP_INDICATOR_BASE_CLASSES =
  'flex items-center justify-center rounded-full transition-all duration-200 font-semibold shrink-0';

export const STEP_INDICATOR_SIZE = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
} as const;

export const STEP_INDICATOR_STATES = {
  completed: 'bg-blue-500 text-white border-2 border-blue-500',
  active: 'bg-blue-500 text-white border-2 border-blue-500 ring-2 ring-blue-200',
  upcoming: 'bg-gray-100 text-gray-400 border-2 border-gray-300',
  error: 'bg-red-500 text-white border-2 border-red-500',
} as const;

// Step connector (line between steps)
export const STEP_CONNECTOR_BASE_CLASSES = 'transition-colors duration-200';

export const STEP_CONNECTOR_ORIENTATION = {
  horizontal: 'flex-1 h-0.5 mx-2',
  vertical: 'w-0.5 h-full ml-5 my-2',
} as const;

export const STEP_CONNECTOR_STATES = {
  completed: 'bg-blue-500',
  active: 'bg-gray-300',
  upcoming: 'bg-gray-300',
} as const;

// Step content (label and description)
export const STEP_CONTENT_BASE_CLASSES = 'mt-2 text-center';

export const STEP_CONTENT_ORIENTATION = {
  horizontal: 'text-center mt-2',
  vertical: 'text-left ml-4',
} as const;

export const STEP_LABEL_BASE_CLASSES = 'font-medium transition-colors duration-200';

export const STEP_LABEL_STATES = {
  completed: 'text-blue-600',
  active: 'text-blue-600',
  upcoming: 'text-gray-500',
  error: 'text-red-600',
} as const;

export const STEP_DESCRIPTION_CLASSES = 'text-sm text-gray-500 mt-1';

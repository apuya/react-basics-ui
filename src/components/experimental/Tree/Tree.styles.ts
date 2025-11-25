// Tree container
export const TREE_BASE_CLASSES = 'select-none';

// Tree node container
export const TREE_NODE_BASE_CLASSES = 'relative';

// Node content wrapper (label + icon + toggle)
export const NODE_CONTENT_BASE_CLASSES =
  'flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors duration-150 hover:bg-gray-100';

export const NODE_CONTENT_STATES = {
  default: '',
  selected: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
} as const;

// Toggle button (chevron/arrow)
export const TOGGLE_BUTTON_CLASSES =
  'w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0';

export const TOGGLE_BUTTON_EXPANDED = 'rotate-90';
export const TOGGLE_BUTTON_COLLAPSED = '';

// Node icon
export const NODE_ICON_CLASSES = 'w-4 h-4 text-gray-600 shrink-0';

// Node label
export const NODE_LABEL_CLASSES = 'flex-1 text-sm truncate';

// Children container
export const CHILDREN_CONTAINER_CLASSES = 'ml-5 mt-1';

// Indent line (visual guide)
export const INDENT_LINE_CLASSES =
  'absolute left-2 top-0 bottom-0 w-px bg-gray-200';

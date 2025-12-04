// Tree container
export const TREE_BASE_CLASSES = 'select-none';

// Tree node container
export const TREE_NODE_BASE_CLASSES = 'relative';

// Node content wrapper (label + icon + toggle)
export const NODE_CONTENT_BASE_CLASSES =
  'flex items-center rounded-[length:var(--component-tree-node-radius)] cursor-pointer transition-colors duration-[var(--component-tree-transition)] hover:bg-[color:var(--component-tree-node-bg-hover)]';

export const NODE_CONTENT_STATES = {
  default: '',
  selected:
    'bg-[color:var(--component-tree-node-bg-selected)] text-[color:var(--component-tree-node-text-selected)] hover:bg-[color:var(--component-tree-node-bg-selected-hover)]',
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
} as const;

// Toggle button (chevron/arrow)
export const TOGGLE_BUTTON_CLASSES =
  'inline-flex items-center justify-center w-[length:var(--component-tree-toggle-size)] h-[length:var(--component-tree-toggle-size)] text-[color:var(--component-tree-toggle-color)] transition-transform duration-[var(--component-tree-transition)] shrink-0';

export const TOGGLE_BUTTON_EXPANDED = 'rotate-90';
export const TOGGLE_BUTTON_COLLAPSED = '';

// Node icon
export const NODE_ICON_CLASSES =
  'inline-flex items-center justify-center w-[length:var(--component-tree-icon-size)] h-[length:var(--component-tree-icon-size)] text-[color:var(--component-tree-icon-color)] shrink-0';

// Children container
export const CHILDREN_CONTAINER_CLASSES = '';

// Indent line (visual guide)
export const INDENT_LINE_CLASSES =
  'absolute left-2 top-0 bottom-0 w-px bg-[color:var(--component-tree-line-color)]';

// Spacer for alignment when no toggle button
export const NODE_SPACER_CLASSES =
  'w-[length:var(--component-tree-toggle-size)] shrink-0';

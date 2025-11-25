import { cn } from '@/lib/cn';
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { BiChevronRight, BiFolder, BiFolderOpen } from 'react-icons/bi';
import {
  CHILDREN_CONTAINER_CLASSES,
  NODE_CONTENT_BASE_CLASSES,
  NODE_CONTENT_STATES,
  NODE_ICON_CLASSES,
  NODE_LABEL_CLASSES,
  TOGGLE_BUTTON_CLASSES,
  TOGGLE_BUTTON_COLLAPSED,
  TOGGLE_BUTTON_EXPANDED,
  TREE_BASE_CLASSES,
  TREE_NODE_BASE_CLASSES,
} from './Tree.styles';

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Selection mode */
  selectable?: boolean;
  /** Currently selected node ID */
  selectedId?: string;
  /** Callback when a node is selected */
  onSelect?: (nodeId: string) => void;
  /** Default expanded node IDs */
  defaultExpanded?: string[];
  /** Show lines connecting nodes */
  showLines?: boolean;
  children?: React.ReactNode;
}

export interface TreeNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique node identifier */
  nodeId: string;
  /** Node label */
  label: string;
  /** Custom icon (default: folder icon) */
  icon?: ReactNode;
  /** Whether node is disabled */
  disabled?: boolean;
  /** Whether node is initially expanded */
  defaultExpanded?: boolean;
  /** Additional content to display on the right */
  rightContent?: ReactNode;
  children?: React.ReactNode;
}

interface TreeContextValue {
  selectedId?: string;
  onSelect?: (nodeId: string) => void;
  selectable: boolean;
  expandedNodes: Set<string>;
  toggleNode: (nodeId: string) => void;
  isExpanded: (nodeId: string) => boolean;
}

const TreeContext = createContext<TreeContextValue | undefined>(undefined);

const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('TreeNode must be used within a Tree');
  }
  return context;
};

// Main Tree Component
const TreeRoot = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      selectable = false,
      selectedId,
      onSelect,
      defaultExpanded = [],
      showLines = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
      new Set(defaultExpanded)
    );

    const toggleNode = (nodeId: string) => {
      setExpandedNodes((prev) => {
        const next = new Set(prev);
        if (next.has(nodeId)) {
          next.delete(nodeId);
        } else {
          next.add(nodeId);
        }
        return next;
      });
    };

    const isExpanded = (nodeId: string) => expandedNodes.has(nodeId);

    const contextValue: TreeContextValue = {
      selectedId,
      onSelect,
      selectable,
      expandedNodes,
      toggleNode,
      isExpanded,
    };

    return (
      <TreeContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="tree"
          className={cn(TREE_BASE_CLASSES, className)}
          {...props}
        >
          {children}
        </div>
      </TreeContext.Provider>
    );
  }
);

TreeRoot.displayName = 'Tree';

// TreeNode Component
const TreeNodeComponent = React.forwardRef<HTMLDivElement, TreeNodeProps>(
  (
    {
      nodeId,
      label,
      icon,
      disabled = false,
      defaultExpanded = false,
      rightContent,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const { selectedId, onSelect, selectable, toggleNode, isExpanded } =
      useTreeContext();

    const hasChildren = React.Children.count(children) > 0;
    const expanded = isExpanded(nodeId) || defaultExpanded;
    const selected = selectable && selectedId === nodeId;

    // Initialize expansion state if defaultExpanded is true
    React.useEffect(() => {
      if (defaultExpanded && !isExpanded(nodeId)) {
        toggleNode(nodeId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasChildren) {
        toggleNode(nodeId);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      
      if (selectable && onSelect) {
        onSelect(nodeId);
      }
      
      onClick?.(e);
    };

    const renderIcon = () => {
      if (icon) {
        return <span className={NODE_ICON_CLASSES}>{icon}</span>;
      }
      if (hasChildren) {
        return expanded ? (
          <BiFolderOpen className={NODE_ICON_CLASSES} />
        ) : (
          <BiFolder className={NODE_ICON_CLASSES} />
        );
      }
      return null;
    };

    const contentState = disabled
      ? NODE_CONTENT_STATES.disabled
      : selected
      ? NODE_CONTENT_STATES.selected
      : NODE_CONTENT_STATES.default;

    return (
      <div
        ref={ref}
        role="treeitem"
        aria-expanded={hasChildren ? expanded : undefined}
        aria-selected={selectable ? selected : undefined}
        aria-disabled={disabled}
        className={cn(TREE_NODE_BASE_CLASSES, className)}
        {...props}
      >
        <div
          className={cn(NODE_CONTENT_BASE_CLASSES, contentState)}
          onClick={handleClick}
        >
          {hasChildren ? (
            <button
              type="button"
              onClick={handleToggle}
              className={cn(
                TOGGLE_BUTTON_CLASSES,
                expanded ? TOGGLE_BUTTON_EXPANDED : TOGGLE_BUTTON_COLLAPSED
              )}
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              <BiChevronRight />
            </button>
          ) : (
            <span className="w-4" /> // Spacer for alignment
          )}
          {renderIcon()}
          <span className={NODE_LABEL_CLASSES}>{label}</span>
          {rightContent && <span className="ml-auto">{rightContent}</span>}
        </div>

        {hasChildren && expanded && (
          <div className={CHILDREN_CONTAINER_CLASSES}>{children}</div>
        )}
      </div>
    );
  }
);

TreeNodeComponent.displayName = 'TreeNode';

// Export compound component
export const Tree = Object.assign(TreeRoot, {
  Node: TreeNodeComponent,
});

export const TreeNode = TreeNodeComponent;

import { cn } from '@/lib/cn';
import { Text } from '@/components/typography/Text';
import { createComponentContext } from '@/lib/createComponentContext';
import React, { memo, useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { BiChevronRight, BiFolder, BiFolderOpen } from 'react-icons/bi';
import {
  CHILDREN_CONTAINER_CLASSES,
  INDENT_LINE_CLASSES,
  NODE_CONTENT_BASE_CLASSES,
  NODE_CONTENT_STATES,
  NODE_ICON_CLASSES,
  NODE_SPACER_CLASSES,
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
  showLines: boolean;
  expandedNodes: Set<string>;
  toggleNode: (nodeId: string) => void;
  isExpanded: (nodeId: string) => boolean;
}

const { Context: TreeContext, useContext: useTreeContext } =
  createComponentContext<TreeContextValue>('Tree');

// Layout class constants
const NODE_CONTENT_LAYOUT_CLASSES = 'px-2 py-1 gap-2';
const CHILDREN_CONTAINER_LAYOUT_CLASSES = 'ml-4 mt-1';

// Main Tree Component
const TreeRoot = memo(
  React.forwardRef<HTMLDivElement, TreeProps>(
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
        () => new Set(defaultExpanded)
      );

      const toggleNode = useCallback((nodeId: string) => {
        setExpandedNodes((prev) => {
          const next = new Set(prev);
          if (next.has(nodeId)) {
            next.delete(nodeId);
          } else {
            next.add(nodeId);
          }
          return next;
        });
      }, []);

      const isExpanded = useCallback(
        (nodeId: string) => expandedNodes.has(nodeId),
        [expandedNodes]
      );

      const contextValue = useMemo<TreeContextValue>(
        () => ({
          selectedId,
          onSelect,
          selectable,
          showLines,
          expandedNodes,
          toggleNode,
          isExpanded,
        }),
        [selectedId, onSelect, selectable, showLines, expandedNodes, toggleNode, isExpanded]
      );

      return (
        <TreeContext.Provider value={contextValue}>
          <div
            ref={ref}
            role="tree"
            className={cn(TREE_BASE_CLASSES, className)}
            data-show-lines={showLines || undefined}
            {...props}
          >
            {children}
          </div>
        </TreeContext.Provider>
      );
    }
  )
);

TreeRoot.displayName = 'Tree';

// TreeNode Component
const TreeNodeComponent = memo(
  React.forwardRef<HTMLDivElement, TreeNodeProps>(
    (
      {
        nodeId,
        label,
        icon,
        disabled = false,
        defaultExpanded: nodeDefaultExpanded = false,
        rightContent,
        className,
        children,
        onClick,
        onKeyDown,
        ...props
      },
      ref
    ) => {
      const { selectedId, onSelect, selectable, showLines, toggleNode, isExpanded } =
        useTreeContext();

      // Track if we've initialized expansion (use ref to avoid re-renders)
      const initializedRef = useRef(false);

      const hasChildren = React.Children.count(children) > 0;
      const expanded = isExpanded(nodeId);
      const selected = selectable && selectedId === nodeId;

      // Initialize expansion state if defaultExpanded is true (only once)
      React.useEffect(() => {
        if (nodeDefaultExpanded && !initializedRef.current && !isExpanded(nodeId)) {
          toggleNode(nodeId);
        }
        initializedRef.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const handleToggle = useCallback(
        (e: React.MouseEvent | React.KeyboardEvent) => {
          e.stopPropagation();
          if (hasChildren) {
            toggleNode(nodeId);
          }
        },
        [hasChildren, toggleNode, nodeId]
      );

      const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
          if (disabled) return;

          if (selectable && onSelect) {
            onSelect(nodeId);
          }

          onClick?.(e);
        },
        [disabled, selectable, onSelect, nodeId, onClick]
      );

      const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (disabled) return;

          switch (e.key) {
            case 'Enter':
            case ' ':
              e.preventDefault();
              if (selectable && onSelect) {
                onSelect(nodeId);
              }
              break;
            case 'ArrowRight':
              e.preventDefault();
              if (hasChildren && !expanded) {
                toggleNode(nodeId);
              }
              break;
            case 'ArrowLeft':
              e.preventDefault();
              if (hasChildren && expanded) {
                toggleNode(nodeId);
              }
              break;
          }

          onKeyDown?.(e);
        },
        [disabled, selectable, onSelect, nodeId, hasChildren, expanded, toggleNode, onKeyDown]
      );

      const contentState = useMemo(() => {
        if (disabled) return NODE_CONTENT_STATES.disabled;
        if (selected) return NODE_CONTENT_STATES.selected;
        return NODE_CONTENT_STATES.default;
      }, [disabled, selected]);

      const contentClasses = useMemo(
        () => cn(NODE_CONTENT_BASE_CLASSES, contentState),
        [contentState]
      );

      const toggleClasses = cn(
        TOGGLE_BUTTON_CLASSES,
        expanded ? TOGGLE_BUTTON_EXPANDED : TOGGLE_BUTTON_COLLAPSED
      );

      // Render icon inline - no useCallback needed for simple JSX
      const iconElement = icon ? (
        <span className={NODE_ICON_CLASSES} aria-hidden="true">{icon}</span>
      ) : hasChildren ? (
        expanded ? (
          <BiFolderOpen className={NODE_ICON_CLASSES} aria-hidden="true" />
        ) : (
          <BiFolder className={NODE_ICON_CLASSES} aria-hidden="true" />
        )
      ) : null;

      return (
        <div
          ref={ref}
          role="treeitem"
          aria-expanded={hasChildren ? expanded : undefined}
          aria-selected={selectable ? selected : undefined}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          className={cn(TREE_NODE_BASE_CLASSES, className)}
          data-node-id={nodeId}
          data-expanded={hasChildren && expanded ? true : undefined}
          data-selected={selected || undefined}
          data-disabled={disabled || undefined}
          data-has-children={hasChildren || undefined}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {showLines && hasChildren && <span className={INDENT_LINE_CLASSES} aria-hidden="true" />}
          <div className={cn(contentClasses, NODE_CONTENT_LAYOUT_CLASSES)} onClick={handleClick}>
            {hasChildren ? (
              <button
                type="button"
                onClick={handleToggle}
                className={toggleClasses}
                aria-label={expanded ? 'Collapse' : 'Expand'}
                tabIndex={-1}
              >
                <BiChevronRight aria-hidden="true" />
              </button>
            ) : (
              <span className={NODE_SPACER_CLASSES} aria-hidden="true" />
            )}
            {iconElement}
            <Text size="body" truncate className="flex-1">{label}</Text>
            {rightContent && <span className="ml-auto">{rightContent}</span>}
          </div>

          {hasChildren && expanded && (
            <div role="group" className={cn(CHILDREN_CONTAINER_CLASSES, CHILDREN_CONTAINER_LAYOUT_CLASSES)}>
              {children}
            </div>
          )}
        </div>
      );
    }
  )
);

TreeNodeComponent.displayName = 'Tree.Node';

// Export compound component
export const Tree = Object.assign(TreeRoot, {
  Node: TreeNodeComponent,
});

export const TreeNode = TreeNodeComponent;

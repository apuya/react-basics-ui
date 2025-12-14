import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { TREE_BASE_CLASSES } from './Tree.styles';
import { TreeNode } from './TreeNode';

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

/**
 * Context value shared between Tree and TreeNode components.
 * Manages expansion state and selection behavior.
 */
export interface TreeContextValue {
  /** Currently selected node ID */
  selectedId?: string;
  /** Callback when a node is selected */
  onSelect?: (nodeId: string) => void;
  /** Whether selection is enabled */
  selectable: boolean;
  /** Whether to show connecting lines */
  showLines: boolean;
  /** Set of expanded node IDs */
  expandedNodes: Set<string>;
  /** Toggle expansion state of a node */
  toggleNode: (nodeId: string) => void;
  /** Check if a node is expanded */
  isExpanded: (nodeId: string) => boolean;
}

const { Context: TreeContext, useContext: useTreeContext } =
  createComponentContext<TreeContextValue>('Tree');

// Export context hook for TreeNode
export { useTreeContext };

// Main Tree Component
/**
 * Tree component for displaying hierarchical data with expandable nodes.
 * Supports selection, keyboard navigation, and custom icons.
 */
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

      // Memoize className to prevent recalculation
      const treeClasses = useMemo(
        () => cn(TREE_BASE_CLASSES, className),
        [className]
      );

      return (
        <TreeContext.Provider value={contextValue}>
          <div
            ref={ref}
            role="tree"
            className={treeClasses}
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

// Export compound component
export const Tree = Object.assign(TreeRoot, {
  Node: TreeNode,
});

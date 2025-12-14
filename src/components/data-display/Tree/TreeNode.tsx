import { cn } from '@/lib/cn';
import { Text } from '@/components/typography/Text';
import React, { memo, useCallback, useMemo, useRef, type ReactNode } from 'react';
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
  TREE_NODE_BASE_CLASSES,
} from './Tree.styles';
import { useTreeContext } from './Tree';

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

// Inline style constants
const NODE_CONTENT_STYLE = {
  paddingInline: 'var(--component-tree-node-padding-inline)',
  paddingBlock: 'var(--component-tree-node-padding-block)',
  gap: 'var(--component-tree-node-gap)',
} as const;

const CHILDREN_CONTAINER_STYLE = {
  marginLeft: 'var(--component-tree-indent)',
  marginTop: 'var(--component-tree-node-padding-block)',
} as const;

/**
 * TreeNode component represents an individual node in a tree structure.
 * Can contain nested TreeNode children to create hierarchical structures.
 */
export const TreeNode = memo(
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

      // Memoize computed values to prevent recalculation on every render
      const hasChildren = useMemo(() => React.Children.count(children) > 0, [children]);
      const expanded = useMemo(() => isExpanded(nodeId), [isExpanded, nodeId]);
      const selected = useMemo(() => selectable && selectedId === nodeId, [selectable, selectedId, nodeId]);

      // Initialize expansion state if defaultExpanded is true (only once)
      React.useEffect(() => {
        if (nodeDefaultExpanded && !initializedRef.current && !isExpanded(nodeId)) {
          toggleNode(nodeId);
        }
        initializedRef.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const handleToggle = useCallback(
        (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
          e.preventDefault();
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

      const toggleClasses = useMemo(
        () => cn(TOGGLE_BUTTON_CLASSES, expanded ? TOGGLE_BUTTON_EXPANDED : TOGGLE_BUTTON_COLLAPSED),
        [expanded]
      );

      const toggleAriaLabel = useMemo(() => expanded ? 'Collapse' : 'Expand', [expanded]);

      const nodeClasses = useMemo(
        () => cn(TREE_NODE_BASE_CLASSES, className),
        [className]
      );

      // Memoize icon element to prevent recreation on every render
      const iconElement = useMemo(() => {
        if (icon) {
          return <span className={NODE_ICON_CLASSES} aria-hidden="true">{icon}</span>;
        }
        if (hasChildren) {
          return expanded ? (
            <BiFolderOpen className={NODE_ICON_CLASSES} aria-hidden="true" />
          ) : (
            <BiFolder className={NODE_ICON_CLASSES} aria-hidden="true" />
          );
        }
        return null;
      }, [icon, hasChildren, expanded]);

      return (
        <div
          ref={ref}
          role="treeitem"
          aria-expanded={hasChildren ? expanded : undefined}
          aria-selected={selectable ? selected : undefined}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          className={nodeClasses}
          data-node-id={nodeId}
          data-expanded={hasChildren && expanded ? true : undefined}
          data-selected={selected || undefined}
          data-disabled={disabled || undefined}
          data-has-children={hasChildren || undefined}
          data-leaf={!hasChildren || undefined}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {showLines && hasChildren && <span className={INDENT_LINE_CLASSES} aria-hidden="true" />}
          <div className={contentClasses} style={NODE_CONTENT_STYLE} onClick={handleClick}>
            {hasChildren ? (
              <button
                type="button"
                onClick={handleToggle}
                className={toggleClasses}
                aria-label={toggleAriaLabel}
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
            <div role="group" className={CHILDREN_CONTAINER_CLASSES} style={CHILDREN_CONTAINER_STYLE}>
              {children}
            </div>
          )}
        </div>
      );
    }
  )
);

TreeNode.displayName = 'Tree.Node';

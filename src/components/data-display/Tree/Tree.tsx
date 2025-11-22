import React from 'react';

export interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface TreeNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Node label */
  label: string;
  /** Whether node is expanded */
  expanded?: boolean;
  /** Whether node is selected */
  selected?: boolean;
  /** Node icon */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} role="tree" className={className} {...props}>
        {children}
      </div>
    );
  }
);

export const TreeNode = React.forwardRef<HTMLDivElement, TreeNodeProps>(
  ({ label, expanded, selected, icon, className, children, ...props }, ref) => {
    return (
      <div ref={ref} role="treeitem" aria-expanded={expanded} aria-selected={selected} className={className} {...props}>
        <div>
          {icon}
          {label}
        </div>
        {children && <div role="group">{children}</div>}
      </div>
    );
  }
);

Tree.displayName = 'Tree';
TreeNode.displayName = 'TreeNode';

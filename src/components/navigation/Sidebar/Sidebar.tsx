import React from 'react';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether sidebar is collapsed */
  collapsed?: boolean;
  /** Width when expanded */
  width?: string | number;
  /** Width when collapsed */
  collapsedWidth?: string | number;
  children?: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ collapsed, width, collapsedWidth, className, children, ...props }, ref) => {
    return (
      <aside ref={ref} className={className} {...props}>
        {children}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

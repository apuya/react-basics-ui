import React from 'react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Icon element */
  icon?: React.ReactNode;
  /** Action element (button, link, etc.) */
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, icon, action, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {icon && <div>{icon}</div>}
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
        {children}
        {action && <div>{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

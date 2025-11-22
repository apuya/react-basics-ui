import React from 'react';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} role="menu" className={className} {...props}>
        {children}
      </div>
    );
  }
);

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ className, disabled, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Menu.displayName = 'Menu';
MenuItem.displayName = 'MenuItem';

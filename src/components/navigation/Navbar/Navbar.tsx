import React from 'react';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav ref={ref} className={className} {...props}>
        {children}
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

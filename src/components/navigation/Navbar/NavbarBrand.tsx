import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
} from 'react';
import { BRAND_CLASSES } from './Navbar.styles';

export interface NavbarBrandProps extends ComponentPropsWithoutRef<'div'> {}

const BRAND_STYLE = {
  gap: 'var(--component-navbar-brand-gap)',
  fontSize: 'var(--component-navbar-brand-size)',
} as const;

export const NavbarBrand = memo(
  forwardRef<HTMLDivElement, NavbarBrandProps>(function NavbarBrand(
    { children, className, style, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(BRAND_CLASSES, className)}
        style={{ ...BRAND_STYLE, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  })
);

NavbarBrand.displayName = 'Navbar.Brand';

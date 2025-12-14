import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  useMemo,
  type ComponentPropsWithoutRef,
} from 'react';
import {
  BASE_CLASSES,
  BORDERED_CLASSES,
  FIXED_CLASSES,
} from './Navbar.styles';
import { NavbarBrand } from './NavbarBrand';
import { NavbarContent } from './NavbarContent';
import { NavbarSection } from './NavbarSection';

export interface NavbarProps extends ComponentPropsWithoutRef<'nav'> {
  /** Whether the navbar is fixed to the top */
  fixed?: boolean;
  /** Whether the navbar has a border */
  bordered?: boolean;
  /** Accessible label for the navigation landmark */
  'aria-label'?: string;
}

export const NavbarRoot = memo(
  forwardRef<HTMLElement, NavbarProps>(function NavbarRoot(
    { children, fixed = false, bordered = true, className, 'aria-label': ariaLabel = 'Main navigation', ...props },
    ref
  ) {
    const navClasses = useMemo(
      () => cn(BASE_CLASSES, fixed && FIXED_CLASSES, bordered && BORDERED_CLASSES, className),
      [fixed, bordered, className]
    );

    return (
      <nav
        ref={ref}
        className={navClasses}
        aria-label={ariaLabel}
        data-fixed={fixed || undefined}
        data-bordered={bordered || undefined}
        {...props}
      >
        {children}
      </nav>
    );
  })
);

NavbarRoot.displayName = 'Navbar';

export const Navbar = Object.assign(NavbarRoot, {
  Content: NavbarContent,
  Brand: NavbarBrand,
  Section: NavbarSection,
});

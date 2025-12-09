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
  BRAND_CLASSES,
  CONTENT_CLASSES,
  FIXED_CLASSES,
  SECTION_CLASSES,
} from './Navbar.styles';

// =============================================================================
// NAVBAR ROOT
// =============================================================================

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

// =============================================================================
// NAVBAR CONTENT
// =============================================================================

export interface NavbarContentProps extends ComponentPropsWithoutRef<'div'> {}

export const NavbarContent = memo(
  forwardRef<HTMLDivElement, NavbarContentProps>(function NavbarContent(
    { children, className, ...props },
    ref
  ) {
    return (
      <div ref={ref} className={cn(CONTENT_CLASSES, className)} {...props}>
        {children}
      </div>
    );
  })
);

NavbarContent.displayName = 'Navbar.Content';

// =============================================================================
// NAVBAR BRAND
// =============================================================================

export interface NavbarBrandProps extends ComponentPropsWithoutRef<'div'> {}

export const NavbarBrand = memo(
  forwardRef<HTMLDivElement, NavbarBrandProps>(function NavbarBrand(
    { children, className, ...props },
    ref
  ) {
    return (
      <div ref={ref} className={cn(BRAND_CLASSES, className)} {...props}>
        {children}
      </div>
    );
  })
);

NavbarBrand.displayName = 'Navbar.Brand';

// =============================================================================
// NAVBAR SECTION
// =============================================================================

export interface NavbarSectionProps extends ComponentPropsWithoutRef<'div'> {}

export const NavbarSection = memo(
  forwardRef<HTMLDivElement, NavbarSectionProps>(function NavbarSection(
    { children, className, ...props },
    ref
  ) {
    return (
      <div ref={ref} className={cn(SECTION_CLASSES, className)} {...props}>
        {children}
      </div>
    );
  })
);

NavbarSection.displayName = 'Navbar.Section';

// =============================================================================
// COMPOUND COMPONENT
// =============================================================================

export const Navbar = Object.assign(NavbarRoot, {
  Content: NavbarContent,
  Brand: NavbarBrand,
  Section: NavbarSection,
});

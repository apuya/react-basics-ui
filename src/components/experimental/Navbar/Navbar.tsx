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

const CONTENT_STYLE = {
  height: 'var(--component-navbar-height)',
  maxWidth: 'var(--component-navbar-max-width)',
  gap: 'var(--component-navbar-gap)',
  paddingInline: 'var(--component-navbar-padding-x)',
} as const;

export const NavbarContent = memo(
  forwardRef<HTMLDivElement, NavbarContentProps>(function NavbarContent(
    { children, className, style, ...props },
    ref
  ) {
    const contentStyle = useMemo(
      () => ({ ...CONTENT_STYLE, ...style }),
      [style]
    );

    return (
      <div ref={ref} className={cn(CONTENT_CLASSES, className)} style={contentStyle} {...props}>
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

const BRAND_STYLE = {
  gap: 'var(--component-navbar-brand-gap)',
  fontSize: 'var(--component-navbar-brand-size)',
} as const;

export const NavbarBrand = memo(
  forwardRef<HTMLDivElement, NavbarBrandProps>(function NavbarBrand(
    { children, className, style, ...props },
    ref
  ) {
    const brandStyle = useMemo(
      () => ({ ...BRAND_STYLE, ...style }),
      [style]
    );

    return (
      <div ref={ref} className={cn(BRAND_CLASSES, className)} style={brandStyle} {...props}>
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

const SECTION_STYLE = {
  gap: 'var(--component-navbar-section-gap)',
} as const;

export const NavbarSection = memo(
  forwardRef<HTMLDivElement, NavbarSectionProps>(function NavbarSection(
    { children, className, style, ...props },
    ref
  ) {
    const sectionStyle = useMemo(
      () => ({ ...SECTION_STYLE, ...style }),
      [style]
    );

    return (
      <div ref={ref} className={cn(SECTION_CLASSES, className)} style={sectionStyle} {...props}>
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

import { cn } from '@/lib/cn';
import {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import {
  BRAND_CLASSES,
  BURGER_CLASSES,
  BURGER_LINE_CLASSES,
  BURGER_LINE_CLOSE_CLASSES,
  CONTENT_CLASSES,
  ITEM_CLASSES,
  LINK_CLASSES,
  LINK_ACTIVE_CLASSES,
  MENU_CLASSES,
  MENU_MOBILE_CLASSES,
  MENU_MOBILE_OPEN_CLASSES,
  NAVBAR_CLASSES,
  SECTION_CLASSES,
} from './Navbar.styles';

// Context for Navbar state
interface NavbarContextValue {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const NavbarContext = createContext<NavbarContextValue | undefined>(undefined);

const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('Navbar sub-components must be used within a Navbar component');
  }
  return context;
};

// Main Navbar component
export interface NavbarProps extends ComponentPropsWithoutRef<'nav'> {
  /** Whether the navbar is fixed to the top */
  fixed?: boolean;
  /** Whether the navbar has a border */
  bordered?: boolean;
}

export const NavbarRoot = memo(
  forwardRef<HTMLElement, NavbarProps>(function NavbarRoot(
    { children, fixed = false, bordered = true, className, ...props },
    ref
  ) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = useCallback(() => {
      setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
      setIsMobileMenuOpen(false);
    }, []);

    return (
      <NavbarContext.Provider value={{ isMobileMenuOpen, toggleMobileMenu, closeMobileMenu }}>
        <nav
          ref={ref}
          className={cn(
            NAVBAR_CLASSES,
            fixed && 'fixed top-0 left-0 right-0 z-[var(--component-navbar-z-index)]',
            bordered && 'border-b-[length:var(--component-navbar-border-width)] border-[color:var(--component-navbar-border)]',
            className
          )}
          {...props}
        >
          {children}
        </nav>
      </NavbarContext.Provider>
    );
  })
);

NavbarRoot.displayName = 'Navbar';

// Navbar Content (container)
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

NavbarContent.displayName = 'NavbarContent';

// Navbar Brand (logo area)
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

NavbarBrand.displayName = 'NavbarBrand';

// Navbar Section (for grouping items)
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

NavbarSection.displayName = 'NavbarSection';

// Navbar Menu (navigation links container)
export interface NavbarMenuProps extends ComponentPropsWithoutRef<'div'> {
  /** Whether this menu is for mobile */
  mobile?: boolean;
}

export const NavbarMenu = memo(
  forwardRef<HTMLDivElement, NavbarMenuProps>(function NavbarMenu(
    { children, mobile = false, className, ...props },
    ref
  ) {
    const { isMobileMenuOpen } = useNavbarContext();

    if (mobile) {
      return (
        <div
          ref={ref}
          className={cn(
            MENU_MOBILE_CLASSES,
            isMobileMenuOpen && MENU_MOBILE_OPEN_CLASSES,
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(MENU_CLASSES, className)} {...props}>
        {children}
      </div>
    );
  })
);

NavbarMenu.displayName = 'NavbarMenu';

// Navbar Item
export interface NavbarItemProps extends ComponentPropsWithoutRef<'div'> {}

export const NavbarItem = memo(
  forwardRef<HTMLDivElement, NavbarItemProps>(function NavbarItem(
    { children, className, ...props },
    ref
  ) {
    return (
      <div ref={ref} className={cn(ITEM_CLASSES, className)} {...props}>
        {children}
      </div>
    );
  })
);

NavbarItem.displayName = 'NavbarItem';

// Navbar Link
export interface NavbarLinkProps extends ComponentPropsWithoutRef<'a'> {
  /** Whether this link is active/current */
  isActive?: boolean;
}

export const NavbarLink = memo(
  forwardRef<HTMLAnchorElement, NavbarLinkProps>(function NavbarLink(
    { children, isActive = false, className, onClick, ...props },
    ref
  ) {
    const { closeMobileMenu } = useNavbarContext();

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        closeMobileMenu();
        onClick?.(e);
      },
      [closeMobileMenu, onClick]
    );

    return (
      <a
        ref={ref}
        className={cn(
          LINK_CLASSES,
          isActive && LINK_ACTIVE_CLASSES,
          className
        )}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  })
);

NavbarLink.displayName = 'NavbarLink';

// Navbar Burger (mobile menu toggle)
export interface NavbarBurgerProps extends ComponentPropsWithoutRef<'button'> {}

export const NavbarBurger = memo(
  forwardRef<HTMLButtonElement, NavbarBurgerProps>(function NavbarBurger(
    { className, ...props },
    ref
  ) {
    const { isMobileMenuOpen, toggleMobileMenu } = useNavbarContext();

    return (
      <button
        ref={ref}
        type="button"
        className={cn(BURGER_CLASSES, className)}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        {...props}
      >
        <span className={cn(BURGER_LINE_CLASSES, isMobileMenuOpen && BURGER_LINE_CLOSE_CLASSES[0])} />
        <span className={cn(BURGER_LINE_CLASSES, isMobileMenuOpen && BURGER_LINE_CLOSE_CLASSES[1])} />
        <span className={cn(BURGER_LINE_CLASSES, isMobileMenuOpen && BURGER_LINE_CLOSE_CLASSES[2])} />
      </button>
    );
  })
);

NavbarBurger.displayName = 'NavbarBurger';

// Compound component with sub-components
export const Navbar = Object.assign(NavbarRoot, {
  Content: NavbarContent,
  Brand: NavbarBrand,
  Section: NavbarSection,
  Menu: NavbarMenu,
  Item: NavbarItem,
  Link: NavbarLink,
  Burger: NavbarBurger,
});

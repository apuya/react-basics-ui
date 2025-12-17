import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
} from 'react';
import { SECTION_CLASSES } from './Navbar.styles';

export interface NavbarSectionProps extends ComponentPropsWithoutRef<'div'> {}

const SECTION_STYLE = {
  gap: 'var(--component-navbar-section-gap)',
} as const;

export const NavbarSection = memo(
  forwardRef<HTMLDivElement, NavbarSectionProps>(function NavbarSection(
    { children, className, style, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(SECTION_CLASSES, className)}
        style={{ ...SECTION_STYLE, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  })
);

NavbarSection.displayName = 'Navbar.Section';

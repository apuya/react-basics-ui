import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
} from 'react';
import { CONTENT_CLASSES } from './Navbar.styles';

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
    return (
      <div
        ref={ref}
        className={cn(CONTENT_CLASSES, className)}
        style={{ ...CONTENT_STYLE, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  })
);

NavbarContent.displayName = 'Navbar.Content';

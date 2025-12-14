import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { FOOTER_CLASSES } from './Sidebar.styles';

export interface SidebarFooterProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

/**
 * Footer section of the Sidebar.
 * Typically contains help, logout, or secondary actions.
 */
export const SidebarFooter = memo(
  forwardRef<HTMLDivElement, SidebarFooterProps>(function SidebarFooter(
    { className, style, children, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(FOOTER_CLASSES, className)}
        style={{
          paddingInline: 'var(--component-sidebar-footer-padding-inline)',
          paddingBlock: 'var(--component-sidebar-footer-padding-block)',
          gap: 'var(--component-sidebar-footer-gap)',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  })
);

SidebarFooter.displayName = 'Sidebar.Footer';

import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { CONTENT_CLASSES } from './Sidebar.styles';

export interface SidebarContentProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

/**
 * Main content area of the Sidebar.
 * Contains navigation items and sections.
 */
export const SidebarContent = memo(
  forwardRef<HTMLDivElement, SidebarContentProps>(function SidebarContent(
    { className, style, children, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(CONTENT_CLASSES, className)}
        style={{
          paddingBlock: 'var(--component-sidebar-content-padding-block)',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  })
);

SidebarContent.displayName = 'Sidebar.Content';

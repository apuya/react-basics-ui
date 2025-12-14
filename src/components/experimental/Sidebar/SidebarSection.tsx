import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { SECTION_CLASSES } from './Sidebar.styles';

export interface SidebarSectionProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

/**
 * A section within the Sidebar for grouping related items.
 */
export const SidebarSection = memo(
  forwardRef<HTMLDivElement, SidebarSectionProps>(function SidebarSection(
    { className, style, children, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(SECTION_CLASSES, className)}
        style={{
          marginBottom: 'var(--component-sidebar-section-gap)',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  })
);

SidebarSection.displayName = 'Sidebar.Section';

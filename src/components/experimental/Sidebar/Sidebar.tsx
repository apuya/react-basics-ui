import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import {
  forwardRef,
  memo,
  useMemo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { BASE_CLASSES, VARIANT_STYLES } from './Sidebar.styles';
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarSection } from './SidebarSection';
import { SidebarSectionHeader, SidebarItem } from './SidebarItem';

export type SidebarVariant = 'default' | 'bordered' | 'elevated';
export type SidebarPosition = 'left' | 'right';

export interface SidebarProps extends Omit<ComponentPropsWithoutRef<'aside'>, 'children'> {
  /** Width of the sidebar */
  width?: string | number;
  /** Visual variant */
  variant?: SidebarVariant;
  /** Position on screen */
  position?: SidebarPosition;
  /** Children elements */
  children?: ReactNode;
}

interface SidebarContextValue {
  width: string;
  variant: SidebarVariant;
  position: SidebarPosition;
}

const { Context: SidebarContext, useContext: useSidebarContext } =
  createComponentContext<SidebarContextValue>('Sidebar');

// Silence unused variable warning - context is available for future use
void useSidebarContext;

/**
 * Sidebar component for navigation and content organization.
 * 
 * Supports multiple variants and compound components for flexible layouts.
 * 
 * @example
 * ```tsx
 * <Sidebar>
 *   <Sidebar.Content>
 *     <Sidebar.Item icon={HomeIcon}>Home</Sidebar.Item>
 *     <Sidebar.Item icon={SettingsIcon}>Settings</Sidebar.Item>
 *   </Sidebar.Content>
 * </Sidebar>
 * ```
 */
export const SidebarRoot = memo(
  forwardRef<HTMLElement, SidebarProps>(function Sidebar(
    {
      width = '280px',
      variant = 'default',
      position = 'left',
      className,
      style,
      children,
      ...props
    },
    ref
  ) {
    const formattedWidth = typeof width === 'number' ? `${width}px` : width;

    const sidebarClasses = useMemo(
      () => cn(BASE_CLASSES, VARIANT_STYLES[variant], className),
      [variant, className]
    );

    const contextValue: SidebarContextValue = useMemo(
      () => ({
        width: formattedWidth,
        variant,
        position,
      }),
      [formattedWidth, variant, position]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <aside
          ref={ref}
          className={sidebarClasses}
          style={{
            padding: 'var(--component-sidebar-padding)',
            width: formattedWidth,
            ...style,
          }}
          data-variant={variant}
          data-position={position}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  })
);

SidebarRoot.displayName = 'Sidebar';

export const Sidebar = Object.assign(SidebarRoot, {
  Content: SidebarContent,
  Footer: SidebarFooter,
  Section: SidebarSection,
  SectionHeader: SidebarSectionHeader,
  Item: SidebarItem,
});


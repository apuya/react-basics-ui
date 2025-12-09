import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import {
  forwardRef,
  memo,
  useMemo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import {
  BASE_CLASSES,
  CONTENT_CLASSES,
  FOOTER_CLASSES,
  SECTION_CLASSES,
  VARIANT_STYLES,
} from './Sidebar.styles';
import {
  SidebarSectionHeader,
  SidebarItem,
} from './SidebarItem';

// Re-export subcomponent types
export type {
  SidebarSectionHeaderProps,
  SidebarItemProps,
} from './SidebarItem';

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

export interface SidebarContentProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface SidebarFooterProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface SidebarSectionProps extends ComponentPropsWithoutRef<'div'> {
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

    const widthStyle = useMemo(
      () => ({
        width: formattedWidth,
        ...style,
      }),
      [formattedWidth, style]
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
          style={widthStyle}
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

/**
 * Main content area of the Sidebar.
 * Contains navigation items and sections.
 */
const SidebarContent = memo(
  forwardRef<HTMLDivElement, SidebarContentProps>(function SidebarContent(
    { className, children, ...props },
    ref
  ) {
    return (
      <div ref={ref} className={cn(CONTENT_CLASSES, className)} {...props}>
        {children}
      </div>
    );
  })
);

SidebarContent.displayName = 'Sidebar.Content';

/**
 * Footer section of the Sidebar.
 * Typically contains help, logout, or secondary actions.
 */
const SidebarFooter = memo(
  forwardRef<HTMLDivElement, SidebarFooterProps>(function SidebarFooter(
    { className, children, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(FOOTER_CLASSES, className)}
        {...props}
      >
        {children}
      </div>
    );
  })
);

SidebarFooter.displayName = 'Sidebar.Footer';

/**
 * A section within the Sidebar for grouping related items.
 */
const SidebarSection = memo(
  forwardRef<HTMLDivElement, SidebarSectionProps>(function SidebarSection(
    { className, children, ...props },
    ref
  ) {
    return (
      <div ref={ref} className={cn(SECTION_CLASSES, className)} {...props}>
        {children}
      </div>
    );
  })
);

SidebarSection.displayName = 'Sidebar.Section';

// Compound component exports
export const Sidebar = Object.assign(SidebarRoot, {
  Content: SidebarContent,
  Footer: SidebarFooter,
  Section: SidebarSection,
  SectionHeader: SidebarSectionHeader,
  Item: SidebarItem,
});

import { cn } from '@/lib/cn';
import {
  createContext,
  forwardRef,
  memo,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import {
  BASE_CLASSES,
  CONTENT_CLASSES,
  FOOTER_CLASSES,
  HEADER_CLASSES,
  ITEM_CLASSES,
  ITEM_ACTIVE_CLASS,
  SECTION_CLASSES,
  TOGGLE_BUTTON_CLASSES,
  VARIANT_STYLES,
} from './Sidebar.styles';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

export type SidebarVariant = 'default' | 'bordered' | 'elevated';
export type SidebarPosition = 'left' | 'right';

export interface SidebarProps extends Omit<ComponentPropsWithoutRef<'aside'>, 'children'> {
  /** Whether sidebar is collapsed */
  collapsed?: boolean;
  /** Default collapsed state (for uncontrolled mode) */
  defaultCollapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Width when expanded */
  width?: string | number;
  /** Width when collapsed */
  collapsedWidth?: string | number;
  /** Visual variant */
  variant?: SidebarVariant;
  /** Position on screen */
  position?: SidebarPosition;
  /** Show toggle button */
  showToggle?: boolean;
  /** Children elements */
  children?: ReactNode;
}

export interface SidebarHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface SidebarContentProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface SidebarFooterProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface SidebarSectionProps extends ComponentPropsWithoutRef<'div'> {
  /** Section title */
  title?: string;
  children?: ReactNode;
}

export interface SidebarItemProps extends ComponentPropsWithoutRef<'button'> {
  /** Whether item is active */
  active?: boolean;
  /** Icon element */
  icon?: ReactNode;
  children?: ReactNode;
}

interface SidebarContextValue {
  collapsed: boolean;
  width: string;
  collapsedWidth: string;
  variant: SidebarVariant;
  position: SidebarPosition;
  toggleCollapsed: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar compound components must be used within Sidebar');
  }
  return context;
};

/**
 * Sidebar component for navigation and content organization.
 * 
 * Supports collapsible state, multiple variants, and compound components for flexible layouts.
 * Can be controlled or uncontrolled.
 * 
 * @example
 * ```tsx
 * // Basic sidebar
 * <Sidebar>
 *   <Sidebar.Header>Logo</Sidebar.Header>
 *   <Sidebar.Content>
 *     <Sidebar.Item icon={<HomeIcon />}>Home</Sidebar.Item>
 *     <Sidebar.Item icon={<SettingsIcon />}>Settings</Sidebar.Item>
 *   </Sidebar.Content>
 * </Sidebar>
 * 
 * // Controlled collapsed state
 * <Sidebar collapsed={isCollapsed} onCollapsedChange={setIsCollapsed}>
 *   {content}
 * </Sidebar>
 * ```
 */
export const SidebarRoot = memo(
  forwardRef<HTMLElement, SidebarProps>(function Sidebar(
    {
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapsedChange,
      width = '280px',
      collapsedWidth = '80px',
      variant = 'default',
      position = 'left',
      showToggle = true,
      className,
      style,
      children,
      ...props
    },
    ref
  ) {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
    
    const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

    const toggleCollapsed = () => {
      const newValue = !isCollapsed;
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(newValue);
      }
      onCollapsedChange?.(newValue);
    };

    const currentWidth = isCollapsed ? collapsedWidth : width;
    const formattedWidth = typeof currentWidth === 'number' ? `${currentWidth}px` : currentWidth;

    const sidebarClasses = useMemo(
      () => cn(BASE_CLASSES, VARIANT_STYLES[variant], className),
      [variant, className]
    );

    const sidebarStyle = useMemo(
      () => ({
        width: formattedWidth,
        ...style,
      }),
      [formattedWidth, style]
    );

    const contextValue: SidebarContextValue = useMemo(
      () => ({
        collapsed: isCollapsed,
        width: formattedWidth,
        collapsedWidth: typeof collapsedWidth === 'number' ? `${collapsedWidth}px` : collapsedWidth,
        variant,
        position,
        toggleCollapsed,
      }),
      [isCollapsed, formattedWidth, collapsedWidth, variant, position]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <aside ref={ref} className={sidebarClasses} style={sidebarStyle} {...props}>
          {children}
          {showToggle && (
            <button
              type="button"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className={TOGGLE_BUTTON_CLASSES}
              onClick={toggleCollapsed}
            >
              {position === 'left' ? (
                isCollapsed ? <BiChevronRight size={20} /> : <BiChevronLeft size={20} />
              ) : (
                isCollapsed ? <BiChevronLeft size={20} /> : <BiChevronRight size={20} />
              )}
            </button>
          )}
        </aside>
      </SidebarContext.Provider>
    );
  })
);

SidebarRoot.displayName = 'Sidebar';

// Sidebar Header
const SidebarHeader = memo(
  forwardRef<HTMLDivElement, SidebarHeaderProps>(function SidebarHeader(
    { className, children, ...props },
    ref
  ) {
    const { collapsed } = useSidebarContext();

    return (
      <div
        ref={ref}
        className={cn(HEADER_CLASSES, collapsed && 'justify-center', className)}
        {...props}
      >
        {children}
      </div>
    );
  })
);

SidebarHeader.displayName = 'Sidebar.Header';

// Sidebar Content
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

// Sidebar Footer
const SidebarFooter = memo(
  forwardRef<HTMLDivElement, SidebarFooterProps>(function SidebarFooter(
    { className, children, ...props },
    ref
  ) {
    const { collapsed } = useSidebarContext();

    return (
      <div
        ref={ref}
        className={cn(FOOTER_CLASSES, collapsed && 'justify-center', className)}
        {...props}
      >
        {children}
      </div>
    );
  })
);

SidebarFooter.displayName = 'Sidebar.Footer';

// Sidebar Section
const SidebarSection = memo(
  forwardRef<HTMLDivElement, SidebarSectionProps>(function SidebarSection(
    { title, className, children, ...props },
    ref
  ) {
    const { collapsed } = useSidebarContext();

    return (
      <div ref={ref} className={cn(SECTION_CLASSES, className)} {...props}>
        {title && !collapsed && (
          <div className="px-4 py-2 text-xs font-semibold text-[color:var(--semantic-text-tertiary)] uppercase tracking-wider">
            {title}
          </div>
        )}
        {children}
      </div>
    );
  })
);

SidebarSection.displayName = 'Sidebar.Section';

// Sidebar Item
const SidebarItem = memo(
  forwardRef<HTMLButtonElement, SidebarItemProps>(function SidebarItem(
    { active = false, icon, className, children, ...props },
    ref
  ) {
    const { collapsed } = useSidebarContext();

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          ITEM_CLASSES,
          active && ITEM_ACTIVE_CLASS,
          collapsed && 'justify-center px-4',
          className
        )}
        title={collapsed && typeof children === 'string' ? children : undefined}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {!collapsed && <span className="truncate">{children}</span>}
      </button>
    );
  })
);

SidebarItem.displayName = 'Sidebar.Item';

// Compound component exports
export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Section: SidebarSection,
  Item: SidebarItem,
});

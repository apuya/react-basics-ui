import { cn } from '@/lib/cn';
import { Icon } from '@/components/utility/Icon';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { type IconType } from 'react-icons';
import {
  ICON_CLASSES,
  ICON_SIZE,
  ITEM_BASE_CLASSES,
  ITEM_ACTIVE_CLASS,
  SECTION_HEADER_CLASSES,
} from './Sidebar.styles';

// =============================================================================
// SIDEBAR SECTION HEADER
// =============================================================================

export interface SidebarSectionHeaderProps extends Omit<ComponentPropsWithoutRef<'div'>, 'color'> {
  /** Icon component to display (react-icons IconType) */
  icon?: IconType;
  /** Section header title */
  children?: ReactNode;
}

/**
 * Section header within the Sidebar for labeling groups.
 * 
 * @example
 * ```tsx
 * <Sidebar.SectionHeader icon={FolderIcon}>
 *   Navigation
 * </Sidebar.SectionHeader>
 * ```
 */
export const SidebarSectionHeader = memo(
  forwardRef<HTMLDivElement, SidebarSectionHeaderProps>(function SidebarSectionHeader(
    { icon, className, children, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(SECTION_HEADER_CLASSES, 'flex items-center', className)}
        {...props}
      >
        {icon && (
          <Icon
            icon={icon}
            size="xs"
            color="inherit"
            className={ICON_CLASSES}
          />
        )}
        {children && <span>{children}</span>}
      </div>
    );
  })
);

SidebarSectionHeader.displayName = 'Sidebar.SectionHeader';

// =============================================================================
// SIDEBAR ITEM
// =============================================================================

export interface SidebarItemProps extends ComponentPropsWithoutRef<'button'> {
  /** Whether item is active */
  active?: boolean;
  /** Icon component (react-icons IconType) */
  icon?: IconType;
  children?: ReactNode;
}

/**
 * A navigation item within the Sidebar.
 * 
 * @example
 * ```tsx
 * <Sidebar.Item icon={HomeIcon} active>
 *   Home
 * </Sidebar.Item>
 * ```
 */
export const SidebarItem = memo(
  forwardRef<HTMLButtonElement, SidebarItemProps>(function SidebarItem(
    { active = false, icon, className, children, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          ITEM_BASE_CLASSES,
          active && ITEM_ACTIVE_CLASS,
          className
        )}
        data-active={active || undefined}
        {...props}
      >
        {icon && (
          <Icon
            icon={icon}
            size={ICON_SIZE}
            color="inherit"
            className={ICON_CLASSES}
          />
        )}
        <span className="flex-1 truncate text-left">
          {children}
        </span>
      </button>
    );
  })
);

SidebarItem.displayName = 'Sidebar.Item';

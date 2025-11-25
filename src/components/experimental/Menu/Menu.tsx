import { cn } from '@/lib/cn';
import React, { createContext, type ReactNode } from 'react';
import {
  MENU_BASE_CLASSES,
  MENU_DIVIDER_CLASSES,
  MENU_GROUP_CLASSES,
  MENU_GROUP_LABEL_CLASSES,
  MENU_ITEM_BASE_CLASSES,
  MENU_ITEM_DESCRIPTION_CLASSES,
  MENU_ITEM_ICON_CLASSES,
  MENU_ITEM_SHORTCUT_CLASSES,
  MENU_ITEM_STATES,
} from './Menu.styles';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the menu item is disabled */
  disabled?: boolean;
  /** Variant style for the menu item */
  variant?: 'default' | 'danger';
  /** Icon to display before the label */
  leadingIcon?: ReactNode;
  /** Icon to display after the label */
  trailingIcon?: ReactNode;
  /** Keyboard shortcut text */
  shortcut?: string;
  /** Description text below the label */
  description?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label for the menu group */
  label?: string;
  children?: React.ReactNode;
}

export interface MenuDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

interface MenuContextValue {
  // Reserved for future enhancements (e.g., keyboard navigation state)
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

// Main Menu Component
const MenuRoot = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MenuContext.Provider value={{}}>
        <div
          ref={ref}
          role="menu"
          className={cn(MENU_BASE_CLASSES, className)}
          {...props}
        >
          {children}
        </div>
      </MenuContext.Provider>
    );
  }
);

MenuRoot.displayName = 'Menu';

// Menu Item Component
const MenuItemComponent = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      className,
      disabled = false,
      variant = 'default',
      leadingIcon,
      trailingIcon,
      shortcut,
      description,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as any);
      }
    };

    const stateClasses = disabled
      ? MENU_ITEM_STATES.disabled
      : variant === 'danger'
      ? MENU_ITEM_STATES.danger
      : MENU_ITEM_STATES.default;

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        className={cn(MENU_ITEM_BASE_CLASSES, stateClasses, className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {leadingIcon && (
          <span className={MENU_ITEM_ICON_CLASSES} aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="truncate">{children}</div>
          {description && (
            <div className={MENU_ITEM_DESCRIPTION_CLASSES}>{description}</div>
          )}
        </div>
        {shortcut && (
          <span className={MENU_ITEM_SHORTCUT_CLASSES} aria-hidden="true">
            {shortcut}
          </span>
        )}
        {trailingIcon && (
          <span className={MENU_ITEM_ICON_CLASSES} aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </div>
    );
  }
);

MenuItemComponent.displayName = 'MenuItem';

// Menu Group Component
const MenuGroupComponent = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(MENU_GROUP_CLASSES, className)}
        {...props}
      >
        {label && (
          <div className={MENU_GROUP_LABEL_CLASSES} aria-hidden="true">
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);

MenuGroupComponent.displayName = 'MenuGroup';

// Menu Divider Component
const MenuDividerComponent = React.forwardRef<HTMLDivElement, MenuDividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn(MENU_DIVIDER_CLASSES, className)}
        {...props}
      />
    );
  }
);

MenuDividerComponent.displayName = 'MenuDivider';

// Export compound component
export const Menu = Object.assign(MenuRoot, {
  Item: MenuItemComponent,
  Group: MenuGroupComponent,
  Divider: MenuDividerComponent,
});

export const MenuItem = MenuItemComponent;
export const MenuGroup = MenuGroupComponent;
export const MenuDivider = MenuDividerComponent;

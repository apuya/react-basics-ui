import { forwardRef, memo, useCallback, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Text } from '@/components/typography/Text';
import { useOptionalMenuContext } from './MenuContext';
import {
  ITEM_BASE_CLASSES,
  ITEM_STATE_STYLES,
  ITEM_STYLE,
  ITEM_VARIANT_STYLES,
  type MenuItemVariant,
} from './Menu.styles';

export interface MenuItemProps extends ComponentPropsWithoutRef<'button'> {
  /** Disable interaction */
  disabled?: boolean;
  /** Callback when item is activated */
  onAction?: () => void;
  /** Semantic variant for color theming */
  variant?: MenuItemVariant;
  /** Icon element displayed before the label */
  leadingIcon?: ReactNode;
  /** Icon element displayed after the label */
  trailingIcon?: ReactNode;
  /** Keyboard shortcut hint displayed on the right */
  shortcut?: string;
  /** Secondary description text below the main label */
  description?: string;
  /** Override closeOnAction for this item */
  closeOnAction?: boolean;
}

/**
 * Menu.Item - An actionable menu item.
 * 
 * Renders a `role="menuitem"` button that triggers an action.
 * Unlike List.Item, Menu.Item does not maintain selection state.
 */
export const MenuItem = memo(
  forwardRef<HTMLButtonElement, MenuItemProps>(
    ({ 
      disabled = false, 
      onAction, 
      variant = 'default',
      leadingIcon, 
      trailingIcon,
      shortcut,
      description, 
      closeOnAction,
      className, 
      children, 
      onClick,
      ...props 
    }, ref) => {
      const context = useOptionalMenuContext();
      const [isHovered, setIsHovered] = useState(false);
      
      const hasDescription = Boolean(description);
      
      // Get variant styling
      const variantStyle = ITEM_VARIANT_STYLES[variant];
      
      // Determine state for styling
      const state = disabled ? 'disabled' : isHovered ? 'hover' : 'default';
      const itemClasses = cn(
        ITEM_BASE_CLASSES, 
        ITEM_STATE_STYLES[state],
        className
      );

      // Compute inline styles for variant colors
      const inlineStyles = {
        ...ITEM_STYLE,
        ...(variantStyle.color && !disabled ? { color: variantStyle.color } : {}),
        ...(isHovered && variantStyle.hoverBg && !disabled ? { backgroundColor: variantStyle.hoverBg } : {}),
      };

      const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        
        onClick?.(e);
        onAction?.();
        
        // Close menu after action (default: true)
        const shouldClose = closeOnAction ?? context?.closeOnAction ?? true;
        if (shouldClose && context) {
          context.setIsOpen(false);
        }
      }, [disabled, onClick, onAction, closeOnAction, context]);

      const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
      }, []);

      const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
      }, []);

      return (
        <button
          ref={ref}
          type="button"
          role="menuitem"
          aria-disabled={disabled}
          disabled={disabled}
          className={itemClasses}
          style={inlineStyles}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {leadingIcon && (
            <span className={cn("shrink-0 size-4", hasDescription && "self-start mt-0.5")}>
              {leadingIcon}
            </span>
          )}
          {hasDescription ? (
            <span className="flex-1 text-left flex flex-col">
              <Text size="body">{children}</Text>
              <Text size="caption" color="secondary">{description}</Text>
            </span>
          ) : (
            <span className="flex-1 text-left">{children}</span>
          )}
          {shortcut && (
            <span className="shrink-0 text-xs text-[color:var(--color-text-tertiary)] ml-auto pl-4">
              {shortcut}
            </span>
          )}
          {trailingIcon && (
            <span className={cn("shrink-0 size-4", hasDescription && "self-start mt-0.5")}>
              {trailingIcon}
            </span>
          )}
        </button>
      );
    }
  )
);

MenuItem.displayName = 'Menu.Item';

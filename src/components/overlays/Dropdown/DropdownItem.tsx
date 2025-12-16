import { forwardRef, useCallback, useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/utility/Icon';
import { Text } from '@/components/typography/Text';
import { Menu, type MenuItemProps } from '@/components/overlays/Menu';
import { useDropdownContext } from './Dropdown';

/**
 * Individual actionable menu item with support for icons, shortcuts, variants, and states.
 * 
 * Features:
 * - Semantic variants (default, success, info, warning, danger)
 * - Leading icon support
 * - Keyboard shortcuts display
 * - Checkbox state for selections
 * - Secondary descriptions
 * - Disabled state
 * - Automatic menu close on click
 * 
 * @example
 * ```tsx
 * <Dropdown.Item leadingIcon={<BiEdit />} shortcut="⌘E">
 *   Edit
 * </Dropdown.Item>
 * 
 * <Dropdown.Item variant="danger" leadingIcon={<BiTrash />}>
 *   Delete
 * </Dropdown.Item>
 * 
 * <Dropdown.Item checked={isSelected} description="Enable notifications">
 *   Notifications
 * </Dropdown.Item>
 * ```
 */

/**
 * Props for the DropdownItem component.
 */
export interface DropdownItemProps extends Omit<MenuItemProps, 'onAction' | 'closeOnAction'> {
  /** Callback invoked when item is selected (before menu closes) */
  onSelect?: () => void;
  /**
   * @deprecated Use variant="danger" instead
   */
  destructive?: boolean;
  /** Checkbox state for controlled mode: undefined = no checkbox, true = checked, false = unchecked */
  checked?: boolean;
  /** Default checkbox state for uncontrolled mode */
  defaultChecked?: boolean;
  /** Callback when checkbox state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether to close the menu when this item is selected. Defaults to true. */
  closeOnSelect?: boolean;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ 
    disabled = false, 
    onSelect, 
    shortcut, 
    leadingIcon, 
    variant = 'default', 
    destructive = false, 
    checked, 
    defaultChecked, 
    onCheckedChange, 
    description, 
    closeOnSelect, 
    className, 
    children, 
    onClick, 
    ...props 
  }, ref) => {
    const { setIsOpen } = useDropdownContext();

    // Determine if checkbox is controlled or uncontrolled
    const isCheckbox = checked !== undefined || defaultChecked !== undefined;
    const isControlled = checked !== undefined;
    
    // Internal state for uncontrolled checkbox mode
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    
    // Get the effective checked state
    const effectiveChecked = isControlled ? checked : (isCheckbox ? internalChecked : undefined);

    // Determine whether to close menu on select:
    // - If closeOnSelect is explicitly set, use that value
    // - If checkbox item, default to keeping menu open
    // - Otherwise, default to closing the menu
    const shouldCloseOnSelect = closeOnSelect ?? !isCheckbox;

    // Support deprecated destructive prop with warning (fires once per mount)
    useEffect(() => {
      if (destructive) {
        console.warn(
          'Dropdown.Item: The "destructive" prop is deprecated and will be removed in a future version. Please use variant="danger" instead.'
        );
      }
    }, [destructive]);
    
    const effectiveVariant = destructive ? 'danger' : variant;

    /**
     * Handle item click: toggle checkbox if applicable, invoke callbacks, optionally close menu.
     */
    const handleAction = useCallback(() => {
      if (disabled) return;
      
      // Toggle checkbox state if this is a checkbox item
      if (isCheckbox) {
        const newChecked = !effectiveChecked;
        if (!isControlled) {
          setInternalChecked(newChecked);
        }
        onCheckedChange?.(newChecked);
      }
      
      onSelect?.();
      
      if (shouldCloseOnSelect) {
        setIsOpen(false);
      }
    }, [disabled, isCheckbox, effectiveChecked, isControlled, onCheckedChange, onSelect, shouldCloseOnSelect, setIsOpen]);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
      },
      [onClick]
    );

    // If checkbox item, render with Menu.Item but add checkbox UI
    if (isCheckbox) {
      return (
        <Menu.Item
          ref={ref}
          role="menuitemcheckbox"
          aria-checked={effectiveChecked}
          disabled={disabled}
          variant={effectiveVariant}
          closeOnAction={shouldCloseOnSelect}
          onAction={handleAction}
          onClick={handleClick}
          className={className}
          {...props}
        >
          <span 
            className="relative inline-flex items-center justify-center flex-shrink-0 border-2 rounded transition-all"
            style={{
              width: 'var(--component-checkbox-size-small)',
              height: 'var(--component-checkbox-size-small)',
              borderColor: effectiveChecked ? 'var(--component-checkbox-border-checked)' : 'var(--component-checkbox-border-default)',
              backgroundColor: effectiveChecked ? 'var(--component-checkbox-bg-checked)' : 'var(--component-checkbox-bg-default)',
            }}
            aria-hidden="true"
          >
            <span 
              className="absolute inset-0 flex items-center justify-center transition-opacity"
              style={{
                opacity: effectiveChecked ? 'var(--component-checkbox-check-opacity-visible)' : 'var(--component-checkbox-check-opacity-hidden)',
              }}
            >
              <Icon icon={BiCheck} size="sm" color="inverse" />
            </span>
          </span>
          
          {leadingIcon && (
            <span className="shrink-0" aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          
          <span className="flex-1 text-left min-w-0">
            <span className="block truncate">{children}</span>
            {description && (
              <Text
                as="div"
                size="small"
                color="secondary"
                className="overflow-hidden text-ellipsis mt-1"
              >
                {description}
              </Text>
            )}
          </span>
          
          {shortcut && (
            <Text size="small" color="tertiary" as="span" aria-label={`Keyboard shortcut: ${shortcut}`}>
              {shortcut}
            </Text>
          )}
        </Menu.Item>
      );
    }

    // For non-checkbox items, delegate to Menu.Item
    return (
      <Menu.Item
        ref={ref}
        disabled={disabled}
        variant={effectiveVariant}
        leadingIcon={leadingIcon}
        shortcut={shortcut}
        description={description}
        closeOnAction={shouldCloseOnSelect}
        onAction={handleAction}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </Menu.Item>
    );
  }
);

DropdownItem.displayName = 'Dropdown.Item';

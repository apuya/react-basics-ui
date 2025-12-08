import { forwardRef, useCallback, useEffect, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { BiCheck } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/basic/utility/Icon';
import { Text } from '@/components/basic/typography/Text';
import { useDropdownContext } from './Dropdown';
import {
  DESCRIPTION_TEXT_CLASSES,
  DISABLED_ICON_CLASSES,
  DISABLED_ITEM_CLASSES,
  ICON_CLASSES,
  ICON_VARIANT_STYLES,
  ICON_WRAPPER_CLASSES,
  ITEM_BASE_CLASSES,
  ITEM_CLASSES,
  ITEM_VARIANT_STYLES,
  SHORTCUT_CLASSES,
  type DropdownItemVariant,
} from './Dropdown.styles';

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
export interface DropdownItemProps extends ComponentPropsWithoutRef<'button'> {
  /** Disable interaction and apply disabled styles */
  disabled?: boolean;
  /** Callback invoked when item is selected (before menu closes) */
  onSelect?: () => void;
  /** Keyboard shortcut text displayed on the right */
  shortcut?: string;
  /** Icon element displayed before the text */
  leadingIcon?: ReactNode;
  /** Semantic variant for color theming */
  variant?: DropdownItemVariant;
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
  /** Secondary description text below the main label */
  description?: string;
  /** Whether to close the menu when this item is selected. Defaults to true. */
  closeOnSelect?: boolean;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ disabled = false, onSelect, shortcut, leadingIcon, variant = 'default', destructive = false, checked, defaultChecked, onCheckedChange, description, closeOnSelect, className, children, onClick, ...props }, ref) => {
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

    // Build CSS classes with variant-specific styling
    const itemClasses = disabled
      ? cn(ITEM_BASE_CLASSES, ITEM_CLASSES, DISABLED_ITEM_CLASSES, className)
      : cn(
          ITEM_BASE_CLASSES,
          ITEM_CLASSES,
          ITEM_VARIANT_STYLES[effectiveVariant].default,
          ITEM_VARIANT_STYLES[effectiveVariant].hoverClasses,
          ITEM_VARIANT_STYLES[effectiveVariant].activeClasses,
          className
        );

    // Icon color classes based on variant
    const iconClasses = disabled
      ? cn(ICON_WRAPPER_CLASSES, DISABLED_ICON_CLASSES)
      : cn(
          ICON_WRAPPER_CLASSES,
          ICON_VARIANT_STYLES[effectiveVariant].default,
          ICON_VARIANT_STYLES[effectiveVariant].hoverClasses,
          ICON_VARIANT_STYLES[effectiveVariant].activeClasses
        );

    /**
     * Handle item click: toggle checkbox if applicable, invoke callbacks, optionally close menu.
     * Prevents action if item is disabled.
     */
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
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
        onClick?.(e);
      },
      [disabled, isCheckbox, effectiveChecked, isControlled, onCheckedChange, onSelect, shouldCloseOnSelect, setIsOpen, onClick]
    );

    return (
      <button
        ref={ref}
        type="button"
        role={isCheckbox ? 'menuitemcheckbox' : 'menuitem'}
        aria-checked={isCheckbox ? effectiveChecked : undefined}
        disabled={disabled}
        className={cn('group', itemClasses, description && 'h-auto')}
        onClick={handleClick}
        {...props}
      >
          {isCheckbox && (
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
          )}
          {leadingIcon && (
            <span className={cn(iconClasses, ICON_CLASSES)} aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          <span className="flex-1 text-left min-w-0">
            <span className="block truncate">{children}</span>
            {description && (
              <Text
                as="div"
                className={cn('overflow-hidden text-ellipsis mt-1', DESCRIPTION_TEXT_CLASSES)}
              >
                {description}
              </Text>
            )}
          </span>
          {shortcut && (
            <Text size="small" color="tertiary" className={SHORTCUT_CLASSES} as="span" aria-label={`Keyboard shortcut: ${shortcut}`}>
              {shortcut}
            </Text>
          )}
      </button>
    );
  }
);

DropdownItem.displayName = 'Dropdown.Item';

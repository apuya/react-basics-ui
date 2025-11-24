import { forwardRef, useCallback, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { BiCheck } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/utility/Icon';
import { Text } from '@/components/typography/Text';
import { useDropdownContext } from './Dropdown';
import {
  DESCRIPTION_TEXT_STYLE,
  ICON_STYLE,
  ICON_VARIANT_STYLES,
  ICON_WRAPPER_CLASSES,
  ITEM_BASE_CLASSES,
  ITEM_STYLE,
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
  /** Checkbox state: undefined = no checkbox, true = checked, false = unchecked */
  checked?: boolean;
  /** Secondary description text below the main label */
  description?: string;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ disabled = false, onSelect, shortcut, leadingIcon, variant = 'default', destructive = false, checked, description, className, children, onClick, ...props }, ref) => {
    const { setIsOpen } = useDropdownContext();

    // Support deprecated destructive prop
    const effectiveVariant = destructive ? 'danger' : variant;

    // Get style objects from constants
    const itemStyle = ITEM_STYLE(!!description);
    const iconStyle = ICON_STYLE;

    // Build CSS classes with variant-specific styling
    const itemClasses = disabled
      ? cn(
          ITEM_BASE_CLASSES,
          'bg-[var(--component-dropdown-item-bg-disabled)] text-[var(--component-dropdown-item-text-disabled)] cursor-not-allowed opacity-[var(--semantic-opacity-disabled)]',
          className
        )
      : cn(
          ITEM_BASE_CLASSES,
          ITEM_VARIANT_STYLES[effectiveVariant].default,
          ITEM_VARIANT_STYLES[effectiveVariant].hoverClasses,
          ITEM_VARIANT_STYLES[effectiveVariant].activeClasses,
          className
        );

    // Icon color classes based on variant
    const iconClasses = disabled
      ? cn(ICON_WRAPPER_CLASSES, 'text-[var(--component-dropdown-item-icon-disabled)]')
      : cn(
          ICON_WRAPPER_CLASSES,
          ICON_VARIANT_STYLES[effectiveVariant].default,
          ICON_VARIANT_STYLES[effectiveVariant].hoverClasses,
          ICON_VARIANT_STYLES[effectiveVariant].activeClasses
        );

    /**
     * Handle item click: invoke callback, close menu, and call native onClick.
     * Prevents action if item is disabled.
     */
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        onSelect?.();
        setIsOpen(false);
        onClick?.(e);
      },
      [disabled, onSelect, setIsOpen, onClick]
    );

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        className={cn('group', itemClasses)}
        style={itemStyle}
        onClick={handleClick}
        {...props}
      >
          {checked !== undefined && (
            <span 
              className="relative inline-flex items-center justify-center flex-shrink-0 border-2 rounded transition-all"
              style={{
                width: 'var(--component-checkbox-size-small)',
                height: 'var(--component-checkbox-size-small)',
                borderColor: checked ? 'var(--component-checkbox-border-checked)' : 'var(--component-checkbox-border-default)',
                backgroundColor: checked ? 'var(--component-checkbox-bg-checked)' : 'var(--component-checkbox-bg-default)',
              }}
              aria-hidden="true"
            >
              <span 
                className="absolute inset-0 flex items-center justify-center transition-opacity"
                style={{
                  opacity: checked ? 'var(--component-checkbox-check-opacity-visible)' : 'var(--component-checkbox-check-opacity-hidden)',
                }}
              >
                <Icon icon={BiCheck} size="sm" color="inverse" />
              </span>
            </span>
          )}
          {leadingIcon && (
            <span className={iconClasses} style={iconStyle} aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          <span className="flex-1 text-left min-w-0">
            <span className="block truncate">{children}</span>
            {description && (
              <Text
                as="div"
                className="overflow-hidden text-ellipsis"
                style={{ ...DESCRIPTION_TEXT_STYLE, marginTop: 'var(--component-dropdown-item-gap)' }}
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

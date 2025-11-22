import { cn } from '@/lib/cn';
import { forwardRef, memo, useCallback, useMemo, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { useDropdownContext } from './Dropdown';
import {
  ICON_VARIANT_STYLES,
  ICON_WRAPPER_CLASSES,
  ITEM_BASE_CLASSES,
  ITEM_VARIANT_STYLES,
  SHORTCUT_CLASSES,
  type DropdownItemVariant,
} from './Dropdown.styles';

export interface DropdownItemProps extends ComponentPropsWithoutRef<'button'> {
  disabled?: boolean;
  onSelect?: () => void;
  shortcut?: string;
  leadingIcon?: ReactNode;
  variant?: DropdownItemVariant;
  /** @deprecated Use variant="danger" instead */
  destructive?: boolean;
}

export const DropdownItem = memo(
  forwardRef<HTMLButtonElement, DropdownItemProps>(
    ({ disabled = false, onSelect, shortcut, leadingIcon, variant = 'default', destructive = false, className, children, onClick, ...props }, ref) => {
      const { setIsOpen } = useDropdownContext();
      const [isHovered, setIsHovered] = useState(false);
      const [isActive, setIsActive] = useState(false);

      // Support deprecated destructive prop
      const effectiveVariant = destructive ? 'danger' : variant;

      const itemStyle = useMemo(
        () => ({
          height: 'var(--component-dropdown-item-height)',
          paddingInline: 'var(--component-dropdown-item-padding-inline)',
          paddingBlock: 'var(--component-dropdown-item-padding-block)',
          gap: 'var(--component-dropdown-item-gap)',
          borderRadius: 'var(--component-dropdown-item-radius)',
        }),
        []
      );

      const iconStyle = useMemo(
        () => ({
          width: 'var(--component-dropdown-icon-size)',
          height: 'var(--component-dropdown-icon-size)',
        }),
        []
      );

      const state = disabled ? 'disabled' : isActive ? 'active' : isHovered ? 'hover' : 'default';

      const itemClasses = useMemo(() => {
        if (disabled) {
          return cn(
            ITEM_BASE_CLASSES,
            'bg-[var(--component-dropdown-item-bg-disabled)] text-[var(--component-dropdown-item-text-disabled)] cursor-not-allowed opacity-[var(--semantic-opacity-disabled)]',
            className
          );
        }
        return cn(
          ITEM_BASE_CLASSES,
          ITEM_VARIANT_STYLES[effectiveVariant][state as 'default' | 'hover' | 'active'],
          className
        );
      }, [disabled, state, effectiveVariant, className]);

      const iconClasses = useMemo(() => {
        if (disabled) {
          return cn(ICON_WRAPPER_CLASSES, 'text-[var(--component-dropdown-item-icon-disabled)]');
        }
        return cn(ICON_WRAPPER_CLASSES, ICON_VARIANT_STYLES[effectiveVariant][state as 'default' | 'hover' | 'active']);
      }, [disabled, state, effectiveVariant]);

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
          className={itemClasses}
          style={itemStyle}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsActive(false);
          }}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          {...props}
        >
          {leadingIcon && (
            <span className={iconClasses} style={iconStyle} aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          <span className="flex-1 text-left">{children}</span>
          {shortcut && (
            <span className={SHORTCUT_CLASSES} aria-label={`Keyboard shortcut: ${shortcut}`}>
              {shortcut}
            </span>
          )}
        </button>
      );
    }
  )
);

DropdownItem.displayName = 'Dropdown.Item';

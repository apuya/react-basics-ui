import { cn } from '@/lib/cn';
import { forwardRef, memo, useCallback, useMemo, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { useDropdownContext } from './Dropdown';
import {
  ICON_WRAPPER_CLASSES,
  ITEM_BASE_CLASSES,
  ITEM_STATE_STYLES,
  SHORTCUT_CLASSES,
} from './Dropdown.styles';

export interface DropdownItemProps extends ComponentPropsWithoutRef<'button'> {
  disabled?: boolean;
  onSelect?: () => void;
  shortcut?: string;
  leadingIcon?: ReactNode;
  destructive?: boolean;
}

export const DropdownItem = memo(
  forwardRef<HTMLButtonElement, DropdownItemProps>(
    ({ disabled = false, onSelect, shortcut, leadingIcon, destructive = false, className, children, onClick, ...props }, ref) => {
      const { setIsOpen } = useDropdownContext();
      const [isHovered, setIsHovered] = useState(false);

      const itemStyle = useMemo(
        () => ({
          height: 'var(--component-dropdown-item-height)',
          paddingInline: 'var(--component-dropdown-item-padding-inline)',
          paddingBlock: 'var(--component-dropdown-item-padding-block)',
          gap: 'var(--component-dropdown-item-gap)',
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

      const itemClasses = useMemo(() => {
        const state = disabled ? 'disabled' : isHovered ? 'hover' : 'default';
        return cn(
          ITEM_BASE_CLASSES,
          ITEM_STATE_STYLES[state],
          destructive && !disabled && 'text-[var(--semantic-status-error-default)]',
          className
        );
      }, [disabled, isHovered, destructive, className]);

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
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          {leadingIcon && (
            <span className={ICON_WRAPPER_CLASSES} style={iconStyle} aria-hidden="true">
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

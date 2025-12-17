/**
 * @file TableActionBar.tsx
 * @description Table action bar component for search and action buttons.
 *
 * Renders in the table header area with variants for search input with
 * dropdown, action buttons, or empty spacing.
 *
 * @example
 * ```tsx
 * <Table.ActionBar
 *   variant="search"
 *   searchProps={{ placeholder: 'Search...' }}
 *   dropdownMenu={<Dropdown.Menu>...</Dropdown.Menu>}
 * />
 * ```
 */

import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode, type CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import { useTableContext } from './TableContext';
import {
  TABLE_ACTION_BAR_HEADER_CLASSES,
  TABLE_ACTION_BAR_BASE_CLASSES,
  TABLE_ACTION_BAR_DEFAULT_STYLE,
  TABLE_ACTION_BAR_CONTENT_STYLE,
  TABLE_ACTION_BAR_FLEX_STYLE,
} from './Table.styles';
import { SearchBar, type SearchBarProps } from '@/components/forms/SearchBar';
import { Button } from '@/components/actions/Button';
import { Dropdown } from '@/components/overlays/Dropdown';
import { Icon } from '@/components/utility/Icon';
import { type IconType } from 'react-icons';

export type TableActionBarVariant = 'default' | 'search' | 'actions';
export type TableActionBarAlign = 'left' | 'right';

export interface TableActionBarActionButton {
  label: string;
  onClick?: () => void;
  icon?: IconType;
  disabled?: boolean;
}

export interface TableActionBarProps extends ComponentPropsWithoutRef<'th'> {
  variant?: TableActionBarVariant;
  /** Alignment of action buttons (only applies to actions variant) */
  align?: TableActionBarAlign;
  // Props for search variant
  searchProps?: Omit<SearchBarProps, 'size'>;
  dropdownTriggerLabel?: string;
  dropdownTriggerIcon?: IconType;
  dropdownMenu?: ReactNode;
  // Props for actions variant
  primaryAction?: TableActionBarActionButton;
  secondaryAction?: TableActionBarActionButton;
}

export const TableActionBar = memo(
  forwardRef<HTMLTableCellElement, TableActionBarProps>(({ 
    variant = 'default',
    align = 'right',
    className,
    style,
    searchProps,
    dropdownTriggerLabel = 'Actions',
    dropdownTriggerIcon,
    dropdownMenu,
    primaryAction,
    secondaryAction,
    ...props 
  }, ref) => {
    const { size } = useTableContext();

    const headerClasses = useMemo(
      () => cn(TABLE_ACTION_BAR_HEADER_CLASSES, TABLE_ACTION_BAR_BASE_CLASSES, className),
      [className]
    );

    // Default variant - early return for performance (no padding, fixed height)
    if (variant === 'default') {
      const defaultCellStyle: CSSProperties = style
        ? { ...TABLE_ACTION_BAR_DEFAULT_STYLE, ...style }
        : TABLE_ACTION_BAR_DEFAULT_STYLE;

      return (
        <th ref={ref} className={headerClasses} style={defaultCellStyle} data-variant={variant} data-size={size} {...props} />
      );
    }

    // Cell style with padding - only computed for non-default variants
    const cellStyle: CSSProperties = style
      ? { ...TABLE_ACTION_BAR_CONTENT_STYLE, ...style }
      : TABLE_ACTION_BAR_CONTENT_STYLE;

    // Search variant
    if (variant === 'search') {
      return (
        <th ref={ref} className={headerClasses} style={cellStyle} data-variant={variant} data-size={size} {...props}>
          <div style={TABLE_ACTION_BAR_FLEX_STYLE}>
            <SearchBar
              size="small"
              {...searchProps}
              className={cn('flex-1', searchProps?.className)}
            />
            {dropdownMenu && (
              <Dropdown>
                <Dropdown.Trigger>
                  <Button 
                    size="small" 
                    variant="tertiary"
                    leadingVisual={dropdownTriggerIcon ? <Icon icon={dropdownTriggerIcon} size="sm" /> : undefined}
                  >
                    {dropdownTriggerLabel}
                  </Button>
                </Dropdown.Trigger>
                {dropdownMenu}
              </Dropdown>
            )}
          </div>
        </th>
      );
    }

    // Actions variant
    const actionsContainerStyle: CSSProperties = {
      ...TABLE_ACTION_BAR_FLEX_STYLE,
      justifyContent: align === 'left' ? 'flex-start' : 'flex-end',
    };

    return (
      <th ref={ref} className={headerClasses} style={cellStyle} data-variant={variant} data-align={align} data-size={size} {...props}>
        <div style={actionsContainerStyle}>
          {secondaryAction && (
            <Button
              size="small"
              variant="tertiary"
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
              leadingVisual={secondaryAction.icon ? <Icon icon={secondaryAction.icon} size="sm" /> : undefined}
            >
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              size="small"
              variant="tertiary"
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              leadingVisual={primaryAction.icon ? <Icon icon={primaryAction.icon} size="sm" /> : undefined}
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      </th>
    );
  })
);

TableActionBar.displayName = 'Table.ActionBar';
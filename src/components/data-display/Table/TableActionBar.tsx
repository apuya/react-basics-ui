import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useTableContext } from './TableContext';
import { TABLE_ACTION_BAR_HEADER_CLASSES, TABLE_ACTION_BAR_BASE_CLASSES, TABLE_ACTION_BAR_STYLE } from './Table.styles';
import { SearchBar, type SearchBarProps } from '@/components/forms/SearchBar';
import { Button } from '@/components/forms/Button';
import { Dropdown } from '@/components/navigation/Dropdown';
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

// Flex container classes with gap
const FLEX_CONTAINER_CLASSES = 'flex items-center w-full';

// Height class for default variant - fixed height, no padding
const DEFAULT_CELL_CLASSES = '';

// Style for default variant
const DEFAULT_CELL_STYLE = { height: '48px' } as const;

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
      return (
        <th ref={ref} className={cn(headerClasses, DEFAULT_CELL_CLASSES, className)} style={DEFAULT_CELL_STYLE} data-variant={variant} data-size={size} {...props} />
      );
    }

    // Cell classes for non-default variants (layout only - spacing via inline styles)
    const cellClasses = 'w-full';

    // Search variant
    if (variant === 'search') {
      return (
        <th ref={ref} className={cn(headerClasses, cellClasses)} style={{ ...TABLE_ACTION_BAR_STYLE, ...style }} data-variant={variant} data-size={size} {...props}>
          <div className={FLEX_CONTAINER_CLASSES} style={{ gap: '12px' }}>
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
                    leadingIcon={dropdownTriggerIcon ? <Icon icon={dropdownTriggerIcon} size="sm" /> : undefined}
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
    const actionsContainerClasses = cn(
      FLEX_CONTAINER_CLASSES,
      align === 'left' ? 'justify-start' : 'justify-end'
    );

    return (
      <th ref={ref} className={cn(headerClasses, cellClasses)} style={{ ...TABLE_ACTION_BAR_STYLE, ...style }} data-variant={variant} data-align={align} data-size={size} {...props}>
        <div className={actionsContainerClasses} style={{ gap: '12px' }}>
          {secondaryAction && (
            <Button
              size="small"
              variant="tertiary"
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
              leadingIcon={secondaryAction.icon ? <Icon icon={secondaryAction.icon} size="sm" /> : undefined}
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
              leadingIcon={primaryAction.icon ? <Icon icon={primaryAction.icon} size="sm" /> : undefined}
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
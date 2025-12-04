import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useTableContext } from './TableContext';
import { TABLE_HEADER_BASE_CLASSES, TABLE_ACTION_BAR_BASE_CLASSES, TABLE_CELL_SIZE_STYLES } from './Table.styles';
import { SearchBar, type SearchBarProps } from '@/components/basic/forms/SearchBar';
import { Button } from '@/components/basic/forms/Button';
import { Dropdown } from '@/components/advanced/navigation/Dropdown';
import { Icon } from '@/components/basic/utility/Icon';
import { Flex } from '@/components/basic/layout/Flex';
import { type IconType } from 'react-icons';

export type TableActionBarVariant = 'default' | 'search' | 'actions';

export interface TableActionBarActionButton {
  label: string;
  onClick?: () => void;
  icon?: IconType;
  disabled?: boolean;
}

export interface TableActionBarProps extends ComponentPropsWithoutRef<'th'> {
  variant?: TableActionBarVariant;
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
    className,
    children,
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
      () => cn(TABLE_HEADER_BASE_CLASSES, TABLE_ACTION_BAR_BASE_CLASSES, TABLE_CELL_SIZE_STYLES[size], className),
      [size, className]
    );

    // Render search variant
    if (variant === 'search') {
      return (
        <th ref={ref} className={headerClasses} data-variant={variant} {...props}>
          <Flex align="center" gap="sm" className="w-full">
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
          </Flex>
        </th>
      );
    }

    // Render actions variant
    if (variant === 'actions') {
      return (
        <th ref={ref} className={headerClasses} data-variant={variant} {...props}>
          <Flex align="center" gap="sm" className="w-full">
            {children && <span className="flex-1">{children}</span>}
            <Flex align="center" gap="sm">
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
            </Flex>
          </Flex>
        </th>
      );
    }

    // Default variant - empty
    return (
      <th ref={ref} className={headerClasses} data-variant={variant} {...props} />
    );
  })
);

TableActionBar.displayName = 'Table.ActionBar';

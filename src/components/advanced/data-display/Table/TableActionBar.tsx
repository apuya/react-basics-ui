import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useTableContext } from './Table';
import { TABLE_HEADER_BASE_CLASSES } from './Table.styles';
import { SearchBar, type SearchBarProps } from '@/components/basic/forms/SearchBar';
import { Button } from '@/components/basic/forms/Button';
import { Dropdown } from '@/components/advanced/navigation/Dropdown';
import { Icon } from '@/components/basic/utility/Icon';
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
    useTableContext();

    const headerClasses = useMemo(
      () => cn(TABLE_HEADER_BASE_CLASSES, 'bg-white', className),
      [className]
    );

    const paddingStyle = useMemo(
      () => ({
        paddingInline: 'var(--component-table-padding-md)',
        paddingBlock: 'var(--component-table-padding-sm)',
        minHeight: '44px',
      }),
      []
    );

    // Render search variant
    if (variant === 'search') {
      return (
        <th ref={ref} className={headerClasses} style={paddingStyle} {...props}>
          <div className="flex items-center w-full" style={{ gap: '8px' }}>
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

    // Render actions variant
    if (variant === 'actions') {
      return (
        <th ref={ref} className={headerClasses} style={paddingStyle} {...props}>
          <div className="flex items-center w-full" style={{ gap: '8px' }}>
            {children && <span className="flex-1">{children}</span>}
            <div className="flex items-center" style={{ gap: '8px' }}>
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
          </div>
        </th>
      );
    }

    // Default variant - empty
    return (
      <th ref={ref} className={headerClasses} style={paddingStyle} {...props} />
    );
  })
);

TableActionBar.displayName = 'Table.ActionBar';

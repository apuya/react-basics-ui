import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { TABLE_HEADER_BASE_CLASSES, TABLE_HEADER_SORTABLE_CLASSES, TABLE_CELL_SIZE_STYLES } from './Table.styles';
import { Checkbox } from '@/components/basic/forms/Checkbox';
import { useTableContext } from './TableContext';
import { Flex } from '@/components/basic/layout/Flex';

export type TableHeaderVariant = 'default' | 'checkbox' | 'rowHeader';

export interface TableHeaderProps extends ComponentPropsWithoutRef<'th'> {
  variant?: TableHeaderVariant;
  // Checkbox variant props
  checked?: boolean;
  indeterminate?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  // Sortable header props
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

const SORT_ICON_ACTIVE_STYLE = { color: 'var(--component-table-cell-text)' } as const;
const SORT_ICON_INACTIVE_STYLE = { color: 'var(--component-table-cell-text-header)' } as const;

export const TableHeader = memo(
  forwardRef<HTMLTableCellElement, TableHeaderProps>(({
    className,
    variant = 'default',
    checked,
    indeterminate,
    onCheckboxChange,
    sortable,
    sortDirection,
    onSort,
    children,
    ...props
  }, ref) => {
    const { size } = useTableContext();

    const headerClasses = useMemo(
      () => cn(
        TABLE_HEADER_BASE_CLASSES,
        TABLE_CELL_SIZE_STYLES[size],
        (sortable || onSort) && TABLE_HEADER_SORTABLE_CLASSES,
        className
      ),
      [size, sortable, onSort, className]
    );

    // Checkbox variant - centered checkbox for row selection
    if (variant === 'checkbox') {
      return (
        <th
          ref={ref}
          className={cn(TABLE_HEADER_BASE_CLASSES, 'w-12 text-center', className)}
          data-variant={variant}
          {...props}
        >
          <Checkbox
            size="small"
            checked={checked}
            indeterminate={indeterminate}
            onChange={(e) => onCheckboxChange?.(e.target.checked)}
          />
        </th>
      );
    }

    // Sortable header - button with sort indicators
    if (sortable || onSort) {
      return (
        <th
          ref={ref}
          className={headerClasses}
          onClick={onSort}
          data-variant="sortable"
          data-sort-direction={sortDirection || undefined}
          {...props}
        >
          <Flex align="center" gap="xs">
            <span>{children}</span>
            <Flex direction="column" gap="none">
              <BiChevronUp
                size={12}
                style={sortDirection === 'asc' ? SORT_ICON_ACTIVE_STYLE : SORT_ICON_INACTIVE_STYLE}
              />
              <BiChevronDown
                size={12}
                style={{
                  ...(sortDirection === 'desc' ? SORT_ICON_ACTIVE_STYLE : SORT_ICON_INACTIVE_STYLE),
                  marginTop: '-4px',
                }}
              />
            </Flex>
          </Flex>
        </th>
      );
    }

    // Default variant - simple text header
    return (
      <th
        ref={ref}
        className={headerClasses}
        data-variant={variant}
        {...props}
      >
        {children}
      </th>
    );
  })
);

TableHeader.displayName = 'Table.Header';

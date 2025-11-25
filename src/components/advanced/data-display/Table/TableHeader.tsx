import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { TABLE_HEADER_BASE_CLASSES, TABLE_HEADER_TAB_CLASSES } from './Table.styles';
import { Checkbox } from '@/components/basic/forms/Checkbox';

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
    const headerClasses = useMemo(
      () => cn(TABLE_HEADER_BASE_CLASSES, className),
      [className]
    );

    const variantStyle = useMemo(
      () => {
        if (variant === 'default') {
          return {
            display: 'flex',
            width: '40px',
            height: '40px',
            minWidth: '40px',
            minHeight: '32px',
            padding: '0 0',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '0',
            flexShrink: 0,
            borderRadius: '0',
            borderTop: '0.5px solid #ECECEC',
            borderBottom: '0.5px solid #ECECEC',
            background: '#FFF',
          };
        }

        if (variant === 'checkbox') {
          return {
            display: 'inline-flex',
            minWidth: '40px',
            minHeight: '40px',
            padding: '8px 8px',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0',
            borderRadius: '0',
            border: '0.5px solid #ECECEC',
            background: '#FFF',
          };
        }

        if (variant === 'rowHeader') {
          return {
            display: 'inline-flex',
            minWidth: '160px',
            minHeight: '32px',
            padding: '8px 8px',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '0',
            borderRadius: '0',
            border: '0.5px solid #ECECEC',
            background: '#FFF',
          };
        }

        return {};
      },
      [variant]
    );

    const renderRowHeader = () => {
      const isActive = sortDirection !== null;

      return (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            'inline-flex items-center justify-center gap-1.5 rounded-md border border-transparent',
            'text-xs font-medium transition-colors cursor-pointer outline-none',
            'h-7 px-2',
            TABLE_HEADER_TAB_CLASSES,
            isActive
              ? 'bg-white text-gray-900 border-gray-200'
              : 'bg-transparent text-gray-600 hover:text-gray-900'
          )}
        >
          {children}
          {(sortable || onSort) && (
            <span style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
              <BiChevronUp
                size={12}
                style={{
                  color: sortDirection === 'asc'
                    ? 'var(--semantic-text-primary)'
                    : 'var(--semantic-text-subtle)'
                }}
              />
              <BiChevronDown
                size={12}
                style={{
                  color: sortDirection === 'desc'
                    ? 'var(--semantic-text-primary)'
                    : 'var(--semantic-text-subtle)',
                  marginTop: '-4px'
                }}
              />
            </span>
          )}
        </button>
      );
    };

    const renderContent = () => {
      if (variant === 'checkbox') {
        return (
          <Checkbox
            size="small"
            checked={checked}
            indeterminate={indeterminate}
            onChange={(e) => onCheckboxChange?.(e.target.checked)}
          />
        );
      }
      if (variant === 'rowHeader') {
        return renderRowHeader();
      }
      if (variant === 'default') {
        return null;
      }
      return children;
    };

    return (
      <th
        ref={ref}
        className={headerClasses}
        style={variantStyle}
        {...props}
      >
        {renderContent()}
      </th>
    );
  })
);

TableHeader.displayName = 'Table.Header';

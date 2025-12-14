/**
 * @file TableCell.tsx
 * @description Table data cell (td) component with multiple variants.
 *
 * Supports text, numeric, checkbox, badge, input, and comparison layouts.
 * All cells are transparent and inherit background from their parent row.
 *
 * @example
 * ```tsx
 * <Table.Cell variant="numeric">1,234.56</Table.Cell>
 * <Table.Cell variant="checkbox" checked={selected} onCheckboxChange={setSelected} />
 * ```
 */

import { forwardRef, memo, useCallback, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { Checkbox } from '@/components/basic/forms/Checkbox';
import { Input } from '@/components/basic/forms/Input';
import { useTableContext } from './TableContext';
import {
  TABLE_CELL_BASE_CLASSES,
  TABLE_CELL_VARIANT_CLASSES,
  TABLE_CELL_STYLE,
  TABLE_CELL_CHECKBOX_STYLE,
  TABLE_CELL_INPUT_STYLE,
} from './Table.styles';

// ============================================================================
// Types
// ============================================================================

/** Available variants for TableCell */
export type TableCellVariant = 'default' | 'text' | 'checkbox' | 'numeric' | 'badge' | 'input' | 'comparison';

export interface TableCellProps extends ComponentPropsWithoutRef<'td'> {
  /** Cell variant - 'default' for any content, 'text' for simple text, 'checkbox' for row selection, 'numeric' for right-aligned numbers, 'badge' for one or more badges, 'input' for inline editing, 'comparison' for two-line value display */
  variant?: TableCellVariant;
  /** Checkbox checked state (checkbox variant) */
  checked?: boolean;
  /** Checkbox change handler (checkbox variant) */
  onCheckboxChange?: (checked: boolean) => void;
  /** Accessible label for the checkbox (checkbox variant) */
  checkboxAriaLabel?: string;
  /** Input value (input variant) */
  inputValue?: string;
  /** Input change handler (input variant) */
  onInputChange?: (value: string) => void;
  /** Input suffix text (input variant) - e.g., "kg", "cm", "$" */
  inputSuffix?: string;
  /** Input placeholder text (input variant) */
  inputPlaceholder?: string;
  /** Input aria-label (input variant) */
  inputAriaLabel?: string;
  /** Primary value for comparison variant (top line, e.g., "$1,234.56") */
  comparisonPrimary?: string;
  /** Secondary value for comparison variant (bottom line, lighter, e.g., "$1,100.00") */
  comparisonSecondary?: string;
}

/**
 * TableCell - A table data cell with multiple variants.
 *
 * - Transparent background (inherits from row/table)
 * - Hugs content height, or stretches to match row height
 * - Responsive via CSS tokens
 */
export const TableCell = memo(
  forwardRef<HTMLTableCellElement, TableCellProps>(
    ({
      className,
      children,
      variant = 'default',
      checked,
      onCheckboxChange,
      checkboxAriaLabel = 'Select row',
      inputValue,
      onInputChange,
      inputSuffix,
      inputPlaceholder,
      inputAriaLabel = 'Edit cell value',
      comparisonPrimary,
      comparisonSecondary,
      ...props
    }, ref) => {
      const { size } = useTableContext();

      const cellClasses = useMemo(
        () => cn(TABLE_CELL_BASE_CLASSES, TABLE_CELL_VARIANT_CLASSES[variant], className),
        [variant, className]
      );

      const cellStyle = useMemo(() => {
        if (variant === 'checkbox') return TABLE_CELL_CHECKBOX_STYLE;
        if (variant === 'input') return TABLE_CELL_INPUT_STYLE;
        return TABLE_CELL_STYLE;
      }, [variant]);

      const handleCheckboxChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => onCheckboxChange?.(e.target.checked),
        [onCheckboxChange]
      );

      const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => onInputChange?.(e.target.value),
        [onInputChange]
      );

      // Checkbox variant
      if (variant === 'checkbox') {
        return (
          <td
            ref={ref}
            className={cellClasses}
            style={cellStyle}
            data-variant={variant}
            data-size={size}
            {...props}
          >
            <Checkbox
              size="small"
              checked={checked}
              onChange={handleCheckboxChange}
              aria-label={checkboxAriaLabel}
            />
          </td>
        );
      }

      // Badge variant - displays one or more badges in a flex container
      if (variant === 'badge') {
        return (
          <td
            ref={ref}
            className={cellClasses}
            style={cellStyle}
            data-variant={variant}
            data-size={size}
            {...props}
          >
            <div className="flex items-center gap-1 flex-wrap">
              {children}
            </div>
          </td>
        );
      }

      // Input variant - small input with optional suffix for inline editing
      if (variant === 'input') {
        return (
          <td
            ref={ref}
            className={cellClasses}
            style={cellStyle}
            data-variant={variant}
            data-size={size}
            {...props}
          >
            <Input
              type="number"
              step="0.01"
              size="small"
              value={inputValue}
              onChange={handleInputChange}
              suffix={inputSuffix}
              placeholder={inputPlaceholder}
              aria-label={inputAriaLabel}
              wrapperClassName="max-w-[120px]"
              className="text-right"
            />
          </td>
        );
      }

      // Comparison variant - two-line value display (primary + secondary)
      if (variant === 'comparison') {
        return (
          <td
            ref={ref}
            className={cellClasses}
            style={cellStyle}
            data-variant={variant}
            data-size={size}
            {...props}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[length:var(--component-table-cell-font-size-md)] font-[number:var(--component-text-font-weight-regular)] text-[color:var(--component-text-color-primary)]">
                {comparisonPrimary}
              </span>
              <span className="text-[length:var(--component-text-font-size-caption)] font-[number:var(--component-text-font-weight-regular)] text-[color:var(--component-text-color-secondary)]">
                {comparisonSecondary}
              </span>
            </div>
          </td>
        );
      }

      return (
        <td
          ref={ref}
          className={cellClasses}
          style={cellStyle}
          data-variant={variant}
          data-size={size}
          {...props}
        >
          {children}
        </td>
      );
    }
  )
);

TableCell.displayName = 'Table.Cell';

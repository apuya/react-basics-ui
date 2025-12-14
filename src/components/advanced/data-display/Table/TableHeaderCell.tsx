/**
 * @file TableHeaderCell.tsx
 * @description Table header cell (th) component with multiple variants.
 *
 * Supports column headers with sorting, row headers for data tables,
 * checkbox selection, and specialized layouts (stacked, comparison).
 *
 * @example
 * ```tsx
 * <Table.HeaderCell sortable sortDirection="asc" onSort={handleSort}>
 *   Column Name
 * </Table.HeaderCell>
 * ```
 */

import { forwardRef, memo, useCallback, useMemo, type ComponentPropsWithoutRef } from 'react';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import {
  TABLE_HEADER_CELL_BASE_CLASSES,
  TABLE_HEADER_CELL_STYLE,
  TABLE_HEADER_CELL_CHECKBOX_STYLE,
  TABLE_HEADER_CELL_FLEXIBLE_STYLE,
  TABLE_HEADER_CELL_SORTABLE_ALIGN_STYLES,
  TABLE_HEADER_SORT_BUTTON_CLASSES,
  TABLE_HEADER_SORT_BUTTON_STYLE,
  TABLE_HEADER_SORT_ICON_CONTAINER_CLASSES,
} from './Table.styles';
import { Checkbox } from '@/components/basic/forms/Checkbox';
import { useTableContext } from './TableContext';
import { Icon } from '@/components/basic/utility/Icon';

export type TableHeaderCellVariant = 'default' | 'checkbox' | 'stacked' | 'textWithBadge' | 'comparison';
export type TableHeaderCellAlign = 'left' | 'right';
export type TableHeaderCellScope = 'col' | 'row' | 'colgroup' | 'rowgroup';

export interface TableHeaderCellProps extends ComponentPropsWithoutRef<'th'> {
  /** Header cell variant */
  variant?: TableHeaderCellVariant;
  /** Which cells this header describes - critical for accessibility */
  scope?: TableHeaderCellScope;
  /** Content alignment for sortable cells (only applies to scope="col") */
  align?: TableHeaderCellAlign;
  /** Checkbox checked state (checkbox variant) */
  checked?: boolean;
  /** Checkbox indeterminate state (checkbox variant) */
  indeterminate?: boolean;
  /** Checkbox change handler (checkbox variant) */
  onCheckboxChange?: (checked: boolean) => void;
  /** Accessible label for the checkbox (checkbox variant) */
  checkboxAriaLabel?: string;
  /** Enable sort functionality (only applies to scope="col") */
  sortable?: boolean;
  /** Current sort direction (only applies to scope="col") */
  sortDirection?: 'asc' | 'desc' | null;
  /** Sort click handler (only applies to scope="col") */
  onSort?: () => void;
  /** Accessible label for sort button (sortable cells) */
  sortAriaLabel?: string;
  /** Primary label for stacked variant (e.g., "Total Row Header") */
  stackedPrimary?: string;
  /** Comparison label for stacked variant (e.g., "Comparison") */
  stackedComparison?: string;
  /** Change label for stacked variant (e.g., "% Change") */
  stackedChange?: string;
  /** Badge element for textWithBadge variant (row headers with status badge) */
  badge?: React.ReactNode;
  /** Dimension label for comparison variant (top line, e.g., "Revenue") */
  comparisonDimension?: string;
  /** Comparison label for comparison variant (bottom line, lighter, e.g., "vs Last Year") */
  comparisonLabel?: string;
}

/** aria-sort value mapping */
const ARIA_SORT_MAP = {
  asc: 'ascending',
  desc: 'descending',
} as const;

/** Sort icon component for sortable headers */
const SortIcon = memo(
  ({ direction, activeDirection }: { direction: 'asc' | 'desc'; activeDirection: 'asc' | 'desc' | null }) => (
    <Icon
      icon={direction === 'asc' ? BiChevronUp : BiChevronDown}
      size="xs"
      color={activeDirection === direction ? 'primary' : 'secondary'}
      aria-hidden
    />
  )
);
SortIcon.displayName = 'SortIcon';

export const TableHeaderCell = memo(
  forwardRef<HTMLTableCellElement, TableHeaderCellProps>(({
    className,
    variant = 'default',
    scope = 'col',
    align = 'left',
    checked,
    indeterminate,
    onCheckboxChange,
    checkboxAriaLabel = 'Select all rows',
    sortable,
    sortDirection,
    onSort,
    sortAriaLabel,
    stackedPrimary,
    stackedComparison,
    stackedChange,
    badge,
    comparisonDimension,
    comparisonLabel,
    children,
    ...props
  }, ref) => {
    const { size } = useTableContext();

    // Memoize checkbox handler to prevent unnecessary re-renders
    const handleCheckboxChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onCheckboxChange?.(e.target.checked),
      [onCheckboxChange]
    );

    // Memoize class names - all header cells are transparent
    const cellClasses = useMemo(
      () => cn(TABLE_HEADER_CELL_BASE_CLASSES, className),
      [className]
    );

    // Determine if this is a sortable column header
    const isSortableColumn = (sortable || onSort) && scope === 'col';

    // Compute aria-sort only for sortable headers
    const ariaSortValue = sortable && sortDirection ? ARIA_SORT_MAP[sortDirection] : sortable ? 'none' : undefined;

    // ========================================================================
    // Checkbox Variant
    // ========================================================================
    if (variant === 'checkbox') {
      return (
        <th
          ref={ref}
          scope={scope}
          className={cellClasses}
          style={TABLE_HEADER_CELL_CHECKBOX_STYLE}
          data-variant="checkbox"
          data-size={size}
          {...props}
        >
          <Checkbox
            size="small"
            checked={checked}
            indeterminate={indeterminate}
            onChange={handleCheckboxChange}
            aria-label={checkboxAriaLabel}
          />
        </th>
      );
    }

    // ========================================================================
    // Sortable Variant (column headers only)
    // ========================================================================
    if (isSortableColumn) {
      return (
        <th
          ref={ref}
          scope={scope}
          className={cellClasses}
          style={TABLE_HEADER_CELL_SORTABLE_ALIGN_STYLES[align]}
          aria-sort={ariaSortValue}
          data-variant="sortable"
          data-align={align}
          data-size={size}
          data-sort-direction={sortDirection || undefined}
          {...props}
        >
          <button
            type="button"
            className={TABLE_HEADER_SORT_BUTTON_CLASSES}
            style={TABLE_HEADER_SORT_BUTTON_STYLE}
            onClick={onSort}
            aria-label={sortAriaLabel}
          >
            {children}
            <span className={TABLE_HEADER_SORT_ICON_CONTAINER_CLASSES}>
              <SortIcon direction="asc" activeDirection={sortDirection ?? null} />
              <SortIcon direction="desc" activeDirection={sortDirection ?? null} />
            </span>
          </button>
        </th>
      );
    }

    // ========================================================================
    // Stacked Variant (for total/comparison row headers)
    // ========================================================================
    if (variant === 'stacked') {
      return (
        <th
          ref={ref}
          scope={scope}
          className={cellClasses}
          style={TABLE_HEADER_CELL_FLEXIBLE_STYLE}
          data-variant="stacked"
          data-size={size}
          {...props}
        >
          <div className="flex flex-col gap-0.5 text-left">
            <span className="text-[length:var(--component-text-font-size-small)] font-[number:var(--component-text-font-weight-semibold)] text-[color:var(--component-text-color-primary)]">
              {stackedPrimary}
            </span>
            <span className="text-[length:var(--component-text-font-size-caption)] font-[number:var(--component-text-font-weight-regular)] text-[color:var(--component-text-color-secondary)]">
              {stackedComparison}
            </span>
            <span className="text-[length:var(--component-text-font-size-caption)] font-[number:var(--component-text-font-weight-regular)] text-[color:var(--component-text-color-secondary)]">
              {stackedChange}
            </span>
          </div>
        </th>
      );
    }

    // ========================================================================
    // Text with Badge Variant (for row headers with status badge)
    // ========================================================================
    if (variant === 'textWithBadge') {
      return (
        <th
          ref={ref}
          scope={scope}
          className={cn(cellClasses, 'text-[length:var(--component-table-cell-font-size-md)] font-normal text-[color:var(--component-table-cell-text)]')}
          style={TABLE_HEADER_CELL_FLEXIBLE_STYLE}
          data-variant="textWithBadge"
          data-size={size}
          {...props}
        >
          {children}
          {badge && <span className="ml-2 inline-flex">{badge}</span>}
        </th>
      );
    }

    // ========================================================================
    // Comparison Variant (two-line: dimension + comparison label)
    // ========================================================================
    if (variant === 'comparison') {
      return (
        <th
          ref={ref}
          scope={scope}
          className={cellClasses}
          style={TABLE_HEADER_CELL_FLEXIBLE_STYLE}
          data-variant="comparison"
          data-size={size}
          {...props}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[length:var(--component-table-cell-font-size-md)] font-[number:var(--component-text-font-weight-semibold)] text-[color:var(--component-text-color-primary)]">
              {comparisonDimension}
            </span>
            <span className="text-[length:var(--component-text-font-size-caption)] font-[number:var(--component-text-font-weight-regular)] text-[color:var(--component-text-color-secondary)]">
              {comparisonLabel}
            </span>
          </div>
        </th>
      );
    }

    // ========================================================================
    // Default Variant
    // ========================================================================
    return (
      <th
        ref={ref}
        scope={scope}
        className={cellClasses}
        style={TABLE_HEADER_CELL_STYLE}
        data-variant="default"
        data-size={size}
        {...props}
      >
        {children}
      </th>
    );
  })
);

TableHeaderCell.displayName = 'Table.HeaderCell';

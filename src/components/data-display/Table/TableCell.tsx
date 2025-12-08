import { forwardRef, memo, useCallback, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { Checkbox } from '@/components/forms/Checkbox';
import { Input } from '@/components/forms/Input';

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

// ============================================================================
// Styles
// ============================================================================

/** Base classes - vertical alignment stretches to row height */
const BASE_CLASSES = 'align-middle';

/** Variant-specific classes */
const VARIANT_CLASSES = {
  default: 'text-[color:var(--component-table-cell-text)]',
  text: 'text-[color:var(--component-table-cell-text)] text-[length:var(--component-table-cell-font-size-md)]',
  checkbox: '',
  numeric: 'text-[color:var(--component-table-cell-text)] text-[length:var(--component-table-cell-font-size-md)] text-right tabular-nums',
  badge: '',
  input: '',
  comparison: '',
} as const;

/** Inline style - padding, min dimensions */
const BASE_STYLE = {
  paddingBlock: 'var(--component-table-cell-padding-block)',
  paddingInline: 'var(--component-table-cell-padding-inline)',
  minHeight: 'var(--component-table-cell-min-height)',
  minWidth: 'var(--component-table-cell-min-width)',
} as const;

/** Checkbox cell style - hugs content, lineHeight: 0 removes extra space */
const CHECKBOX_CELL_STYLE = {
  padding: 'var(--component-table-cell-checkbox-padding)',
  minHeight: 'var(--component-table-cell-checkbox-min-height)',
  minWidth: 'var(--component-table-cell-checkbox-min-width)',
  lineHeight: 0,
  verticalAlign: 'middle' as const,
} as const;

/** Input cell style - same as base but no min-width constraint */
const INPUT_CELL_STYLE = {
  paddingBlock: 'var(--component-table-cell-padding-block)',
  paddingInline: 'var(--component-table-cell-padding-inline)',
  minHeight: 'var(--component-table-cell-min-height)',
} as const;

// ============================================================================
// Component
// ============================================================================

/**
 * TableCell - A simple, transparent table data cell.
 * 
 * - Transparent background (inherits from row/table)
 * - Hugs content height, or stretches to match row height (whichever is greater)
 * - Responsive via CSS tokens
 * 
 * Variants:
 * - `default` - For any content (components, badges, buttons, etc.)
 * - `text` - For simple text content with consistent typography
 * - `checkbox` - For row selection checkbox
 * - `numeric` - For right-aligned numeric values with tabular numbers
 * - `badge` - For displaying one or more badges with flex-wrap
 * - `input` - For inline editing with a small input and optional suffix
 * - `comparison` - For two-line value display (primary + secondary/comparison value)
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
      const cellClasses = useMemo(
        () => cn(BASE_CLASSES, VARIANT_CLASSES[variant], className),
        [variant, className]
      );

      const cellStyle = useMemo(() => {
        if (variant === 'checkbox') return CHECKBOX_CELL_STYLE;
        if (variant === 'input') return INPUT_CELL_STYLE;
        return BASE_STYLE;
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
          {...props}
        >
          {children}
        </td>
      );
    }
  )
);

TableCell.displayName = 'Table.Cell';

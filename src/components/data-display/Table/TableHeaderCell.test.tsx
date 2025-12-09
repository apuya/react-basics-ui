import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { TableHeaderCell } from './TableHeaderCell';
import { Table } from './Table';
import { TableContext } from './TableContext';

// Helper to render TableHeaderCell within Table context (minimal - just context, no full table structure)
const renderWithTable = (ui: React.ReactElement) => {
  return render(
    <TableContext.Provider value={{ size: 'md', variant: 'default' }}>
      <table>
        <thead>
          <tr>{ui}</tr>
        </thead>
      </table>
    </TableContext.Provider>
  );
};

describe('TableHeaderCell', () => {
  describe('Rendering', () => {
    it('renders as a th element', () => {
      renderWithTable(<TableHeaderCell />);
      expect(screen.getByRole('columnheader')).toBeInTheDocument();
    });

    it('renders children in default variant', () => {
      renderWithTable(<TableHeaderCell>Column Name</TableHeaderCell>);
      expect(screen.getByText('Column Name')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderWithTable(<TableHeaderCell className="custom-class">Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveClass('custom-class');
    });

    it('passes through additional HTML attributes', () => {
      renderWithTable(<TableHeaderCell data-testid="header-cell">Name</TableHeaderCell>);
      expect(screen.getByTestId('header-cell')).toBeInTheDocument();
    });
  });

  describe('Scope Prop', () => {
    it('defaults scope to col', () => {
      renderWithTable(<TableHeaderCell>Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('scope', 'col');
    });

    it('accepts scope="row"', () => {
      renderWithTable(<TableHeaderCell scope="row">Row Header</TableHeaderCell>);
      // scope="row" changes the accessible role to rowheader
      expect(screen.getByRole('rowheader')).toHaveAttribute('scope', 'row');
    });

    it('accepts scope="colgroup"', () => {
      renderWithTable(<TableHeaderCell scope="colgroup">Group</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('scope', 'colgroup');
    });

    it('accepts scope="rowgroup"', () => {
      renderWithTable(<TableHeaderCell scope="rowgroup">Group</TableHeaderCell>);
      // scope="rowgroup" changes the accessible role to rowheader
      expect(screen.getByRole('rowheader')).toHaveAttribute('scope', 'rowgroup');
    });
  });

  describe('Data Attributes', () => {
    it('sets data-variant for default variant', () => {
      renderWithTable(<TableHeaderCell>Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('data-variant', 'default');
    });

    it('sets data-variant for checkbox variant', () => {
      renderWithTable(<TableHeaderCell variant="checkbox" />);
      expect(screen.getByRole('columnheader')).toHaveAttribute('data-variant', 'checkbox');
    });

    it('sets data-variant for sortable cells', () => {
      renderWithTable(<TableHeaderCell sortable>Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('data-variant', 'sortable');
    });

    it('sets data-size from context', () => {
      renderWithTable(<TableHeaderCell>Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('data-size', 'md');
    });

    it('sets data-align for sortable cells', () => {
      renderWithTable(<TableHeaderCell sortable align="right">Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('data-align', 'right');
    });

    it('sets data-sort-direction when sorting', () => {
      renderWithTable(<TableHeaderCell sortable sortDirection="asc">Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('data-sort-direction', 'asc');
    });
  });

  describe('Checkbox Variant', () => {
    it('renders a checkbox', () => {
      renderWithTable(<TableHeaderCell variant="checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('passes checked state to checkbox', () => {
      renderWithTable(<TableHeaderCell variant="checkbox" checked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('calls onCheckboxChange when checkbox is clicked', () => {
      const handleChange = vi.fn();
      renderWithTable(<TableHeaderCell variant="checkbox" onCheckboxChange={handleChange} />);
      
      fireEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('applies aria-label to checkbox', () => {
      renderWithTable(<TableHeaderCell variant="checkbox" checkboxAriaLabel="Select all items" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-label', 'Select all items');
    });

    it('uses default aria-label for checkbox', () => {
      renderWithTable(<TableHeaderCell variant="checkbox" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-label', 'Select all rows');
    });
  });

  describe('Sortable Variant', () => {
    it('renders a sort button when sortable', () => {
      renderWithTable(<TableHeaderCell sortable>Name</TableHeaderCell>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders a sort button when onSort is provided', () => {
      renderWithTable(<TableHeaderCell onSort={() => {}}>Name</TableHeaderCell>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('calls onSort when sort button is clicked', () => {
      const handleSort = vi.fn();
      renderWithTable(<TableHeaderCell sortable onSort={handleSort}>Name</TableHeaderCell>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleSort).toHaveBeenCalledTimes(1);
    });

    it('renders children inside sort button', () => {
      renderWithTable(<TableHeaderCell sortable>Product</TableHeaderCell>);
      expect(screen.getByRole('button')).toHaveTextContent('Product');
    });

    it('applies sortAriaLabel to sort button', () => {
      renderWithTable(
        <TableHeaderCell sortable sortAriaLabel="Sort by name">Name</TableHeaderCell>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Sort by name');
    });
  });

  describe('Accessibility (aria-sort)', () => {
    it('sets aria-sort="none" when sortable with no direction', () => {
      renderWithTable(<TableHeaderCell sortable>Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'none');
    });

    it('sets aria-sort="ascending" when sortDirection is asc', () => {
      renderWithTable(<TableHeaderCell sortable sortDirection="asc">Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'ascending');
    });

    it('sets aria-sort="descending" when sortDirection is desc', () => {
      renderWithTable(<TableHeaderCell sortable sortDirection="desc">Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'descending');
    });

    it('does not set aria-sort on non-sortable headers', () => {
      renderWithTable(<TableHeaderCell>Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).not.toHaveAttribute('aria-sort');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to th element', () => {
      const ref = createRef<HTMLTableCellElement>();
      renderWithTable(<TableHeaderCell ref={ref}>Name</TableHeaderCell>);
      
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
      expect(ref.current?.tagName).toBe('TH');
    });

    it('forwards ref for checkbox variant', () => {
      const ref = createRef<HTMLTableCellElement>();
      renderWithTable(<TableHeaderCell ref={ref} variant="checkbox" />);
      
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    });

    it('forwards ref for sortable variant', () => {
      const ref = createRef<HTMLTableCellElement>();
      renderWithTable(<TableHeaderCell ref={ref} sortable>Name</TableHeaderCell>);
      
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    });
  });

  describe('Alignment', () => {
    it('defaults align to left', () => {
      renderWithTable(<TableHeaderCell sortable>Name</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('data-align', 'left');
    });

    it('accepts align="right"', () => {
      renderWithTable(<TableHeaderCell sortable align="right">Price</TableHeaderCell>);
      expect(screen.getByRole('columnheader')).toHaveAttribute('data-align', 'right');
    });
  });

  describe('Stacked Variant', () => {
    it('renders stacked variant with all three labels', () => {
      renderWithTable(
        <TableHeaderCell
          variant="stacked"
          stackedPrimary="Total Row Header"
          stackedComparison="Comparison"
          stackedChange="% Change"
        />
      );
      expect(screen.getByText('Total Row Header')).toBeInTheDocument();
      expect(screen.getByText('Comparison')).toBeInTheDocument();
      expect(screen.getByText('% Change')).toBeInTheDocument();
    });

    it('sets data-variant to stacked', () => {
      renderWithTable(
        <TableHeaderCell
          variant="stacked"
          stackedPrimary="Total"
          stackedComparison="Compare"
          stackedChange="Change"
        />
      );
      expect(screen.getByRole('columnheader')).toHaveAttribute('data-variant', 'stacked');
    });

    it('renders with scope="row" for row headers', () => {
      renderWithTable(
        <TableHeaderCell
          variant="stacked"
          scope="row"
          stackedPrimary="Total"
          stackedComparison="Compare"
          stackedChange="Change"
        />
      );
      expect(screen.getByRole('rowheader')).toHaveAttribute('scope', 'row');
    });

    it('forwards ref for stacked variant', () => {
      const ref = createRef<HTMLTableCellElement>();
      renderWithTable(
        <TableHeaderCell
          ref={ref}
          variant="stacked"
          stackedPrimary="Total"
          stackedComparison="Compare"
          stackedChange="Change"
        />
      );
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    });

    it('renders partial stacked content when not all labels provided', () => {
      renderWithTable(
        <TableHeaderCell
          variant="stacked"
          stackedPrimary="Only Primary"
        />
      );
      expect(screen.getByText('Only Primary')).toBeInTheDocument();
    });
  });

  describe('Text with Badge Variant', () => {
    it('renders textWithBadge variant with data-variant attribute', () => {
      renderWithTable(
        <TableHeaderCell variant="textWithBadge" data-testid="cell">
          INV-001
        </TableHeaderCell>
      );
      expect(screen.getByTestId('cell')).toHaveAttribute('data-variant', 'textWithBadge');
    });

    it('renders text content', () => {
      renderWithTable(
        <TableHeaderCell variant="textWithBadge">
          INV-001
        </TableHeaderCell>
      );
      expect(screen.getByText('INV-001')).toBeInTheDocument();
    });

    it('renders badge when provided', () => {
      renderWithTable(
        <TableHeaderCell
          variant="textWithBadge"
          badge={<span data-testid="badge">Paid</span>}
        >
          INV-001
        </TableHeaderCell>
      );
      expect(screen.getByTestId('badge')).toBeInTheDocument();
      expect(screen.getByText('Paid')).toBeInTheDocument();
    });

    it('renders text and badge together', () => {
      renderWithTable(
        <TableHeaderCell
          variant="textWithBadge"
          badge={<span>Active</span>}
        >
          John Doe
        </TableHeaderCell>
      );
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('uses scope="row" for row headers', () => {
      renderWithTable(
        <TableHeaderCell
          variant="textWithBadge"
          scope="row"
          badge={<span>Status</span>}
        >
          Row ID
        </TableHeaderCell>
      );
      expect(screen.getByRole('rowheader')).toHaveAttribute('scope', 'row');
    });

    it('forwards ref for textWithBadge variant', () => {
      const ref = createRef<HTMLTableCellElement>();
      renderWithTable(
        <TableHeaderCell
          ref={ref}
          variant="textWithBadge"
          badge={<span>Badge</span>}
        >
          Content
        </TableHeaderCell>
      );
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    });
  });

  describe('Comparison Variant', () => {
    it('renders comparison variant with data-variant attribute', () => {
      renderWithTable(
        <TableHeaderCell
          variant="comparison"
          comparisonDimension="Revenue"
          comparisonLabel="vs Last Year"
        />
      );
      expect(screen.getByRole('columnheader')).toHaveAttribute('data-variant', 'comparison');
    });

    it('renders dimension label', () => {
      renderWithTable(
        <TableHeaderCell
          variant="comparison"
          comparisonDimension="Revenue"
          comparisonLabel="vs Last Year"
        />
      );
      expect(screen.getByText('Revenue')).toBeInTheDocument();
    });

    it('renders comparison label', () => {
      renderWithTable(
        <TableHeaderCell
          variant="comparison"
          comparisonDimension="Revenue"
          comparisonLabel="vs Last Year"
        />
      );
      expect(screen.getByText('vs Last Year')).toBeInTheDocument();
    });

    it('comparison label has lighter color', () => {
      renderWithTable(
        <TableHeaderCell
          variant="comparison"
          comparisonDimension="Revenue"
          comparisonLabel="vs Last Year"
        />
      );
      const comparisonSpan = screen.getByText('vs Last Year');
      expect(comparisonSpan).toHaveClass('text-[color:var(--component-text-color-secondary)]');
    });

    it('forwards ref for comparison variant', () => {
      const ref = createRef<HTMLTableCellElement>();
      renderWithTable(
        <TableHeaderCell
          ref={ref}
          variant="comparison"
          comparisonDimension="Revenue"
          comparisonLabel="vs Last Year"
        />
      );
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    });
  });
});

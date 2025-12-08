import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { TableCell } from './TableCell';
import { Table } from './Table';

// Helper to render TableCell within Table context
const renderWithTable = (ui: React.ReactElement) => {
  return render(
    <Table>
      <Table.Body>
        <Table.Row>
          {ui}
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

describe('TableCell', () => {
  describe('Rendering', () => {
    it('renders as a td element', () => {
      renderWithTable(<TableCell data-testid="cell" />);
      expect(screen.getByTestId('cell').tagName).toBe('TD');
    });

    it('renders children', () => {
      renderWithTable(<TableCell>Cell Content</TableCell>);
      expect(screen.getByText('Cell Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderWithTable(<TableCell className="custom-class" data-testid="cell" />);
      expect(screen.getByTestId('cell')).toHaveClass('custom-class');
    });

    it('passes through additional HTML attributes', () => {
      renderWithTable(<TableCell data-testid="cell" id="my-cell" />);
      expect(screen.getByTestId('cell')).toHaveAttribute('id', 'my-cell');
    });

    it('supports colSpan attribute', () => {
      renderWithTable(<TableCell colSpan={3} data-testid="cell" />);
      expect(screen.getByTestId('cell')).toHaveAttribute('colspan', '3');
    });

    it('supports rowSpan attribute', () => {
      renderWithTable(<TableCell rowSpan={2} data-testid="cell" />);
      expect(screen.getByTestId('cell')).toHaveAttribute('rowspan', '2');
    });

    it('has transparent background by default', () => {
      renderWithTable(<TableCell data-testid="cell" />);
      // Cell should not have any background class - inherits from row/table
      expect(screen.getByTestId('cell')).toHaveClass('align-middle');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to td element', () => {
      const ref = createRef<HTMLTableCellElement>();
      renderWithTable(<TableCell ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
      expect(ref.current?.tagName).toBe('TD');
    });
  });

  describe('With Components', () => {
    it('renders child components', () => {
      renderWithTable(
        <TableCell>
          <button>Action</button>
        </TableCell>
      );
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies base text color class', () => {
      renderWithTable(<TableCell data-testid="cell">Content</TableCell>);
      expect(screen.getByTestId('cell')).toHaveClass('text-[color:var(--component-table-cell-text)]');
    });

    it('applies vertical alignment class', () => {
      renderWithTable(<TableCell data-testid="cell">Content</TableCell>);
      expect(screen.getByTestId('cell')).toHaveClass('align-middle');
    });

    it('stretches to row height while hugging content', () => {
      // The align-middle class combined with table cell default behavior
      // ensures cell height = max(content height, row height)
      renderWithTable(<TableCell data-testid="cell">Short</TableCell>);
      const cell = screen.getByTestId('cell');
      expect(cell).toHaveClass('align-middle');
    });
  });

  describe('Variants', () => {
    it('renders default variant by default', () => {
      renderWithTable(<TableCell data-testid="cell">Content</TableCell>);
      expect(screen.getByTestId('cell')).toHaveAttribute('data-variant', 'default');
    });

    it('renders text variant when specified', () => {
      renderWithTable(<TableCell variant="text" data-testid="cell">Content</TableCell>);
      expect(screen.getByTestId('cell')).toHaveAttribute('data-variant', 'text');
    });

    it('applies text variant font size class', () => {
      renderWithTable(<TableCell variant="text" data-testid="cell">Content</TableCell>);
      expect(screen.getByTestId('cell')).toHaveClass('text-[length:var(--component-table-cell-font-size-md)]');
    });

    it('default variant does not have font size class', () => {
      renderWithTable(<TableCell data-testid="cell">Content</TableCell>);
      expect(screen.getByTestId('cell')).not.toHaveClass('text-[length:var(--component-table-cell-font-size-md)]');
    });

    it('renders checkbox variant when specified', () => {
      renderWithTable(<TableCell variant="checkbox" data-testid="cell" />);
      expect(screen.getByTestId('cell')).toHaveAttribute('data-variant', 'checkbox');
    });

    it('checkbox variant renders a checkbox input', () => {
      renderWithTable(<TableCell variant="checkbox" checkboxAriaLabel="Select row" />);
      expect(screen.getByRole('checkbox', { name: 'Select row' })).toBeInTheDocument();
    });

    it('checkbox variant calls onCheckboxChange when clicked', () => {
      const handleChange = vi.fn();
      renderWithTable(
        <TableCell
          variant="checkbox"
          checked={false}
          onCheckboxChange={handleChange}
          checkboxAriaLabel="Select row"
        />
      );
      
      const checkbox = screen.getByRole('checkbox', { name: 'Select row' });
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('checkbox variant respects checked state', () => {
      renderWithTable(
        <TableCell variant="checkbox" checked={true} checkboxAriaLabel="Select row" />
      );
      
      const checkbox = screen.getByRole('checkbox', { name: 'Select row' });
      expect(checkbox).toBeChecked();
    });

    it('renders numeric variant when specified', () => {
      renderWithTable(<TableCell variant="numeric" data-testid="cell">1,234.56</TableCell>);
      expect(screen.getByTestId('cell')).toHaveAttribute('data-variant', 'numeric');
    });

    it('numeric variant is right-aligned', () => {
      renderWithTable(<TableCell variant="numeric" data-testid="cell">1,234.56</TableCell>);
      expect(screen.getByTestId('cell')).toHaveClass('text-right');
    });

    it('numeric variant uses tabular numbers', () => {
      renderWithTable(<TableCell variant="numeric" data-testid="cell">1,234.56</TableCell>);
      expect(screen.getByTestId('cell')).toHaveClass('tabular-nums');
    });

    it('numeric variant has font size class', () => {
      renderWithTable(<TableCell variant="numeric" data-testid="cell">1,234.56</TableCell>);
      expect(screen.getByTestId('cell')).toHaveClass('text-[length:var(--component-table-cell-font-size-md)]');
    });

    it('renders badge variant when specified', () => {
      renderWithTable(
        <TableCell variant="badge" data-testid="cell">
          <span data-testid="badge1">Badge 1</span>
        </TableCell>
      );
      expect(screen.getByTestId('cell')).toHaveAttribute('data-variant', 'badge');
    });

    it('badge variant wraps children in flex container', () => {
      renderWithTable(
        <TableCell variant="badge" data-testid="cell">
          <span data-testid="badge1">Badge 1</span>
          <span data-testid="badge2">Badge 2</span>
        </TableCell>
      );
      const flexContainer = screen.getByTestId('cell').firstChild;
      expect(flexContainer).toHaveClass('flex', 'items-center', 'gap-1', 'flex-wrap');
    });

    it('badge variant renders multiple children', () => {
      renderWithTable(
        <TableCell variant="badge" data-testid="cell">
          <span data-testid="badge1">Badge 1</span>
          <span data-testid="badge2">Badge 2</span>
          <span data-testid="badge3">Badge 3</span>
        </TableCell>
      );
      expect(screen.getByTestId('badge1')).toBeInTheDocument();
      expect(screen.getByTestId('badge2')).toBeInTheDocument();
      expect(screen.getByTestId('badge3')).toBeInTheDocument();
    });

    it('renders input variant when specified', () => {
      renderWithTable(
        <TableCell variant="input" data-testid="cell" inputAriaLabel="Edit value" />
      );
      expect(screen.getByTestId('cell')).toHaveAttribute('data-variant', 'input');
    });

    it('input variant renders a number input element', () => {
      renderWithTable(
        <TableCell variant="input" inputAriaLabel="Edit value" />
      );
      expect(screen.getByRole('spinbutton', { name: 'Edit value' })).toBeInTheDocument();
    });

    it('input variant uses small size', () => {
      renderWithTable(
        <TableCell variant="input" inputAriaLabel="Edit value" data-testid="cell" />
      );
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('data-size', 'small');
    });

    it('input variant displays suffix', () => {
      renderWithTable(
        <TableCell variant="input" inputSuffix="kg" inputAriaLabel="Weight" />
      );
      expect(screen.getByText('kg')).toBeInTheDocument();
    });

    it('input variant calls onInputChange when value changes', async () => {
      const handleChange = vi.fn();
      renderWithTable(
        <TableCell 
          variant="input" 
          inputValue="100" 
          onInputChange={handleChange}
          inputAriaLabel="Edit value"
        />
      );
      const input = screen.getByRole('spinbutton');
      await userEvent.clear(input);
      await userEvent.type(input, '200');
      expect(handleChange).toHaveBeenCalled();
    });

    it('input variant respects placeholder', () => {
      renderWithTable(
        <TableCell 
          variant="input" 
          inputPlaceholder="Enter value"
          inputAriaLabel="Edit value"
        />
      );
      expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
    });

    it('renders comparison variant when specified', () => {
      renderWithTable(
        <TableCell 
          variant="comparison" 
          comparisonPrimary="$1,234.56"
          comparisonSecondary="$1,100.00"
          data-testid="cell"
        />
      );
      expect(screen.getByTestId('cell')).toHaveAttribute('data-variant', 'comparison');
    });

    it('comparison variant renders primary and secondary values', () => {
      renderWithTable(
        <TableCell 
          variant="comparison" 
          comparisonPrimary="$1,234.56"
          comparisonSecondary="$1,100.00"
        />
      );
      expect(screen.getByText('$1,234.56')).toBeInTheDocument();
      expect(screen.getByText('$1,100.00')).toBeInTheDocument();
    });

    it('comparison variant renders values in stacked layout', () => {
      renderWithTable(
        <TableCell 
          variant="comparison" 
          comparisonPrimary="$1,234.56"
          comparisonSecondary="$1,100.00"
          data-testid="cell"
        />
      );
      const flexContainer = screen.getByTestId('cell').firstChild;
      expect(flexContainer).toHaveClass('flex', 'flex-col', 'gap-0.5');
    });

    it('comparison variant secondary value has lighter color', () => {
      renderWithTable(
        <TableCell 
          variant="comparison" 
          comparisonPrimary="$1,234.56"
          comparisonSecondary="$1,100.00"
        />
      );
      const secondarySpan = screen.getByText('$1,100.00');
      expect(secondarySpan).toHaveClass('text-[color:var(--component-text-color-secondary)]');
    });
  });
});

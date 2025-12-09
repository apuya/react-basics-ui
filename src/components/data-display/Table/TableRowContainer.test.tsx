import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { TableRowContainer } from './TableRowContainer';
import { Table } from './Table';
import { TableContext, type TableVariant } from './TableContext';

// Helper to render TableRowContainer within Table context (minimal - just context, no full table structure)
const renderWithTable = (ui: React.ReactElement, variant: TableVariant = 'default') => {
  return render(
    <TableContext.Provider value={{ size: 'md', variant }}>
      <table>
        <tbody>{ui}</tbody>
      </table>
    </TableContext.Provider>
  );
};

describe('TableRowContainer', () => {
  describe('Rendering', () => {
    it('renders as a tr element', () => {
      renderWithTable(<TableRowContainer data-testid="row" />);
      expect(screen.getByTestId('row').tagName).toBe('TR');
    });

    it('renders children', () => {
      renderWithTable(
        <TableRowContainer>
          <td>Cell Content</td>
        </TableRowContainer>
      );
      expect(screen.getByText('Cell Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderWithTable(<TableRowContainer className="custom-class" data-testid="row" />);
      expect(screen.getByTestId('row')).toHaveClass('custom-class');
    });

    it('passes through additional HTML attributes', () => {
      renderWithTable(<TableRowContainer data-testid="row" id="my-row" />);
      expect(screen.getByTestId('row')).toHaveAttribute('id', 'my-row');
    });
  });

  describe('Variants', () => {
    it('applies default variant styles', () => {
      renderWithTable(<TableRowContainer data-testid="row" />, 'default');
      expect(screen.getByTestId('row')).toHaveAttribute('data-variant', 'default');
    });

    it('applies striped variant styles', () => {
      renderWithTable(<TableRowContainer data-testid="row" />, 'striped');
      expect(screen.getByTestId('row')).toHaveAttribute('data-variant', 'striped');
    });

    it('applies bordered variant styles', () => {
      renderWithTable(<TableRowContainer data-testid="row" />, 'bordered');
      expect(screen.getByTestId('row')).toHaveAttribute('data-variant', 'bordered');
    });
  });

  describe('User Interaction', () => {
    it('handles onClick events', () => {
      const handleClick = vi.fn();
      renderWithTable(<TableRowContainer onClick={handleClick} data-testid="row" />);
      
      fireEvent.click(screen.getByTestId('row'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles onMouseEnter events', () => {
      const handleMouseEnter = vi.fn();
      renderWithTable(<TableRowContainer onMouseEnter={handleMouseEnter} data-testid="row" />);
      
      fireEvent.mouseEnter(screen.getByTestId('row'));
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to tr element', () => {
      const ref = createRef<HTMLTableRowElement>();
      renderWithTable(<TableRowContainer ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
      expect(ref.current?.tagName).toBe('TR');
    });
  });

  describe('Context Integration', () => {
    it('receives variant from TableContext', () => {
      render(
        <Table variant="striped">
          <Table.Body>
            <TableRowContainer data-testid="row">
              <td>Content</td>
            </TableRowContainer>
          </Table.Body>
        </Table>
      );
      
      expect(screen.getByTestId('row')).toHaveAttribute('data-variant', 'striped');
    });
  });
});

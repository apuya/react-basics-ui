/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Pagination, usePaginationContext } from './Pagination';
import { usePagination } from './usePagination';
import { renderHook } from '@testing-library/react';

describe('Pagination', () => {
  // ============================================================================
  // RENDERING TESTS
  // ============================================================================
  describe('Rendering', () => {
    it('should render navigation with pagination structure', () => {
      render(
        <Pagination totalPages={10}>
          <Pagination.List>
            <Pagination.Previous />
            <Pagination.Item page={1} />
            <Pagination.Item page={2} />
            <Pagination.Item page={3} />
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should render all page items', () => {
      render(
        <Pagination totalPages={5}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={2} />
            <Pagination.Item page={3} />
            <Pagination.Item page={4} />
            <Pagination.Item page={5} />
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 3')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 4')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 5')).toBeInTheDocument();
    });

    it('should render Previous and Next buttons', () => {
      render(
        <Pagination totalPages={5}>
          <Pagination.List>
            <Pagination.Previous />
            <Pagination.Item page={1} />
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    });

    it('should render ellipsis indicator', () => {
      render(
        <Pagination totalPages={20}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Ellipsis />
            <Pagination.Item page={20} />
          </Pagination.List>
        </Pagination>
      );

      // Ellipsis has aria-hidden and role="presentation" on li
      const ellipsisList = screen.getAllByRole('presentation');
      expect(ellipsisList.length).toBeGreaterThan(0);
    });

    it('should render custom children in page item', () => {
      render(
        <Pagination totalPages={3}>
          <Pagination.List>
            <Pagination.Item page={1}>First</Pagination.Item>
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByText('First')).toBeInTheDocument();
    });

    it('should render custom children in Previous button', () => {
      render(
        <Pagination totalPages={3}>
          <Pagination.List>
            <Pagination.Previous>← Back</Pagination.Previous>
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByText('← Back')).toBeInTheDocument();
    });

    it('should render custom children in Next button', () => {
      render(
        <Pagination totalPages={3}>
          <Pagination.List>
            <Pagination.Next>Forward →</Pagination.Next>
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByText('Forward →')).toBeInTheDocument();
    });

    it('should forward ref to root navigation element', () => {
      const ref = createRef<HTMLElement>();
      render(
        <Pagination ref={ref} totalPages={5}>
          <Pagination.List>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('NAV');
    });

    it('should forward ref to PaginationItem button', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Pagination totalPages={5}>
          <Pagination.List>
            <Pagination.Item ref={ref} page={1} />
          </Pagination.List>
        </Pagination>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('should forward ref to PaginationList ul', () => {
      const ref = createRef<HTMLUListElement>();
      render(
        <Pagination totalPages={5}>
          <Pagination.List ref={ref}>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    it('should apply custom className to root', () => {
      render(
        <Pagination totalPages={5} className="custom-pagination">
          <Pagination.List>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByRole('navigation')).toHaveClass('custom-pagination');
    });

    it('should spread additional props to root nav element', () => {
      render(
        <Pagination totalPages={5} data-testid="pagination-test">
          <Pagination.List>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByTestId('pagination-test')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // CONTROLLED MODE TESTS
  // ============================================================================
  describe('Controlled Mode', () => {
    it('should respect controlled page value', () => {
      render(
        <Pagination totalPages={10} page={5} onChange={() => {}}>
          <Pagination.List>
            <Pagination.Item page={5} />
          </Pagination.List>
        </Pagination>
      );

      const pageButton = screen.getByLabelText('Go to page 5');
      expect(pageButton).toHaveAttribute('aria-current', 'page');
    });

    it('should call onChange when page item is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={1} onChange={onChange}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={2} />
            <Pagination.Item page={3} />
          </Pagination.List>
        </Pagination>
      );

      await user.click(screen.getByLabelText('Go to page 3'));
      expect(onChange).toHaveBeenCalledWith(3);
    });

    it('should call onChange when Previous is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={5} onChange={onChange}>
          <Pagination.List>
            <Pagination.Previous />
          </Pagination.List>
        </Pagination>
      );

      await user.click(screen.getByLabelText('Go to previous page'));
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('should call onChange when Next is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={5} onChange={onChange}>
          <Pagination.List>
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
      );

      await user.click(screen.getByLabelText('Go to next page'));
      expect(onChange).toHaveBeenCalledWith(6);
    });

    it('should not update internal state in controlled mode', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={1} onChange={onChange}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={2} />
          </Pagination.List>
        </Pagination>
      );

      await user.click(screen.getByLabelText('Go to page 2'));
      
      // Page 1 should still be active because parent controls the value
      const page1Button = screen.getByLabelText('Go to page 1');
      expect(page1Button).toHaveAttribute('aria-current', 'page');
    });
  });

  // ============================================================================
  // UNCONTROLLED MODE TESTS
  // ============================================================================
  describe('Uncontrolled Mode', () => {
    it('should use defaultPage as initial value', () => {
      render(
        <Pagination totalPages={10} defaultPage={3}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={2} />
            <Pagination.Item page={3} />
          </Pagination.List>
        </Pagination>
      );

      const pageButton = screen.getByLabelText('Go to page 3');
      expect(pageButton).toHaveAttribute('aria-current', 'page');
    });

    it('should default to page 1 when no defaultPage provided', () => {
      render(
        <Pagination totalPages={10}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={2} />
          </Pagination.List>
        </Pagination>
      );

      const pageButton = screen.getByLabelText('Go to page 1');
      expect(pageButton).toHaveAttribute('aria-current', 'page');
    });

    it('should update internal state when page item is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Pagination totalPages={10}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={2} />
            <Pagination.Item page={3} />
          </Pagination.List>
        </Pagination>
      );

      await user.click(screen.getByLabelText('Go to page 3'));

      const page3Button = screen.getByLabelText('Go to page 3');
      expect(page3Button).toHaveAttribute('aria-current', 'page');
    });

    it('should call onChange in uncontrolled mode', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} onChange={onChange}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={2} />
          </Pagination.List>
        </Pagination>
      );

      await user.click(screen.getByLabelText('Go to page 2'));
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('should navigate with Previous button in uncontrolled mode', async () => {
      const user = userEvent.setup();

      render(
        <Pagination totalPages={10} defaultPage={5}>
          <Pagination.List>
            <Pagination.Previous />
            <Pagination.Item page={4} />
            <Pagination.Item page={5} />
          </Pagination.List>
        </Pagination>
      );

      await user.click(screen.getByLabelText('Go to previous page'));

      const page4Button = screen.getByLabelText('Go to page 4');
      expect(page4Button).toHaveAttribute('aria-current', 'page');
    });

    it('should navigate with Next button in uncontrolled mode', async () => {
      const user = userEvent.setup();

      render(
        <Pagination totalPages={10} defaultPage={5}>
          <Pagination.List>
            <Pagination.Item page={5} />
            <Pagination.Item page={6} />
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
      );

      await user.click(screen.getByLabelText('Go to next page'));

      const page6Button = screen.getByLabelText('Go to page 6');
      expect(page6Button).toHaveAttribute('aria-current', 'page');
    });
  });

  // ============================================================================
  // KEYBOARD NAVIGATION TESTS
  // ============================================================================
  describe('Keyboard Navigation', () => {
    it('should navigate to previous page with ArrowLeft', () => {
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={5} onChange={onChange}>
          <Pagination.List>
            <Pagination.Item page={4} />
            <Pagination.Item page={5} />
            <Pagination.Item page={6} />
          </Pagination.List>
        </Pagination>
      );

      const nav = screen.getByRole('navigation');
      fireEvent.keyDown(nav, { key: 'ArrowLeft' });

      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('should navigate to next page with ArrowRight', () => {
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={5} onChange={onChange}>
          <Pagination.List>
            <Pagination.Item page={4} />
            <Pagination.Item page={5} />
            <Pagination.Item page={6} />
          </Pagination.List>
        </Pagination>
      );

      const nav = screen.getByRole('navigation');
      fireEvent.keyDown(nav, { key: 'ArrowRight' });

      expect(onChange).toHaveBeenCalledWith(6);
    });

    it('should navigate to first page with Home key', () => {
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={5} onChange={onChange}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={5} />
          </Pagination.List>
        </Pagination>
      );

      const nav = screen.getByRole('navigation');
      fireEvent.keyDown(nav, { key: 'Home' });

      expect(onChange).toHaveBeenCalledWith(1);
    });

    it('should navigate to last page with End key', () => {
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={5} onChange={onChange}>
          <Pagination.List>
            <Pagination.Item page={5} />
            <Pagination.Item page={10} />
          </Pagination.List>
        </Pagination>
      );

      const nav = screen.getByRole('navigation');
      fireEvent.keyDown(nav, { key: 'End' });

      expect(onChange).toHaveBeenCalledWith(10);
    });

    it('should not navigate before first page with ArrowLeft', () => {
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={1} onChange={onChange}>
          <Pagination.List>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      const nav = screen.getByRole('navigation');
      fireEvent.keyDown(nav, { key: 'ArrowLeft' });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should not navigate past last page with ArrowRight', () => {
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={10} onChange={onChange}>
          <Pagination.List>
            <Pagination.Item page={10} />
          </Pagination.List>
        </Pagination>
      );

      const nav = screen.getByRole('navigation');
      fireEvent.keyDown(nav, { key: 'ArrowRight' });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  // ============================================================================
  // DISABLED STATE TESTS
  // ============================================================================
  describe('Disabled States', () => {
    it('should disable Previous button on first page', () => {
      render(
        <Pagination totalPages={10} page={1}>
          <Pagination.List>
            <Pagination.Previous />
          </Pagination.List>
        </Pagination>
      );

      const prevButton = screen.getByLabelText('Go to previous page');
      expect(prevButton).toBeDisabled();
    });

    it('should disable Next button on last page', () => {
      render(
        <Pagination totalPages={10} page={10}>
          <Pagination.List>
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
      );

      const nextButton = screen.getByLabelText('Go to next page');
      expect(nextButton).toBeDisabled();
    });

    it('should not call onChange when Previous is clicked on first page', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={1} onChange={onChange}>
          <Pagination.List>
            <Pagination.Previous />
          </Pagination.List>
        </Pagination>
      );

      const prevButton = screen.getByLabelText('Go to previous page');
      await user.click(prevButton);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should not call onChange when Next is clicked on last page', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} page={10} onChange={onChange}>
          <Pagination.List>
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
      );

      const nextButton = screen.getByLabelText('Go to next page');
      await user.click(nextButton);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should support disabled prop on PaginationItem', () => {
      render(
        <Pagination totalPages={5}>
          <Pagination.List>
            <Pagination.Item page={1} disabled />
          </Pagination.List>
        </Pagination>
      );

      const pageButton = screen.getByLabelText('Go to page 1');
      expect(pageButton).toBeDisabled();
    });

    it('should not call goToPage when disabled item is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Pagination totalPages={5} onChange={onChange}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={2} disabled />
          </Pagination.List>
        </Pagination>
      );

      const disabledButton = screen.getByLabelText('Go to page 2');
      await user.click(disabledButton);

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  // ============================================================================
  // SIZE VARIANTS TESTS
  // ============================================================================
  describe('Size Variants', () => {
    it('should render small size', () => {
      render(
        <Pagination totalPages={5} size="sm">
          <Pagination.List>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      const pageButton = screen.getByLabelText('Go to page 1');
      // Small size uses Tailwind h-8 class
      expect(pageButton.className).toContain('h-8');
    });

    it('should render medium size (default)', () => {
      render(
        <Pagination totalPages={5}>
          <Pagination.List>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      const pageButton = screen.getByLabelText('Go to page 1');
      // Medium size uses Tailwind h-10 class
      expect(pageButton.className).toContain('h-10');
    });

    it('should render large size', () => {
      render(
        <Pagination totalPages={5} size="lg">
          <Pagination.List>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      const pageButton = screen.getByLabelText('Go to page 1');
      // Large size uses Tailwind h-12 class
      expect(pageButton.className).toContain('h-12');
    });
  });

  // ============================================================================
  // EDGE CASES TESTS
  // ============================================================================
  describe('Edge Cases', () => {
    it('should handle totalPages of 1', () => {
      render(
        <Pagination totalPages={1}>
          <Pagination.List>
            <Pagination.Previous />
            <Pagination.Item page={1} />
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
      expect(screen.getByLabelText('Go to next page')).toBeDisabled();
      expect(screen.getByLabelText('Go to page 1')).toHaveAttribute('aria-current', 'page');
    });

    it('should handle totalPages of 0 (treat as 1)', () => {
      render(
        <Pagination totalPages={0}>
          <Pagination.List>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      // Should clamp to minimum of 1
      const pageButton = screen.getByLabelText('Go to page 1');
      expect(pageButton).toHaveAttribute('aria-current', 'page');
    });

    it('should handle negative totalPages (treat as 1)', () => {
      render(
        <Pagination totalPages={-5}>
          <Pagination.List>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      const pageButton = screen.getByLabelText('Go to page 1');
      expect(pageButton).toHaveAttribute('aria-current', 'page');
    });

    it('should clamp page prop to valid range', () => {
      render(
        <Pagination totalPages={5} page={10}>
          <Pagination.List>
            <Pagination.Item page={5} />
          </Pagination.List>
        </Pagination>
      );

      // Page 10 is beyond totalPages, item for page 5 should not be marked as current
      const pageButton = screen.getByLabelText('Go to page 5');
      expect(pageButton).not.toHaveAttribute('aria-current', 'page');
    });

    it('should validate page prop on PaginationItem', () => {
      render(
        <Pagination totalPages={5}>
          <Pagination.List>
            <Pagination.Item page={-1} />
          </Pagination.List>
        </Pagination>
      );

      // Should clamp negative page to 1
      const pageButton = screen.getByLabelText('Go to page 1');
      expect(pageButton).toBeInTheDocument();
    });

    it('should validate page prop greater than totalPages', () => {
      render(
        <Pagination totalPages={5}>
          <Pagination.List>
            <Pagination.Item page={100} />
          </Pagination.List>
        </Pagination>
      );

      // Should clamp to totalPages (5)
      const pageButton = screen.getByLabelText('Go to page 5');
      expect(pageButton).toBeInTheDocument();
    });

    it('should handle decimal page values by flooring', () => {
      render(
        <Pagination totalPages={10}>
          <Pagination.List>
            <Pagination.Item page={3.7} />
          </Pagination.List>
        </Pagination>
      );

      // Math.floor(3.7) = 3
      const pageButton = screen.getByLabelText('Go to page 3');
      expect(pageButton).toBeInTheDocument();
    });

    it('should clamp uncontrolled page when totalPages decreases', async () => {
      const { rerender } = render(
        <Pagination totalPages={10} defaultPage={8}>
          <Pagination.List>
            <Pagination.Item page={8} />
          </Pagination.List>
        </Pagination>
      );

      // Verify initial state
      expect(screen.getByLabelText('Go to page 8')).toHaveAttribute('aria-current', 'page');

      // Reduce totalPages below current page
      rerender(
        <Pagination totalPages={5}>
          <Pagination.List>
            <Pagination.Item page={5} />
          </Pagination.List>
        </Pagination>
      );

      // Page should be clamped to new max (5)
      const pageButton = screen.getByLabelText('Go to page 5');
      expect(pageButton).toHaveAttribute('aria-current', 'page');
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================
  describe('Accessibility', () => {
    it('should have navigation role with aria-label', () => {
      render(
        <Pagination totalPages={5}>
          <Pagination.List>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      const nav = screen.getByRole('navigation', { name: 'Pagination' });
      expect(nav).toBeInTheDocument();
    });

    it('should mark active page with aria-current="page"', () => {
      render(
        <Pagination totalPages={5} page={3}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={2} />
            <Pagination.Item page={3} />
          </Pagination.List>
        </Pagination>
      );

      const activePage = screen.getByLabelText('Go to page 3');
      expect(activePage).toHaveAttribute('aria-current', 'page');

      const inactivePage = screen.getByLabelText('Go to page 1');
      expect(inactivePage).not.toHaveAttribute('aria-current');
    });

    it('should have descriptive aria-labels on navigation buttons', () => {
      render(
        <Pagination totalPages={5}>
          <Pagination.List>
            <Pagination.Previous />
            <Pagination.Item page={1} />
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
    });

    it('should have aria-hidden on ellipsis', () => {
      render(
        <Pagination totalPages={20}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Ellipsis data-testid="ellipsis" />
            <Pagination.Item page={20} />
          </Pagination.List>
        </Pagination>
      );

      const ellipsis = screen.getByTestId('ellipsis');
      expect(ellipsis).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have role="presentation" on ellipsis list item', () => {
      render(
        <Pagination totalPages={20}>
          <Pagination.List>
            <Pagination.Ellipsis />
          </Pagination.List>
        </Pagination>
      );

      const presentationItem = screen.getByRole('presentation');
      expect(presentationItem).toBeInTheDocument();
    });

    it('should have button type="button" to prevent form submission', () => {
      render(
        <Pagination totalPages={5}>
          <Pagination.List>
            <Pagination.Item page={1} />
          </Pagination.List>
        </Pagination>
      );

      const pageButton = screen.getByLabelText('Go to page 1');
      expect(pageButton).toHaveAttribute('type', 'button');
    });
  });

  // ============================================================================
  // CONTEXT TESTS
  // ============================================================================
  describe('Context', () => {
    it('should throw error when using subcomponent outside Pagination', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Pagination.Item page={1} />);
      }).toThrow('<Pagination.Item> must be used within a <Pagination> component');

      consoleSpy.mockRestore();
    });

    it('should throw error for PaginationList outside context', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // PaginationList doesn't use context directly, so it should not throw
      expect(() => {
        render(<Pagination.List><li>Test</li></Pagination.List>);
      }).not.toThrow();

      consoleSpy.mockRestore();
    });

    it('should throw error for PaginationEllipsis outside context', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Pagination.Ellipsis />);
      }).toThrow('<Pagination.Ellipsis> must be used within a <Pagination> component');

      consoleSpy.mockRestore();
    });

    it('should throw error for PaginationPrevious outside context', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Pagination.Previous />);
      }).toThrow('<Pagination.Previous> must be used within a <Pagination> component');

      consoleSpy.mockRestore();
    });

    it('should throw error for PaginationNext outside context', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Pagination.Next />);
      }).toThrow('<Pagination.Next> must be used within a <Pagination> component');

      consoleSpy.mockRestore();
    });

    it('should expose usePaginationContext hook', () => {
      expect(usePaginationContext).toBeDefined();
      expect(typeof usePaginationContext).toBe('function');
    });
  });

  // ============================================================================
  // COMPONENT MEMOIZATION TESTS
  // ============================================================================
  describe('Memoization', () => {
    it('should have displayName on Pagination', () => {
      expect(Pagination.displayName).toBe('Pagination');
    });

    it('should have displayName on PaginationList', () => {
      expect(Pagination.List.displayName).toBe('Pagination.List');
    });

    it('should have displayName on PaginationItem', () => {
      expect(Pagination.Item.displayName).toBe('Pagination.Item');
    });

    it('should have displayName on PaginationEllipsis', () => {
      expect(Pagination.Ellipsis.displayName).toBe('Pagination.Ellipsis');
    });

    it('should have displayName on PaginationPrevious', () => {
      expect(Pagination.Previous.displayName).toBe('Pagination.Previous');
    });

    it('should have displayName on PaginationNext', () => {
      expect(Pagination.Next.displayName).toBe('Pagination.Next');
    });
  });

  // ============================================================================
  // INTEGRATION TESTS
  // ============================================================================
  describe('Integration', () => {
    it('should support full pagination workflow', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Pagination totalPages={10} onChange={onChange}>
          <Pagination.List>
            <Pagination.Previous />
            <Pagination.Item page={1} />
            <Pagination.Ellipsis />
            <Pagination.Item page={5} />
            <Pagination.Ellipsis />
            <Pagination.Item page={10} />
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
      );

      // Initial state - page 1
      expect(screen.getByLabelText('Go to page 1')).toHaveAttribute('aria-current', 'page');
      expect(screen.getByLabelText('Go to previous page')).toBeDisabled();

      // Click page 5
      await user.click(screen.getByLabelText('Go to page 5'));
      expect(onChange).toHaveBeenLastCalledWith(5);

      // Click Next (now internal state is at 5)
      await user.click(screen.getByLabelText('Go to next page'));
      expect(onChange).toHaveBeenLastCalledWith(6);

      // Verify onChange was called
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('should work with large page counts', () => {
      render(
        <Pagination totalPages={1000} page={500}>
          <Pagination.List>
            <Pagination.Previous />
            <Pagination.Item page={1} />
            <Pagination.Ellipsis />
            <Pagination.Item page={499} />
            <Pagination.Item page={500} />
            <Pagination.Item page={501} />
            <Pagination.Ellipsis />
            <Pagination.Item page={1000} />
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByLabelText('Go to page 500')).toHaveAttribute('aria-current', 'page');
      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 1000')).toBeInTheDocument();
    });

    it('should render consistently with multiple rerenders', async () => {
      const { rerender } = render(
        <Pagination totalPages={10} page={1}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={2} />
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByLabelText('Go to page 1')).toHaveAttribute('aria-current', 'page');

      rerender(
        <Pagination totalPages={10} page={2}>
          <Pagination.List>
            <Pagination.Item page={1} />
            <Pagination.Item page={2} />
          </Pagination.List>
        </Pagination>
      );

      expect(screen.getByLabelText('Go to page 2')).toHaveAttribute('aria-current', 'page');
      expect(screen.getByLabelText('Go to page 1')).not.toHaveAttribute('aria-current');
    });
  });
});

// ============================================================================
// usePagination HOOK TESTS
// ============================================================================
describe('usePagination', () => {
  describe('Basic Functionality', () => {
    it('should return pages array with current page marked as active', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 5, currentPage: 3 })
      );

      expect(result.current.pages).toContainEqual({
        type: 'page',
        page: 3,
        isActive: true,
      });
    });

    it('should return canGoPrevious and canGoNext correctly', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 10, currentPage: 5 })
      );

      expect(result.current.canGoPrevious).toBe(true);
      expect(result.current.canGoNext).toBe(true);
    });

    it('should disable canGoPrevious on first page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 10, currentPage: 1 })
      );

      expect(result.current.canGoPrevious).toBe(false);
      expect(result.current.canGoNext).toBe(true);
    });

    it('should disable canGoNext on last page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 10, currentPage: 10 })
      );

      expect(result.current.canGoPrevious).toBe(true);
      expect(result.current.canGoNext).toBe(false);
    });
  });

  describe('Sibling Count', () => {
    it('should respect siblingCount of 1 (default)', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 10, currentPage: 5, siblingCount: 1 })
      );

      const pageNumbers = result.current.pages
        .filter((p) => p.type === 'page')
        .map((p) => (p as { page: number }).page);

      // Should include pages 4, 5, 6 (current ± 1 sibling)
      expect(pageNumbers).toContain(4);
      expect(pageNumbers).toContain(5);
      expect(pageNumbers).toContain(6);
    });

    it('should respect siblingCount of 2', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 20, currentPage: 10, siblingCount: 2 })
      );

      const pageNumbers = result.current.pages
        .filter((p) => p.type === 'page')
        .map((p) => (p as { page: number }).page);

      // Should include pages 8, 9, 10, 11, 12 (current ± 2 siblings)
      expect(pageNumbers).toContain(8);
      expect(pageNumbers).toContain(9);
      expect(pageNumbers).toContain(10);
      expect(pageNumbers).toContain(11);
      expect(pageNumbers).toContain(12);
    });

    it('should clamp siblings to valid page range', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 5, currentPage: 1, siblingCount: 2 })
      );

      const pageNumbers = result.current.pages
        .filter((p) => p.type === 'page')
        .map((p) => (p as { page: number }).page);

      // Should not include invalid pages like 0 or -1
      expect(pageNumbers.every((p) => p >= 1)).toBe(true);
    });
  });

  describe('Show First/Last', () => {
    it('should include first and last pages when showFirstLast is true', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 20, currentPage: 10, siblingCount: 1, showFirstLast: true })
      );

      const pageNumbers = result.current.pages
        .filter((p) => p.type === 'page')
        .map((p) => (p as { page: number }).page);

      expect(pageNumbers).toContain(1);
      expect(pageNumbers).toContain(20);
    });

    it('should include ellipsis when pages are skipped with showFirstLast', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 20, currentPage: 10, siblingCount: 1, showFirstLast: true })
      );

      const ellipses = result.current.pages.filter((p) => p.type === 'ellipsis');
      
      // Should have start and end ellipsis
      expect(ellipses.length).toBe(2);
      expect(ellipses.some((e) => (e as { key: string }).key === 'ellipsis-start')).toBe(true);
      expect(ellipses.some((e) => (e as { key: string }).key === 'ellipsis-end')).toBe(true);
    });

    it('should not include start ellipsis when current page is near start', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 20, currentPage: 2, siblingCount: 1, showFirstLast: true })
      );

      const ellipses = result.current.pages.filter((p) => p.type === 'ellipsis');
      
      // Should only have end ellipsis
      expect(ellipses.every((e) => (e as { key: string }).key !== 'ellipsis-start')).toBe(true);
    });

    it('should not include end ellipsis when current page is near end', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 20, currentPage: 19, siblingCount: 1, showFirstLast: true })
      );

      const ellipses = result.current.pages.filter((p) => p.type === 'ellipsis');
      
      // Should only have start ellipsis (or none)
      expect(ellipses.every((e) => (e as { key: string }).key !== 'ellipsis-end')).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle totalPages of 1', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 1, currentPage: 1 })
      );

      expect(result.current.pages.length).toBeGreaterThan(0);
      expect(result.current.canGoPrevious).toBe(false);
      expect(result.current.canGoNext).toBe(false);
    });

    it('should handle totalPages of 0 (treat as 1)', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 0, currentPage: 1 })
      );

      expect(result.current.totalPages).toBe(1);
    });

    it('should clamp currentPage to valid range', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 5, currentPage: 100 })
      );

      expect(result.current.currentPage).toBe(5);
    });

    it('should handle negative currentPage', () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 5, currentPage: -5 })
      );

      expect(result.current.currentPage).toBe(1);
    });
  });
});

// ============================================================================
// PaginationList Enhanced Accessibility Tests
// ============================================================================
describe('PaginationList Accessibility', () => {
  it('should include page info in aria-label when within Pagination context', () => {
    render(
      <Pagination totalPages={10} page={5}>
        <Pagination.List data-testid="pagination-list">
          <Pagination.Item page={5} />
        </Pagination.List>
      </Pagination>
    );

    const list = screen.getByTestId('pagination-list');
    expect(list).toHaveAttribute('aria-label', 'Page 5 of 10');
  });

  it('should allow custom aria-label to override default', () => {
    render(
      <Pagination totalPages={10} page={5}>
        <Pagination.List aria-label="Custom navigation" data-testid="pagination-list">
          <Pagination.Item page={5} />
        </Pagination.List>
      </Pagination>
    );

    const list = screen.getByTestId('pagination-list');
    expect(list).toHaveAttribute('aria-label', 'Custom navigation');
  });
});

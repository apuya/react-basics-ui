import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { List } from './List';
import { createRef } from 'react';

describe('List', () => {
  // ===========================================================================
  // BASIC RENDERING
  // ===========================================================================

  describe('Basic Rendering', () => {
    it('renders with default variant', () => {
      render(
        <List data-testid="list">
          <List.Item>Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <List>
          <List.Item>First item</List.Item>
          <List.Item>Second item</List.Item>
        </List>
      );
      expect(screen.getByText('First item')).toBeInTheDocument();
      expect(screen.getByText('Second item')).toBeInTheDocument();
    });

    it('forwards ref to the list element', () => {
      const ref = createRef<HTMLUListElement>();
      render(
        <List ref={ref}>
          <List.Item>Item</List.Item>
        </List>
      );
      expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    it('applies custom className', () => {
      render(
        <List className="custom-class" data-testid="list">
          <List.Item>Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list')).toHaveClass('custom-class');
    });

    it('spreads additional props', () => {
      render(
        <List data-testid="list" aria-label="Custom list">
          <List.Item>Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('aria-label', 'Custom list');
    });
  });

  // ===========================================================================
  // LIST TYPE (ORDERED VS UNORDERED)
  // ===========================================================================

  describe('List Type', () => {
    it('renders as unordered list (ul) by default', () => {
      render(
        <List data-testid="list">
          <List.Item>Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list').tagName).toBe('UL');
    });

    it('renders as ordered list (ol) when ordered prop is true', () => {
      render(
        <List ordered data-testid="list">
          <List.Item>Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list').tagName).toBe('OL');
    });

    it('forwards ref correctly for ordered list', () => {
      const ref = createRef<HTMLOListElement>();
      render(
        <List ref={ref} ordered>
          <List.Item>Item</List.Item>
        </List>
      );
      expect(ref.current).toBeInstanceOf(HTMLOListElement);
    });
  });

  // ===========================================================================
  // VARIANTS
  // ===========================================================================

  describe('Variants', () => {
    it('renders default variant', () => {
      render(
        <List variant="default" data-testid="list">
          <List.Item>Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('data-variant', 'default');
    });

    it('renders divided variant', () => {
      render(
        <List variant="divided" data-testid="list">
          <List.Item>Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('data-variant', 'divided');
    });

    it('renders bordered variant', () => {
      render(
        <List variant="bordered" data-testid="list">
          <List.Item>Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('data-variant', 'bordered');
    });

    it('renders interactive variant', () => {
      render(
        <List variant="interactive" data-testid="list">
          <List.Item>Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('data-variant', 'interactive');
    });
  });

  // ===========================================================================
  // INLINE STYLES
  // ===========================================================================

  describe('Inline Styles', () => {
    it('applies gap inline style to list', () => {
      render(
        <List data-testid="list">
          <List.Item>Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list')).toHaveStyle({
        gap: 'var(--component-list-gap)',
      });
    });

    it('merges custom style with default inline styles', () => {
      render(
        <List data-testid="list" style={{ backgroundColor: 'red' }}>
          <List.Item>Item</List.Item>
        </List>
      );
      const list = screen.getByTestId('list');
      // Check that default gap is present
      expect(list).toHaveStyle({
        gap: 'var(--component-list-gap)',
      });
      // Check that custom style attribute is applied
      expect(list.style.backgroundColor).toBe('red');
    });
  });

  // ===========================================================================
  // LIST.ITEM SUBCOMPONENT
  // ===========================================================================

  describe('List.Item', () => {
    it('renders list item', () => {
      render(
        <List>
          <List.Item data-testid="item">Item content</List.Item>
        </List>
      );
      expect(screen.getByTestId('item')).toBeInTheDocument();
      expect(screen.getByText('Item content')).toBeInTheDocument();
    });

    it('renders as li element', () => {
      render(
        <List>
          <List.Item data-testid="item">Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('item').tagName).toBe('LI');
    });

    it('forwards ref to list item', () => {
      const ref = createRef<HTMLLIElement>();
      render(
        <List>
          <List.Item ref={ref}>Item</List.Item>
        </List>
      );
      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it('applies custom className to list item', () => {
      render(
        <List>
          <List.Item className="custom-item" data-testid="item">Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('item')).toHaveClass('custom-item');
    });

    it('spreads additional props to list item', () => {
      render(
        <List>
          <List.Item data-testid="item" aria-label="Item label">Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('item')).toHaveAttribute('aria-label', 'Item label');
    });

    it('applies inline styles for padding and gap', () => {
      render(
        <List>
          <List.Item data-testid="item">Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('item')).toHaveStyle({
        paddingInline: 'var(--component-list-item-padding-inline)',
        paddingBlock: 'var(--component-list-item-padding-block)',
        gap: 'var(--component-list-item-gap)',
      });
    });

    it('merges custom style with default inline styles', () => {
      render(
        <List>
          <List.Item data-testid="item" style={{ color: 'blue' }}>Item</List.Item>
        </List>
      );
      const item = screen.getByTestId('item');
      // Check that default styles are present
      expect(item).toHaveStyle({
        gap: 'var(--component-list-item-gap)',
      });
      // Check that custom style is applied via style attribute
      expect(item.style.color).toBe('blue');
    });
  });

  // ===========================================================================
  // COMPOUND COMPONENT STRUCTURE
  // ===========================================================================

  describe('Compound Component Structure', () => {
    it('exposes Item subcomponent', () => {
      expect(List.Item).toBeDefined();
    });

    it('Item has correct displayName', () => {
      expect(List.Item.displayName).toBe('List.Item');
    });

    it('renders multiple items correctly', () => {
      render(
        <List>
          <List.Item>Item 1</List.Item>
          <List.Item>Item 2</List.Item>
          <List.Item>Item 3</List.Item>
        </List>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders items with complex content', () => {
      render(
        <List>
          <List.Item>
            <span data-testid="icon">Icon</span>
            <span data-testid="text">Text content</span>
          </List.Item>
        </List>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByTestId('text')).toBeInTheDocument();
    });
  });

  // ===========================================================================
  // NESTED LISTS
  // ===========================================================================

  describe('Nested Lists', () => {
    it('renders nested list structure', () => {
      render(
        <List data-testid="parent-list">
          <List.Item>
            Parent item
            <List data-testid="nested-list">
              <List.Item>Nested item</List.Item>
            </List>
          </List.Item>
        </List>
      );
      expect(screen.getByTestId('parent-list')).toBeInTheDocument();
      expect(screen.getByTestId('nested-list')).toBeInTheDocument();
      expect(screen.getByText('Parent item')).toBeInTheDocument();
      expect(screen.getByText('Nested item')).toBeInTheDocument();
    });

    it('nested list can have different variant', () => {
      render(
        <List variant="default" data-testid="parent-list">
          <List.Item>
            Parent
            <List variant="bordered" data-testid="nested-list">
              <List.Item>Nested</List.Item>
            </List>
          </List.Item>
        </List>
      );
      expect(screen.getByTestId('parent-list')).toHaveAttribute('data-variant', 'default');
      expect(screen.getByTestId('nested-list')).toHaveAttribute('data-variant', 'bordered');
    });
  });

  // ===========================================================================
  // ACCESSIBILITY
  // ===========================================================================

  describe('Accessibility', () => {
    it('renders semantic list structure', () => {
      render(
        <List data-testid="list">
          <List.Item data-testid="item">Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list').tagName).toBe('UL');
      expect(screen.getByTestId('item').tagName).toBe('LI');
    });

    it('renders semantic ordered list structure', () => {
      render(
        <List ordered data-testid="list">
          <List.Item data-testid="item">Item</List.Item>
        </List>
      );
      expect(screen.getByTestId('list').tagName).toBe('OL');
      expect(screen.getByTestId('item').tagName).toBe('LI');
    });

    it('supports aria-label', () => {
      render(
        <List aria-label="Navigation menu" data-testid="list">
          <List.Item>Home</List.Item>
        </List>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('aria-label', 'Navigation menu');
    });

    it('supports role attribute', () => {
      render(
        <List role="menu" data-testid="list">
          <List.Item role="menuitem">Option 1</List.Item>
        </List>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('role', 'menu');
    });
  });
});

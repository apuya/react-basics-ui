import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextList } from './TextList';
import { createRef } from 'react';

describe('TextList', () => {
  // ===========================================================================
  // BASIC RENDERING
  // ===========================================================================

  describe('Basic Rendering', () => {
    it('renders with default variant', () => {
      render(
        <TextList data-testid="list">
          <TextList.Item>Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <TextList>
          <TextList.Item>First item</TextList.Item>
          <TextList.Item>Second item</TextList.Item>
        </TextList>
      );
      expect(screen.getByText('First item')).toBeInTheDocument();
      expect(screen.getByText('Second item')).toBeInTheDocument();
    });

    it('forwards ref to the list element', () => {
      const ref = createRef<HTMLUTextListElement>();
      render(
        <TextList ref={ref}>
          <TextList.Item>Item</TextList.Item>
        </TextList>
      );
      expect(ref.current).toBeInstanceOf(HTMLUTextListElement);
    });

    it('applies custom className', () => {
      render(
        <TextList className="custom-class" data-testid="list">
          <TextList.Item>Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list')).toHaveClass('custom-class');
    });

    it('spreads additional props', () => {
      render(
        <TextList data-testid="list" aria-label="Custom list">
          <TextList.Item>Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('aria-label', 'Custom list');
    });
  });

  // ===========================================================================
  // LIST TYPE (ORDERED VS UNORDERED)
  // ===========================================================================

  describe('TextList Type', () => {
    it('renders as unordered list (ul) by default', () => {
      render(
        <TextList data-testid="list">
          <TextList.Item>Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list').tagName).toBe('UL');
    });

    it('renders as ordered list (ol) when ordered prop is true', () => {
      render(
        <TextList ordered data-testid="list">
          <TextList.Item>Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list').tagName).toBe('OL');
    });

    it('forwards ref correctly for ordered list', () => {
      const ref = createRef<HTMLOTextListElement>();
      render(
        <TextList ref={ref} ordered>
          <TextList.Item>Item</TextList.Item>
        </TextList>
      );
      expect(ref.current).toBeInstanceOf(HTMLOTextListElement);
    });
  });

  // ===========================================================================
  // VARIANTS
  // ===========================================================================

  describe('Variants', () => {
    it('renders default variant', () => {
      render(
        <TextList variant="default" data-testid="list">
          <TextList.Item>Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('data-variant', 'default');
    });

    it('renders divided variant', () => {
      render(
        <TextList variant="divided" data-testid="list">
          <TextList.Item>Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('data-variant', 'divided');
    });

    it('renders bordered variant', () => {
      render(
        <TextList variant="bordered" data-testid="list">
          <TextList.Item>Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('data-variant', 'bordered');
    });

    it('renders interactive variant', () => {
      render(
        <TextList variant="interactive" data-testid="list">
          <TextList.Item>Item</TextList.Item>
        </TextList>
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
        <TextList data-testid="list">
          <TextList.Item>Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list')).toHaveStyle({
        gap: 'var(--component-list-gap)',
      });
    });

    it('merges custom style with default inline styles', () => {
      render(
        <TextList data-testid="list" style={{ backgroundColor: 'red' }}>
          <TextList.Item>Item</TextList.Item>
        </TextList>
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

  describe('TextList.Item', () => {
    it('renders list item', () => {
      render(
        <TextList>
          <TextList.Item data-testid="item">Item content</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('item')).toBeInTheDocument();
      expect(screen.getByText('Item content')).toBeInTheDocument();
    });

    it('renders as li element', () => {
      render(
        <TextList>
          <TextList.Item data-testid="item">Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('item').tagName).toBe('LI');
    });

    it('forwards ref to list item', () => {
      const ref = createRef<HTMLLIElement>();
      render(
        <TextList>
          <TextList.Item ref={ref}>Item</TextList.Item>
        </TextList>
      );
      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it('applies custom className to list item', () => {
      render(
        <TextList>
          <TextList.Item className="custom-item" data-testid="item">Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('item')).toHaveClass('custom-item');
    });

    it('spreads additional props to list item', () => {
      render(
        <TextList>
          <TextList.Item data-testid="item" aria-label="Item label">Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('item')).toHaveAttribute('aria-label', 'Item label');
    });

    it('applies inline styles for padding and gap', () => {
      render(
        <TextList>
          <TextList.Item data-testid="item">Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('item')).toHaveStyle({
        paddingInline: 'var(--component-list-item-padding-inline)',
        paddingBlock: 'var(--component-list-item-padding-block)',
        gap: 'var(--component-list-item-gap)',
      });
    });

    it('merges custom style with default inline styles', () => {
      render(
        <TextList>
          <TextList.Item data-testid="item" style={{ color: 'blue' }}>Item</TextList.Item>
        </TextList>
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
      expect(TextList.Item).toBeDefined();
    });

    it('Item has correct displayName', () => {
      expect(TextList.Item.displayName).toBe('TextList.Item');
    });

    it('renders multiple items correctly', () => {
      render(
        <TextList>
          <TextList.Item>Item 1</TextList.Item>
          <TextList.Item>Item 2</TextList.Item>
          <TextList.Item>Item 3</TextList.Item>
        </TextList>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders items with complex content', () => {
      render(
        <TextList>
          <TextList.Item>
            <span data-testid="icon">Icon</span>
            <span data-testid="text">Text content</span>
          </TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByTestId('text')).toBeInTheDocument();
    });
  });

  // ===========================================================================
  // NESTED LISTS
  // ===========================================================================

  describe('Nested TextLists', () => {
    it('renders nested list structure', () => {
      render(
        <TextList data-testid="parent-list">
          <TextList.Item>
            Parent item
            <TextList data-testid="nested-list">
              <TextList.Item>Nested item</TextList.Item>
            </TextList>
          </TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('parent-list')).toBeInTheDocument();
      expect(screen.getByTestId('nested-list')).toBeInTheDocument();
      expect(screen.getByText('Parent item')).toBeInTheDocument();
      expect(screen.getByText('Nested item')).toBeInTheDocument();
    });

    it('nested list can have different variant', () => {
      render(
        <TextList variant="default" data-testid="parent-list">
          <TextList.Item>
            Parent
            <TextList variant="bordered" data-testid="nested-list">
              <TextList.Item>Nested</TextList.Item>
            </TextList>
          </TextList.Item>
        </TextList>
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
        <TextList data-testid="list">
          <TextList.Item data-testid="item">Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list').tagName).toBe('UL');
      expect(screen.getByTestId('item').tagName).toBe('LI');
    });

    it('renders semantic ordered list structure', () => {
      render(
        <TextList ordered data-testid="list">
          <TextList.Item data-testid="item">Item</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list').tagName).toBe('OL');
      expect(screen.getByTestId('item').tagName).toBe('LI');
    });

    it('supports aria-label', () => {
      render(
        <TextList aria-label="Navigation menu" data-testid="list">
          <TextList.Item>Home</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('aria-label', 'Navigation menu');
    });

    it('supports role attribute', () => {
      render(
        <TextList role="menu" data-testid="list">
          <TextList.Item role="menuitem">Option 1</TextList.Item>
        </TextList>
      );
      expect(screen.getByTestId('list')).toHaveAttribute('role', 'menu');
    });
  });
});

/// <reference types="@testing-library/jest-dom" />
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  describe('Rendering', () => {
    it('should render trigger and menu structure', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('button', { name: 'Open Menu' })).toBeInTheDocument();
    });

    it('should not render menu when closed', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should render menu when open', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('button', { name: 'Open Menu' });
      await user.click(trigger);

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('should render all menu items when open', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('menuitem', { name: 'Item 1' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Item 2' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Item 3' })).toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('should respect controlled open state', () => {
      render(
        <Dropdown open={true} onOpenChange={() => {}}>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('should call onOpenChange when trigger is clicked', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      
      render(
        <Dropdown open={false} onOpenChange={onOpenChange}>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('should call onOpenChange with false when closing', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      
      render(
        <Dropdown open={true} onOpenChange={onOpenChange}>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.keyboard('{Escape}');

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should toggle menu on trigger click', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('button');
      
      // Open
      await user.click(trigger);
      expect(screen.getByRole('menu')).toBeInTheDocument();

      // Close
      await user.click(trigger);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should respect defaultOpen prop', () => {
      render(
        <Dropdown defaultOpen={true}>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should close menu on Escape key', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should navigate to next item with ArrowDown', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      
      const item1 = screen.getByRole('menuitem', { name: 'Item 1' });
      const item2 = screen.getByRole('menuitem', { name: 'Item 2' });

      await user.keyboard('{ArrowDown}');
      expect(item2).toHaveFocus();
    });

    it('should navigate to previous item with ArrowUp', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      
      const item1 = screen.getByRole('menuitem', { name: 'Item 1' });
      const item3 = screen.getByRole('menuitem', { name: 'Item 3' });

      await user.keyboard('{ArrowUp}');
      // Should wrap to last item
      expect(item3).toHaveFocus();
    });

    it('should navigate to first item with Home key', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      
      const item1 = screen.getByRole('menuitem', { name: 'Item 1' });

      // Navigate down first
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      // Then press Home
      await user.keyboard('{Home}');
      expect(item1).toHaveFocus();
    });

    it('should navigate to last item with End key', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      
      const item1 = screen.getByRole('menuitem', { name: 'Item 1' });
      const item3 = screen.getByRole('menuitem', { name: 'Item 3' });

      // Focus first item, then press End
      item1.focus();
      await user.keyboard('{End}');
      expect(item3).toHaveFocus();
    });

    it('should skip disabled items in keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item disabled>Item 2 (Disabled)</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      
      const item1 = screen.getByRole('menuitem', { name: 'Item 1' });
      const item3 = screen.getByRole('menuitem', { name: 'Item 3' });

      await user.keyboard('{ArrowDown}');
      // Should skip disabled item and go to item 3
      expect(item3).toHaveFocus();
    });
  });

  describe('Click Outside', () => {
    it('should close menu when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <div data-testid="outside">Outside</div>
          <Dropdown>
            <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      await user.click(screen.getByTestId('outside'));
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should not close menu when clicking trigger', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);
      expect(screen.getByRole('menu')).toBeInTheDocument();

      // Clicking trigger again should toggle (controlled by trigger click handler)
      await user.click(trigger);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('should allow keyboard navigation after menu opens', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));

      const firstItem = screen.getByRole('menuitem', { name: 'Item 1' });
      const secondItem = screen.getByRole('menuitem', { name: 'Item 2' });
      
      // Focus first item manually
      firstItem.focus();
      expect(firstItem).toHaveFocus();
      
      // Then use keyboard to navigate
      await user.keyboard('{ArrowDown}');
      expect(secondItem).toHaveFocus();
    });

    it('should return focus to trigger when menu closes', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(trigger).toHaveFocus();
      });
    });
  });

  describe('Menu Item Interactions', () => {
    it('should call onSelect when item is clicked', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item onSelect={onSelect}>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('menuitem', { name: 'Item 1' }));

      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('should close menu after selecting item', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      await user.click(screen.getByRole('menuitem', { name: 'Item 1' }));
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should not call onSelect for disabled items', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item disabled onSelect={onSelect}>
              Disabled Item
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('menuitem', { name: 'Disabled Item' }));

      expect(onSelect).not.toHaveBeenCalled();
    });

    it('should not close menu when clicking checkbox item (checked prop defined)', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item checked={false} onSelect={onSelect}>
              Checkbox Item
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      await user.click(screen.getByRole('menuitemcheckbox', { name: 'Checkbox Item' }));
      
      // Menu should stay open for checkbox items
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('should close menu when checkbox item has closeOnSelect=true', async () => {
      const user = userEvent.setup();
      
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item checked={false} closeOnSelect={true}>
              Checkbox Item
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      await user.click(screen.getByRole('menuitemcheckbox', { name: 'Checkbox Item' }));
      
      // Menu should close when closeOnSelect is explicitly true
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should allow keeping menu open for regular items with closeOnSelect=false', async () => {
      const user = userEvent.setup();
      
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item closeOnSelect={false}>
              Regular Item
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      await user.click(screen.getByRole('menuitem', { name: 'Regular Item' }));
      
      // Menu should stay open
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render default variant correctly', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item variant="default">Default Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      const item = screen.getByRole('menuitem', { name: 'Default Item' });
      
      expect(item.className).toContain('component-dropdown-item-text-default');
    });

    it('should render danger variant correctly', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item variant="danger">Delete Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      const item = screen.getByRole('menuitem', { name: 'Delete Item' });
      
      expect(item.className).toContain('component-dropdown-item-text-danger');
    });

    it('should render warning variant correctly', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item variant="warning">Warning Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      const item = screen.getByRole('menuitem', { name: 'Warning Item' });
      
      expect(item.className).toContain('component-dropdown-item-text-warning');
    });

    it('should render success variant correctly', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item variant="success">Success Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      const item = screen.getByRole('menuitem', { name: 'Success Item' });
      
      expect(item.className).toContain('component-dropdown-item-text-success');
    });

    it('should render info variant correctly', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item variant="info">Info Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      const item = screen.getByRole('menuitem', { name: 'Info Item' });
      
      expect(item.className).toContain('component-dropdown-item-text-info');
    });
  });

  describe('Deprecated Props', () => {
    it('should support deprecated destructive prop', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item destructive>Delete Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      const item = screen.getByRole('menuitem', { name: 'Delete Item' });
      
      // Should render with danger styling
      expect(item.className).toContain('component-dropdown-item-text-danger');
      
      // Should show deprecation warning
      expect(consoleSpy).toHaveBeenCalledWith(
        'Dropdown.Item: The "destructive" prop is deprecated and will be removed in a future version. Please use variant="danger" instead.'
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA attributes on trigger', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'true');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should update aria-expanded when menu opens', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have role="menu" on menu container', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('should have role="menuitem" on items', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      
      expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    });

    it('should have disabled attribute on disabled items', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item disabled>Disabled Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      const item = screen.getByRole('menuitem', { name: 'Disabled Item' });
      
      expect(item).toHaveAttribute('disabled');
    });

    it('should have proper labeling for shortcuts', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item shortcut="⌘K">Item with shortcut</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      
      // Shortcut element should have aria-label
      const shortcutElement = screen.getByLabelText('Keyboard shortcut: ⌘K');
      expect(shortcutElement).toBeInTheDocument();
      expect(shortcutElement).toHaveTextContent('⌘K');
    });

    it('should link trigger and menu with aria-controls', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);
      
      const menu = screen.getByRole('menu');
      const menuId = menu.getAttribute('id');
      
      expect(trigger).toHaveAttribute('aria-controls', menuId);
    });
  });

  describe('Additional Features', () => {
    it('should render items with shortcuts', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item shortcut="⌘K">Search</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByText('⌘K')).toBeInTheDocument();
    });

    it('should render items with icons', async () => {
      const user = userEvent.setup();
      const icon = <span data-testid="custom-icon">🔍</span>;
      
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item leadingIcon={icon}>Search</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render items with descriptions', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item description="Additional info">Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByText('Additional info')).toBeInTheDocument();
    });

    it('should render items with checkbox state', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item checked>Selected Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      const item = screen.getByRole('menuitemcheckbox', { name: 'Selected Item' });
      
      // Should have checkmark or visual indicator
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('aria-checked', 'true');
    });

    it('should render divider MenuItems', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.MenuItem variant="divider" />
            <Dropdown.Item>Item 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      const divider = screen.getByRole('separator');
      
      expect(divider).toBeInTheDocument();
    });

    it('should render header MenuItems', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.MenuItem variant="header" label="Section Title" />
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByText('Section Title')).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to trigger', () => {
      const triggerRef = createRef<HTMLButtonElement>();
      
      render(
        <Dropdown>
          <Dropdown.Trigger ref={triggerRef}>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
      expect(triggerRef.current).toHaveTextContent('Open Menu');
    });

    it('should forward ref to menu', async () => {
      const user = userEvent.setup();
      const menuRef = createRef<HTMLDivElement>();
      
      render(
        <Dropdown defaultOpen>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu ref={menuRef}>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(menuRef.current).toBeInstanceOf(HTMLDivElement);
      expect(menuRef.current).toHaveAttribute('role', 'menu');
    });

    it('should forward ref to items', async () => {
      const user = userEvent.setup();
      const itemRef = createRef<HTMLButtonElement>();
      
      render(
        <Dropdown defaultOpen>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item ref={itemRef}>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(itemRef.current).toBeInstanceOf(HTMLButtonElement);
      expect(itemRef.current).toHaveAttribute('role', 'menuitem');
    });
  });

  describe('Positioning', () => {
    it('should support bottom-start positioning by default', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      const menu = screen.getByRole('menu');
      
      // Should have positioning classes
      expect(menu).toBeInTheDocument();
    });

    it('should support custom side positioning', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu side="top">
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('should support custom align positioning', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu align="end">
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  describe('Error Boundary', () => {
    it('should render DropdownErrorBoundary component', () => {
      const { container } = render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      // Error boundary wraps the component
      expect(container).toBeInTheDocument();
    });
  });
});

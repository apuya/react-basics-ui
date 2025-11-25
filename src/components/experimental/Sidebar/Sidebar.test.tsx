import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<Sidebar>Content</Sidebar>);
      expect(container.querySelector('aside')).toBeTruthy();
    });

    it('renders children', () => {
      render(<Sidebar>Test Content</Sidebar>);
      expect(screen.getByText('Test Content')).toBeTruthy();
    });

    it('applies default variant', () => {
      const { container } = render(<Sidebar>Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.className).toContain('bg-[color:var(--semantic-surface-base)]');
    });

    it('renders with custom className', () => {
      const { container } = render(<Sidebar className="custom-class">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.className).toContain('custom-class');
    });
  });

  describe('Variants', () => {
    it('applies default variant styles', () => {
      const { container } = render(<Sidebar variant="default">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.className).toContain('bg-[color:var(--semantic-surface-base)]');
    });

    it('applies bordered variant styles', () => {
      const { container } = render(<Sidebar variant="bordered" position="left">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.className).toContain('border-r');
      expect(sidebar?.className).toContain('border-[color:var(--semantic-border-default)]');
    });

    it('applies elevated variant styles', () => {
      const { container } = render(<Sidebar variant="elevated">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.className).toContain('shadow-lg');
    });
  });

  describe('Collapse State - Uncontrolled', () => {
    it('starts expanded by default', () => {
      const { container } = render(<Sidebar>Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.style.width).toBe('280px');
    });

    it('starts collapsed when defaultCollapsed is true', () => {
      const { container } = render(<Sidebar defaultCollapsed>Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.style.width).toBe('80px');
    });

    it('toggles collapse state when toggle button is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<Sidebar>Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      const toggleButton = screen.getByRole('button', { name: /collapse sidebar/i });

      expect(sidebar?.style.width).toBe('280px');

      await user.click(toggleButton);
      await waitFor(() => {
        expect(sidebar?.style.width).toBe('80px');
      });

      const expandButton = screen.getByRole('button', { name: /expand sidebar/i });
      await user.click(expandButton);
      await waitFor(() => {
        expect(sidebar?.style.width).toBe('280px');
      });
    });
  });

  describe('Collapse State - Controlled', () => {
    it('respects controlled collapsed prop', () => {
      const { container } = render(
        <Sidebar collapsed={true} onCollapsedChange={() => {}}>
          Content
        </Sidebar>
      );
      const sidebar = container.querySelector('aside');
      expect(sidebar?.style.width).toBe('80px');
    });

    it('calls onCollapsedChange when toggle button is clicked', async () => {
      const user = userEvent.setup();
      const onCollapsedChange = vi.fn();
      render(
        <Sidebar collapsed={false} onCollapsedChange={onCollapsedChange}>
          Content
        </Sidebar>
      );

      const toggleButton = screen.getByRole('button', { name: /collapse sidebar/i });
      await user.click(toggleButton);

      expect(onCollapsedChange).toHaveBeenCalledWith(true);
    });

    it('does not change state internally when controlled', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Sidebar collapsed={false} onCollapsedChange={() => {}}>
          Content
        </Sidebar>
      );
      const sidebar = container.querySelector('aside');
      const toggleButton = screen.getByRole('button', { name: /collapse sidebar/i });

      expect(sidebar?.style.width).toBe('280px');

      await user.click(toggleButton);
      // Should still be expanded since we didn't update the prop
      expect(sidebar?.style.width).toBe('280px');
    });
  });

  describe('Custom Widths', () => {
    it('applies custom width when expanded', () => {
      const { container } = render(<Sidebar width="320px">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.style.width).toBe('320px');
    });

    it('applies custom collapsed width when collapsed', () => {
      const { container } = render(
        <Sidebar defaultCollapsed collapsedWidth="100px">
          Content
        </Sidebar>
      );
      const sidebar = container.querySelector('aside');
      expect(sidebar?.style.width).toBe('100px');
    });
  });

  describe('Toggle Button', () => {
    it('renders toggle button by default', () => {
      render(<Sidebar>Content</Sidebar>);
      const button = screen.getByRole('button', { name: /collapse sidebar/i });
      expect(button).toBeTruthy();
    });

    it('hides toggle button when showToggle is false', () => {
      render(<Sidebar showToggle={false}>Content</Sidebar>);
      const button = screen.queryByRole('button');
      expect(button).toBeFalsy();
    });

    it('shows icon when rendered', () => {
      render(<Sidebar position="left">Content</Sidebar>);
      const toggleButton = screen.getByRole('button', { name: /collapse sidebar/i });
      expect(toggleButton.querySelector('svg')).toBeTruthy();
    });
  });

  describe('Compound Components', () => {
    it('renders header component', () => {
      render(
        <Sidebar>
          <Sidebar.Header>Header Content</Sidebar.Header>
        </Sidebar>
      );
      expect(screen.getByText('Header Content')).toBeTruthy();
    });

    it('renders content component', () => {
      render(
        <Sidebar>
          <Sidebar.Content>Content Area</Sidebar.Content>
        </Sidebar>
      );
      expect(screen.getByText('Content Area')).toBeTruthy();
    });

    it('renders footer component', () => {
      render(
        <Sidebar>
          <Sidebar.Footer>Footer Content</Sidebar.Footer>
        </Sidebar>
      );
      expect(screen.getByText('Footer Content')).toBeTruthy();
    });

    it('renders section with title', () => {
      render(
        <Sidebar>
          <Sidebar.Section title="Section Title">Content</Sidebar.Section>
        </Sidebar>
      );
      expect(screen.getByText('Section Title')).toBeTruthy();
      expect(screen.getByText('Content')).toBeTruthy();
    });

    it('renders item with text', () => {
      render(
        <Sidebar>
          <Sidebar.Item>Item Text</Sidebar.Item>
        </Sidebar>
      );
      expect(screen.getByText('Item Text')).toBeTruthy();
    });

    it('renders item with icon', () => {
      const Icon = () => <svg data-testid="test-icon" />;
      render(
        <Sidebar>
          <Sidebar.Item icon={<Icon />}>Item</Sidebar.Item>
        </Sidebar>
      );
      expect(screen.getByTestId('test-icon')).toBeTruthy();
    });

    it('handles item click events', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Sidebar>
          <Sidebar.Item onClick={onClick}>Clickable</Sidebar.Item>
        </Sidebar>
      );

      await user.click(screen.getByText('Clickable'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Integration', () => {
    it('works with all compound components together', () => {
      render(
        <Sidebar>
          <Sidebar.Header>Header</Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Section title="Section 1">
              <Sidebar.Item active>Item 1</Sidebar.Item>
              <Sidebar.Item>Item 2</Sidebar.Item>
            </Sidebar.Section>
          </Sidebar.Content>
          <Sidebar.Footer>Footer</Sidebar.Footer>
        </Sidebar>
      );

      expect(screen.getByText('Header')).toBeTruthy();
      expect(screen.getByText('Section 1')).toBeTruthy();
      expect(screen.getByText('Item 1')).toBeTruthy();
      expect(screen.getByText('Item 2')).toBeTruthy();
      expect(screen.getByText('Footer')).toBeTruthy();
    });
  });
});

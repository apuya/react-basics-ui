import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { BiHome } from 'react-icons/bi';
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
      expect(sidebar).toHaveAttribute('data-variant', 'default');
    });

    it('renders with custom className', () => {
      const { container } = render(<Sidebar className="custom-class">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.className).toContain('custom-class');
    });

    it('applies default width', () => {
      const { container } = render(<Sidebar>Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.style.width).toBe('280px');
    });
  });

  describe('Variants', () => {
    it('applies default variant styles', () => {
      const { container } = render(<Sidebar variant="default">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveAttribute('data-variant', 'default');
    });

    it('applies bordered variant styles', () => {
      const { container } = render(<Sidebar variant="bordered">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveAttribute('data-variant', 'bordered');
      expect(sidebar?.className).toContain('border-r');
    });

    it('applies elevated variant styles', () => {
      const { container } = render(<Sidebar variant="elevated">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveAttribute('data-variant', 'elevated');
    });
  });

  describe('Custom Width', () => {
    it('applies custom width', () => {
      const { container } = render(<Sidebar width="320px">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.style.width).toBe('320px');
    });

    it('applies numeric width as pixels', () => {
      const { container } = render(<Sidebar width={350}>Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar?.style.width).toBe('350px');
    });
  });

  describe('Compound Components', () => {
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

    it('renders section component', () => {
      render(
        <Sidebar>
          <Sidebar.Section>Section Content</Sidebar.Section>
        </Sidebar>
      );
      expect(screen.getByText('Section Content')).toBeTruthy();
    });

    it('renders section header', () => {
      render(
        <Sidebar>
          <Sidebar.Section>
            <Sidebar.SectionHeader>Section Title</Sidebar.SectionHeader>
            <div>Content</div>
          </Sidebar.Section>
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
      render(
        <Sidebar>
          <Sidebar.Item icon={BiHome}>Item</Sidebar.Item>
        </Sidebar>
      );
      expect(screen.getByRole('button').querySelector('svg')).toBeTruthy();
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
          <Sidebar.Content>
            <Sidebar.Section>
              <Sidebar.SectionHeader>Section 1</Sidebar.SectionHeader>
              <Sidebar.Item active>Item 1</Sidebar.Item>
              <Sidebar.Item>Item 2</Sidebar.Item>
            </Sidebar.Section>
          </Sidebar.Content>
          <Sidebar.Footer>Footer</Sidebar.Footer>
        </Sidebar>
      );

      expect(screen.getByText('Section 1')).toBeTruthy();
      expect(screen.getByText('Item 1')).toBeTruthy();
      expect(screen.getByText('Item 2')).toBeTruthy();
      expect(screen.getByText('Footer')).toBeTruthy();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to Sidebar container', () => {
      const ref = createRef<HTMLElement>();
      render(<Sidebar ref={ref}>Content</Sidebar>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('ASIDE');
    });

    it('forwards ref to Sidebar.Content', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Sidebar>
          <Sidebar.Content ref={ref}>Content</Sidebar.Content>
        </Sidebar>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Sidebar.Footer', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Sidebar>
          <Sidebar.Footer ref={ref}>Footer</Sidebar.Footer>
        </Sidebar>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Sidebar.Section', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Sidebar>
          <Sidebar.Section ref={ref}>Section</Sidebar.Section>
        </Sidebar>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Sidebar.Item', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Sidebar>
          <Sidebar.Item ref={ref}>Item</Sidebar.Item>
        </Sidebar>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('displayName', () => {
    it('has correct displayName for Sidebar', () => {
      expect(Sidebar.displayName).toBe('Sidebar');
    });

    it('has correct displayName for Sidebar.Content', () => {
      expect(Sidebar.Content.displayName).toBe('Sidebar.Content');
    });

    it('has correct displayName for Sidebar.Footer', () => {
      expect(Sidebar.Footer.displayName).toBe('Sidebar.Footer');
    });

    it('has correct displayName for Sidebar.Section', () => {
      expect(Sidebar.Section.displayName).toBe('Sidebar.Section');
    });

    it('has correct displayName for Sidebar.SectionHeader', () => {
      expect(Sidebar.SectionHeader.displayName).toBe('Sidebar.SectionHeader');
    });

    it('has correct displayName for Sidebar.Item', () => {
      expect(Sidebar.Item.displayName).toBe('Sidebar.Item');
    });
  });

  describe('Data Attributes', () => {
    it('sets data-variant attribute', () => {
      const { container } = render(<Sidebar variant="bordered">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveAttribute('data-variant', 'bordered');
    });

    it('sets data-position attribute', () => {
      const { container } = render(<Sidebar position="right">Content</Sidebar>);
      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveAttribute('data-position', 'right');
    });

    it('sets data-active on active item', () => {
      render(
        <Sidebar>
          <Sidebar.Item active>Active Item</Sidebar.Item>
        </Sidebar>
      );
      const item = screen.getByRole('button', { name: 'Active Item' });
      expect(item).toHaveAttribute('data-active', 'true');
    });

    it('does not set data-active on inactive item', () => {
      render(
        <Sidebar>
          <Sidebar.Item>Inactive Item</Sidebar.Item>
        </Sidebar>
      );
      const item = screen.getByRole('button', { name: 'Inactive Item' });
      expect(item).not.toHaveAttribute('data-active');
    });
  });
});

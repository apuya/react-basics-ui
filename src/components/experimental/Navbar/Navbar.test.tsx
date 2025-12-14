import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(
        <Navbar>
          <Navbar.Content>Content</Navbar.Content>
        </Navbar>
      );
      expect(container.querySelector('nav')).toBeTruthy();
    });

    it('renders children', () => {
      render(
        <Navbar>
          <Navbar.Content>Test Content</Navbar.Content>
        </Navbar>
      );
      expect(screen.getByText('Test Content')).toBeTruthy();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Navbar className="custom-class">
          <Navbar.Content>Content</Navbar.Content>
        </Navbar>
      );
      const nav = container.querySelector('nav');
      expect(nav?.className).toContain('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('has default aria-label for navigation landmark', () => {
      render(
        <Navbar>
          <Navbar.Content>Content</Navbar.Content>
        </Navbar>
      );
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('accepts custom aria-label', () => {
      render(
        <Navbar aria-label="Site navigation">
          <Navbar.Content>Content</Navbar.Content>
        </Navbar>
      );
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Site navigation');
    });

    it('is a navigation landmark', () => {
      render(
        <Navbar>
          <Navbar.Content>Content</Navbar.Content>
        </Navbar>
      );
      expect(screen.getByRole('navigation')).toBeTruthy();
    });
  });

  describe('Props', () => {
    it('applies fixed prop', () => {
      const { container } = render(
        <Navbar fixed>
          <Navbar.Content>Content</Navbar.Content>
        </Navbar>
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('data-fixed', 'true');
      expect(nav?.className).toContain('fixed');
    });

    it('applies bordered prop by default', () => {
      const { container } = render(
        <Navbar>
          <Navbar.Content>Content</Navbar.Content>
        </Navbar>
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('data-bordered', 'true');
    });

    it('removes border when bordered is false', () => {
      const { container } = render(
        <Navbar bordered={false}>
          <Navbar.Content>Content</Navbar.Content>
        </Navbar>
      );
      const nav = container.querySelector('nav');
      expect(nav).not.toHaveAttribute('data-bordered');
    });
  });

  describe('Style Prop Merging', () => {
    it('merges custom style with Navbar.Content', () => {
      const { container } = render(
        <Navbar>
          <Navbar.Content style={{ backgroundColor: 'red' }}>Content</Navbar.Content>
        </Navbar>
      );
      const content = container.querySelector('nav > div');
      expect(content?.style.backgroundColor).toBe('red');
    });

    it('merges custom style with Navbar.Brand', () => {
      const { container } = render(
        <Navbar>
          <Navbar.Content>
            <Navbar.Brand style={{ color: 'blue' }}>Brand</Navbar.Brand>
          </Navbar.Content>
        </Navbar>
      );
      const brand = screen.getByText('Brand');
      expect(brand.style.color).toBe('blue');
    });

    it('merges custom style with Navbar.Section', () => {
      const { container } = render(
        <Navbar>
          <Navbar.Content>
            <Navbar.Section style={{ padding: '10px' }}>Section</Navbar.Section>
          </Navbar.Content>
        </Navbar>
      );
      const section = screen.getByText('Section');
      expect(section.style.padding).toBe('10px');
    });
  });

  describe('Compound Components', () => {
    it('renders Navbar.Content', () => {
      render(
        <Navbar>
          <Navbar.Content>Content Area</Navbar.Content>
        </Navbar>
      );
      expect(screen.getByText('Content Area')).toBeTruthy();
    });

    it('renders Navbar.Brand', () => {
      render(
        <Navbar>
          <Navbar.Content>
            <Navbar.Brand>Brand Logo</Navbar.Brand>
          </Navbar.Content>
        </Navbar>
      );
      expect(screen.getByText('Brand Logo')).toBeTruthy();
    });

    it('renders Navbar.Section', () => {
      render(
        <Navbar>
          <Navbar.Content>
            <Navbar.Section>Section Content</Navbar.Section>
          </Navbar.Content>
        </Navbar>
      );
      expect(screen.getByText('Section Content')).toBeTruthy();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to Navbar', () => {
      const ref = createRef<HTMLElement>();
      render(
        <Navbar ref={ref}>
          <Navbar.Content>Content</Navbar.Content>
        </Navbar>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('NAV');
    });

    it('forwards ref to Navbar.Content', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Navbar>
          <Navbar.Content ref={ref}>Content</Navbar.Content>
        </Navbar>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Navbar.Brand', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Navbar>
          <Navbar.Content>
            <Navbar.Brand ref={ref}>Brand</Navbar.Brand>
          </Navbar.Content>
        </Navbar>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Navbar.Section', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Navbar>
          <Navbar.Content>
            <Navbar.Section ref={ref}>Section</Navbar.Section>
          </Navbar.Content>
        </Navbar>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('displayName', () => {
    it('has correct displayName for Navbar', () => {
      expect(Navbar.displayName).toBe('Navbar');
    });

    it('has correct displayName for Navbar.Content', () => {
      expect(Navbar.Content.displayName).toBe('Navbar.Content');
    });

    it('has correct displayName for Navbar.Brand', () => {
      expect(Navbar.Brand.displayName).toBe('Navbar.Brand');
    });

    it('has correct displayName for Navbar.Section', () => {
      expect(Navbar.Section.displayName).toBe('Navbar.Section');
    });
  });

  describe('Integration', () => {
    it('renders complete navbar structure', () => {
      render(
        <Navbar bordered>
          <Navbar.Content>
            <Navbar.Brand>Logo</Navbar.Brand>
            <Navbar.Section>
              <a href="#">Home</a>
              <a href="#">About</a>
            </Navbar.Section>
            <Navbar.Section>
              <button>Sign In</button>
            </Navbar.Section>
          </Navbar.Content>
        </Navbar>
      );

      expect(screen.getByText('Logo')).toBeTruthy();
      expect(screen.getByText('Home')).toBeTruthy();
      expect(screen.getByText('About')).toBeTruthy();
      expect(screen.getByText('Sign In')).toBeTruthy();
    });
  });
});

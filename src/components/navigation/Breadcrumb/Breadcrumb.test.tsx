import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbEllipsis } from './Breadcrumb';

describe('Breadcrumb', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders as nav element with aria-label', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    });

    it('renders an ordered list inside nav', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
    });
  });

  describe('Separator', () => {
    it('uses default separator (forward slash)', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent>Products</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByText('/')).toBeInTheDocument();
    });

    it('uses custom separator string', () => {
      render(
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent>Products</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByText('>')).toBeInTheDocument();
    });

    it('uses custom separator element', () => {
      render(
        <Breadcrumb separator={<span data-testid="custom-separator">→</span>}>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent>Products</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('custom-separator')).toBeInTheDocument();
    });

    it('hides separator with aria-hidden', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent>Products</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      const separator = screen.getByText('/');
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });

    it('does not show separator on current item', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent>Current Page</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.queryByText('/')).not.toBeInTheDocument();
    });

    it('respects showSeparator=false', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item showSeparator={false}>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent>Products</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.queryByText('/')).not.toBeInTheDocument();
    });
  });

  describe('BreadcrumbItem', () => {
    it('renders as list item', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByRole('listitem')).toBeInTheDocument();
    });

    it('applies data-current when isCurrent is true', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item isCurrent data-testid="current-item">
            <Breadcrumb.Link isCurrent>Current</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('current-item')).toHaveAttribute('data-current', 'true');
    });

    it('does not apply data-current when isCurrent is false', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item data-testid="non-current-item">
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('non-current-item')).not.toHaveAttribute('data-current');
    });

    it('applies custom className', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item className="custom-class" data-testid="item">
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('item')).toHaveClass('custom-class');
    });

    it('forwards additional HTML attributes', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item data-custom="value" data-testid="item">
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('item')).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('BreadcrumbLink', () => {
    it('renders as anchor when href is provided', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/test">Test Link</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });

    it('renders as span when isCurrent is true', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent data-testid="current-link">
              Current
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      const span = screen.getByTestId('current-link');
      expect(span.tagName).toBe('SPAN');
    });

    it('renders as span when no href is provided', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link data-testid="no-href">No Link</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      const span = screen.getByTestId('no-href');
      expect(span.tagName).toBe('SPAN');
    });

    it('sets aria-current=page when isCurrent is true', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent data-testid="current-link">
              Current
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('current-link')).toHaveAttribute('aria-current', 'page');
    });

    it('does not set aria-current when not current', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/" data-testid="link">
              Home
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('link')).not.toHaveAttribute('aria-current');
    });

    it('applies data-current when isCurrent is true', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent data-testid="current-link">
              Current
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('current-link')).toHaveAttribute('data-current', 'true');
    });

    it('applies custom className', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/" className="custom-class">
              Home
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByRole('link')).toHaveClass('custom-class');
    });

    it('forwards additional HTML attributes', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/" data-custom="value">
              Home
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByRole('link')).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('BreadcrumbEllipsis', () => {
    it('renders with default content (...)', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis data-testid="ellipsis" />
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('ellipsis')).toHaveTextContent('...');
    });

    it('renders with custom content', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis data-testid="ellipsis">•••</Breadcrumb.Ellipsis>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('ellipsis')).toHaveTextContent('•••');
    });

    it('has role=presentation', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis data-testid="ellipsis" />
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('ellipsis')).toHaveAttribute('role', 'presentation');
    });

    it('has aria-hidden=true', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis data-testid="ellipsis" />
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('ellipsis')).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies custom className', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis className="custom-class" data-testid="ellipsis" />
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('ellipsis')).toHaveClass('custom-class');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to BreadcrumbRoot nav element', () => {
      let refValue: HTMLElement | null = null;
      render(
        <Breadcrumb ref={(el) => { refValue = el; }}>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(refValue).toBeInstanceOf(HTMLElement);
      expect(refValue).not.toBeNull();
      expect(refValue!.tagName).toBe('NAV');
    });

    it('forwards ref to BreadcrumbItem li element', () => {
      let refValue: HTMLLIElement | null = null;
      render(
        <Breadcrumb>
          <Breadcrumb.Item ref={(el) => { refValue = el; }}>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(refValue).toBeInstanceOf(HTMLLIElement);
    });

    it('forwards ref to BreadcrumbLink anchor element', () => {
      let refValue: HTMLAnchorElement | HTMLSpanElement | null = null;
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/" ref={(el) => { refValue = el; }}>
              Home
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(refValue).toBeInstanceOf(HTMLAnchorElement);
    });

    it('forwards ref to BreadcrumbLink span element when current', () => {
      let refValue: HTMLAnchorElement | HTMLSpanElement | null = null;
      render(
        <Breadcrumb>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent ref={(el) => { refValue = el; }}>
              Current
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(refValue).toBeInstanceOf(HTMLSpanElement);
    });

    it('forwards ref to BreadcrumbEllipsis span element', () => {
      let refValue: HTMLSpanElement | null = null;
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis ref={(el) => { refValue = el; }} />
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(refValue).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('Custom className', () => {
    it('applies custom className to BreadcrumbRoot', () => {
      render(
        <Breadcrumb className="custom-nav" data-testid="nav">
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('nav')).toHaveClass('custom-nav');
    });
  });

  describe('Compound Component Pattern', () => {
    it('exports compound component with sub-components', () => {
      expect(Breadcrumb.Item).toBeDefined();
      expect(Breadcrumb.Link).toBeDefined();
      expect(Breadcrumb.Ellipsis).toBeDefined();
    });

    it('exports individual sub-components for named imports', () => {
      expect(Breadcrumb).toBeDefined();
      expect(BreadcrumbItem).toBeDefined();
      expect(BreadcrumbLink).toBeDefined();
      expect(BreadcrumbEllipsis).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('has proper landmark role', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('uses ordered list for semantic structure', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('marks current page with aria-current', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent data-testid="current">
              Current Page
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('current')).toHaveAttribute('aria-current', 'page');
    });

    it('hides separators from screen readers', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent>Products</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      const separator = screen.getByText('/');
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });

    it('hides ellipsis from screen readers', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis data-testid="ellipsis" />
          </Breadcrumb.Item>
        </Breadcrumb>
      );
      expect(screen.getByTestId('ellipsis')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Complex Scenarios', () => {
    it('renders full breadcrumb trail', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/products/electronics">Electronics</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent>Laptops</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );

      expect(screen.getAllByRole('listitem')).toHaveLength(4);
      expect(screen.getAllByRole('link')).toHaveLength(3);
      expect(screen.getAllByText('/')).toHaveLength(3);
    });

    it('renders breadcrumb with ellipsis collapse', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis />
          </Breadcrumb.Item>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent>Current</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('...')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
    });
  });
});

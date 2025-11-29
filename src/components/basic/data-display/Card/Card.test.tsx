import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { createRef } from 'react';

describe('Card', () => {
  // ===========================================================================
  // BASIC RENDERING
  // ===========================================================================

  describe('Basic Rendering', () => {
    it('renders with default variant', () => {
      render(
        <Card data-testid="card">
          <Card.Content>Content</Card.Content>
        </Card>
      );
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <Card>
          <Card.Content>Card content</Card.Content>
        </Card>
      );
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('forwards ref to the card element', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Card ref={ref}>
          <Card.Content>Content</Card.Content>
        </Card>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies custom className', () => {
      render(
        <Card className="custom-class" data-testid="card">
          <Card.Content>Content</Card.Content>
        </Card>
      );
      expect(screen.getByTestId('card')).toHaveClass('custom-class');
    });

    it('spreads additional props', () => {
      render(
        <Card data-testid="card" aria-label="Custom card">
          <Card.Content>Content</Card.Content>
        </Card>
      );
      expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'Custom card');
    });
  });

  // ===========================================================================
  // VARIANTS
  // ===========================================================================

  describe('Variants', () => {
    it('renders default variant', () => {
      render(
        <Card variant="default" data-testid="card">
          <Card.Content>Content</Card.Content>
        </Card>
      );
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('renders elevated variant', () => {
      render(
        <Card variant="elevated" data-testid="card">
          <Card.Content>Content</Card.Content>
        </Card>
      );
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('renders outlined variant', () => {
      render(
        <Card variant="outlined" data-testid="card">
          <Card.Content>Content</Card.Content>
        </Card>
      );
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('renders interactive variant', () => {
      render(
        <Card variant="interactive" data-testid="card">
          <Card.Content>Content</Card.Content>
        </Card>
      );
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });
  });

  // ===========================================================================
  // SUBCOMPONENTS
  // ===========================================================================

  describe('Subcomponents', () => {
    describe('Card.Header', () => {
      it('renders header content', () => {
        render(
          <Card>
            <Card.Header data-testid="header">Header content</Card.Header>
          </Card>
        );
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByText('Header content')).toBeInTheDocument();
      });

      it('forwards ref to header element', () => {
        const ref = createRef<HTMLDivElement>();
        render(
          <Card>
            <Card.Header ref={ref}>Header</Card.Header>
          </Card>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });

      it('applies custom className', () => {
        render(
          <Card>
            <Card.Header className="custom-header" data-testid="header">
              Header
            </Card.Header>
          </Card>
        );
        expect(screen.getByTestId('header')).toHaveClass('custom-header');
      });
    });

    describe('Card.Title', () => {
      it('renders title as h3', () => {
        render(
          <Card>
            <Card.Header>
              <Card.Title>My Title</Card.Title>
            </Card.Header>
          </Card>
        );
        const title = screen.getByRole('heading', { level: 3, name: 'My Title' });
        expect(title).toBeInTheDocument();
      });

      it('forwards ref to title element', () => {
        const ref = createRef<HTMLHeadingElement>();
        render(
          <Card>
            <Card.Header>
              <Card.Title ref={ref}>Title</Card.Title>
            </Card.Header>
          </Card>
        );
        expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
      });

      it('applies custom className', () => {
        render(
          <Card>
            <Card.Header>
              <Card.Title className="custom-title" data-testid="title">
                Title
              </Card.Title>
            </Card.Header>
          </Card>
        );
        expect(screen.getByTestId('title')).toHaveClass('custom-title');
      });
    });

    describe('Card.Description', () => {
      it('renders description as paragraph', () => {
        render(
          <Card>
            <Card.Header>
              <Card.Description>My description</Card.Description>
            </Card.Header>
          </Card>
        );
        expect(screen.getByText('My description')).toBeInTheDocument();
      });

      it('forwards ref to description element', () => {
        const ref = createRef<HTMLParagraphElement>();
        render(
          <Card>
            <Card.Header>
              <Card.Description ref={ref}>Description</Card.Description>
            </Card.Header>
          </Card>
        );
        expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
      });

      it('applies custom className', () => {
        render(
          <Card>
            <Card.Header>
              <Card.Description className="custom-desc" data-testid="desc">
                Description
              </Card.Description>
            </Card.Header>
          </Card>
        );
        expect(screen.getByTestId('desc')).toHaveClass('custom-desc');
      });
    });

    describe('Card.Content', () => {
      it('renders content', () => {
        render(
          <Card>
            <Card.Content data-testid="content">Main content</Card.Content>
          </Card>
        );
        expect(screen.getByTestId('content')).toBeInTheDocument();
        expect(screen.getByText('Main content')).toBeInTheDocument();
      });

      it('forwards ref to content element', () => {
        const ref = createRef<HTMLDivElement>();
        render(
          <Card>
            <Card.Content ref={ref}>Content</Card.Content>
          </Card>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });

      it('applies custom className', () => {
        render(
          <Card>
            <Card.Content className="custom-content" data-testid="content">
              Content
            </Card.Content>
          </Card>
        );
        expect(screen.getByTestId('content')).toHaveClass('custom-content');
      });
    });

    describe('Card.Footer', () => {
      it('renders footer content', () => {
        render(
          <Card>
            <Card.Footer data-testid="footer">Footer content</Card.Footer>
          </Card>
        );
        expect(screen.getByTestId('footer')).toBeInTheDocument();
        expect(screen.getByText('Footer content')).toBeInTheDocument();
      });

      it('forwards ref to footer element', () => {
        const ref = createRef<HTMLDivElement>();
        render(
          <Card>
            <Card.Footer ref={ref}>Footer</Card.Footer>
          </Card>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });

      it('applies custom className', () => {
        render(
          <Card>
            <Card.Footer className="custom-footer" data-testid="footer">
              Footer
            </Card.Footer>
          </Card>
        );
        expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
      });
    });
  });

  // ===========================================================================
  // COMPOUND COMPONENT STRUCTURE
  // ===========================================================================

  describe('Compound Component Structure', () => {
    it('renders full card with all subcomponents', () => {
      render(
        <Card data-testid="card">
          <Card.Header data-testid="header">
            <Card.Title>Title</Card.Title>
            <Card.Description>Description</Card.Description>
          </Card.Header>
          <Card.Content data-testid="content">Main content</Card.Content>
          <Card.Footer data-testid="footer">Footer actions</Card.Footer>
        </Card>
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: 'Title' })).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('renders without header', () => {
      render(
        <Card>
          <Card.Content>Content only</Card.Content>
        </Card>
      );
      expect(screen.getByText('Content only')).toBeInTheDocument();
    });

    it('renders without footer', () => {
      render(
        <Card>
          <Card.Header>
            <Card.Title>Title</Card.Title>
          </Card.Header>
          <Card.Content>Content</Card.Content>
        </Card>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });
});

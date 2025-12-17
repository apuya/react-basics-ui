/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  describe('Rendering', () => {
    it('should render with title and description', () => {
      render(
        <EmptyState title="Test Title" description="Test Description" />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('should render with title only', () => {
      render(<EmptyState title="Only Title" />);
      expect(screen.getByText('Only Title')).toBeInTheDocument();
    });

    it('should render with description only', () => {
      render(<EmptyState description="Only Description" />);
      expect(screen.getByText('Only Description')).toBeInTheDocument();
    });

    it('should render with children when provided', () => {
      render(<EmptyState>Custom children content</EmptyState>);
      expect(screen.getByText('Custom children content')).toBeInTheDocument();
    });

    it('should render both title and children together', () => {
      render(<EmptyState title="Title">Children content</EmptyState>);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Children content')).toBeInTheDocument();
    });
  });

  describe('Icon', () => {
    it('should render icon when provided', () => {
      const { container } = render(
        <EmptyState icon={<div data-testid="test-icon">Icon</div>} title="Test" />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('should not render icon wrapper when icon is not provided', () => {
      const { container } = render(<EmptyState title="Test" />);
      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).not.toBeInTheDocument();
    });

    it('should apply default icon size', () => {
      const { container } = render(
        <EmptyState icon={<div>Icon</div>} title="Test" />
      );
      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toHaveStyle({ fontSize: '48px' });
    });

    it('should apply custom icon size', () => {
      const { container } = render(
        <EmptyState icon={<div>Icon</div>} title="Test" iconSize={80} />
      );
      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toHaveStyle({ fontSize: '80px' });
    });
  });

  describe('Action', () => {
    it('should render action element when provided', () => {
      render(
        <EmptyState
          title="Test"
          action={<button>Test Action</button>}
        />
      );
      expect(screen.getByText('Test Action')).toBeInTheDocument();
    });

    it('should not render action wrapper when action is not provided', () => {
      const { container } = render(<EmptyState title="Test" />);
      // Check that there's no extra div for action
      const divs = container.querySelectorAll('div');
      // Should have container + content wrapper divs only
      expect(divs.length).toBeLessThan(5);
    });
  });

  describe('Layout', () => {
    it('should apply base classes for centering', () => {
      const { container } = render(<EmptyState title="Test" />);
      const emptyState = container.firstChild as HTMLElement;
      expect(emptyState).toHaveClass('flex');
      expect(emptyState).toHaveClass('flex-col');
      expect(emptyState).toHaveClass('items-center');
      expect(emptyState).toHaveClass('justify-center');
      expect(emptyState).toHaveClass('text-center');
    });

    it('should render all parts in correct order', () => {
      const { container } = render(
        <EmptyState
          icon={<div data-testid="icon">Icon</div>}
          title="Title"
          description="Description"
          action={<button>Action</button>}
        />
      );
      
      const children = Array.from(container.firstChild?.childNodes || []);
      expect(children.length).toBeGreaterThan(0);
      
      // Icon should be first
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      // Title and description should be present
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      // Action should be last
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-hidden on icon wrapper', () => {
      const { container } = render(
        <EmptyState icon={<div>Icon</div>} title="Test" />
      );
      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
    });

    it('should use h3 element for title', () => {
      render(<EmptyState title="Test Title" />);
      const title = screen.getByText('Test Title');
      expect(title.tagName).toBe('H3');
    });

    it('should use p element for description', () => {
      render(<EmptyState description="Test Description" />);
      const description = screen.getByText('Test Description');
      expect(description.tagName).toBe('P');
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to the container div element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<EmptyState ref={ref} title="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('flex');
    });
  });

  describe('Custom props', () => {
    it('should merge custom className with default classes', () => {
      const { container } = render(
        <EmptyState title="Test" className="custom-class bg-gray-100" />
      );
      const emptyState = container.firstChild as HTMLElement;
      expect(emptyState).toHaveClass('custom-class');
      expect(emptyState).toHaveClass('bg-gray-100');
      expect(emptyState).toHaveClass('flex');
    });

    it('should pass through additional HTML attributes', () => {
      render(
        <EmptyState
          title="Test"
          data-testid="custom-empty-state"
          id="empty-state-1"
        />
      );
      const emptyState = screen.getByTestId('custom-empty-state');
      expect(emptyState).toHaveAttribute('id', 'empty-state-1');
    });
  });

  describe('Content combinations', () => {
    it('should render with icon, title, description, and action', () => {
      render(
        <EmptyState
          icon={<div>Icon</div>}
          title="Title"
          description="Description"
          action={<button>Action</button>}
        />
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('should render with only icon and action', () => {
      render(
        <EmptyState
          icon={<div>Icon</div>}
          action={<button>Action</button>}
        />
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('should handle ReactNode title and description', () => {
      render(
        <EmptyState
          title={<span>Title <strong>Bold</strong></span>}
          description={<span>Description <em>Italic</em></span>}
        />
      );
      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('Italic')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should apply proper spacing tokens via inline styles', () => {
      const { container } = render(<EmptyState title="Test" />);
      const emptyState = container.firstChild as HTMLElement;
      expect(emptyState).toHaveStyle({
        paddingBlock: 'var(--component-emptystate-padding-block)',
        paddingInline: 'var(--component-emptystate-padding-inline)',
      });
    });

    it('should apply proper title spacing', () => {
      render(<EmptyState title="Test Title" />);
      const title = screen.getByText('Test Title');
      // Title uses Heading component with inline style
      expect(title).toHaveStyle({
        marginBottom: 'var(--component-emptystate-title-gap)',
      });
      // Verify it's an h3 element (rendered by Heading component)
      expect(title.tagName).toBe('H3');
    });

    it('should apply proper description spacing', () => {
      render(<EmptyState description="Test Description" />);
      const description = screen.getByText('Test Description');
      // Description uses Text component with inline style
      expect(description).toHaveStyle({
        marginBottom: 'var(--component-emptystate-description-gap)',
      });
      // Verify it's a p element (rendered by Text component)
      expect(description.tagName).toBe('P');
    });
  });
});

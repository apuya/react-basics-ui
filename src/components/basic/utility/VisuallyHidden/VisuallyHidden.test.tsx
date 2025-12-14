import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  // ===========================================================================
  // Rendering
  // ===========================================================================

  describe('Rendering', () => {
    it('should render children', () => {
      render(<VisuallyHidden>Hidden text</VisuallyHidden>);
      expect(screen.getByText('Hidden text')).toBeInTheDocument();
    });

    it('should render as span by default', () => {
      render(<VisuallyHidden>Content</VisuallyHidden>);
      const element = screen.getByText('Content');
      expect(element.tagName).toBe('SPAN');
    });

    it('should render as div when specified', () => {
      render(<VisuallyHidden as="div">Content</VisuallyHidden>);
      const element = screen.getByText('Content');
      expect(element.tagName).toBe('DIV');
    });

    it('should render as span when specified', () => {
      render(<VisuallyHidden as="span">Content</VisuallyHidden>);
      const element = screen.getByText('Content');
      expect(element.tagName).toBe('SPAN');
    });

    it('should forward ref', () => {
      const ref = vi.fn();
      render(<VisuallyHidden ref={ref}>Content</VisuallyHidden>);
      expect(ref).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Visually Hidden Styles
  // ===========================================================================

  describe('Visually Hidden Styles', () => {
    it('should have position absolute', () => {
      render(<VisuallyHidden>Content</VisuallyHidden>);
      const element = screen.getByText('Content');
      expect(element).toHaveStyle({ position: 'absolute' });
    });

    it('should have overflow hidden', () => {
      render(<VisuallyHidden>Content</VisuallyHidden>);
      const element = screen.getByText('Content');
      expect(element).toHaveStyle({ overflow: 'hidden' });
    });

    it('should have white-space nowrap', () => {
      render(<VisuallyHidden>Content</VisuallyHidden>);
      const element = screen.getByText('Content');
      expect(element).toHaveStyle({ whiteSpace: 'nowrap' });
    });
  });

  // ===========================================================================
  // Accessibility
  // ===========================================================================

  describe('Accessibility', () => {
    it('should be accessible to screen readers', () => {
      render(<VisuallyHidden>Screen reader text</VisuallyHidden>);
      // Content should be in the document and accessible
      expect(screen.getByText('Screen reader text')).toBeInTheDocument();
    });

    it('should work with icon-only buttons', () => {
      render(
        <button>
          <span aria-hidden="true">🔍</span>
          <VisuallyHidden>Search</VisuallyHidden>
        </button>
      );
      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    it('should work as form label', () => {
      render(
        <>
          <label htmlFor="hidden-label-input">
            <VisuallyHidden>Email address</VisuallyHidden>
          </label>
          <input id="hidden-label-input" type="email" placeholder="Enter email" />
        </>
      );
      expect(screen.getByText('Email address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    });
  });

  // ===========================================================================
  // Complex Content
  // ===========================================================================

  describe('Complex Content', () => {
    it('should render React elements as children', () => {
      render(
        <VisuallyHidden>
          <span data-testid="nested">Nested content</span>
        </VisuallyHidden>
      );
      expect(screen.getByTestId('nested')).toBeInTheDocument();
      expect(screen.getByText('Nested content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <VisuallyHidden>
          <span>First</span>
          <span>Second</span>
        </VisuallyHidden>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });
  });
});

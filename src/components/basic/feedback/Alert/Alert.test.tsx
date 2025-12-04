/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  describe('Rendering', () => {
    it('should render with title and description', () => {
      render(<Alert title="Test Title" description="Test Description" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('should render with children when no description is provided', () => {
      render(<Alert title="Title">Child content</Alert>);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should render children only without title or description', () => {
      render(<Alert>Just children</Alert>);
      expect(screen.getByText('Just children')).toBeInTheDocument();
    });

    it('should render with title only', () => {
      render(<Alert title="Only Title" />);
      expect(screen.getByText('Only Title')).toBeInTheDocument();
    });

    it('should render with description only', () => {
      render(<Alert description="Only Description" />);
      expect(screen.getByText('Only Description')).toBeInTheDocument();
    });

    it('should have role="alert" for accessibility', () => {
      render(<Alert title="Test">Content</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render info variant by default', () => {
      const { container } = render(<Alert title="Info">Content</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass('bg-[color:var(--component-alert-bg-info)]');
      expect(alert).toHaveClass('text-[color:var(--component-alert-text-info)]');
    });

    it('should render success variant correctly', () => {
      const { container } = render(
        <Alert variant="success" title="Success">
          Content
        </Alert>
      );
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass('bg-[color:var(--component-alert-bg-success)]');
      expect(alert).toHaveClass('text-[color:var(--component-alert-text-success)]');
    });

    it('should render warning variant correctly', () => {
      const { container } = render(
        <Alert variant="warning" title="Warning">
          Content
        </Alert>
      );
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass('bg-[color:var(--component-alert-bg-warning)]');
      expect(alert).toHaveClass('text-[color:var(--component-alert-text-warning)]');
    });

    it('should render error variant correctly', () => {
      const { container } = render(
        <Alert variant="error" title="Error">
          Content
        </Alert>
      );
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass('bg-[color:var(--component-alert-bg-error)]');
      expect(alert).toHaveClass('text-[color:var(--component-alert-text-error)]');
    });
  });

  describe('Icon', () => {
    it('should show icon by default', () => {
      const { container } = render(<Alert title="Test">Content</Alert>);
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it('should hide icon when showIcon is false', () => {
      const { container } = render(
        <Alert title="Test" showIcon={false}>
          Content
        </Alert>
      );
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      // Should only have aria-hidden on the icon, not the close button
      expect(icons.length).toBe(0);
    });

    it('should render correct icon for each variant', () => {
      const { container: infoContainer } = render(
        <Alert variant="info" title="Info">
          Content
        </Alert>
      );
      const infoIcon = infoContainer.querySelector('[aria-hidden="true"]');
      expect(infoIcon).toHaveClass('text-[color:var(--component-alert-icon-info)]');

      const { container: successContainer } = render(
        <Alert variant="success" title="Success">
          Content
        </Alert>
      );
      const successIcon = successContainer.querySelector('[aria-hidden="true"]');
      expect(successIcon).toHaveClass(
        'text-[color:var(--component-alert-icon-success)]'
      );
    });
  });

  describe('Dismissible', () => {
    it('should not render close button when onClose is not provided', () => {
      render(<Alert title="Test">Content</Alert>);
      expect(
        screen.queryByRole('button', { name: /close alert/i })
      ).not.toBeInTheDocument();
    });

    it('should render close button when onClose is provided', () => {
      const handleClose = vi.fn();
      render(
        <Alert title="Test" onClose={handleClose}>
          Content
        </Alert>
      );
      expect(
        screen.getByRole('button', { name: /close alert/i })
      ).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const handleClose = vi.fn();
      render(
        <Alert title="Test" onClose={handleClose}>
          Content
        </Alert>
      );
      const closeButton = screen.getByRole('button', { name: /close alert/i });
      closeButton.click();
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-hidden on icon element', () => {
      const { container } = render(<Alert title="Test">Content</Alert>);
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it('should have aria-label on close button', () => {
      const handleClose = vi.fn();
      render(
        <Alert title="Test" onClose={handleClose}>
          Content
        </Alert>
      );
      const closeButton = screen.getByRole('button', { name: /close alert/i });
      expect(closeButton).toHaveAttribute('aria-label', 'Close alert');
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to the alert div element', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Alert ref={ref} title="Test">
          Content
        </Alert>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'alert');
    });
  });

  describe('Custom props', () => {
    it('should merge custom className with default classes', () => {
      const { container } = render(
        <Alert title="Test" className="custom-class">
          Content
        </Alert>
      );
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass('custom-class');
      expect(alert).toHaveClass('flex');
    });

    it('should pass through additional HTML attributes', () => {
      render(
        <Alert title="Test" data-testid="custom-alert" id="alert-1">
          Content
        </Alert>
      );
      const alert = screen.getByTestId('custom-alert');
      expect(alert).toHaveAttribute('id', 'alert-1');
    });
  });

  describe('Layout', () => {
    it('should prefer description over children when both are provided', () => {
      render(
        <Alert title="Title" description="Description">
          Children content
        </Alert>
      );
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.queryByText('Children content')).not.toBeInTheDocument();
    });

    it('should render children when description is not provided', () => {
      render(<Alert title="Title">Children content</Alert>);
      expect(screen.getByText('Children content')).toBeInTheDocument();
    });
  });

  describe('Data attributes', () => {
    it('should apply data-variant attribute', () => {
      render(<Alert variant="success" title="Success" data-testid="alert" />);
      expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', 'success');
    });

    it('should apply info variant by default', () => {
      render(<Alert title="Info" data-testid="alert" />);
      expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', 'info');
    });
  });
});

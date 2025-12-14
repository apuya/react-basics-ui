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

  describe('Leading Icon', () => {
    it('should show default variant icon by default', () => {
      const { container } = render(<Alert title="Test">Content</Alert>);
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should hide icon when leadingIcon is null', () => {
      const { container } = render(
        <Alert title="Test" leadingIcon={null}>
          Content
        </Alert>
      );
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBe(0);
    });

    it('should render custom leading icon when provided', () => {
      render(
        <Alert title="Test" leadingIcon={<span data-testid="custom-icon">⚠️</span>}>
          Content
        </Alert>
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render correct default icon for each variant', () => {
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

  describe('Trailing Icon', () => {
    it('should not render trailing icon by default', () => {
      const { container } = render(<Alert title="Test">Content</Alert>);
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      // Only leading icon, no trailing icon
      expect(icons.length).toBe(1);
    });

    it('should render trailing icon when provided', () => {
      const { container } = render(
        <Alert title="Test" trailingIcon={<span data-testid="trailing-icon">→</span>}>
          Content
        </Alert>
      );
      expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      // Both leading and trailing icons
      expect(icons.length).toBe(2);
    });

    it('should render both leading and trailing icons', () => {
      const { container } = render(
        <Alert 
          title="Test" 
          leadingIcon={<span data-testid="leading">←</span>}
          trailingIcon={<span data-testid="trailing">→</span>}
        >
          Content
        </Alert>
      );
      expect(screen.getByTestId('leading')).toBeInTheDocument();
      expect(screen.getByTestId('trailing')).toBeInTheDocument();
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBe(2);
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

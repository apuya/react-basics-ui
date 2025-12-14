import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

// Mock Portal to render inline for testing
vi.mock('@/components/basic/utility/Portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================================================
  // RENDERING
  // ==========================================================================
  describe('Rendering', () => {
    it('renders when isOpen is true', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Content>Modal content</Modal.Content>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(
        <Modal {...defaultProps} isOpen={false}>
          <Modal.Content>Modal content</Modal.Content>
        </Modal>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders with compound components', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Header>
            <Modal.Title>Test Title</Modal.Title>
          </Modal.Header>
          <Modal.Content>Test Content</Modal.Content>
          <Modal.Footer>Footer content</Modal.Footer>
        </Modal>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });
  });

  // ==========================================================================
  // SIZE VARIANTS
  // ==========================================================================
  describe('Size Variants', () => {
    it.each(['sm', 'md', 'lg', 'xl', 'full'] as const)(
      'renders with size="%s"',
      (size) => {
        render(
          <Modal {...defaultProps} size={size}>
            <Modal.Content>Content</Modal.Content>
          </Modal>
        );

        expect(screen.getByRole('dialog')).toHaveAttribute('data-size', size);
      }
    );

    it('defaults to size="md"', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'md');
    });
  });

  // ==========================================================================
  // CLOSE BUTTON
  // ==========================================================================
  describe('Close Button', () => {
    it('renders close button by default', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} onClose={onClose}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      await userEvent.click(screen.getByRole('button', { name: /close/i }));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('hides close button when showCloseButton is false', () => {
      render(
        <Modal {...defaultProps} showCloseButton={false}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });
  });

  // ==========================================================================
  // OVERLAY CLICK
  // ==========================================================================
  describe('Overlay Click', () => {
    it('calls onClose when overlay is clicked by default', () => {
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} onClose={onClose}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      // The overlay has a data attribute for testing
      const overlay = document.querySelector('[data-modal-overlay]');
      fireEvent.click(overlay!);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when overlay click is disabled', () => {
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      const overlay = document.querySelector('[data-modal-overlay]');
      fireEvent.click(overlay!);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call onClose when clicking inside dialog', () => {
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} onClose={onClose}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      fireEvent.click(screen.getByText('Content'));

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // ESCAPE KEY
  // ==========================================================================
  describe('Escape Key', () => {
    it('calls onClose when Escape is pressed by default', async () => {
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} onClose={onClose}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      await userEvent.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when Escape is disabled', async () => {
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} onClose={onClose} closeOnEscape={false}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      await userEvent.keyboard('{Escape}');

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // ACCESSIBILITY
  // ==========================================================================
  describe('Accessibility', () => {
    it('has role="dialog"', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal="true"', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('has aria-labelledby pointing to title', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('close button has accessible label', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      expect(screen.getByRole('button', { name: 'Close modal' })).toBeInTheDocument();
    });
  });

  // ==========================================================================
  // COMPOUND COMPONENTS
  // ==========================================================================
  describe('Compound Components', () => {
    it('Modal.Header renders correctly', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Header data-testid="header">Header content</Modal.Header>
        </Modal>
      );

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('Modal.Content renders correctly', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Content data-testid="content">Main content</Modal.Content>
        </Modal>
      );

      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByText('Main content')).toBeInTheDocument();
    });

    it('Modal.Footer renders correctly', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Footer data-testid="footer">Footer content</Modal.Footer>
        </Modal>
      );

      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('Modal.Title renders as h2', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Header>
            <Modal.Title>Test Title</Modal.Title>
          </Modal.Header>
        </Modal>
      );

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
    });
  });

  // ==========================================================================
  // REF FORWARDING
  // ==========================================================================
  describe('Ref Forwarding', () => {
    it('forwards ref to Modal.Header', () => {
      const ref = vi.fn();
      render(
        <Modal {...defaultProps}>
          <Modal.Header ref={ref}>Header</Modal.Header>
        </Modal>
      );

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('forwards ref to Modal.Content', () => {
      const ref = vi.fn();
      render(
        <Modal {...defaultProps}>
          <Modal.Content ref={ref}>Content</Modal.Content>
        </Modal>
      );

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('forwards ref to Modal.Footer', () => {
      const ref = vi.fn();
      render(
        <Modal {...defaultProps}>
          <Modal.Footer ref={ref}>Footer</Modal.Footer>
        </Modal>
      );

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  // ==========================================================================
  // PROP PASSTHROUGH
  // ==========================================================================
  describe('Prop Passthrough', () => {
    it('passes className to sub-components', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Header className="custom-header" data-testid="header">Header</Modal.Header>
          <Modal.Content className="custom-content" data-testid="content">Content</Modal.Content>
          <Modal.Footer className="custom-footer" data-testid="footer">Footer</Modal.Footer>
        </Modal>
      );

      expect(screen.getByTestId('header')).toHaveClass('custom-header');
      expect(screen.getByTestId('content')).toHaveClass('custom-content');
      expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
    });

    it('passes style to sub-components', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Content data-testid="content" style={{ color: 'red' }}>
            Content
          </Modal.Content>
        </Modal>
      );

      // Style gets merged with internal styles (gap, margin, padding)
      const content = screen.getByTestId('content');
      expect(content.style.color).toBe('red');
    });
  });

  // ==========================================================================
  // ANIMATION STATES
  // ==========================================================================
  describe('Animation States', () => {
    it('unmounts after close animation', async () => {
      const { rerender } = render(
        <Modal {...defaultProps} isOpen={true}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      rerender(
        <Modal {...defaultProps} isOpen={false}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      );

      // Wait for animation timeout (200ms)
      await waitFor(
        () => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        },
        { timeout: 500 }
      );
    });
  });
});

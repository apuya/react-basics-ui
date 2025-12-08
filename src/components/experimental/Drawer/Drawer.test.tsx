import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  describe('Rendering', () => {
    it('renders when isOpen is true', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Body>
            <p>Drawer content</p>
          </Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Drawer content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(
        <Drawer isOpen={false} onClose={() => {}}>
          <Drawer.Body>
            <p>Drawer content</p>
          </Drawer.Body>
        </Drawer>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Header>
            <Drawer.Title>Title</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <p>Content paragraph</p>
          </Drawer.Body>
          <Drawer.Footer>
            <button>Action</button>
          </Drawer.Footer>
        </Drawer>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content paragraph')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  describe('Compound Components', () => {
    it('renders Drawer.Header with proper styling', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Header data-testid="header">Header Content</Drawer.Header>
        </Drawer>
      );

      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveStyle({ paddingBlock: 'var(--component-drawer-header-padding-block)' });
    });

    it('renders Drawer.Body with proper styling', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Body data-testid="body">Body Content</Drawer.Body>
        </Drawer>
      );

      const body = screen.getByTestId('body');
      expect(body).toBeInTheDocument();
      expect(body).toHaveStyle({ paddingBlock: 'var(--component-drawer-body-padding-block)' });
    });

    it('renders Drawer.Footer with proper styling', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Footer data-testid="footer">Footer Content</Drawer.Footer>
        </Drawer>
      );

      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveStyle({ paddingBlock: 'var(--component-drawer-footer-padding-block)' });
    });

    it('renders Drawer.Title with proper styling', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Header>
            <Drawer.Title data-testid="title">My Title</Drawer.Title>
          </Drawer.Header>
        </Drawer>
      );

      const title = screen.getByTestId('title');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H2');
      expect(title).toHaveClass('text-lg', 'font-semibold');
    });
  });

  describe('Placement Variants', () => {
    it.each(['left', 'right', 'top', 'bottom'] as const)(
      'renders with placement=%s',
      (placement) => {
        render(
          <Drawer isOpen={true} onClose={() => {}} placement={placement}>
            <Drawer.Body>Content</Drawer.Body>
          </Drawer>
        );

        expect(screen.getByRole('dialog')).toHaveAttribute('data-placement', placement);
      }
    );
  });

  describe('Size Variants', () => {
    it.each(['sm', 'md', 'lg', 'full'] as const)('renders with size=%s', (size) => {
      render(
        <Drawer isOpen={true} onClose={() => {}} size={size}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('data-size', size);
    });
  });

  describe('Close Button', () => {
    it('shows close button by default', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('button', { name: 'Close drawer' })).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} showCloseButton={false}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.queryByRole('button', { name: 'Close drawer' })).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const onClose = vi.fn();
      render(
        <Drawer isOpen={true} onClose={onClose}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      await userEvent.click(screen.getByRole('button', { name: 'Close drawer' }));

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Overlay Click', () => {
    it('calls onClose when overlay is clicked by default', async () => {
      const onClose = vi.fn();
      render(
        <Drawer isOpen={true} onClose={onClose}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      // The overlay is the element with aria-hidden="true"
      const overlay = document.querySelector('[aria-hidden="true"]');
      expect(overlay).toBeInTheDocument();

      fireEvent.click(overlay!);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when closeOnOverlayClick is false', async () => {
      const onClose = vi.fn();
      render(
        <Drawer isOpen={true} onClose={onClose} closeOnOverlayClick={false}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      const overlay = document.querySelector('[aria-hidden="true"]');
      fireEvent.click(overlay!);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call onClose when clicking inside the drawer', async () => {
      const onClose = vi.fn();
      render(
        <Drawer isOpen={true} onClose={onClose}>
          <Drawer.Body>
            <button>Inside button</button>
          </Drawer.Body>
        </Drawer>
      );

      await userEvent.click(screen.getByRole('button', { name: 'Inside button' }));

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Escape Key', () => {
    it('calls onClose when Escape is pressed by default', async () => {
      const onClose = vi.fn();
      render(
        <Drawer isOpen={true} onClose={onClose}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      await userEvent.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when closeOnEscape is false', async () => {
      const onClose = vi.fn();
      render(
        <Drawer isOpen={true} onClose={onClose} closeOnEscape={false}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      await userEvent.keyboard('{Escape}');

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has role="dialog"', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal="true"', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('close button has aria-label', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('button', { name: 'Close drawer' })).toBeInTheDocument();
    });
  });

  describe('Data Attributes', () => {
    it('has data-open attribute when open', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('data-open');
    });

    it('has correct data-placement attribute', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} placement="left">
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('data-placement', 'left');
    });

    it('has correct data-size attribute', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} size="lg">
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the drawer element', () => {
      const ref = vi.fn();
      render(
        <Drawer isOpen={true} onClose={() => {}} ref={ref}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Drawer.Header', () => {
      const ref = vi.fn();
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Header ref={ref}>Header</Drawer.Header>
        </Drawer>
      );

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Drawer.Body', () => {
      const ref = vi.fn();
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Body ref={ref}>Body</Drawer.Body>
        </Drawer>
      );

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Drawer.Footer', () => {
      const ref = vi.fn();
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Footer ref={ref}>Footer</Drawer.Footer>
        </Drawer>
      );

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Drawer.Title', () => {
      const ref = vi.fn();
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Title ref={ref}>Title</Drawer.Title>
        </Drawer>
      );

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('Custom className', () => {
    it('applies custom className to drawer', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} className="custom-drawer-class">
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toHaveClass('custom-drawer-class');
    });

    it('applies custom className to Drawer.Header', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Header className="custom-header" data-testid="header">Header</Drawer.Header>
        </Drawer>
      );

      expect(screen.getByTestId('header')).toHaveClass('custom-header');
    });

    it('applies custom className to Drawer.Body', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Body className="custom-body" data-testid="body">Body</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByTestId('body')).toHaveClass('custom-body');
    });

    it('applies custom className to Drawer.Footer', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Footer className="custom-footer" data-testid="footer">Footer</Drawer.Footer>
        </Drawer>
      );

      expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
    });
  });

  describe('Animation', () => {
    it('unmounts after close animation', async () => {
      const { rerender } = render(
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      rerender(
        <Drawer isOpen={false} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      // Dialog should still be visible briefly during animation
      await waitFor(
        () => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        },
        { timeout: 300 }
      );
    });
  });
});

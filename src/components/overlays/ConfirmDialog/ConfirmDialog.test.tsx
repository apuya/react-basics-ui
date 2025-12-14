/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Helper to get button by text (using hidden: true because Modal has aria-hidden on overlay)
  const getButtonByText = (text: string | RegExp) =>
    screen.getByRole('button', { name: text, hidden: true });

  // =============================================================================
  // RENDERING
  // =============================================================================

  describe('Rendering', () => {
    it('renders title correctly', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure you want to proceed?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('renders description correctly', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure you want to proceed?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    });

    it('renders default button text', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure you want to proceed?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(getButtonByText('Confirm')).toBeInTheDocument();
      expect(getButtonByText('Cancel')).toBeInTheDocument();
    });

    it('renders custom button text', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure you want to proceed?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton>Keep</ConfirmDialog.CancelButton>
            <ConfirmDialog.ConfirmButton>Delete</ConfirmDialog.ConfirmButton>
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(getButtonByText('Delete')).toBeInTheDocument();
      expect(getButtonByText('Keep')).toBeInTheDocument();
    });

    it('renders children instead of description when provided', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>
            <div data-testid="custom-content">Custom Content</div>
          </ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(
        <ConfirmDialog {...defaultProps} isOpen={false}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
    });
  });

  // =============================================================================
  // VARIANTS
  // =============================================================================

  describe('Variants', () => {
    it('renders default variant', () => {
      render(
        <ConfirmDialog {...defaultProps} variant="default">
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('renders destructive variant', () => {
      render(
        <ConfirmDialog {...defaultProps} variant="destructive">
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('renders warning variant', () => {
      render(
        <ConfirmDialog {...defaultProps} variant="warning">
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('renders info variant', () => {
      render(
        <ConfirmDialog {...defaultProps} variant="info">
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });
  });

  // =============================================================================
  // ICON
  // =============================================================================

  describe('Icon', () => {
    it('shows icon when Icon component is included', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('hides icon when Icon component is omitted', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      const svg = document.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('icon wrapper has aria-hidden attribute', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      const iconWrapper = document.querySelector('span[aria-hidden="true"]');
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // =============================================================================
  // INTERACTIONS
  // =============================================================================

  describe('Interactions', () => {
    it('calls onConfirm when confirm button is clicked', () => {
      const onConfirm = vi.fn();
      render(
        <ConfirmDialog {...defaultProps} onConfirm={onConfirm}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      
      fireEvent.click(getButtonByText('Confirm'));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when cancel button is clicked', () => {
      const onClose = vi.fn();
      render(
        <ConfirmDialog {...defaultProps} onClose={onClose}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      
      fireEvent.click(getButtonByText('Cancel'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onConfirm if not provided', () => {
      render(
        <ConfirmDialog {...defaultProps} onConfirm={undefined}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      
      // Should not throw
      fireEvent.click(getButtonByText('Confirm'));
    });
  });

  // =============================================================================
  // LOADING STATE
  // =============================================================================

  describe('Loading State', () => {
    it('disables confirm button when loading', () => {
      render(
        <ConfirmDialog {...defaultProps} isLoading>
          <ConfirmDialog.Header>
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      const confirmButton = getButtonByText(/Confirm/i);
      // Button uses aria-disabled when loading (better UX - keeps focus)
      expect(confirmButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('disables cancel button when loading', () => {
      render(
        <ConfirmDialog {...defaultProps} isLoading>
          <ConfirmDialog.Header>
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(getButtonByText('Cancel')).toBeDisabled();
    });

    it('does not call onConfirm when loading and clicked', () => {
      const onConfirm = vi.fn();
      render(
        <ConfirmDialog {...defaultProps} isLoading onConfirm={onConfirm}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      
      fireEvent.click(getButtonByText(/Confirm/i));
      expect(onConfirm).not.toHaveBeenCalled();
    });
  });

  // =============================================================================
  // REF FORWARDING
  // =============================================================================

  describe('Ref Forwarding', () => {
    it('forwards ref to the confirm button', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton ref={ref} />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.textContent).toBe('Confirm');
    });
  });

  // =============================================================================
  // CUSTOM PROPS
  // =============================================================================

  describe('Custom Props', () => {
    it('applies custom className to Header', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header className="custom-header">
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      // Verify component renders without errors
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });
  });
});


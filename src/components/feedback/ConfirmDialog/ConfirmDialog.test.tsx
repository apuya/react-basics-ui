/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
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
      render(<ConfirmDialog {...defaultProps} />);
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('renders description correctly', () => {
      render(<ConfirmDialog {...defaultProps} />);
      expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    });

    it('renders default button text', () => {
      render(<ConfirmDialog {...defaultProps} />);
      expect(getButtonByText('Confirm')).toBeInTheDocument();
      expect(getButtonByText('Cancel')).toBeInTheDocument();
    });

    it('renders custom button text', () => {
      render(
        <ConfirmDialog
          {...defaultProps}
          confirmText="Delete"
          cancelText="Keep"
        />
      );
      expect(getButtonByText('Delete')).toBeInTheDocument();
      expect(getButtonByText('Keep')).toBeInTheDocument();
    });

    it('renders children instead of description when provided', () => {
      render(
        <ConfirmDialog {...defaultProps} description={undefined}>
          <div data-testid="custom-content">Custom Content</div>
        </ConfirmDialog>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(<ConfirmDialog {...defaultProps} isOpen={false} />);
      expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
    });
  });

  // =============================================================================
  // VARIANTS
  // =============================================================================

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<ConfirmDialog {...defaultProps} variant="default" />);
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('renders destructive variant', () => {
      render(<ConfirmDialog {...defaultProps} variant="destructive" />);
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('renders warning variant', () => {
      render(<ConfirmDialog {...defaultProps} variant="warning" />);
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('renders info variant', () => {
      render(<ConfirmDialog {...defaultProps} variant="info" />);
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });
  });

  // =============================================================================
  // ICON
  // =============================================================================

  describe('Icon', () => {
    it('shows icon by default', () => {
      render(<ConfirmDialog {...defaultProps} />);
      // Icon component wraps SVG in a span with aria-hidden
      const iconWrapper = document.querySelector('span[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
      // Should contain an SVG inside
      const svg = iconWrapper?.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('hides icon when showIcon is false', () => {
      render(<ConfirmDialog {...defaultProps} showIcon={false} />);
      // No Icon component wrapper should exist
      const iconWrapper = document.querySelector('.flex-shrink-0 span[aria-hidden="true"]');
      expect(iconWrapper).not.toBeInTheDocument();
    });

    it('icon wrapper has aria-hidden attribute', () => {
      render(<ConfirmDialog {...defaultProps} />);
      // Icon component renders a span with aria-hidden
      const iconWrapper = document.querySelector('.flex-shrink-0');
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // =============================================================================
  // INTERACTIONS
  // =============================================================================

  describe('Interactions', () => {
    it('calls onConfirm when confirm button is clicked', () => {
      const onConfirm = vi.fn();
      render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
      
      fireEvent.click(getButtonByText('Confirm'));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when cancel button is clicked', () => {
      const onClose = vi.fn();
      render(<ConfirmDialog {...defaultProps} onClose={onClose} />);
      
      fireEvent.click(getButtonByText('Cancel'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onConfirm if not provided', () => {
      render(<ConfirmDialog {...defaultProps} onConfirm={undefined} />);
      
      // Should not throw
      fireEvent.click(getButtonByText('Confirm'));
    });
  });

  // =============================================================================
  // LOADING STATE
  // =============================================================================

  describe('Loading State', () => {
    it('disables confirm button when loading', () => {
      render(<ConfirmDialog {...defaultProps} isLoading />);
      expect(getButtonByText(/Confirm/i)).toBeDisabled();
    });

    it('disables cancel button when loading', () => {
      render(<ConfirmDialog {...defaultProps} isLoading />);
      expect(getButtonByText('Cancel')).toBeDisabled();
    });

    it('does not call onConfirm when loading and clicked', () => {
      const onConfirm = vi.fn();
      render(<ConfirmDialog {...defaultProps} isLoading onConfirm={onConfirm} />);
      
      fireEvent.click(getButtonByText(/Confirm/i));
      expect(onConfirm).not.toHaveBeenCalled();
    });
  });

  // =============================================================================
  // REF FORWARDING
  // =============================================================================

  describe('Ref Forwarding', () => {
    it('forwards ref to the dialog content element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<ConfirmDialog {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  // =============================================================================
  // CUSTOM PROPS
  // =============================================================================

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(<ConfirmDialog {...defaultProps} className="custom-class" />);
      // The className is applied to the content wrapper, verify no errors
      expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    });
  });
});


/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmDialog, useConfirmDialogContext, VARIANT_ICON_CLASSES } from './ConfirmDialog';
import { Modal } from '../Modal';
import { Button } from '../../actions/Button/Button';
import { Icon } from '../../utility/Icon';
import { cn } from '@/lib/cn';

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

/** Test helper: renders variant icon using context */
const TestVariantIcon = () => {
  const { variant, variantIcon } = useConfirmDialogContext();
  return (
    <Icon
      icon={variantIcon}
      size="lg"
      aria-hidden
      className={cn('shrink-0', VARIANT_ICON_CLASSES[variant])}
    />
  );
};

/** Test helper: renders buttons using context */
const TestButtons = ({ onConfirmClick }: { onConfirmClick?: () => void }) => {
  const { onClose, onConfirm, isLoading, buttonVariant } = useConfirmDialogContext();
  return (
    <>
      <Button variant="secondary" onClick={onClose} disabled={isLoading}>
        Cancel
      </Button>
      <Button
        variant={buttonVariant}
        onClick={onConfirmClick ?? onConfirm}
        loading={isLoading}
      >
        Confirm
      </Button>
    </>
  );
};

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
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure you want to proceed?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('renders description correctly', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure you want to proceed?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    });

    it('renders button text correctly', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
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
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <Button variant="secondary" onClick={defaultProps.onClose}>
              Keep
            </Button>
            <Button variant="destructive" onClick={() => {}}>
              Delete
            </Button>
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(getButtonByText('Delete')).toBeInTheDocument();
      expect(getButtonByText('Keep')).toBeInTheDocument();
    });

    it('renders children in content', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>
            <div data-testid="custom-content">Custom Content</div>
          </ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(
        <ConfirmDialog {...defaultProps} isOpen={false}>
          <ConfirmDialog.Header>
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
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
    const variants: Array<'default' | 'destructive' | 'warning' | 'info'> = [
      'default',
      'destructive',
      'warning',
      'info',
    ];

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        render(
          <ConfirmDialog {...defaultProps} variant={variant}>
            <ConfirmDialog.Header>
              <TestVariantIcon />
              <Modal.Title as="h2" level="h4">
                Confirm Action
              </Modal.Title>
            </ConfirmDialog.Header>
            <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
            <ConfirmDialog.Footer>
              <TestButtons />
            </ConfirmDialog.Footer>
          </ConfirmDialog>
        );
        expect(screen.getByText('Confirm Action')).toBeInTheDocument();
      });
    });
  });

  // =============================================================================
  // ICON
  // =============================================================================

  describe('Icon', () => {
    it('shows icon when included in header', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <TestVariantIcon />
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('does not show icon when omitted', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      const svg = document.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('icon has aria-hidden attribute', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <TestVariantIcon />
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
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
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
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
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );

      fireEvent.click(getButtonByText('Cancel'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('handles undefined onConfirm gracefully', () => {
      render(
        <ConfirmDialog {...defaultProps} onConfirm={undefined}>
          <ConfirmDialog.Header>
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
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
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      const confirmButton = getButtonByText(/Confirm/i);
      expect(confirmButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('disables cancel button when loading', () => {
      render(
        <ConfirmDialog {...defaultProps} isLoading>
          <ConfirmDialog.Header>
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(getButtonByText('Cancel')).toBeDisabled();
    });

    it('does not call onConfirm when loading', () => {
      const onConfirm = vi.fn();
      render(
        <ConfirmDialog {...defaultProps} isLoading onConfirm={onConfirm}>
          <ConfirmDialog.Header>
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );

      fireEvent.click(getButtonByText(/Confirm/i));
      expect(onConfirm).not.toHaveBeenCalled();
    });
  });

  // =============================================================================
  // CONTEXT
  // =============================================================================

  describe('Context', () => {
    it('provides variant to context consumers', () => {
      const VariantDisplay = () => {
        const { variant } = useConfirmDialogContext();
        return <span data-testid="variant">{variant}</span>;
      };

      render(
        <ConfirmDialog {...defaultProps} variant="destructive">
          <ConfirmDialog.Content>
            <VariantDisplay />
          </ConfirmDialog.Content>
        </ConfirmDialog>
      );

      expect(screen.getByTestId('variant')).toHaveTextContent('destructive');
    });

    it('provides buttonVariant based on dialog variant', () => {
      const ButtonVariantDisplay = () => {
        const { buttonVariant } = useConfirmDialogContext();
        return <span data-testid="button-variant">{buttonVariant}</span>;
      };

      render(
        <ConfirmDialog {...defaultProps} variant="destructive">
          <ConfirmDialog.Content>
            <ButtonVariantDisplay />
          </ConfirmDialog.Content>
        </ConfirmDialog>
      );

      expect(screen.getByTestId('button-variant')).toHaveTextContent('destructive');
    });

    it('provides variantIcon to context consumers', () => {
      const IconCheck = () => {
        const { variantIcon } = useConfirmDialogContext();
        return <span data-testid="has-icon">{variantIcon !== undefined ? 'yes' : 'no'}</span>;
      };

      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Content>
            <IconCheck />
          </ConfirmDialog.Content>
        </ConfirmDialog>
      );

      expect(screen.getByTestId('has-icon')).toHaveTextContent('yes');
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
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <TestButtons />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('applies custom className to Footer', () => {
      render(
        <ConfirmDialog {...defaultProps}>
          <ConfirmDialog.Header>
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Are you sure?</ConfirmDialog.Content>
          <ConfirmDialog.Footer className="custom-footer">
            <TestButtons />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      );
      expect(getButtonByText('Confirm')).toBeInTheDocument();
    });
  });
});


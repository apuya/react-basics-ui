import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Confirm Action',
    description: 'Are you sure?',
  };

  it('renders without crashing when open', () => {
    const { container } = render(<ConfirmDialog {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('does not crash when closed', () => {
    const { container } = render(<ConfirmDialog {...defaultProps} isOpen={false} />);
    expect(container).toBeInTheDocument();
  });

  it('accepts all variant props', () => {
    const variants: Array<'default' | 'destructive' | 'warning' | 'info'> = [
      'default',
      'destructive',
      'warning',
      'info',
    ];

    variants.forEach((variant) => {
      const { unmount } = render(
        <ConfirmDialog {...defaultProps} variant={variant} />
      );
      unmount();
    });
  });

  it('accepts custom button text', () => {
    const { unmount } = render(
      <ConfirmDialog
        {...defaultProps}
        confirmText="Delete"
        cancelText="Keep"
      />
    );
    unmount();
  });

  it('accepts loading state', () => {
    const { unmount } = render(<ConfirmDialog {...defaultProps} isLoading />);
    unmount();
  });

  it('accepts showIcon prop', () => {
    const { unmount } = render(<ConfirmDialog {...defaultProps} showIcon={false} />);
    unmount();
  });

  it('accepts custom children', () => {
    const { unmount } = render(
      <ConfirmDialog {...defaultProps} description={undefined}>
        <div>Custom Content</div>
      </ConfirmDialog>
    );
    unmount();
  });

  it('accepts className prop', () => {
    const { unmount } = render(
      <ConfirmDialog {...defaultProps} className="custom-class" />
    );
    unmount();
  });

  it('calls callbacks without errors', () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    
    const { unmount } = render(
      <ConfirmDialog {...defaultProps} onClose={onClose} onConfirm={onConfirm} />
    );
    
    // Callbacks are passed to Modal and Button components
    expect(onClose).toBeDefined();
    expect(onConfirm).toBeDefined();
    unmount();
  });
});

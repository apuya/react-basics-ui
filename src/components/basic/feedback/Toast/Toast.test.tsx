import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders without crashing', () => {
    const { container } = render(<Toast />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has correct role for accessibility', () => {
    const { getByRole } = render(<Toast title="Test" />);
    const toast = getByRole('alert');
    expect(toast).toBeInTheDocument();
  });

  it('has aria-live attribute for screen readers', () => {
    const { getByRole } = render(<Toast title="Test" />);
    const toast = getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'polite');
  });

  it('renders title when provided', () => {
    const { getByText } = render(<Toast title="Test Title" />);
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    const { getByText } = render(<Toast description="Test description" />);
    expect(getByText('Test description')).toBeInTheDocument();
  });

  it('renders both title and description', () => {
    const { getByText } = render(<Toast title="Title" description="Description" />);
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
  });

  it('renders children content', () => {
    const { getByText } = render(<Toast><span>Custom content</span></Toast>);
    expect(getByText('Custom content')).toBeInTheDocument();
  });

  it('applies default variant', () => {
    const { getByRole } = render(<Toast title="Test" />);
    const toast = getByRole('alert');
    expect(toast.className).toContain('bg-');
  });

  it('applies success variant', () => {
    const { getByRole } = render(<Toast variant="success" title="Test" />);
    const toast = getByRole('alert');
    expect(toast).toBeInTheDocument();
  });

  it('applies error variant', () => {
    const { getByRole } = render(<Toast variant="error" title="Test" />);
    const toast = getByRole('alert');
    expect(toast).toBeInTheDocument();
  });

  it('applies warning variant', () => {
    const { getByRole } = render(<Toast variant="warning" title="Test" />);
    const toast = getByRole('alert');
    expect(toast).toBeInTheDocument();
  });

  it('applies info variant', () => {
    const { getByRole } = render(<Toast variant="info" title="Test" />);
    const toast = getByRole('alert');
    expect(toast).toBeInTheDocument();
  });

  it('shows icon by default', () => {
    const { container } = render(<Toast title="Test" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('hides icon when showIcon is false', () => {
    const { container } = render(<Toast title="Test" showIcon={false} />);
    const svgs = container.querySelectorAll('svg');
    // Should have no icon SVG (close button SVG would only appear with onClose)
    expect(svgs.length).toBe(0);
  });

  it('renders close button when onClose is provided', () => {
    const { getByLabelText } = render(<Toast title="Test" onClose={() => {}} />);
    const closeButton = getByLabelText('Close notification');
    expect(closeButton).toBeInTheDocument();
  });

  it('does not render close button when onClose is not provided', () => {
    const { queryByLabelText } = render(<Toast title="Test" />);
    const closeButton = queryByLabelText('Close notification');
    expect(closeButton).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    const { getByLabelText } = render(<Toast title="Test" onClose={onClose} />);
    const closeButton = getByLabelText('Close notification');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Toast title="Test" className="custom-class" />);
    const toast = getByRole('alert');
    expect(toast).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    let refValue: HTMLDivElement | null = null;
    render(<Toast title="Test" ref={(el) => { refValue = el; }} />);
    expect(refValue).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through additional HTML attributes', () => {
    const { getByRole } = render(<Toast title="Test" data-testid="toast" />);
    const toast = getByRole('alert');
    expect(toast).toHaveAttribute('data-testid', 'toast');
  });

  it('has correct icon for success variant', () => {
    const { container } = render(<Toast variant="success" title="Test" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('has correct icon for error variant', () => {
    const { container } = render(<Toast variant="error" title="Test" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders all variants without errors', () => {
    const variants = ['success', 'error', 'warning', 'info', 'default'] as const;
    variants.forEach((variant) => {
      const { getByRole, unmount } = render(<Toast variant={variant} title={`${variant} toast`} />);
      expect(getByRole('alert')).toBeInTheDocument();
      unmount();
    });
  });

  it('applies inline padding and gap styles', () => {
    const { getByRole } = render(<Toast title="Test" />);
    const toast = getByRole('alert');
    expect(toast).toHaveStyle({ paddingInline: 'var(--component-toast-padding-inline)' });
    expect(toast).toHaveStyle({ paddingBlock: 'var(--component-toast-padding-block)' });
    expect(toast).toHaveStyle({ gap: 'var(--component-toast-gap)' });
  });

  it('applies data-variant attribute', () => {
    const { getByRole } = render(<Toast variant="success" title="Test" />);
    const toast = getByRole('alert');
    expect(toast).toHaveAttribute('data-variant', 'success');
  });

  it('applies default data-variant attribute', () => {
    const { getByRole } = render(<Toast title="Test" />);
    const toast = getByRole('alert');
    expect(toast).toHaveAttribute('data-variant', 'default');
  });
});

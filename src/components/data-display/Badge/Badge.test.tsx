import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { Badge } from './Badge';

describe('Badge', () => {
  // =============================================================================
  // RENDERING BASICS
  // =============================================================================
  
  it('renders with children', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class" data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Badge</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('passes through additional props', () => {
    render(<Badge data-testid="custom-badge">Badge</Badge>);
    expect(screen.getByTestId('custom-badge')).toBeInTheDocument();
  });

  // =============================================================================
  // STYLE VARIANTS
  // =============================================================================
  
  it('applies subtle style variant by default', () => {
    render(<Badge data-testid="badge">Subtle</Badge>);
    const badge = screen.getByTestId('badge');
    // Subtle doesn't add extra classes, just the color styles
    expect(badge).toBeInTheDocument();
  });

  it('applies solid style variant', () => {
    render(<Badge styleVariant="solid" data-testid="badge">Solid</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
  });

  it('applies outline style variant', () => {
    render(<Badge styleVariant="outline" data-testid="badge">Outline</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('border');
    expect(badge).toHaveClass('bg-transparent');
  });

  it('applies subtle-outline style variant', () => {
    render(<Badge styleVariant="subtle-outline" data-testid="badge">Subtle Outline</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('border');
    expect(badge).toHaveClass('bg-transparent');
  });

  // =============================================================================
  // COLORS
  // =============================================================================
  
  it('uses neutral color by default', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('applies primary color', () => {
    render(<Badge color="primary">Primary</Badge>);
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  it('applies success color', () => {
    render(<Badge color="success">Success</Badge>);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('supports legacy variant prop for backwards compatibility', () => {
    render(<Badge variant="error">Legacy</Badge>);
    expect(screen.getByText('Legacy')).toBeInTheDocument();
  });

  it('color prop takes precedence over variant prop', () => {
    render(<Badge variant="error" color="success">Mixed</Badge>);
    // Should use success (color) not error (variant)
    expect(screen.getByText('Mixed')).toBeInTheDocument();
  });

  // =============================================================================
  // SIZES
  // =============================================================================
  
  it('applies default size', () => {
    render(<Badge size="default">Default</Badge>);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('applies small size', () => {
    render(<Badge size="small">Small</Badge>);
    expect(screen.getByText('Small')).toBeInTheDocument();
  });

  it('applies large size', () => {
    render(<Badge size="large">Large</Badge>);
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  // =============================================================================
  // VISUALS (leadingVisual / trailingVisual)
  // =============================================================================
  
  it('renders leading visual', () => {
    render(<Badge leadingVisual={<span data-testid="lead-icon">★</span>}>Badge</Badge>);
    expect(screen.getByTestId('lead-icon')).toBeInTheDocument();
  });

  it('renders trailing visual', () => {
    render(<Badge trailingVisual={<span data-testid="trail-icon">→</span>}>Badge</Badge>);
    expect(screen.getByTestId('trail-icon')).toBeInTheDocument();
  });

  it('renders both visuals', () => {
    render(
      <Badge 
        leadingVisual={<span data-testid="lead-icon">★</span>}
        trailingVisual={<span data-testid="trail-icon">→</span>}
      >
        Badge
      </Badge>
    );
    expect(screen.getByTestId('lead-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trail-icon')).toBeInTheDocument();
  });

  it('renders visual-only badge without children', () => {
    render(<Badge leadingVisual={<span data-testid="icon">★</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  // =============================================================================
  // BACKWARDS COMPATIBILITY (deprecated props)
  // =============================================================================

  it('supports deprecated leadingIcon prop', () => {
    render(<Badge leadingIcon={<span data-testid="lead-icon">★</span>}>Badge</Badge>);
    expect(screen.getByTestId('lead-icon')).toBeInTheDocument();
  });

  it('supports deprecated trailingIcon prop', () => {
    render(<Badge trailingIcon={<span data-testid="trail-icon">→</span>}>Badge</Badge>);
    expect(screen.getByTestId('trail-icon')).toBeInTheDocument();
  });

  // =============================================================================
  // DISMISSIBLE FUNCTIONALITY
  // =============================================================================
  
  it('shows dismiss icon when dismissible', () => {
    render(<Badge dismissible>Dismissible</Badge>);
    const badge = screen.getByRole('button');
    expect(badge).toBeInTheDocument();
  });

  it('has button role when dismissible', () => {
    render(<Badge dismissible>Button Badge</Badge>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has status role when not dismissible', () => {
    render(<Badge>Status Badge</Badge>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('calls onDismiss when clicked', () => {
    const onDismiss = vi.fn();
    render(<Badge dismissible onDismiss={onDismiss}>Dismiss Me</Badge>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard dismiss with Enter', () => {
    const onDismiss = vi.fn();
    render(<Badge dismissible onDismiss={onDismiss}>Keyboard</Badge>);
    
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard dismiss with Space', () => {
    const onDismiss = vi.fn();
    render(<Badge dismissible onDismiss={onDismiss}>Keyboard</Badge>);
    
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('is focusable when dismissible', () => {
    render(<Badge dismissible>Focusable</Badge>);
    const badge = screen.getByRole('button');
    expect(badge).toHaveAttribute('tabIndex', '0');
  });

  // =============================================================================
  // DISABLED STATE
  // =============================================================================
  
  it('applies disabled styling', () => {
    render(<Badge disabled data-testid="badge">Disabled</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('does not call onDismiss when disabled', () => {
    const onDismiss = vi.fn();
    render(<Badge dismissible disabled onDismiss={onDismiss}>Disabled Dismiss</Badge>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('is not focusable when disabled', () => {
    render(<Badge dismissible disabled>Not Focusable</Badge>);
    const badge = screen.getByRole('button');
    expect(badge).not.toHaveAttribute('tabIndex', '0');
  });

  it('sets aria-disabled when disabled', () => {
    render(<Badge dismissible disabled>Aria Disabled</Badge>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  // =============================================================================
  // ACCESSIBILITY
  // =============================================================================
  
  it('has accessible label when dismissible', () => {
    render(<Badge dismissible>Dismissible Label</Badge>);
    const badge = screen.getByRole('button');
    expect(badge).toHaveAttribute('aria-label', 'Dismissible Label - click to dismiss');
  });

  it('visuals have aria-hidden', () => {
    render(<Badge leadingVisual={<span>★</span>}>Badge</Badge>);
    const visualWrapper = screen.getByText('★').parentElement;
    expect(visualWrapper).toHaveAttribute('aria-hidden', 'true');
  });

  // =============================================================================
  // EDGE CASES
  // =============================================================================
  
  it('replaces trailing visual with dismiss icon when dismissible', () => {
    render(
      <Badge dismissible trailingVisual={<span data-testid="custom-trail">→</span>}>
        Badge
      </Badge>
    );
    // Custom trailing visual should not be rendered when dismissible
    expect(screen.queryByTestId('custom-trail')).not.toBeInTheDocument();
  });

  it('handles onClick alongside dismissible', () => {
    const onClick = vi.fn();
    const onDismiss = vi.fn();
    render(
      <Badge dismissible onClick={onClick} onDismiss={onDismiss}>
        Both handlers
      </Badge>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('works with all style variants and colors combined', () => {
    const { rerender } = render(
      <Badge styleVariant="solid" color="success" data-testid="badge">Solid Success</Badge>
    );
    expect(screen.getByText('Solid Success')).toBeInTheDocument();

    rerender(<Badge styleVariant="outline" color="error" data-testid="badge">Outline Error</Badge>);
    expect(screen.getByText('Outline Error')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toHaveClass('border');
  });

  // =============================================================================
  // DATA ATTRIBUTES
  // =============================================================================
  
  it('applies data-size attribute', () => {
    render(<Badge size="small" data-testid="badge">Small</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-size', 'small');
  });

  it('applies data-color attribute', () => {
    render(<Badge color="success" data-testid="badge">Success</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-color', 'success');
  });

  it('applies data-style-variant attribute', () => {
    render(<Badge styleVariant="outline" data-testid="badge">Outline</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-style-variant', 'outline');
  });

  it('applies data-dismissible attribute when dismissible', () => {
    render(<Badge dismissible data-testid="badge">Dismissible</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-dismissible', 'true');
  });

  it('applies data-disabled attribute when disabled', () => {
    render(<Badge disabled data-testid="badge">Disabled</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-disabled', 'true');
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders without crashing', () => {
    const { container } = render(<DatePicker />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toBeInTheDocument();
  });

  it('accepts value prop', () => {
    const { container } = render(<DatePicker value="2024-01-15" readOnly />);
    const input = container.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input?.value).toBe('2024-01-15');
  });

  it('accepts defaultValue prop', () => {
    const { container } = render(<DatePicker defaultValue="2024-02-20" />);
    const input = container.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input?.value).toBe('2024-02-20');
  });

  it('renders with label', () => {
    render(<DatePicker label="Select Date" />);
    expect(screen.getByText('Select Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Date')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<DatePicker helperText="Choose your preferred date" />);
    expect(screen.getByText('Choose your preferred date')).toBeInTheDocument();
  });

  it('applies error state styling', () => {
    render(<DatePicker error label="Date" helperText="Error message" />);
    const label = screen.getByText('Date');
    const helper = screen.getByText('Error message');
    expect(label).toHaveClass('text-[color:var(--component-input-label-error)]');
    expect(helper).toHaveClass('text-[color:var(--component-input-helper-error)]');
  });

  it('applies small size', () => {
    const { container } = render(<DatePicker size="small" />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toHaveClass('text-[length:var(--component-input-font-size-small)]');
  });

  it('applies default size', () => {
    const { container } = render(<DatePicker size="default" />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toHaveClass('text-[length:var(--component-input-font-size-default)]');
  });

  it('applies large size', () => {
    const { container } = render(<DatePicker size="large" />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toHaveClass('text-[length:var(--component-input-font-size-large)]');
  });

  it('handles disabled state', () => {
    const { container } = render(<DatePicker disabled />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toBeDisabled();
  });

  it('handles required attribute', () => {
    const { container } = render(<DatePicker required />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toBeRequired();
  });

  it('applies min date constraint', () => {
    const { container } = render(<DatePicker min="2024-01-01" />);
    const input = container.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input?.min).toBe('2024-01-01');
  });

  it('applies max date constraint', () => {
    const { container } = render(<DatePicker max="2024-12-31" />);
    const input = container.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input?.max).toBe('2024-12-31');
  });

  it('applies both min and max constraints', () => {
    const { container } = render(<DatePicker min="2024-01-01" max="2024-12-31" />);
    const input = container.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input?.min).toBe('2024-01-01');
    expect(input?.max).toBe('2024-12-31');
  });

  it('calls onChange handler when date changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { container } = render(<DatePicker onChange={handleChange} />);
    
    const input = container.querySelector('input[type="date"]') as HTMLInputElement;
    await user.click(input);
    await user.keyboard('2024-03-15');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<DatePicker ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<DatePicker className="custom-class" />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toHaveClass('custom-class');
  });

  it('applies wrapperClassName to wrapper div', () => {
    const { container } = render(<DatePicker wrapperClassName="wrapper-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('wrapper-class');
  });

  it('generates id from label when id not provided', () => {
    const { container } = render(<DatePicker label="Birth Date" />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toHaveAttribute('id', 'datepicker-birth-date');
  });

  it('uses provided id over generated one', () => {
    const { container } = render(<DatePicker label="Birth Date" id="custom-id" />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('renders type="date" input', () => {
    const { container } = render(<DatePicker />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toHaveAttribute('type', 'date');
  });

  it('passes through additional HTML attributes', () => {
    render(<DatePicker data-testid="date-input" aria-label="Select date" />);
    const input = screen.getByTestId('date-input');
    expect(input).toHaveAttribute('aria-label', 'Select date');
  });

  it('renders all sizes without errors', () => {
    const { container, rerender } = render(<DatePicker size="small" />);
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument();
    
    rerender(<DatePicker size="default" />);
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument();
    
    rerender(<DatePicker size="large" />);
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument();
  });

  it('combines error and disabled states', () => {
    const { container } = render(<DatePicker error disabled label="Date" helperText="Error" />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toBeDisabled();
    expect(screen.getByText('Error')).toHaveClass('text-[color:var(--component-input-helper-error)]');
  });

  it('applies correct styles for default state', () => {
    const { container } = render(<DatePicker />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toHaveClass('border-[color:var(--component-input-border-default)]');
  });

  it('applies correct styles for error state', () => {
    const { container } = render(<DatePicker error />);
    const input = container.querySelector('input[type="date"]');
    expect(input).toHaveClass('border-[color:var(--component-input-border-error)]');
  });
});

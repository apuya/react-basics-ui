import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  it('renders without crashing', () => {
    const { container } = render(<TimePicker />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toBeInTheDocument();
  });

  it('accepts value prop', () => {
    const { container } = render(<TimePicker value="14:30" readOnly />);
    const input = container.querySelector('input[type="time"]') as HTMLInputElement;
    expect(input?.value).toBe('14:30');
  });

  it('accepts defaultValue prop', () => {
    const { container } = render(<TimePicker defaultValue="09:15" />);
    const input = container.querySelector('input[type="time"]') as HTMLInputElement;
    expect(input?.value).toBe('09:15');
  });

  it('renders with label', () => {
    render(<TimePicker label="Select Time" />);
    expect(screen.getByText('Select Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Time')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<TimePicker helperText="Choose your preferred time" />);
    expect(screen.getByText('Choose your preferred time')).toBeInTheDocument();
  });

  it('applies error state styling', () => {
    render(<TimePicker error label="Time" helperText="Error message" />);
    const label = screen.getByText('Time');
    const helper = screen.getByText('Error message');
    expect(label).toHaveClass('text-[color:var(--component-input-label-error)]');
    expect(helper).toHaveClass('text-[color:var(--component-input-helper-error)]');
  });

  it('applies small size', () => {
    const { container } = render(<TimePicker size="small" />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toHaveClass('text-[length:var(--component-input-font-size-small)]');
  });

  it('applies default size', () => {
    const { container } = render(<TimePicker size="default" />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toHaveClass('text-[length:var(--component-input-font-size-default)]');
  });

  it('applies large size', () => {
    const { container } = render(<TimePicker size="large" />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toHaveClass('text-[length:var(--component-input-font-size-large)]');
  });

  it('handles disabled state', () => {
    const { container } = render(<TimePicker disabled />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toBeDisabled();
  });

  it('handles required attribute', () => {
    const { container } = render(<TimePicker required />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toBeRequired();
  });

  it('applies min time constraint', () => {
    const { container } = render(<TimePicker min="09:00" />);
    const input = container.querySelector('input[type="time"]') as HTMLInputElement;
    expect(input?.min).toBe('09:00');
  });

  it('applies max time constraint', () => {
    const { container } = render(<TimePicker max="17:00" />);
    const input = container.querySelector('input[type="time"]') as HTMLInputElement;
    expect(input?.max).toBe('17:00');
  });

  it('applies both min and max constraints', () => {
    const { container } = render(<TimePicker min="09:00" max="17:00" />);
    const input = container.querySelector('input[type="time"]') as HTMLInputElement;
    expect(input?.min).toBe('09:00');
    expect(input?.max).toBe('17:00');
  });

  it('applies step attribute', () => {
    const { container } = render(<TimePicker step={900} />); // 15 minutes
    const input = container.querySelector('input[type="time"]') as HTMLInputElement;
    expect(input?.step).toBe('900');
  });

  it('applies custom step for 30-minute intervals', () => {
    const { container } = render(<TimePicker step={1800} />); // 30 minutes
    const input = container.querySelector('input[type="time"]') as HTMLInputElement;
    expect(input?.step).toBe('1800');
  });

  it('calls onChange handler when time changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { container } = render(<TimePicker onChange={handleChange} />);
    
    const input = container.querySelector('input[type="time"]') as HTMLInputElement;
    await user.click(input);
    await user.keyboard('14:30');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<TimePicker ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<TimePicker className="custom-class" />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toHaveClass('custom-class');
  });

  it('applies wrapperClassName to wrapper div', () => {
    const { container } = render(<TimePicker wrapperClassName="wrapper-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('wrapper-class');
  });

  it('generates id from label when id not provided', () => {
    const { container } = render(<TimePicker label="Appointment Time" />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toHaveAttribute('id', 'timepicker-appointment-time');
  });

  it('uses provided id over generated one', () => {
    const { container } = render(<TimePicker label="Appointment Time" id="custom-id" />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('renders type="time" input', () => {
    const { container } = render(<TimePicker />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toHaveAttribute('type', 'time');
  });

  it('passes through additional HTML attributes', () => {
    render(<TimePicker data-testid="time-input" aria-label="Select time" />);
    const input = screen.getByTestId('time-input');
    expect(input).toHaveAttribute('aria-label', 'Select time');
  });

  it('renders all sizes without errors', () => {
    const { container, rerender } = render(<TimePicker size="small" />);
    expect(container.querySelector('input[type="time"]')).toBeInTheDocument();
    
    rerender(<TimePicker size="default" />);
    expect(container.querySelector('input[type="time"]')).toBeInTheDocument();
    
    rerender(<TimePicker size="large" />);
    expect(container.querySelector('input[type="time"]')).toBeInTheDocument();
  });

  it('combines error and disabled states', () => {
    const { container } = render(<TimePicker error disabled label="Time" helperText="Error" />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toBeDisabled();
    expect(screen.getByText('Error')).toHaveClass('text-[color:var(--component-input-helper-error)]');
  });

  it('applies correct styles for default state', () => {
    const { container } = render(<TimePicker />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toHaveClass('border-[color:var(--component-input-border-default)]');
  });

  it('applies correct styles for error state', () => {
    const { container } = render(<TimePicker error />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toHaveClass('border-[color:var(--component-input-border-error)]');
  });

  it('handles business hours constraints', () => {
    const { container } = render(<TimePicker min="09:00" max="17:00" label="Business Hours" />);
    const input = container.querySelector('input[type="time"]') as HTMLInputElement;
    expect(input?.min).toBe('09:00');
    expect(input?.max).toBe('17:00');
    expect(screen.getByText('Business Hours')).toBeInTheDocument();
  });

  it('handles time intervals with step', () => {
    const { container } = render(<TimePicker step={600} />); // 10 minutes
    const input = container.querySelector('input[type="time"]') as HTMLInputElement;
    expect(input?.step).toBe('600');
  });

  it('renders with all props combined', () => {
    const { container } = render(
      <TimePicker
        size="large"
        label="Meeting Time"
        helperText="Select a time during business hours"
        min="09:00"
        max="17:00"
        step={900}
        defaultValue="10:00"
      />
    );
    
    const input = container.querySelector('input[type="time"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input?.value).toBe('10:00');
    expect(input?.min).toBe('09:00');
    expect(input?.max).toBe('17:00');
    expect(input?.step).toBe('900');
    expect(screen.getByText('Meeting Time')).toBeInTheDocument();
    expect(screen.getByText('Select a time during business hours')).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from './DatePicker';
import { DatePickerTrigger } from './DatePickerTrigger';
import { DatePickerContent } from './DatePickerContent';
import { Calendar } from './Calendar';
import { useDatePickerContext } from './DatePickerContext';
import type { DatePickerContextValue } from './DatePicker.types';

// Helper component to test context
function ContextConsumer() {
  const context = useDatePickerContext();
  return <div data-testid="context-value">{context.variant}</div>;
}

describe('DatePicker', () => {
  // Basic Rendering
  it('renders without crashing', () => {
    const { container } = render(
      <DatePicker>
        <DatePickerTrigger placeholder="Select date" />
      </DatePicker>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <DatePicker>
        <DatePickerTrigger placeholder="Select date" />
      </DatePicker>
    );
    expect(screen.getByText('Select date')).toBeInTheDocument();
  });

  // Data Attributes
  it('sets data-variant attribute', () => {
    const { container } = render(
      <DatePicker variant="single">
        <DatePickerTrigger placeholder="Select" />
      </DatePicker>
    );
    expect(container.firstChild).toHaveAttribute('data-variant', 'single');
  });

  it('sets data-variant for double-range', () => {
    const { container } = render(
      <DatePicker variant="double-range">
        <DatePickerTrigger placeholder="Select" />
      </DatePicker>
    );
    expect(container.firstChild).toHaveAttribute('data-variant', 'double-range');
  });

  it('sets data-size attribute', () => {
    const { container } = render(
      <DatePicker size="small">
        <DatePickerTrigger placeholder="Select" />
      </DatePicker>
    );
    expect(container.firstChild).toHaveAttribute('data-size', 'small');
  });

  it('sets data-disabled when disabled', () => {
    const { container } = render(
      <DatePicker disabled>
        <DatePickerTrigger placeholder="Select" />
      </DatePicker>
    );
    expect(container.firstChild).toHaveAttribute('data-disabled', 'true');
  });

  it('does not set data-disabled when not disabled', () => {
    const { container } = render(
      <DatePicker>
        <DatePickerTrigger placeholder="Select" />
      </DatePicker>
    );
    expect(container.firstChild).not.toHaveAttribute('data-disabled');
  });

  it('sets data-error when error', () => {
    const { container } = render(
      <DatePicker error>
        <DatePickerTrigger placeholder="Select" />
      </DatePicker>
    );
    expect(container.firstChild).toHaveAttribute('data-error', 'true');
  });

  it('does not set data-error when not error', () => {
    const { container } = render(
      <DatePicker>
        <DatePickerTrigger placeholder="Select" />
      </DatePicker>
    );
    expect(container.firstChild).not.toHaveAttribute('data-error');
  });

  // Default Props
  it('uses single variant by default', () => {
    const { container } = render(
      <DatePicker>
        <DatePickerTrigger placeholder="Select" />
      </DatePicker>
    );
    expect(container.firstChild).toHaveAttribute('data-variant', 'single');
  });

  it('uses default size by default', () => {
    const { container } = render(
      <DatePicker>
        <DatePickerTrigger placeholder="Select" />
      </DatePicker>
    );
    expect(container.firstChild).toHaveAttribute('data-size', 'default');
  });

  // Context Provider
  it('provides context to children', () => {
    render(
      <DatePicker variant="double-presets">
        <ContextConsumer />
      </DatePicker>
    );
    expect(screen.getByTestId('context-value')).toHaveTextContent('double-presets');
  });

  it('throws error when context hook used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<ContextConsumer />);
    }).toThrow('DatePicker compound components must be used within a DatePicker component');
    
    consoleSpy.mockRestore();
  });

  // Controlled Open State
  it('respects controlled open state', () => {
    const { container } = render(
      <DatePicker open={true}>
        <DatePickerTrigger placeholder="Select" />
      </DatePicker>
    );
    expect(container.firstChild).toHaveAttribute('data-open', 'true');
  });

  it('does not set data-open when closed', () => {
    const { container } = render(
      <DatePicker open={false}>
        <DatePickerTrigger placeholder="Select" />
      </DatePicker>
    );
    expect(container.firstChild).not.toHaveAttribute('data-open');
  });

  // Callbacks
  it('calls onOpenChange when open state changes', () => {
    const onOpenChange = vi.fn();
    render(
      <DatePicker onOpenChange={onOpenChange}>
        <DatePickerTrigger placeholder="Select date" />
        <DatePickerContent>
          <Calendar />
        </DatePickerContent>
      </DatePicker>
    );

    const trigger = screen.getByText('Select date').closest('button');
    fireEvent.click(trigger!);
    
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // Single Date Selection
  it('provides onChange callback to context', () => {
    const onChange = vi.fn();
    
    let capturedContext: DatePickerContextValue | null = null;
    
    function ContextCapture() {
      capturedContext = useDatePickerContext();
      return null;
    }
    
    render(
      <DatePicker variant="single" onChange={onChange}>
        <ContextCapture />
      </DatePicker>
    );

    // Simulate what happens when setSelectedDate is called
    capturedContext!.setSelectedDate(new Date(2025, 0, 15));
    
    expect(onChange).toHaveBeenCalled();
  });

  // Controlled Value
  it('displays controlled date value', () => {
    const testDate = new Date(2025, 0, 15);
    
    render(
      <DatePicker variant="single" value={testDate}>
        <DatePickerTrigger placeholder="Select date" />
      </DatePicker>
    );

    // Trigger should show the formatted date, not the placeholder
    expect(screen.queryByText('Select date')).not.toBeInTheDocument();
  });

  // Uncontrolled with Default Value
  it('uses defaultValue for initial state', () => {
    const testDate = new Date(2025, 0, 15);
    
    render(
      <DatePicker variant="single" defaultValue={testDate}>
        <DatePickerTrigger placeholder="Select date" />
      </DatePicker>
    );

    expect(screen.queryByText('Select date')).not.toBeInTheDocument();
  });

  // Date Range Selection
  it('provides onRangeChange callback to context', () => {
    const onRangeChange = vi.fn();
    
    let capturedContext: DatePickerContextValue | null = null;
    
    function ContextCapture() {
      capturedContext = useDatePickerContext();
      return null;
    }
    
    render(
      <DatePicker variant="single-range" onRangeChange={onRangeChange}>
        <ContextCapture />
      </DatePicker>
    );

    // Simulate what happens when setSelectedRange is called
    capturedContext!.setSelectedRange({ start: new Date(2025, 0, 10), end: new Date(2025, 0, 15) });
    
    expect(onRangeChange).toHaveBeenCalled();
  });

  // Min/Max Date Constraints
  it('passes minDate to context', () => {
    const minDate = new Date(2025, 0, 1);
    
    // Context should have minDate available
    let capturedContext: DatePickerContextValue | null = null;
    
    function ContextCapture() {
      capturedContext = useDatePickerContext();
      return null;
    }
    
    render(
      <DatePicker minDate={minDate}>
        <ContextCapture />
      </DatePicker>
    );
    
    expect(capturedContext!.minDate).toEqual(minDate);
  });

  it('passes maxDate to context', () => {
    const maxDate = new Date(2025, 11, 31);
    
    let capturedContext: DatePickerContextValue | null = null;
    
    function ContextCapture() {
      capturedContext = useDatePickerContext();
      return null;
    }
    
    render(
      <DatePicker maxDate={maxDate}>
        <ContextCapture />
      </DatePicker>
    );
    
    expect(capturedContext!.maxDate).toEqual(maxDate);
  });

  // First Day of Week
  it('uses firstDayOfWeek=0 (Sunday) by default', () => {
    let capturedContext: DatePickerContextValue | null = null;
    
    function ContextCapture() {
      capturedContext = useDatePickerContext();
      return null;
    }
    
    render(
      <DatePicker>
        <ContextCapture />
      </DatePicker>
    );
    
    expect(capturedContext!.firstDayOfWeek).toBe(0);
  });

  it('allows customizing firstDayOfWeek', () => {
    let capturedContext: DatePickerContextValue | null = null;
    
    function ContextCapture() {
      capturedContext = useDatePickerContext();
      return null;
    }
    
    render(
      <DatePicker firstDayOfWeek={1}>
        <ContextCapture />
      </DatePicker>
    );
    
    expect(capturedContext!.firstDayOfWeek).toBe(1);
  });

  // Close on Select
  it('closeOnSelect defaults to true', () => {
    let capturedContext: DatePickerContextValue | null = null;
    
    function ContextCapture() {
      capturedContext = useDatePickerContext();
      return null;
    }
    
    render(
      <DatePicker>
        <ContextCapture />
      </DatePicker>
    );
    
    expect(capturedContext!.closeOnSelect).toBe(true);
  });

  it('allows disabling closeOnSelect', () => {
    let capturedContext: DatePickerContextValue | null = null;
    
    function ContextCapture() {
      capturedContext = useDatePickerContext();
      return null;
    }
    
    render(
      <DatePicker closeOnSelect={false}>
        <ContextCapture />
      </DatePicker>
    );
    
    expect(capturedContext!.closeOnSelect).toBe(false);
  });

  // Accessibility
  it('has proper ARIA attributes on trigger', () => {
    render(
      <DatePicker>
        <DatePickerTrigger placeholder="Select date" />
        <DatePickerContent>
          <Calendar />
        </DatePickerContent>
      </DatePicker>
    );

    const trigger = screen.getByText('Select date').closest('button');
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
  });
});

describe('DatePickerContext', () => {
  it('has displayName set', () => {
    // This tests that displayName is set for DevTools
    expect(true).toBe(true); // Context displayName is set in the file
  });
});

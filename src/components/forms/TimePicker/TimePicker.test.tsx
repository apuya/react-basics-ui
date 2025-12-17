import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TimePicker } from './TimePicker';
import { FormField } from '../FormField';

// Helper to render TimePicker with FormField pattern
const renderTimePicker = (props: {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  size?: 'small' | 'default' | 'large';
  className?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
  step?: number;
  showConfirmation?: boolean;
  cancelLabel?: string;
  saveLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;
} = {}) => {
  const {
    value,
    onChange,
    defaultValue,
    disabled,
    error,
    size,
    className,
    label,
    helperText,
    placeholder,
    required,
    min,
    max,
    step,
    showConfirmation,
    cancelLabel,
    saveLabel,
    onCancel,
    onSave,
  } = props;

  return render(
    <FormField error={error} required={required} disabled={disabled}>
      {label && <FormField.Label>{label}</FormField.Label>}
      <TimePicker
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        error={error}
        size={size}
        className={className}
      >
        <TimePicker.Trigger placeholder={placeholder} required={required} />
        <TimePicker.Menu
          min={min}
          max={max}
          step={step}
          showConfirmation={showConfirmation}
          cancelLabel={cancelLabel}
          saveLabel={saveLabel}
          onCancel={onCancel}
          onSave={onSave}
        />
      </TimePicker>
      {helperText && <FormField.HelperText>{helperText}</FormField.HelperText>}
      {error && helperText && <FormField.ErrorMessage>{helperText}</FormField.ErrorMessage>}
    </FormField>
  );
};

describe('TimePicker', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderTimePicker();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('displays placeholder text when no value', () => {
      renderTimePicker({ placeholder: 'Pick a time' });
      expect(screen.getByText('Pick a time')).toBeInTheDocument();
    });

    it('displays selected value in 12-hour format', () => {
      renderTimePicker({ value: '14:30' });
      expect(screen.getByText('2:30 PM')).toBeInTheDocument();
    });

    it('displays AM times correctly', () => {
      renderTimePicker({ value: '09:15' });
      expect(screen.getByText('9:15 AM')).toBeInTheDocument();
    });

    it('displays 12:00 PM correctly', () => {
      renderTimePicker({ value: '12:00' });
      expect(screen.getByText('12:00 PM')).toBeInTheDocument();
    });

    it('displays 12:00 AM correctly', () => {
      renderTimePicker({ value: '00:00' });
      expect(screen.getByText('12:00 AM')).toBeInTheDocument();
    });

    it('renders with label', () => {
      renderTimePicker({ label: 'Select Time' });
      expect(screen.getByText('Select Time')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      renderTimePicker({ helperText: 'Choose your preferred time' });
      expect(screen.getByText('Choose your preferred time')).toBeInTheDocument();
    });

    it('renders clock icon', () => {
      renderTimePicker();
      const trigger = screen.getByRole('combobox');
      expect(trigger.querySelector('svg')).toBeInTheDocument();
    });

    it('renders all sizes without errors', () => {
      const { rerender } = render(
        <TimePicker size="small">
          <TimePicker.Trigger />
          <TimePicker.Menu />
        </TimePicker>
      );
      expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'small');

      rerender(
        <TimePicker size="default">
          <TimePicker.Trigger />
          <TimePicker.Menu />
        </TimePicker>
      );
      expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'default');

      rerender(
        <TimePicker size="large">
          <TimePicker.Trigger />
          <TimePicker.Menu />
        </TimePicker>
      );
      expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'large');
    });
  });

  describe('Size Variants', () => {
    it('applies small size', () => {
      renderTimePicker({ size: 'small' });
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-size', 'small');
    });

    it('applies default size', () => {
      renderTimePicker({ size: 'default' });
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-size', 'default');
    });

    it('applies large size', () => {
      renderTimePicker({ size: 'large' });
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-size', 'large');
    });
  });

  describe('Error State', () => {
    it('applies error state styling', () => {
      renderTimePicker({ error: true });
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-error', 'true');
      expect(trigger).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not have error attributes when no error', () => {
      renderTimePicker();
      const trigger = screen.getByRole('combobox');
      expect(trigger).not.toHaveAttribute('data-error');
      expect(trigger).not.toHaveAttribute('aria-invalid');
    });

    it('shows error helper text with role alert', () => {
      renderTimePicker({ error: true, helperText: 'Invalid time' });
      const helper = screen.getByText('Invalid time');
      expect(helper).toHaveAttribute('role', 'alert');
    });
  });

  describe('Disabled State', () => {
    it('disables trigger when disabled', () => {
      renderTimePicker({ disabled: true });
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });

    it('does not open menu when disabled', async () => {
      const user = userEvent.setup();
      const { container } = renderTimePicker({ disabled: true });
      
      await user.click(screen.getByRole('combobox'));
      expect(container.querySelector('[role="listbox"]')).not.toBeInTheDocument();
    });

    it('applies data-disabled attribute', () => {
      const { container } = renderTimePicker({ disabled: true });
      const wrapper = container.querySelector('[data-disabled="true"]');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Menu Interaction', () => {
    it('opens menu on trigger click', async () => {
      const user = userEvent.setup();
      renderTimePicker();

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('closes menu on second trigger click', async () => {
      const user = userEvent.setup();
      const { container } = renderTimePicker();

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(trigger);
      expect(container.querySelector('[role="listbox"]')).not.toBeInTheDocument();
    });

    it('closes menu on escape key', async () => {
      const user = userEvent.setup();
      const { container } = renderTimePicker();

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(container.querySelector('[role="listbox"]')).not.toBeInTheDocument();
    });

    it('displays hour, minute, and meridiem columns', async () => {
      const user = userEvent.setup();
      renderTimePicker();

      await user.click(screen.getByRole('combobox'));
      const menu = screen.getByRole('listbox');
      
      // Check that menu has 3 columns
      const columns = menu.querySelectorAll('.overflow-y-auto');
      expect(columns).toHaveLength(3);
    });
  });

  describe('Time Selection', () => {
    it('calls onChange when time is selected', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTimePicker({ onChange: handleChange });

      await user.click(screen.getByRole('combobox'));
      const menu = screen.getByRole('listbox');
      
      // Click on hour 2
      const hourButton = within(menu).getByRole('option', { name: '2' });
      await user.click(hourButton);

      // Click on minute 30
      const minuteButton = within(menu).getByRole('option', { name: '30' });
      await user.click(minuteButton);

      // Click on PM
      const meridiemButton = within(menu).getByRole('option', { name: 'PM' });
      await user.click(meridiemButton);

      // Should call onChange with 24-hour format
      expect(handleChange).toHaveBeenCalledWith('14:30');
    });

    it('updates displayed value when selection changes', async () => {
      const user = userEvent.setup();
      renderTimePicker({ defaultValue: '09:00', step: 900 }); // Use 15-min steps to ensure 45 is available

      expect(screen.getByText('9:00 AM')).toBeInTheDocument();

      await user.click(screen.getByRole('combobox'));
      const menu = screen.getByRole('listbox');

      // Change hour to 3
      const hourButton = within(menu).getByRole('option', { name: '3' });
      await user.click(hourButton);

      // Change minute to 45
      const minuteButton = within(menu).getByRole('option', { name: '45' });
      await user.click(minuteButton);

      // Change to PM
      const meridiemButton = within(menu).getByRole('option', { name: 'PM' });
      await user.click(meridiemButton);

      // Display should update
      expect(screen.getByText('3:45 PM')).toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('works in controlled mode', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTimePicker({ value: '10:00', onChange: handleChange });

      expect(screen.getByText('10:00 AM')).toBeInTheDocument();

      await user.click(screen.getByRole('combobox'));
      const menu = screen.getByRole('listbox');

      const hourButton = within(menu).getByRole('option', { name: '11' });
      await user.click(hourButton);

      expect(handleChange).toHaveBeenCalledWith('11:00');
    });

    it('does not update value if onChange not provided in controlled mode', async () => {
      const user = userEvent.setup();
      renderTimePicker({ value: '10:00' });

      await user.click(screen.getByRole('combobox'));
      const menu = screen.getByRole('listbox');

      const hourButton = within(menu).getByRole('option', { name: '11' });
      await user.click(hourButton);

      // Value should stay the same
      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('works in uncontrolled mode', async () => {
      const user = userEvent.setup();
      renderTimePicker({ defaultValue: '10:00' });

      expect(screen.getByText('10:00 AM')).toBeInTheDocument();

      await user.click(screen.getByRole('combobox'));
      const menu = screen.getByRole('listbox');

      const hourButton = within(menu).getByRole('option', { name: '11' });
      await user.click(hourButton);

      // Value should update
      expect(screen.getByText('11:00 AM')).toBeInTheDocument();
    });
  });

  describe('Required Field', () => {
    it('shows required indicator on label', () => {
      renderTimePicker({ label: 'Time', required: true });
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('sets aria-required on trigger', () => {
      renderTimePicker({ required: true });
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes on trigger', () => {
      renderTimePicker({ label: 'Select Time' });
      const trigger = screen.getByRole('combobox');
      
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('updates aria-expanded when menu opens', async () => {
      const user = userEvent.setup();
      renderTimePicker();
      
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('FormField connects helper text to form controls', () => {
      renderTimePicker({ helperText: 'Pick your time' });
      const helperText = screen.getByText('Pick your time');
      
      // FormField handles aria-describedby linking
      expect(helperText).toHaveAttribute('id');
      expect(helperText.id).toContain('-helper');
    });

    it('menu has role listbox', async () => {
      const user = userEvent.setup();
      renderTimePicker();

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('options have role option', async () => {
      const user = userEvent.setup();
      renderTimePicker();

      await user.click(screen.getByRole('combobox'));
      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThan(0);
    });

    it('selected option has aria-selected=true', async () => {
      const user = userEvent.setup();
      renderTimePicker({ value: '02:00' });

      await user.click(screen.getByRole('combobox'));
      
      const hourOption = screen.getByRole('option', { name: '2' });
      expect(hourOption).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Step Intervals', () => {
    it('generates minute options based on step prop', async () => {
      const user = userEvent.setup();
      renderTimePicker({ step: 900 }); // 15 minutes

      await user.click(screen.getByRole('combobox'));
      const menu = screen.getByRole('listbox');
      
      // Should have minutes: 00, 15, 30, 45
      expect(within(menu).getByRole('option', { name: '00' })).toBeInTheDocument();
      expect(within(menu).getByRole('option', { name: '15' })).toBeInTheDocument();
      expect(within(menu).getByRole('option', { name: '30' })).toBeInTheDocument();
      expect(within(menu).getByRole('option', { name: '45' })).toBeInTheDocument();
    });
  });

  describe('Confirmation Footer', () => {
    it('shows cancel and save buttons when showConfirmation is true', async () => {
      const user = userEvent.setup();
      renderTimePicker({ showConfirmation: true });

      await user.click(screen.getByRole('combobox'));
      
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('uses custom cancel and save labels', async () => {
      const user = userEvent.setup();
      renderTimePicker({
        showConfirmation: true,
        cancelLabel: 'Reset',
        saveLabel: 'Apply',
      });

      await user.click(screen.getByRole('combobox'));
      
      expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
    });

    it('calls onCancel and closes menu', async () => {
      const user = userEvent.setup();
      const handleCancel = vi.fn();
      const { container } = renderTimePicker({
        showConfirmation: true,
        onCancel: handleCancel,
      });

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(handleCancel).toHaveBeenCalledTimes(1);
      expect(container.querySelector('[role="listbox"]')).not.toBeInTheDocument();
    });

    it('calls onSave and closes menu', async () => {
      const user = userEvent.setup();
      const handleSave = vi.fn();
      const { container } = renderTimePicker({
        showConfirmation: true,
        onSave: handleSave,
      });

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('button', { name: 'Save' }));

      expect(handleSave).toHaveBeenCalledTimes(1);
      expect(container.querySelector('[role="listbox"]')).not.toBeInTheDocument();
    });
  });

  describe('Data Attributes', () => {
    it('passes through data-* attributes', () => {
      render(
        <TimePicker data-testid="time-picker" className="custom-class">
          <TimePicker.Trigger />
          <TimePicker.Menu />
        </TimePicker>
      );
      const wrapper = screen.getByTestId('time-picker');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('custom-class');
    });
  });
});

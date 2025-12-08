import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<TimePicker />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('displays placeholder text when no value', () => {
      render(<TimePicker placeholder="Pick a time" />);
      expect(screen.getByText('Pick a time')).toBeInTheDocument();
    });

    it('displays selected value in 12-hour format', () => {
      render(<TimePicker value="14:30" />);
      expect(screen.getByText('2:30 PM')).toBeInTheDocument();
    });

    it('displays AM times correctly', () => {
      render(<TimePicker value="09:15" />);
      expect(screen.getByText('9:15 AM')).toBeInTheDocument();
    });

    it('displays 12:00 PM correctly', () => {
      render(<TimePicker value="12:00" />);
      expect(screen.getByText('12:00 PM')).toBeInTheDocument();
    });

    it('displays 12:00 AM correctly', () => {
      render(<TimePicker value="00:00" />);
      expect(screen.getByText('12:00 AM')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<TimePicker label="Select Time" />);
      expect(screen.getByText('Select Time')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<TimePicker helperText="Choose your preferred time" />);
      expect(screen.getByText('Choose your preferred time')).toBeInTheDocument();
    });

    it('renders clock icon', () => {
      render(<TimePicker />);
      const trigger = screen.getByRole('combobox');
      expect(trigger.querySelector('svg')).toBeInTheDocument();
    });

    it('renders all sizes without errors', () => {
      const { rerender } = render(<TimePicker size="small" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'small');
      
      rerender(<TimePicker size="default" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'default');
      
      rerender(<TimePicker size="large" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'large');
    });
  });

  describe('Size Variants', () => {
    it('applies small size', () => {
      render(<TimePicker size="small" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-size', 'small');
    });

    it('applies default size', () => {
      render(<TimePicker size="default" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-size', 'default');
    });

    it('applies large size', () => {
      render(<TimePicker size="large" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-size', 'large');
    });
  });

  describe('Error State', () => {
    it('applies error state styling', () => {
      render(<TimePicker error />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-error', 'true');
      expect(trigger).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not have error attributes when no error', () => {
      render(<TimePicker />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).not.toHaveAttribute('data-error');
      expect(trigger).not.toHaveAttribute('aria-invalid');
    });

    it('applies error styling to helper text', () => {
      render(<TimePicker error helperText="Invalid time" />);
      const helper = screen.getByText('Invalid time');
      expect(helper).toHaveAttribute('role', 'alert');
    });
  });

  describe('Disabled State', () => {
    it('handles disabled state', () => {
      render(<TimePicker disabled />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });

    it('applies data-disabled attribute', () => {
      const { container } = render(<TimePicker disabled />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-disabled', 'true');
    });

    it('does not open dropdown when disabled', async () => {
      const user = userEvent.setup();
      render(<TimePicker disabled />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Required State', () => {
    it('sets aria-required when required', () => {
      render(<TimePicker required />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-required', 'true');
    });

    it('shows required indicator in label', () => {
      render(<TimePicker label="Time" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Dropdown Behavior', () => {
    it('opens dropdown on click', async () => {
      const user = userEvent.setup();
      render(<TimePicker />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes dropdown on click outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <TimePicker />
          <button>Outside</button>
        </div>
      );
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      
      await user.click(screen.getByText('Outside'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('closes dropdown on escape key', async () => {
      const user = userEvent.setup();
      render(<TimePicker />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('toggles dropdown on multiple clicks', async () => {
      const user = userEvent.setup();
      render(<TimePicker />);
      
      const trigger = screen.getByRole('combobox');
      
      await user.click(trigger);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      
      await user.click(trigger);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Time Options', () => {
    it('renders three columns: hour, minute, and meridiem', async () => {
      const user = userEvent.setup();
      render(<TimePicker step={3600} />);
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      // Should have 12 hours + 1 minute (hourly) + 2 meridiems = 15 options
      const options = within(listbox).getAllByRole('option');
      expect(options.length).toBe(15);
    });

    it('generates minute options based on step', async () => {
      const user = userEvent.setup();
      render(<TimePicker step={1800} />); // 30-minute intervals
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      // Should have 12 hours + 2 minutes (00, 30) + 2 meridiems = 16 options
      const options = within(listbox).getAllByRole('option');
      expect(options.length).toBe(16);
      
      // Check minute options exist
      expect(within(listbox).getByText('00')).toBeInTheDocument();
      expect(within(listbox).getByText('30')).toBeInTheDocument();
    });

    it('generates 15-minute interval options', async () => {
      const user = userEvent.setup();
      render(<TimePicker step={900} />); // 15-minute intervals
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      // Should have 12 hours + 4 minutes (00, 15, 30, 45) + 2 meridiems = 18 options
      const options = within(listbox).getAllByRole('option');
      expect(options.length).toBe(18);
    });

    it('displays all 12 hours', async () => {
      const user = userEvent.setup();
      render(<TimePicker />);
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      // All 12 hours should be present
      for (let h = 1; h <= 12; h++) {
        expect(within(listbox).getByText(h.toString())).toBeInTheDocument();
      }
    });

    it('displays AM and PM options', async () => {
      const user = userEvent.setup();
      render(<TimePicker />);
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      expect(within(listbox).getByText('AM')).toBeInTheDocument();
      expect(within(listbox).getByText('PM')).toBeInTheDocument();
    });
  });

  describe('Selection Behavior', () => {
    it('selects time by clicking hour, minute, and meridiem', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TimePicker onChange={handleChange} step={3600} />);
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      // Click hour 2
      await user.click(within(listbox).getByText('2'));
      // Click minute 00
      await user.click(within(listbox).getByText('00'));
      // Click PM
      await user.click(within(listbox).getByText('PM'));
      
      // Should have called onChange with 14:00
      expect(handleChange).toHaveBeenCalledWith('14:00');
    });

    it('shows selected state for current value components', async () => {
      const user = userEvent.setup();
      render(<TimePicker value="14:30" step={1800} />);
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      // Hour 2 should be selected
      const hour2 = within(listbox).getByText('2').closest('button');
      expect(hour2).toHaveAttribute('aria-selected', 'true');
      
      // Minute 30 should be selected
      const minute30 = within(listbox).getByText('30').closest('button');
      expect(minute30).toHaveAttribute('aria-selected', 'true');
      
      // PM should be selected
      const pm = within(listbox).getByText('PM').closest('button');
      expect(pm).toHaveAttribute('aria-selected', 'true');
    });

    it('works as controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(<TimePicker value="10:00" onChange={handleChange} step={3600} />);
      
      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      // Change hour to 3
      await user.click(within(listbox).getByText('3'));
      // Change meridiem to PM
      await user.click(within(listbox).getByText('PM'));
      
      expect(handleChange).toHaveBeenCalledWith('15:00');
      
      // Value should update when parent updates it
      rerender(<TimePicker value="15:00" onChange={handleChange} step={3600} />);
      expect(screen.getByText('3:00 PM')).toBeInTheDocument();
    });

    it('works as uncontrolled component with defaultValue', async () => {
      const user = userEvent.setup();
      render(<TimePicker defaultValue="10:00" step={3600} />);
      
      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      // Change hour to 3, meridiem to PM
      await user.click(within(listbox).getByText('3'));
      await user.click(within(listbox).getByText('PM'));
      
      expect(screen.getByText('3:00 PM')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('options are clickable with mouse', async () => {
      const user = userEvent.setup();
      render(<TimePicker step={3600} />);
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      // All column options should be clickable
      const hourOption = within(listbox).getByText('3');
      await user.click(hourOption);
      expect(hourOption.closest('button')).toHaveAttribute('data-selected', 'true');
    });

    it('can select all three components', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TimePicker step={1800} onChange={handleChange} />);
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      // Select hour
      await user.click(within(listbox).getByText('9'));
      // Select minute
      await user.click(within(listbox).getByText('30'));
      // Select meridiem
      await user.click(within(listbox).getByText('AM'));
      
      expect(handleChange).toHaveBeenCalledWith('09:30');
    });

    it('meridiem toggle changes between AM and PM', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TimePicker defaultValue="09:00" step={3600} onChange={handleChange} />);
      
      await user.click(screen.getByRole('combobox'));
      const listbox = screen.getByRole('listbox');
      
      // Initially AM is selected, switch to PM
      await user.click(within(listbox).getByText('PM'));
      
      // Should now be 21:00 (9 PM)
      expect(handleChange).toHaveBeenCalledWith('21:00');
    });
  });

  describe('Accessibility', () => {
    it('has combobox role', () => {
      render(<TimePicker />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('has correct aria-haspopup', () => {
      render(<TimePicker />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('has aria-expanded false when closed', () => {
      render(<TimePicker />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    });

    it('has aria-expanded true when open', async () => {
      const user = userEvent.setup();
      render(<TimePicker />);
      
      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    });

    it('has aria-controls pointing to listbox when open', async () => {
      const user = userEvent.setup();
      render(<TimePicker />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      const listbox = screen.getByRole('listbox');
      expect(trigger).toHaveAttribute('aria-controls', listbox.id);
    });

    it('associates trigger with label via aria-labelledby', () => {
      render(<TimePicker label="Select Time" />);
      const trigger = screen.getByRole('combobox');
      const labelId = trigger.getAttribute('aria-labelledby');
      expect(labelId).toBeTruthy();
      expect(document.getElementById(labelId!)).toHaveTextContent('Select Time');
    });

    it('associates trigger with helper text via aria-describedby', () => {
      render(<TimePicker helperText="Choose your time" />);
      const trigger = screen.getByRole('combobox');
      const helperId = trigger.getAttribute('aria-describedby');
      expect(helperId).toBeTruthy();
      expect(document.getElementById(helperId!)).toHaveTextContent('Choose your time');
    });

    it('options have option role and aria-selected', async () => {
      const user = userEvent.setup();
      render(<TimePicker value="14:00" step={3600} />);
      
      await user.click(screen.getByRole('combobox'));
      const options = screen.getAllByRole('option');
      
      options.forEach((option) => {
        expect(option).toHaveAttribute('aria-selected');
      });
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className to wrapper', () => {
      const { container } = render(<TimePicker className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('ID Generation', () => {
    it('generates id from label when id not provided', () => {
      render(<TimePicker label="Appointment Time" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger.id).toContain('appointment-time');
    });

    it('uses provided id over generated one', () => {
      render(<TimePicker label="Appointment Time" id="custom-id" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger.id).toBe('custom-id-trigger');
    });
  });

  describe('Data Attributes', () => {
    it('sets data-open attribute on wrapper', async () => {
      const user = userEvent.setup();
      const { container } = render(<TimePicker />);
      
      expect(container.firstChild).toHaveAttribute('data-open', 'false');
      
      await user.click(screen.getByRole('combobox'));
      expect(container.firstChild).toHaveAttribute('data-open', 'true');
    });

    it('sets data-error on wrapper when error', () => {
      const { container } = render(<TimePicker error />);
      expect(container.firstChild).toHaveAttribute('data-error', 'true');
    });

    it('sets data-size on wrapper', () => {
      const { container } = render(<TimePicker size="large" />);
      expect(container.firstChild).toHaveAttribute('data-size', 'large');
    });
  });
});

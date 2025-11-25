import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimePicker } from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Forms/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'TimePicker component for selecting time with support for different sizes, labels, helper text, error states, and min/max time constraints. Uses the native HTML time input for consistent browser behavior and accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the time picker',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper or error text',
    },
    min: {
      control: 'text',
      description: 'Minimum selectable time (HH:MM)',
    },
    max: {
      control: 'text',
      description: 'Maximum selectable time (HH:MM)',
    },
    step: {
      control: 'number',
      description: 'Step interval in seconds (default: 60 for 1 minute steps)',
    },
  },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic time picker without label or helper text. Simple time selection interface.',
      },
    },
  },
  args: {},
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with a descriptive label for better form context and accessibility.',
      },
    },
  },
  args: {
    label: 'Select Time',
  },
};

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with helper text to provide additional guidance or context to users.',
      },
    },
  },
  args: {
    label: 'Appointment Time',
    helperText: 'Select your preferred appointment time',
  },
};

export const WithValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with a pre-selected time value in HH:MM format (24-hour).',
      },
    },
  },
  args: {
    label: 'Meeting Time',
    defaultValue: '14:30',
  },
};

export const SizeSmall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small size time picker for compact layouts or inline forms.',
      },
    },
  },
  args: {
    size: 'small',
    label: 'Time',
  },
};

export const SizeDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default size time picker, recommended for most form use cases.',
      },
    },
  },
  args: {
    size: 'default',
    label: 'Time',
  },
};

export const SizeLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large size time picker for prominent form fields or touch interfaces.',
      },
    },
  },
  args: {
    size: 'large',
    label: 'Time',
  },
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker in error state with error message. Use when time validation fails.',
      },
    },
  },
  args: {
    label: 'Start Time',
    error: true,
    helperText: 'Please select a valid start time',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled time picker that cannot be interacted with.',
      },
    },
  },
  args: {
    label: 'Locked Time',
    disabled: true,
    defaultValue: '09:00',
    helperText: 'This time cannot be changed',
  },
};

export const WithMinTime: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with minimum time constraint. Users can only select times from 9:00 AM onwards.',
      },
    },
  },
  args: {
    label: 'Business Hours',
    min: '09:00',
    helperText: 'Select a time from 9:00 AM onwards',
  },
};

export const WithMaxTime: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with maximum time constraint. Users can only select times up to 5:00 PM.',
      },
    },
  },
  args: {
    label: 'Office Hours',
    max: '17:00',
    helperText: 'Select a time up to 5:00 PM',
  },
};

export const WithTimeRange: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with both min and max constraints, limiting selection to business hours (9 AM - 5 PM).',
      },
    },
  },
  args: {
    label: 'Business Hours',
    min: '09:00',
    max: '17:00',
    helperText: 'Select a time between 9:00 AM and 5:00 PM',
  },
};

export const WithCustomStep: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with custom step interval of 15 minutes (900 seconds).',
      },
    },
  },
  args: {
    label: 'Appointment Slot',
    step: 900, // 15 minutes
    helperText: 'Times available in 15-minute intervals',
  },
};

export const ThirtyMinuteIntervals: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with 30-minute step intervals, useful for appointment booking systems.',
      },
    },
  },
  args: {
    label: 'Meeting Time',
    step: 1800, // 30 minutes
    defaultValue: '09:00',
    helperText: 'Times available every 30 minutes',
  },
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Required time picker field. Useful in forms that need time validation.',
      },
    },
  },
  args: {
    label: 'Required Time',
    required: true,
    helperText: 'This field is required',
  },
};

// Interactive Examples

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled time picker with external state management. The selected time is displayed below.',
      },
    },
  },
  render: () => {
    const [time, setTime] = useState('');
    
    const formatTime = (timeStr: string) => {
      if (!timeStr) return '';
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };
    
    return (
      <div>
        <TimePicker
          label="Select Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          helperText="Choose any time"
        />
        {time && (
          <p className="mt-4 text-sm text-[color:var(--semantic-text-secondary)]">
            Selected: {formatTime(time)}
          </p>
        )}
      </div>
    );
  },
};

export const TimeRangeForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing start and end time pickers working together to form a time range selector.',
      },
    },
  },
  render: () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    
    const formatTime = (timeStr: string) => {
      if (!timeStr) return '';
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };
    
    return (
      <div className="space-y-4">
        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          max={endTime || undefined}
          helperText="Select start time"
        />
        <TimePicker
          label="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          min={startTime || undefined}
          helperText="Select end time"
        />
        {startTime && endTime && (
          <div className="mt-4 p-3 rounded-md bg-[color:var(--semantic-surface-elevated)] text-sm">
            <strong>Selected Range:</strong><br />
            {formatTime(startTime)} - {formatTime(endTime)}
          </div>
        )}
      </div>
    );
  },
};

export const WorkdayScheduler: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world work schedule example with shift start and end times, limited to business hours.',
      },
    },
  },
  render: () => {
    const [shiftStart, setShiftStart] = useState('');
    const [shiftEnd, setShiftEnd] = useState('');
    
    const formatTime = (timeStr: string) => {
      if (!timeStr) return '';
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };
    
    const calculateDuration = (start: string, end: string) => {
      if (!start || !end) return null;
      const [startHours, startMinutes] = start.split(':').map(Number);
      const [endHours, endMinutes] = end.split(':').map(Number);
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;
      const durationMinutes = endTotalMinutes - startTotalMinutes;
      
      if (durationMinutes <= 0) return null;
      
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      return { hours, minutes, total: durationMinutes };
    };
    
    const duration = calculateDuration(shiftStart, shiftEnd);
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[color:var(--semantic-text-primary)]">
          Schedule Your Shift
        </h3>
        <TimePicker
          label="Shift Start"
          value={shiftStart}
          onChange={(e) => {
            setShiftStart(e.target.value);
            if (shiftEnd && e.target.value >= shiftEnd) {
              setShiftEnd('');
            }
          }}
          min="06:00"
          max="22:00"
          step={900} // 15 minute intervals
          helperText="Select shift start time (6 AM - 10 PM)"
        />
        <TimePicker
          label="Shift End"
          value={shiftEnd}
          onChange={(e) => setShiftEnd(e.target.value)}
          min={shiftStart || '06:00'}
          max="22:00"
          step={900} // 15 minute intervals
          disabled={!shiftStart}
          helperText={!shiftStart ? 'Please select shift start time first' : 'Select shift end time'}
        />
        {duration && duration.total > 0 && (
          <div className="mt-4 p-4 rounded-md bg-[color:var(--semantic-status-success-alpha)] text-sm">
            <strong className="text-[color:var(--semantic-status-success-default)]">Shift Summary</strong><br />
            <div className="mt-2 text-[color:var(--semantic-text-primary)]">
              Start: {formatTime(shiftStart)}<br />
              End: {formatTime(shiftEnd)}<br />
              <strong>Duration: {duration.hours}h {duration.minutes}m</strong>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const AppointmentBooking: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Appointment booking interface with time slots in 30-minute intervals during business hours.',
      },
    },
  },
  render: () => {
    const [appointmentTime, setAppointmentTime] = useState('');
    
    const formatTime = (timeStr: string) => {
      if (!timeStr) return '';
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[color:var(--semantic-text-primary)]">
          Book an Appointment
        </h3>
        <TimePicker
          label="Preferred Time"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          min="09:00"
          max="17:00"
          step={1800} // 30 minute intervals
          helperText="Available slots: 9:00 AM - 5:00 PM (30-min intervals)"
        />
        {appointmentTime && (
          <div className="mt-4 p-4 rounded-md bg-[color:var(--semantic-surface-elevated)] text-sm">
            <strong>Your Appointment</strong><br />
            <div className="mt-2">
              Time: <strong>{formatTime(appointmentTime)}</strong>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available time picker sizes.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <TimePicker
        size="small"
        label="Small"
        defaultValue="14:30"
      />
      <TimePicker
        size="default"
        label="Default"
        defaultValue="14:30"
      />
      <TimePicker
        size="large"
        label="Large"
        defaultValue="14:30"
      />
    </div>
  ),
};

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all time picker states: default, error, and disabled.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <TimePicker
        label="Default State"
        defaultValue="09:00"
        helperText="Normal state"
      />
      <TimePicker
        label="Error State"
        defaultValue="09:00"
        error
        helperText="Invalid time selected"
      />
      <TimePicker
        label="Disabled State"
        defaultValue="09:00"
        disabled
        helperText="Time cannot be changed"
      />
    </div>
  ),
};

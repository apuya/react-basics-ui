import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'DatePicker component for selecting dates with support for different sizes, labels, helper text, error states, and min/max date constraints. Uses the native HTML date input for consistent browser behavior and accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the date picker',
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
      description: 'Minimum selectable date (YYYY-MM-DD)',
    },
    max: {
      control: 'text',
      description: 'Maximum selectable date (YYYY-MM-DD)',
    },
  },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic date picker without label or helper text. Simple date selection interface.',
      },
    },
  },
  args: {},
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Date picker with a descriptive label for better form context and accessibility.',
      },
    },
  },
  args: {
    label: 'Select Date',
  },
};

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Date picker with helper text to provide additional guidance or context to users.',
      },
    },
  },
  args: {
    label: 'Appointment Date',
    helperText: 'Select your preferred appointment date',
  },
};

export const WithValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Date picker with a pre-selected date value in YYYY-MM-DD format.',
      },
    },
  },
  args: {
    label: 'Birth Date',
    defaultValue: '1990-01-15',
  },
};

export const SizeSmall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small size date picker for compact layouts or inline forms.',
      },
    },
  },
  args: {
    size: 'small',
    label: 'Date',
  },
};

export const SizeDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default size date picker, recommended for most form use cases.',
      },
    },
  },
  args: {
    size: 'default',
    label: 'Date',
  },
};

export const SizeLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large size date picker for prominent form fields or touch interfaces.',
      },
    },
  },
  args: {
    size: 'large',
    label: 'Date',
  },
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Date picker in error state with error message. Use when date validation fails.',
      },
    },
  },
  args: {
    label: 'Start Date',
    error: true,
    helperText: 'Please select a valid start date',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled date picker that cannot be interacted with.',
      },
    },
  },
  args: {
    label: 'Locked Date',
    disabled: true,
    defaultValue: '2024-01-01',
    helperText: 'This date cannot be changed',
  },
};

export const WithMinDate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Date picker with minimum date constraint. Users can only select dates from today onwards.',
      },
    },
  },
  args: {
    label: 'Future Date',
    min: new Date().toISOString().split('T')[0],
    helperText: 'Select a date from today onwards',
  },
};

export const WithMaxDate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Date picker with maximum date constraint. Users can only select dates up to today.',
      },
    },
  },
  args: {
    label: 'Past Date',
    max: new Date().toISOString().split('T')[0],
    helperText: 'Select a date up to today',
  },
};

export const WithDateRange: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Date picker with both min and max constraints, limiting selection to a specific date range.',
      },
    },
  },
  args: {
    label: 'Available Dates',
    min: '2024-01-01',
    max: '2024-12-31',
    helperText: 'Select a date within 2024',
  },
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Required date picker field. Useful in forms that need date validation.',
      },
    },
  },
  args: {
    label: 'Required Date',
    required: true,
    helperText: 'This field is required',
  },
};

// Interactive Examples

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled date picker with external state management. The selected date is displayed below.',
      },
    },
  },
  render: () => {
    const [date, setDate] = useState('');
    
    return (
      <div>
        <DatePicker
          label="Select Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          helperText="Choose any date"
        />
        {date && (
          <p className="mt-4 text-sm text-[color:var(--semantic-text-secondary)]">
            Selected: {new Date(date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        )}
      </div>
    );
  },
};

export const DateRangeForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing start and end date pickers working together to form a date range selector.',
      },
    },
  },
  render: () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    return (
      <div className="space-y-4">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={endDate || undefined}
          helperText="Select start date"
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate || undefined}
          helperText="Select end date"
        />
        {startDate && endDate && (
          <div className="mt-4 p-3 rounded-md bg-[color:var(--semantic-surface-elevated)] text-sm">
            <strong>Selected Range:</strong><br />
            {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
          </div>
        )}
      </div>
    );
  },
};

export const BirthdayPicker: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Birthday date picker with max date set to 18 years ago, useful for age verification.',
      },
    },
  },
  render: () => {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    
    return (
      <DatePicker
        label="Date of Birth"
        max={eighteenYearsAgo.toISOString().split('T')[0]}
        helperText="Must be 18 years or older"
      />
    );
  },
};

export const BookingForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world booking form example with check-in and check-out dates.',
      },
    },
  },
  render: () => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const today = new Date().toISOString().split('T')[0];
    
    const minCheckOut = checkIn || today;
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[color:var(--semantic-text-primary)]">
          Book Your Stay
        </h3>
        <DatePicker
          label="Check-in Date"
          value={checkIn}
          onChange={(e) => {
            setCheckIn(e.target.value);
            if (checkOut && e.target.value >= checkOut) {
              setCheckOut('');
            }
          }}
          min={today}
          helperText="Select your arrival date"
        />
        <DatePicker
          label="Check-out Date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          min={minCheckOut}
          disabled={!checkIn}
          helperText={!checkIn ? 'Please select check-in date first' : 'Select your departure date'}
        />
        {checkIn && checkOut && (
          <div className="mt-4 p-4 rounded-md bg-[color:var(--semantic-status-success-alpha)] text-sm">
            <strong className="text-[color:var(--semantic-status-success-default)]">Booking Summary</strong><br />
            <div className="mt-2 text-[color:var(--semantic-text-primary)]">
              Check-in: {new Date(checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}<br />
              Check-out: {new Date(checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}<br />
              <strong>Nights: {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))}</strong>
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
        story: 'Comparison of all available date picker sizes.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <DatePicker
        size="small"
        label="Small"
        defaultValue="2024-01-15"
      />
      <DatePicker
        size="default"
        label="Default"
        defaultValue="2024-01-15"
      />
      <DatePicker
        size="large"
        label="Large"
        defaultValue="2024-01-15"
      />
    </div>
  ),
};

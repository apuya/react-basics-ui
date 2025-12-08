import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { DatePickerTrigger } from './DatePickerTrigger';
import { DatePickerContent } from './DatePickerContent';
import { Calendar } from './Calendar';
import { DatePickerPresets, DEFAULT_PRESETS } from './DatePickerPresets';
import { DatePickerConfirmation } from './DatePickerConfirmation';
import type { DateRange } from './DatePicker.types';
import {
  CONTENT_ROW_CLASSES,
  PRESETS_WRAPPER_CLASSES,
} from './DatePicker.styles';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A compound component for date selection with support for single dates and date ranges.

## Variants
- \`single\` - Single calendar with single date selection
- \`single-range\` - Single calendar with date range selection
- \`double-range\` - Dual calendar with date range selection
- \`double-presets\` - Dual calendar with presets sidebar

## Compound Components
- \`DatePicker\` - Root component that provides context
- \`DatePickerTrigger\` - Button that opens the picker
- \`DatePickerContent\` - Popover container
- \`Calendar\` - Calendar grid (single or dual variant)
- \`DatePickerPresets\` - Quick preset selections
- \`DatePickerConfirmation\` - Date inputs with cancel/apply buttons
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['single', 'single-range', 'double-range', 'double-presets'],
      description: 'Layout variant for the date picker',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the trigger button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether to show error state',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Whether to close on date selection (single mode only)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// ============================================================================
// Single Date Picker
// ============================================================================

export const Single: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    
    return (
      <div style={{ minHeight: '400px' }}>
        <DatePicker variant="single" value={date} onChange={setDate}>
          <DatePickerTrigger placeholder="Select date" />
          <DatePickerContent>
            <Calendar
              selectedDate={date}
              onDateSelect={(d) => setDate(d)}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

export const SingleWithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    
    return (
      <div style={{ minHeight: '400px' }}>
        <DatePicker variant="single" value={date} onChange={setDate}>
          <DatePickerTrigger placeholder="Select date" />
          <DatePickerContent>
            <Calendar
              selectedDate={date}
              onDateSelect={(d) => setDate(d)}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

// ============================================================================
// Single Range Picker
// ============================================================================

export const SingleRange: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });
    const [startValue, setStartValue] = useState('');
    const [endValue, setEndValue] = useState('');
    
    const handleDateSelect = (date: Date) => {
      if (!range.start || (range.start && range.end)) {
        setRange({ start: date, end: null });
        setStartValue(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
        setEndValue('');
      } else {
        const newRange = date < range.start 
          ? { start: date, end: range.start }
          : { start: range.start, end: date };
        setRange(newRange);
        setStartValue(newRange.start!.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
        setEndValue(newRange.end!.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
      }
    };
    
    return (
      <div style={{ minHeight: '450px' }}>
        <DatePicker variant="single-range" rangeValue={range} onRangeChange={setRange}>
          <DatePickerTrigger placeholder="Select date range" />
          <DatePickerContent>
            <Calendar
              selectedRange={range}
              onDateSelect={handleDateSelect}
              isRangeMode
            />
            <DatePickerConfirmation
              stacked
              startDateValue={startValue}
              endDateValue={endValue}
              onStartDateChange={setStartValue}
              onEndDateChange={setEndValue}
              onCancel={() => {
                setRange({ start: null, end: null });
                setStartValue('');
                setEndValue('');
              }}
              onApply={() => console.log('Applied:', range)}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

// ============================================================================
// Double Range Picker
// ============================================================================

export const DoubleRange: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });
    const [startValue, setStartValue] = useState('');
    const [endValue, setEndValue] = useState('');
    
    const handleDateSelect = (date: Date) => {
      if (!range.start || (range.start && range.end)) {
        setRange({ start: date, end: null });
        setStartValue(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
        setEndValue('');
      } else {
        const newRange = date < range.start 
          ? { start: date, end: range.start }
          : { start: range.start, end: date };
        setRange(newRange);
        setStartValue(newRange.start!.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
        setEndValue(newRange.end!.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
      }
    };
    
    return (
      <div style={{ minHeight: '450px' }}>
        <DatePicker variant="double-range" rangeValue={range} onRangeChange={setRange}>
          <DatePickerTrigger placeholder="Select date range" />
          <DatePickerContent>
            <Calendar
              variant="dual"
              selectedRange={range}
              onDateSelect={handleDateSelect}
              isRangeMode
            />
            <DatePickerConfirmation
              startDateValue={startValue}
              endDateValue={endValue}
              onStartDateChange={setStartValue}
              onEndDateChange={setEndValue}
              onCancel={() => {
                setRange({ start: null, end: null });
                setStartValue('');
                setEndValue('');
              }}
              onApply={() => console.log('Applied:', range)}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

// ============================================================================
// Double with Presets
// ============================================================================

export const DoublePresets: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });
    const [selectedPreset, setSelectedPreset] = useState<string | undefined>();
    const [startValue, setStartValue] = useState('');
    const [endValue, setEndValue] = useState('');
    
    const handleDateSelect = (date: Date) => {
      setSelectedPreset(undefined);
      if (!range.start || (range.start && range.end)) {
        setRange({ start: date, end: null });
        setStartValue(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
        setEndValue('');
      } else {
        const newRange = date < range.start 
          ? { start: date, end: range.start }
          : { start: range.start, end: date };
        setRange(newRange);
        setStartValue(newRange.start!.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
        setEndValue(newRange.end!.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
      }
    };
    
    const handlePresetSelect = (presetRange: DateRange) => {
      setRange(presetRange);
      if (presetRange.start) {
        setStartValue(presetRange.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
      }
      if (presetRange.end) {
        setEndValue(presetRange.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
      }
    };
    
    return (
      <div style={{ minHeight: '450px' }}>
        <DatePicker variant="double-presets" rangeValue={range} onRangeChange={setRange}>
          <DatePickerTrigger placeholder="Select date range" />
          <DatePickerContent>
            {/* Row: Presets | Calendars */}
            <div className={CONTENT_ROW_CLASSES}>
              {/* Presets wrapper for height constraint */}
              <div className={PRESETS_WRAPPER_CLASSES}>
                <DatePickerPresets
                  variant="positioned"
                  presets={DEFAULT_PRESETS}
                  selectedPreset={selectedPreset}
                  onPresetSelect={(presetRange) => {
                    handlePresetSelect(presetRange);
                    const preset = DEFAULT_PRESETS.find(p => {
                      const value = p.getValue();
                      return value.start?.getTime() === presetRange.start?.getTime() &&
                             value.end?.getTime() === presetRange.end?.getTime();
                    });
                    setSelectedPreset(preset?.label);
                  }}
                />
              </div>
              <Calendar
                variant="dual"
                selectedRange={range}
                onDateSelect={handleDateSelect}
                isRangeMode
              />
            </div>
            {/* Footer: Confirmation spanning full width */}
            <DatePickerConfirmation
              startDateValue={startValue}
              endDateValue={endValue}
              onStartDateChange={setStartValue}
              onEndDateChange={setEndValue}
              onCancel={() => {
                setRange({ start: null, end: null });
                setStartValue('');
                setEndValue('');
                setSelectedPreset(undefined);
              }}
              onApply={() => console.log('Applied:', range)}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

// ============================================================================
// Sizes
// ============================================================================

export const SmallSize: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    
    return (
      <div style={{ minHeight: '400px' }}>
        <DatePicker variant="single" size="small" value={date} onChange={setDate}>
          <DatePickerTrigger placeholder="Select date" />
          <DatePickerContent>
            <Calendar
              selectedDate={date}
              onDateSelect={(d) => setDate(d)}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

export const LargeSize: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    
    return (
      <div style={{ minHeight: '400px' }}>
        <DatePicker variant="single" size="large" value={date} onChange={setDate}>
          <DatePickerTrigger placeholder="Select date" />
          <DatePickerContent>
            <Calendar
              selectedDate={date}
              onDateSelect={(d) => setDate(d)}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

// ============================================================================
// States
// ============================================================================

export const Disabled: Story = {
  render: () => {
    return (
      <div style={{ minHeight: '400px' }}>
        <DatePicker variant="single" disabled>
          <DatePickerTrigger placeholder="Select date" />
          <DatePickerContent>
            <Calendar />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

export const Error: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    
    return (
      <div style={{ minHeight: '400px' }}>
        <DatePicker variant="single" error value={date} onChange={setDate}>
          <DatePickerTrigger placeholder="Select date" />
          <DatePickerContent>
            <Calendar
              selectedDate={date}
              onDateSelect={(d) => setDate(d)}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

// ============================================================================
// Min/Max Date Constraints
// ============================================================================

export const WithMinDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    
    return (
      <div style={{ minHeight: '400px' }}>
        <p className="text-sm text-gray-500 mb-4">Cannot select dates before today</p>
        <DatePicker variant="single" value={date} onChange={setDate} minDate={today}>
          <DatePickerTrigger placeholder="Select future date" />
          <DatePickerContent>
            <Calendar
              selectedDate={date}
              onDateSelect={setDate}
              minDate={today}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

export const WithMaxDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    
    return (
      <div style={{ minHeight: '400px' }}>
        <p className="text-sm text-gray-500 mb-4">Cannot select dates after today</p>
        <DatePicker variant="single" value={date} onChange={setDate} maxDate={today}>
          <DatePickerTrigger placeholder="Select past date" />
          <DatePickerContent>
            <Calendar
              selectedDate={date}
              onDateSelect={setDate}
              maxDate={today}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

export const WithDateRange: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const minDate = new Date(2025, 10, 1); // Nov 1, 2025
    const maxDate = new Date(2025, 11, 31); // Dec 31, 2025
    
    return (
      <div style={{ minHeight: '400px' }}>
        <p className="text-sm text-gray-500 mb-4">Only dates in Nov-Dec 2025 can be selected</p>
        <DatePicker
          variant="single"
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
        >
          <DatePickerTrigger placeholder="Select date" />
          <DatePickerContent>
            <Calendar
              selectedDate={date}
              onDateSelect={setDate}
              minDate={minDate}
              maxDate={maxDate}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
};

// ============================================================================
// Controlled Mode
// ============================================================================

export const ControlledOpen: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div style={{ minHeight: '400px' }}>
        <div className="flex gap-2 mb-4">
          <button
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
            onClick={() => setIsOpen(true)}
          >
            Open Picker
          </button>
          <button
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Close Picker
          </button>
        </div>
        <DatePicker
          variant="single"
          value={date}
          onChange={setDate}
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <DatePickerTrigger placeholder="Controlled open state" />
          <DatePickerContent>
            <Calendar selectedDate={date} onDateSelect={setDate} />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'The open state can be controlled externally via `open` and `onOpenChange` props.',
      },
    },
  },
};

export const DefaultOpen: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    
    return (
      <div style={{ minHeight: '400px' }}>
        <DatePicker variant="single" value={date} onChange={setDate} defaultOpen>
          <DatePickerTrigger placeholder="Opens by default" />
          <DatePickerContent>
            <Calendar selectedDate={date} onDateSelect={setDate} />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'The picker can be set to open by default using `defaultOpen`.',
      },
    },
  },
};

// ============================================================================
// First Day of Week
// ============================================================================

export const MondayFirstDay: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    
    return (
      <div style={{ minHeight: '400px' }}>
        <DatePicker variant="single" value={date} onChange={setDate} firstDayOfWeek={1}>
          <DatePickerTrigger placeholder="Week starts Monday" />
          <DatePickerContent>
            <Calendar
              selectedDate={date}
              onDateSelect={setDate}
              firstDayOfWeek={1}
            />
          </DatePickerContent>
        </DatePicker>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar can start on Monday (or any other day) using `firstDayOfWeek`.',
      },
    },
  },
};

// ============================================================================
// All Variants Showcase
// ============================================================================

export const AllVariants: Story = {
  render: () => {
    const [singleDate, setSingleDate] = useState<Date | null>(null);
    const [singleRange, setSingleRange] = useState<DateRange>({ start: null, end: null });
    const [doubleRange, setDoubleRange] = useState<DateRange>({ start: null, end: null });
    const [presetsRange, setPresetsRange] = useState<DateRange>({ start: null, end: null });

    const formatDate = (d: Date) =>
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const handleRangeSelect =
      (range: DateRange, setRange: (r: DateRange) => void) => (date: Date) => {
        if (!range.start || (range.start && range.end)) {
          setRange({ start: date, end: null });
        } else {
          const newRange =
            date < range.start
              ? { start: date, end: range.start }
              : { start: range.start, end: date };
          setRange(newRange);
        }
      };

    return (
      <div className="flex flex-col gap-8" style={{ minHeight: '500px' }}>
        {/* Single */}
        <div>
          <p className="text-sm font-medium mb-2">Single Date</p>
          <DatePicker variant="single" value={singleDate} onChange={setSingleDate}>
            <DatePickerTrigger placeholder="Select date" />
            <DatePickerContent>
              <Calendar selectedDate={singleDate} onDateSelect={setSingleDate} />
            </DatePickerContent>
          </DatePicker>
        </div>

        {/* Single Range */}
        <div>
          <p className="text-sm font-medium mb-2">Single Range</p>
          <DatePicker variant="single-range" rangeValue={singleRange} onRangeChange={setSingleRange}>
            <DatePickerTrigger placeholder="Select range" />
            <DatePickerContent>
              <Calendar
                selectedRange={singleRange}
                onDateSelect={handleRangeSelect(singleRange, setSingleRange)}
                isRangeMode
              />
              <DatePickerConfirmation
                startDateValue={singleRange.start ? formatDate(singleRange.start) : ''}
                endDateValue={singleRange.end ? formatDate(singleRange.end) : ''}
                onCancel={() => setSingleRange({ start: null, end: null })}
                onApply={() => console.log('Single range:', singleRange)}
              />
            </DatePickerContent>
          </DatePicker>
        </div>

        {/* Double Range */}
        <div>
          <p className="text-sm font-medium mb-2">Double Range</p>
          <DatePicker variant="double-range" rangeValue={doubleRange} onRangeChange={setDoubleRange}>
            <DatePickerTrigger placeholder="Select range" />
            <DatePickerContent>
              <Calendar
                variant="dual"
                selectedRange={doubleRange}
                onDateSelect={handleRangeSelect(doubleRange, setDoubleRange)}
                isRangeMode
              />
              <DatePickerConfirmation
                startDateValue={doubleRange.start ? formatDate(doubleRange.start) : ''}
                endDateValue={doubleRange.end ? formatDate(doubleRange.end) : ''}
                onCancel={() => setDoubleRange({ start: null, end: null })}
                onApply={() => console.log('Double range:', doubleRange)}
              />
            </DatePickerContent>
          </DatePicker>
        </div>

        {/* Double with Presets */}
        <div>
          <p className="text-sm font-medium mb-2">Double with Presets</p>
          <DatePicker variant="double-presets" rangeValue={presetsRange} onRangeChange={setPresetsRange}>
            <DatePickerTrigger placeholder="Select range" />
            <DatePickerContent>
              <div className={CONTENT_ROW_CLASSES}>
                <DatePickerPresets
                  presets={DEFAULT_PRESETS}
                  onPresetSelect={setPresetsRange}
                />
                <Calendar
                  variant="dual"
                  selectedRange={presetsRange}
                  onDateSelect={handleRangeSelect(presetsRange, setPresetsRange)}
                  isRangeMode
                />
              </div>
              <DatePickerConfirmation
                startDateValue={presetsRange.start ? formatDate(presetsRange.start) : ''}
                endDateValue={presetsRange.end ? formatDate(presetsRange.end) : ''}
                onCancel={() => setPresetsRange({ start: null, end: null })}
                onApply={() => console.log('Presets range:', presetsRange)}
              />
            </DatePickerContent>
          </DatePicker>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All four variants displayed together for comparison.',
      },
    },
  },
};

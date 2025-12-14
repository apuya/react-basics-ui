import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { DEFAULT_PRESETS } from './DatePickerPresets';
import type { DateRange, CellState } from './DatePicker.types';
import {
  CONTENT_ROW_CLASSES,
  CONTENT_ROW_STYLE,
  PRESETS_WRAPPER_CLASSES,
  PRESETS_WRAPPER_STYLE,
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
- \`DatePicker.Trigger\` - Button that opens the picker
- \`DatePicker.Content\` - Popover container
- \`DatePicker.Calendar\` - Calendar grid (single or dual variant)
- \`DatePicker.Presets\` - Quick preset selections
- \`DatePicker.Confirmation\` - Date inputs with cancel/apply buttons
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
          <DatePicker.Trigger placeholder="Select date" />
          <DatePicker.Content>
            <DatePicker.Calendar
              selectedDate={date}
              onDateSelect={setDate}
            />
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Select date" />
          <DatePicker.Content>
            <DatePicker.Calendar
              selectedDate={date}
              onDateSelect={(d) => setDate(d)}
            />
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Select date range" />
          <DatePicker.Content>
            <DatePicker.Calendar
              selectedRange={range}
              onDateSelect={handleDateSelect}
              isRangeMode
            />
            <DatePicker.Confirmation
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
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Select date range" />
          <DatePicker.Content>
            <DatePicker.Calendar
              variant="dual"
              selectedRange={range}
              onDateSelect={handleDateSelect}
              isRangeMode
            />
            <DatePicker.Confirmation
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
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Select date range" />
          <DatePicker.Content>
            {/* Row: Presets | Calendars */}
            <div className={CONTENT_ROW_CLASSES} style={CONTENT_ROW_STYLE}>
              {/* Presets wrapper for height constraint */}
              <div className={PRESETS_WRAPPER_CLASSES} style={PRESETS_WRAPPER_STYLE}>
                <DatePicker.Presets
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
              <DatePicker.Calendar
                variant="dual"
                selectedRange={range}
                onDateSelect={handleDateSelect}
                isRangeMode
              />
            </div>
            {/* Footer: Confirmation spanning full width */}
            <DatePicker.Confirmation
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
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Select date" />
          <DatePicker.Content>
            <DatePicker.Calendar
              selectedDate={date}
              onDateSelect={(d) => setDate(d)}
            />
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Select date" />
          <DatePicker.Content>
            <DatePicker.Calendar
              selectedDate={date}
              onDateSelect={(d) => setDate(d)}
            />
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Select date" />
          <DatePicker.Content>
            <DatePicker.Calendar />
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Select date" />
          <DatePicker.Content>
            <DatePicker.Calendar
              selectedDate={date}
              onDateSelect={(d) => setDate(d)}
            />
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Select future date" />
          <DatePicker.Content>
            <DatePicker.Calendar
              selectedDate={date}
              onDateSelect={setDate}
              minDate={today}
            />
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Select past date" />
          <DatePicker.Content>
            <DatePicker.Calendar
              selectedDate={date}
              onDateSelect={setDate}
              maxDate={today}
            />
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Select date" />
          <DatePicker.Content>
            <DatePicker.Calendar
              selectedDate={date}
              onDateSelect={setDate}
              minDate={minDate}
              maxDate={maxDate}
            />
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Controlled open state" />
          <DatePicker.Content>
            <DatePicker.Calendar selectedDate={date} onDateSelect={setDate} />
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Opens by default" />
          <DatePicker.Content>
            <DatePicker.Calendar selectedDate={date} onDateSelect={setDate} />
          </DatePicker.Content>
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
          <DatePicker.Trigger placeholder="Week starts Monday" />
          <DatePicker.Content>
            <DatePicker.Calendar
              selectedDate={date}
              onDateSelect={setDate}
              firstDayOfWeek={1}
            />
          </DatePicker.Content>
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
            <DatePicker.Trigger placeholder="Select date" />
            <DatePicker.Content>
              <DatePicker.Calendar selectedDate={singleDate} onDateSelect={setSingleDate} />
            </DatePicker.Content>
          </DatePicker>
        </div>

        {/* Single Range */}
        <div>
          <p className="text-sm font-medium mb-2">Single Range</p>
          <DatePicker variant="single-range" rangeValue={singleRange} onRangeChange={setSingleRange}>
            <DatePicker.Trigger placeholder="Select range" />
            <DatePicker.Content>
              <DatePicker.Calendar
                selectedRange={singleRange}
                onDateSelect={handleRangeSelect(singleRange, setSingleRange)}
                isRangeMode
              />
              <DatePicker.Confirmation
                startDateValue={singleRange.start ? formatDate(singleRange.start) : ''}
                endDateValue={singleRange.end ? formatDate(singleRange.end) : ''}
                onCancel={() => setSingleRange({ start: null, end: null })}
                onApply={() => console.log('Single range:', singleRange)}
              />
            </DatePicker.Content>
          </DatePicker>
        </div>

        {/* Double Range */}
        <div>
          <p className="text-sm font-medium mb-2">Double Range</p>
          <DatePicker variant="double-range" rangeValue={doubleRange} onRangeChange={setDoubleRange}>
            <DatePicker.Trigger placeholder="Select range" />
            <DatePicker.Content>
              <DatePicker.Calendar
                variant="dual"
                selectedRange={doubleRange}
                onDateSelect={handleRangeSelect(doubleRange, setDoubleRange)}
                isRangeMode
              />
              <DatePicker.Confirmation
                startDateValue={doubleRange.start ? formatDate(doubleRange.start) : ''}
                endDateValue={doubleRange.end ? formatDate(doubleRange.end) : ''}
                onCancel={() => setDoubleRange({ start: null, end: null })}
                onApply={() => console.log('Double range:', doubleRange)}
              />
            </DatePicker.Content>
          </DatePicker>
        </div>

        {/* Double with Presets */}
        <div>
          <p className="text-sm font-medium mb-2">Double with Presets</p>
          <DatePicker variant="double-presets" rangeValue={presetsRange} onRangeChange={setPresetsRange}>
            <DatePicker.Trigger placeholder="Select range" />
            <DatePicker.Content>
              <div className={CONTENT_ROW_CLASSES}>
                <DatePicker.Presets
                  presets={DEFAULT_PRESETS}
                  onPresetSelect={setPresetsRange}
                />
                <DatePicker.Calendar
                  variant="dual"
                  selectedRange={presetsRange}
                  onDateSelect={handleRangeSelect(presetsRange, setPresetsRange)}
                  isRangeMode
                />
              </div>
              <DatePicker.Confirmation
                startDateValue={presetsRange.start ? formatDate(presetsRange.start) : ''}
                endDateValue={presetsRange.end ? formatDate(presetsRange.end) : ''}
                onCancel={() => setPresetsRange({ start: null, end: null })}
                onApply={() => console.log('Presets range:', presetsRange)}
              />
            </DatePicker.Content>
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

// ============================================================================
// Sub-Component: Cell States
// ============================================================================

export const CellStates: Story = {
  render: () => {
    const states: { state: CellState; label?: string }[] = [
      { state: 'default' },
      { state: 'selected' },
      { state: 'range-start' },
      { state: 'range-end' },
      { state: 'in-range' },
      { state: 'today' },
      { state: 'disabled' },
      { state: 'outside-month' },
      { state: 'header', label: 'Mon' },
    ];

    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium mb-2">All Cell States</p>
        {states.map(({ state, label }) => (
          <div key={state} className="flex items-center gap-4">
            <span className="w-28 text-sm text-neutral-500 capitalize">{state}</span>
            <DatePicker.Cell
              state={state}
              date={state !== 'header' ? new Date(2025, 10, 15) : undefined}
              label={label ?? '15'}
              isToday={state === 'today'}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All possible visual states for calendar cells.',
      },
    },
  },
};

// ============================================================================
// Sub-Component: Confirmation Layouts
// ============================================================================

export const ConfirmationLayouts: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">Inline (Double Calendar)</p>
        <div style={{ width: 560 }}>
          <DatePicker.Confirmation
            startDateValue="Nov 1, 2025"
            endDateValue="Nov 15, 2025"
            onCancel={() => console.log('Cancel')}
            onApply={() => console.log('Apply')}
          />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Stacked (Single Calendar)</p>
        <div style={{ width: 280 }}>
          <DatePicker.Confirmation
            stacked
            startDateValue="Nov 1, 2025"
            endDateValue="Nov 15, 2025"
            onCancel={() => console.log('Cancel')}
            onApply={() => console.log('Apply')}
          />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Empty State</p>
        <div style={{ width: 560 }}>
          <DatePicker.Confirmation
            startDateValue=""
            endDateValue=""
            onCancel={() => console.log('Cancel')}
            onApply={() => console.log('Apply')}
            applyDisabled
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Confirmation footer layouts for different calendar configurations.',
      },
    },
  },
};

// ============================================================================
// Sub-Component: Presets
// ============================================================================

export const PresetsShowcase: Story = {
  render: () => {
    const [selectedPreset, setSelectedPreset] = useState<string | undefined>(undefined);
    const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });

    const handlePresetSelect = (range: DateRange) => {
      setSelectedRange(range);
      const preset = DEFAULT_PRESETS.find((p) => {
        const r = p.getValue();
        return r.start?.getTime() === range.start?.getTime() && r.end?.getTime() === range.end?.getTime();
      });
      setSelectedPreset(preset?.label);
    };

    const formatDate = (d: Date) =>
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
      <div className="flex gap-6">
        <div>
          <p className="text-sm font-medium mb-2">Presets</p>
          <DatePicker.Presets
            presets={DEFAULT_PRESETS}
            onPresetSelect={handlePresetSelect}
            selectedPreset={selectedPreset}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Selected</p>
          <p className="text-sm text-neutral-500">
            {selectedPreset ?? 'None'}
          </p>
          {selectedRange.start && (
            <p className="text-xs text-neutral-400">
              {formatDate(selectedRange.start)} - {selectedRange.end ? formatDate(selectedRange.end) : '...'}
            </p>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Quick preset selections for common date ranges.',
      },
    },
  },
};

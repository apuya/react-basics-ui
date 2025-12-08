import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimePicker } from './TimePicker';
import { TimePickerContext, type TimePickerContextValue } from './TimePickerContext';
import { TimePickerTrigger } from './TimePickerTrigger';
import { TimePickerMenu } from './TimePickerMenu';
import { TimePickerLabel } from './TimePickerLabel';
import { TimePickerHelper } from './TimePickerHelper';

const meta: Meta<typeof TimePicker> = {
  title: 'Forms/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A time picker component with three-column selection for hour, minute, and AM/PM. Features a button trigger with clock icon, dropdown with independent scrollable columns, and 12-hour display format. Supports custom step intervals for minute options and controlled/uncontrolled modes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    step: { control: 'number' },
    value: { control: 'text' },
    defaultValue: { control: 'text' },
  },
  decorators: [(Story) => <div style={{ width: '320px', minHeight: '400px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    label: 'Select Time',
    placeholder: 'Choose a time',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Meeting Time',
    defaultValue: '14:30',
    helperText: 'Pre-selected time displays in 12-hour format',
  },
};

export const Required: Story = {
  args: {
    label: 'Appointment Time',
    required: true,
    helperText: 'This field is required',
  },
};

// ============================================================================
// Sizes & States
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <TimePicker size="small" label="Small" defaultValue="09:00" />
      <TimePicker size="default" label="Default" defaultValue="09:00" />
      <TimePicker size="large" label="Large" defaultValue="09:00" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <TimePicker label="Default" helperText="Normal state" />
      <TimePicker label="Error" error helperText="Please select a valid time" />
      <TimePicker label="Disabled" disabled defaultValue="09:00" helperText="Cannot be changed" />
    </div>
  ),
};

// ============================================================================
// Step Intervals
// ============================================================================

export const Intervals: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The step prop controls minute options: 900 (15min), 1800 (30min), 3600 (1hr).',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <TimePicker label="15-Minute Steps" step={900} helperText="step={900}" />
      <TimePicker label="30-Minute Steps" step={1800} helperText="step={1800} (default)" />
      <TimePicker label="Hourly Steps" step={3600} helperText="step={3600}" />
    </div>
  ),
};

// ============================================================================
// Interactive Examples
// ============================================================================

export const Controlled: Story = {
  render: () => {
    const [time, setTime] = useState('');
    
    const formatDisplay = (timeStr: string) => {
      if (!timeStr) return 'No time selected';
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };
    
    return (
      <div className="space-y-4">
        <TimePicker
          label="Select Time"
          value={time}
          onChange={setTime}
          helperText="Controlled component with external state"
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-[color:var(--semantic-text-secondary)]">
            Value: <strong>{formatDisplay(time)}</strong>
          </span>
          <button
            onClick={() => setTime('')}
            className="text-[color:var(--semantic-interactive-primary)] hover:underline"
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

export const WithConfirmation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Menu with Cancel and Save buttons for explicit confirmation before applying selection.',
      },
    },
  },
  render: () => {
    const [time, setTime] = useState('');
    const [pendingTime, setPendingTime] = useState('');
    
    const formatDisplay = (timeStr: string) => {
      if (!timeStr) return 'No time selected';
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };
    
    return (
      <div className="space-y-4">
        <TimePicker
          label="Appointment Time"
          value={time}
          onChange={setPendingTime}
          showConfirmation
          cancelLabel="Cancel"
          saveLabel="Confirm"
          onCancel={() => setPendingTime(time)}
          onSave={() => setTime(pendingTime)}
          helperText="Click Save to confirm your selection"
        />
        <div className="text-sm text-[color:var(--semantic-text-secondary)]">
          Confirmed: <strong>{formatDisplay(time)}</strong>
        </div>
      </div>
    );
  },
};

export const TimeRange: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Two time pickers working together for start/end time selection with duration calculation.',
      },
    },
  },
  render: () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    
    const formatDisplay = (timeStr: string) => {
      if (!timeStr) return '';
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };
    
    const getDuration = () => {
      if (!startTime || !endTime) return null;
      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);
      const mins = (eh * 60 + em) - (sh * 60 + sm);
      if (mins <= 0) return null;
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return `${h}h${m > 0 ? ` ${m}m` : ''}`;
    };
    
    return (
      <div className="space-y-4">
        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
          step={900}
        />
        <TimePicker
          label="End Time"
          value={endTime}
          onChange={setEndTime}
          step={900}
          disabled={!startTime}
          helperText={!startTime ? 'Select start time first' : undefined}
        />
        {getDuration() && (
          <div className="p-3 rounded-md bg-[color:var(--semantic-surface-elevated)] text-sm">
            <strong>Duration:</strong> {getDuration()}
            <span className="text-[color:var(--semantic-text-secondary)] ml-2">
              ({formatDisplay(startTime)} – {formatDisplay(endTime)})
            </span>
          </div>
        )}
      </div>
    );
  },
};

// ============================================================================
// Sub-Components (Isolated)
// ============================================================================

const createMockContext = (overrides: Partial<TimePickerContextValue> = {}): TimePickerContextValue => ({
  isOpen: false,
  setIsOpen: () => {},
  value: undefined,
  setValue: () => {},
  selectedHour: undefined,
  setSelectedHour: () => {},
  selectedMinute: undefined,
  setSelectedMinute: () => {},
  selectedMeridiem: 'AM',
  setSelectedMeridiem: () => {},
  disabled: false,
  error: false,
  size: 'default',
  step: 1800,
  min: undefined,
  max: undefined,
  triggerId: 'trigger-id',
  menuId: 'menu-id',
  labelId: 'label-id',
  ...overrides,
});

const MenuWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-64 bg-[color:var(--component-dropdown-bg)] border border-[color:var(--component-dropdown-border)] rounded-[length:var(--component-dropdown-radius)] shadow-[shadow:var(--component-dropdown-shadow)] overflow-hidden">
    {children}
  </div>
);

export const SubTrigger: Story = {
  name: 'Sub: Trigger',
  decorators: [],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-[color:var(--semantic-text-secondary)] mb-2 font-medium">States</p>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Default', props: {} },
            { label: 'With Value', props: { value: '14:30' } },
            { label: 'Open', props: { isOpen: true } },
            { label: 'Error', props: { error: true } },
            { label: 'Disabled', props: { disabled: true, value: '09:00' } },
          ].map(({ label, props }) => (
            <div key={label} style={{ width: 200 }}>
              <p className="text-xs text-[color:var(--semantic-text-tertiary)] mb-1">{label}</p>
              <TimePickerContext.Provider value={createMockContext(props)}>
                <TimePickerTrigger placeholder="Select time" />
              </TimePickerContext.Provider>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-[color:var(--semantic-text-secondary)] mb-2 font-medium">Sizes</p>
        <div className="flex flex-wrap items-end gap-4">
          {(['small', 'default', 'large'] as const).map((size) => (
            <div key={size} style={{ width: 200 }}>
              <p className="text-xs text-[color:var(--semantic-text-tertiary)] mb-1">{size}</p>
              <TimePickerContext.Provider value={createMockContext({ size, value: '10:00' })}>
                <TimePickerTrigger />
              </TimePickerContext.Provider>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const SubMenu: Story = {
  name: 'Sub: Menu',
  decorators: [],
  parameters: { layout: 'padded' },
  render: () => {
    const [h1, setH1] = useState<number | undefined>(undefined);
    const [m1, setM1] = useState<number | undefined>(undefined);
    const [mer1, setMer1] = useState<'AM' | 'PM'>('AM');
    
    const [h2, setH2] = useState<number | undefined>(2);
    const [m2, setM2] = useState<number | undefined>(30);
    const [mer2, setMer2] = useState<'AM' | 'PM'>('PM');
    
    const [h3, setH3] = useState<number | undefined>(10);
    const [m3, setM3] = useState<number | undefined>(30);
    const [mer3, setMer3] = useState<'AM' | 'PM'>('AM');
    
    return (
      <div className="flex gap-6">
        <div>
          <p className="text-xs text-[color:var(--semantic-text-secondary)] mb-2">Empty</p>
          <MenuWrapper>
            <TimePickerContext.Provider value={createMockContext({
              isOpen: true, step: 1800,
              selectedHour: h1, setSelectedHour: setH1,
              selectedMinute: m1, setSelectedMinute: setM1,
              selectedMeridiem: mer1, setSelectedMeridiem: setMer1,
            })}>
              <TimePickerMenu />
            </TimePickerContext.Provider>
          </MenuWrapper>
        </div>
        
        <div>
          <p className="text-xs text-[color:var(--semantic-text-secondary)] mb-2">With Selection</p>
          <MenuWrapper>
            <TimePickerContext.Provider value={createMockContext({
              isOpen: true, step: 1800,
              selectedHour: h2, setSelectedHour: setH2,
              selectedMinute: m2, setSelectedMinute: setM2,
              selectedMeridiem: mer2, setSelectedMeridiem: setMer2,
            })}>
              <TimePickerMenu />
            </TimePickerContext.Provider>
          </MenuWrapper>
        </div>
        
        <div>
          <p className="text-xs text-[color:var(--semantic-text-secondary)] mb-2">With Confirmation</p>
          <MenuWrapper>
            <TimePickerContext.Provider value={createMockContext({
              isOpen: true, step: 1800,
              selectedHour: h3, setSelectedHour: setH3,
              selectedMinute: m3, setSelectedMinute: setM3,
              selectedMeridiem: mer3, setSelectedMeridiem: setMer3,
            })}>
              <TimePickerMenu showConfirmation />
            </TimePickerContext.Provider>
          </MenuWrapper>
        </div>
      </div>
    );
  },
};

export const SubLabelHelper: Story = {
  name: 'Sub: Label & Helper',
  decorators: [],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-[color:var(--semantic-text-secondary)] mb-2 font-medium">Labels</p>
        <div className="flex gap-8">
          <TimePickerContext.Provider value={createMockContext()}>
            <TimePickerLabel>Default Label</TimePickerLabel>
          </TimePickerContext.Provider>
          <TimePickerContext.Provider value={createMockContext()}>
            <TimePickerLabel required>Required Label</TimePickerLabel>
          </TimePickerContext.Provider>
          <TimePickerContext.Provider value={createMockContext({ error: true })}>
            <TimePickerLabel required>Error Label</TimePickerLabel>
          </TimePickerContext.Provider>
        </div>
      </div>
      <div>
        <p className="text-xs text-[color:var(--semantic-text-secondary)] mb-2 font-medium">Helper Text</p>
        <div className="flex gap-8">
          <TimePickerContext.Provider value={createMockContext()}>
            <TimePickerHelper>Default helper text</TimePickerHelper>
          </TimePickerContext.Provider>
          <TimePickerContext.Provider value={createMockContext({ error: true })}>
            <TimePickerHelper>Error helper text</TimePickerHelper>
          </TimePickerContext.Provider>
        </div>
      </div>
    </div>
  ),
};

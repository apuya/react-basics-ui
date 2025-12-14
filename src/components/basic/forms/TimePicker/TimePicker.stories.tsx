import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimePicker } from './TimePicker';
import { FormField } from '../FormField';
import { TimePickerContext, type TimePickerContextValue } from './TimePickerContext';

const meta: Meta<typeof TimePicker> = {
  title: 'Forms/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A composable time picker component with three-column selection for hour, minute, and AM/PM. Use with FormField for labels and helper text. Features a button trigger with clock icon, dropdown with independent scrollable columns, and 12-hour display format. Supports custom step intervals for minute options and controlled/uncontrolled modes.',
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
  render: () => (
    <FormField>
      <FormField.Label>Select Time</FormField.Label>
      <TimePicker>
        <TimePicker.Trigger placeholder="Choose a time" />
        <TimePicker.Menu />
      </TimePicker>
    </FormField>
  ),
};

export const WithValue: Story = {
  render: () => (
    <FormField>
      <FormField.Label>Meeting Time</FormField.Label>
      <TimePicker defaultValue="14:30">
        <TimePicker.Trigger />
        <TimePicker.Menu />
      </TimePicker>
      <FormField.HelperText>Pre-selected time displays in 12-hour format</FormField.HelperText>
    </FormField>
  ),
};

export const Required: Story = {
  render: () => (
    <FormField required>
      <FormField.Label>Appointment Time</FormField.Label>
      <TimePicker>
        <TimePicker.Trigger required placeholder="Select a time" />
        <TimePicker.Menu />
      </TimePicker>
      <FormField.HelperText>This field is required</FormField.HelperText>
    </FormField>
  ),
};

// ============================================================================
// Sizes & States
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <FormField>
        <FormField.Label>Small</FormField.Label>
        <TimePicker size="small" defaultValue="09:00">
          <TimePicker.Trigger />
          <TimePicker.Menu />
        </TimePicker>
      </FormField>
      <FormField>
        <FormField.Label>Default</FormField.Label>
        <TimePicker size="default" defaultValue="09:00">
          <TimePicker.Trigger />
          <TimePicker.Menu />
        </TimePicker>
      </FormField>
      <FormField>
        <FormField.Label>Large</FormField.Label>
        <TimePicker size="large" defaultValue="09:00">
          <TimePicker.Trigger />
          <TimePicker.Menu />
        </TimePicker>
      </FormField>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <FormField>
        <FormField.Label>Default</FormField.Label>
        <TimePicker>
          <TimePicker.Trigger />
          <TimePicker.Menu />
        </TimePicker>
        <FormField.HelperText>Normal state</FormField.HelperText>
      </FormField>
      <FormField error>
        <FormField.Label>Error</FormField.Label>
        <TimePicker error>
          <TimePicker.Trigger />
          <TimePicker.Menu />
        </TimePicker>
        <FormField.ErrorMessage>Please select a valid time</FormField.ErrorMessage>
      </FormField>
      <FormField disabled>
        <FormField.Label>Disabled</FormField.Label>
        <TimePicker disabled defaultValue="09:00">
          <TimePicker.Trigger />
          <TimePicker.Menu />
        </TimePicker>
        <FormField.HelperText>Cannot be changed</FormField.HelperText>
      </FormField>
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
        story: 'The step prop on TimePickerMenu controls minute options: 900 (15min), 1800 (30min), 3600 (1hr).',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <FormField>
        <FormField.Label>15-Minute Steps</FormField.Label>
        <TimePicker>
          <TimePicker.Trigger />
          <TimePicker.Menu step={900} />
        </TimePicker>
        <FormField.HelperText>step=&#123;900&#125;</FormField.HelperText>
      </FormField>
      <FormField>
        <FormField.Label>30-Minute Steps</FormField.Label>
        <TimePicker>
          <TimePicker.Trigger />
          <TimePicker.Menu step={1800} />
        </TimePicker>
        <FormField.HelperText>step=&#123;1800&#125; (default)</FormField.HelperText>
      </FormField>
      <FormField>
        <FormField.Label>Hourly Steps</FormField.Label>
        <TimePicker>
          <TimePicker.Trigger />
          <TimePicker.Menu step={3600} />
        </TimePicker>
        <FormField.HelperText>step=&#123;3600&#125;</FormField.HelperText>
      </FormField>
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
        <FormField>
          <FormField.Label>Select Time</FormField.Label>
          <TimePicker value={time} onChange={setTime}>
            <TimePicker.Trigger />
            <TimePicker.Menu />
          </TimePicker>
          <FormField.HelperText>Controlled component with external state</FormField.HelperText>
        </FormField>
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
        <FormField>
          <FormField.Label>Appointment Time</FormField.Label>
          <TimePicker value={time} onChange={setPendingTime}>
            <TimePicker.Trigger />
            <TimePicker.Menu
              showConfirmation
              cancelLabel="Cancel"
              saveLabel="Confirm"
              onCancel={() => setPendingTime(time)}
              onSave={() => setTime(pendingTime)}
            />
          </TimePicker>
          <FormField.HelperText>Click Save to confirm your selection</FormField.HelperText>
        </FormField>
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
        <FormField>
          <FormField.Label>Start Time</FormField.Label>
          <TimePicker value={startTime} onChange={setStartTime}>
            <TimePicker.Trigger />
            <TimePicker.Menu step={900} />
          </TimePicker>
        </FormField>
        <FormField disabled={!startTime}>
          <FormField.Label>End Time</FormField.Label>
          <TimePicker value={endTime} onChange={setEndTime} disabled={!startTime}>
            <TimePicker.Trigger />
            <TimePicker.Menu step={900} />
          </TimePicker>
          {!startTime && <FormField.HelperText>Select start time first</FormField.HelperText>}
        </FormField>
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
  triggerId: 'trigger-id',
  menuId: 'menu-id',
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
                <TimePicker.Trigger placeholder="Select time" />
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
                <TimePicker.Trigger />
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
              isOpen: true,
              selectedHour: h1, setSelectedHour: setH1,
              selectedMinute: m1, setSelectedMinute: setM1,
              selectedMeridiem: mer1, setSelectedMeridiem: setMer1,
            })}>
              <TimePicker.Menu step={1800} />
            </TimePickerContext.Provider>
          </MenuWrapper>
        </div>
        
        <div>
          <p className="text-xs text-[color:var(--semantic-text-secondary)] mb-2">With Selection</p>
          <MenuWrapper>
            <TimePickerContext.Provider value={createMockContext({
              isOpen: true,
              selectedHour: h2, setSelectedHour: setH2,
              selectedMinute: m2, setSelectedMinute: setM2,
              selectedMeridiem: mer2, setSelectedMeridiem: setMer2,
            })}>
              <TimePicker.Menu step={1800} />
            </TimePickerContext.Provider>
          </MenuWrapper>
        </div>
        
        <div>
          <p className="text-xs text-[color:var(--semantic-text-secondary)] mb-2">With Confirmation</p>
          <MenuWrapper>
            <TimePickerContext.Provider value={createMockContext({
              isOpen: true,
              selectedHour: h3, setSelectedHour: setH3,
              selectedMinute: m3, setSelectedMinute: setM3,
              selectedMeridiem: mer3, setSelectedMeridiem: setMer3,
            })}>
              <TimePicker.Menu showConfirmation step={1800} />
            </TimePickerContext.Provider>
          </MenuWrapper>
        </div>
      </div>
    );
  },
};

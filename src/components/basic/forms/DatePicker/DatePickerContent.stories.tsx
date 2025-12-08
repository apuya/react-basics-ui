import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from './Calendar';
import { DatePickerPresets, DEFAULT_PRESETS } from './DatePickerPresets';
import { DatePickerConfirmation } from './DatePickerConfirmation';
import {
  CONTENT_LAYOUT_CLASSES,
  CONTENT_ROW_CLASSES,
  PRESETS_WRAPPER_CLASSES,
  CONTENT_BASE_CLASSES,
} from './DatePicker.styles';
import type { DateRange } from './DatePicker.types';
import { cn } from '@/lib/cn';

/** Isolated content for showcasing layouts without DatePicker context */
const IsolatedContent = ({
  variant = 'single',
  children,
}: {
  variant?: 'single' | 'single-range' | 'double-range' | 'double-presets';
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      'relative inline-flex bg-[color:var(--component-datepicker-bg-default)] border border-[color:var(--component-datepicker-border-default)] shadow-[var(--component-datepicker-shadow)]',
      CONTENT_BASE_CLASSES,
      CONTENT_LAYOUT_CLASSES[variant]
    )}
  >
    {children}
  </div>
);

const meta: Meta = {
  title: 'Forms/DatePicker/DatePickerContent',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Isolated content layouts without trigger - demonstrates each variant.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Shared range selection logic
const useRangeSelection = () => {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [startValue, setStartValue] = useState('');
  const [endValue, setEndValue] = useState('');

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const handleDateSelect = (date: Date) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: date, end: null });
      setStartValue(formatDate(date));
      setEndValue('');
    } else {
      const newRange = date < range.start
        ? { start: date, end: range.start }
        : { start: range.start, end: date };
      setRange(newRange);
      setStartValue(formatDate(newRange.start!));
      setEndValue(formatDate(newRange.end!));
    }
  };

  const handleClear = () => {
    setRange({ start: null, end: null });
    setStartValue('');
    setEndValue('');
  };

  return { range, startValue, endValue, setStartValue, setEndValue, handleDateSelect, handleClear };
};

export const SingleLayout: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <IsolatedContent variant="single">
        <Calendar selectedDate={date} onDateSelect={setDate} />
      </IsolatedContent>
    );
  },
};

export const SingleRangeLayout: Story = {
  render: () => {
    const { range, startValue, endValue, setStartValue, setEndValue, handleDateSelect, handleClear } = useRangeSelection();
    return (
      <IsolatedContent variant="single-range">
        <Calendar selectedRange={range} onDateSelect={handleDateSelect} isRangeMode />
        <DatePickerConfirmation
          stacked
          startDateValue={startValue}
          endDateValue={endValue}
          onStartDateChange={setStartValue}
          onEndDateChange={setEndValue}
          onCancel={handleClear}
          onApply={() => console.log('Applied:', range)}
        />
      </IsolatedContent>
    );
  },
};

export const DoubleRangeLayout: Story = {
  render: () => {
    const { range, startValue, endValue, setStartValue, setEndValue, handleDateSelect, handleClear } = useRangeSelection();
    return (
      <IsolatedContent variant="double-range">
        <Calendar variant="dual" selectedRange={range} onDateSelect={handleDateSelect} isRangeMode />
        <DatePickerConfirmation
          startDateValue={startValue}
          endDateValue={endValue}
          onStartDateChange={setStartValue}
          onEndDateChange={setEndValue}
          onCancel={handleClear}
          onApply={() => console.log('Applied:', range)}
        />
      </IsolatedContent>
    );
  },
};

export const DoublePresetsLayout: Story = {
  render: () => {
    const { range, startValue, endValue, setStartValue, setEndValue, handleDateSelect, handleClear } = useRangeSelection();
    const [selectedPreset, setSelectedPreset] = useState<string | undefined>();

    const handlePresetSelect = (presetRange: DateRange) => {
      const formatDate = (d: Date) =>
        d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      if (presetRange.start) setStartValue(formatDate(presetRange.start));
      if (presetRange.end) setEndValue(formatDate(presetRange.end));
      
      const preset = DEFAULT_PRESETS.find(p => {
        const v = p.getValue();
        return v.start?.getTime() === presetRange.start?.getTime() && v.end?.getTime() === presetRange.end?.getTime();
      });
      setSelectedPreset(preset?.label);
    };

    return (
      <IsolatedContent variant="double-presets">
        <div className={CONTENT_ROW_CLASSES}>
          <div className={PRESETS_WRAPPER_CLASSES}>
            <DatePickerPresets
              variant="positioned"
              presets={DEFAULT_PRESETS}
              selectedPreset={selectedPreset}
              onPresetSelect={handlePresetSelect}
            />
          </div>
          <Calendar variant="dual" selectedRange={range} onDateSelect={(d) => { setSelectedPreset(undefined); handleDateSelect(d); }} isRangeMode />
        </div>
        <DatePickerConfirmation
          startDateValue={startValue}
          endDateValue={endValue}
          onStartDateChange={setStartValue}
          onEndDateChange={setEndValue}
          onCancel={() => { handleClear(); setSelectedPreset(undefined); }}
          onApply={() => console.log('Applied:', range)}
        />
      </IsolatedContent>
    );
  },
};

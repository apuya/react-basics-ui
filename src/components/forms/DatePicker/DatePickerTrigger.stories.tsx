import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { DatePickerTrigger } from './DatePickerTrigger';
import { DatePickerContent } from './DatePickerContent';
import { Calendar } from './Calendar';
import type { DateRange } from './DatePicker.types';

const meta: Meta<typeof DatePickerTrigger> = {
  title: 'Forms/DatePicker/DatePickerTrigger',
  component: DatePickerTrigger,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The trigger button that opens the date picker.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 280, overflow: 'visible' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DatePickerTrigger>;

export const Default: Story = {
  render: () => (
    <DatePicker variant="single">
      <DatePickerTrigger />
      <DatePickerContent>
        <Calendar />
      </DatePickerContent>
    </DatePicker>
  ),
};

export const WithSelectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <DatePicker variant="single" value={date} onChange={setDate}>
        <DatePickerTrigger />
        <DatePickerContent>
          <Calendar selectedDate={date} onDateSelect={setDate} />
        </DatePickerContent>
      </DatePicker>
    );
  },
};

export const WithSelectedRange: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({
      start: new Date(2025, 10, 1),
      end: new Date(2025, 10, 15),
    });
    return (
      <DatePicker variant="single-range" rangeValue={range} onRangeChange={setRange}>
        <DatePickerTrigger />
        <DatePickerContent>
          <Calendar selectedRange={range} isRangeMode />
        </DatePickerContent>
      </DatePicker>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <DatePicker variant="single" size="small">
        <DatePickerTrigger placeholder="Small" />
        <DatePickerContent><Calendar /></DatePickerContent>
      </DatePicker>
      <DatePicker variant="single" size="default">
        <DatePickerTrigger placeholder="Default" />
        <DatePickerContent><Calendar /></DatePickerContent>
      </DatePicker>
      <DatePicker variant="single" size="large">
        <DatePickerTrigger placeholder="Large" />
        <DatePickerContent><Calendar /></DatePickerContent>
      </DatePicker>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-xs text-neutral-500 mb-1">Default</p>
        <DatePicker variant="single">
          <DatePickerTrigger placeholder="Default state" />
          <DatePickerContent><Calendar /></DatePickerContent>
        </DatePicker>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Error</p>
        <DatePicker variant="single" error>
          <DatePickerTrigger placeholder="Error state" />
          <DatePickerContent><Calendar /></DatePickerContent>
        </DatePicker>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Disabled</p>
        <DatePicker variant="single" disabled>
          <DatePickerTrigger placeholder="Disabled state" />
          <DatePickerContent><Calendar /></DatePickerContent>
        </DatePicker>
      </div>
    </div>
  ),
};

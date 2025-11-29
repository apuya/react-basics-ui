import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from './Calendar';
import type { DateRange } from './DatePicker.types';

const meta: Meta<typeof Calendar> = {
  title: 'Forms/DatePicker/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Calendar grid component for date selection. Supports single and dual variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['single', 'dual'],
      description: 'Single or dual calendar layout',
    },
    isRangeMode: {
      control: 'boolean',
      description: 'Enable range selection',
    },
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'First day of week (0=Sun, 1=Mon)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Helper for range selection logic
const useRangeSelection = () => {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  
  const handleDateSelect = (date: Date) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: date, end: null });
    } else {
      setRange(date < range.start 
        ? { start: date, end: range.start }
        : { start: range.start, end: date }
      );
    }
  };
  
  return { range, handleDateSelect };
};

// ============================================================================
// Single Calendar
// ============================================================================

export const Single: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return <Calendar selectedDate={date} onDateSelect={setDate} />;
  },
};

export const SingleRange: Story = {
  render: () => {
    const { range, handleDateSelect } = useRangeSelection();
    return <Calendar selectedRange={range} onDateSelect={handleDateSelect} isRangeMode />;
  },
};

// ============================================================================
// Dual Calendar
// ============================================================================

export const Dual: Story = {
  render: () => {
    const { range, handleDateSelect } = useRangeSelection();
    return <Calendar variant="dual" selectedRange={range} onDateSelect={handleDateSelect} isRangeMode />;
  },
};

export const DualWithSelection: Story = {
  render: () => {
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    const [range, setRange] = useState<DateRange>({ start: today, end: nextWeek });
    
    const handleDateSelect = (date: Date) => {
      if (!range.start || (range.start && range.end)) {
        setRange({ start: date, end: null });
      } else {
        setRange(date < range.start 
          ? { start: date, end: range.start }
          : { start: range.start, end: date }
        );
      }
    };
    
    return <Calendar variant="dual" selectedRange={range} onDateSelect={handleDateSelect} isRangeMode />;
  },
};

// ============================================================================
// Configuration
// ============================================================================

export const MondayFirst: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return <Calendar selectedDate={date} onDateSelect={setDate} firstDayOfWeek={1} />;
  },
  parameters: {
    docs: { description: { story: 'Week starting on Monday.' } },
  },
};

export const WithConstraints: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    
    return (
      <Calendar 
        selectedDate={date} 
        onDateSelect={setDate} 
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  },
  parameters: {
    docs: { description: { story: 'Calendar with min/max date constraints.' } },
  },
};

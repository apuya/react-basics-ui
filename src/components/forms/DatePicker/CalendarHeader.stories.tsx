import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';

const meta: Meta<typeof CalendarHeader> = {
  title: 'Forms/DatePicker/CalendarHeader',
  component: CalendarHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Navigation header for the calendar with month/year display and navigation buttons.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof CalendarHeader>;

// Shared navigation logic
const useNavigation = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  
  const handlePrevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else { setMonth(m => m - 1); }
  };
  
  const handleNextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else { setMonth(m => m + 1); }
  };
  
  return { month, year, handlePrevMonth, handleNextMonth };
};

export const Default: Story = {
  render: () => {
    const { month, year, handlePrevMonth, handleNextMonth } = useNavigation();
    return (
      <CalendarHeader
        month={month}
        year={year}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
    );
  },
};

export const NavigationPositions: Story = {
  render: () => {
    const { month, year, handlePrevMonth, handleNextMonth } = useNavigation();
    return (
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs text-neutral-500 mb-1">Both (default)</p>
          <CalendarHeader
            month={month}
            year={year}
            navigationPosition="both"
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        </div>
        <div>
          <p className="text-xs text-neutral-500 mb-1">Leading only</p>
          <CalendarHeader
            month={month}
            year={year}
            navigationPosition="leading"
            onPrevMonth={handlePrevMonth}
          />
        </div>
        <div>
          <p className="text-xs text-neutral-500 mb-1">Trailing only</p>
          <CalendarHeader
            month={month}
            year={year}
            navigationPosition="trailing"
            onNextMonth={handleNextMonth}
          />
        </div>
      </div>
    );
  },
};

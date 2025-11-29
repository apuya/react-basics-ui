import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerCell } from './DatePickerCell';
import type { CellState } from './DatePicker.types';

const meta: Meta<typeof DatePickerCell> = {
  title: 'Forms/DatePicker/DatePickerCell',
  component: DatePickerCell,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Individual cell in the calendar grid. Shows all possible visual states.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePickerCell>;

export const AllStates: Story = {
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
        {states.map(({ state, label }) => (
          <div key={state} className="flex items-center gap-4">
            <span className="w-28 text-sm text-neutral-500 capitalize">{state}</span>
            <DatePickerCell
              state={state}
              date={state !== 'header' ? new Date(2025, 10, 15) : undefined}
              label={label}
              isToday={state === 'today'}
            />
          </div>
        ))}
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerConfirmation } from './DatePickerConfirmation';

const meta: Meta<typeof DatePickerConfirmation> = {
  title: 'Forms/DatePicker/DatePickerConfirmation',
  component: DatePickerConfirmation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Confirmation footer with date range inputs and action buttons.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePickerConfirmation>;

const defaultProps = {
  startDate: new Date(2024, 0, 15),
  endDate: new Date(2024, 0, 20),
  onCancel: () => console.log('Cancel'),
  onApply: () => console.log('Apply'),
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};

export const Stacked: Story = {
  args: {
    ...defaultProps,
    variant: 'stacked',
  },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const WithoutDates: Story = {
  args: {
    startDate: undefined,
    endDate: undefined,
    onCancel: () => console.log('Cancel'),
    onApply: () => console.log('Apply'),
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">Default (Inline)</p>
        <div style={{ width: 560 }}>
          <DatePickerConfirmation {...defaultProps} />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Stacked (Single Calendar)</p>
        <div style={{ width: 280 }}>
          <DatePickerConfirmation {...defaultProps} variant="stacked" />
        </div>
      </div>
    </div>
  ),
};

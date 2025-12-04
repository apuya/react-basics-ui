import type { Meta, StoryObj } from '@storybook/react';
import { TableHead } from './TableHead';

const meta = {
  title: 'Data Display/Table/TableHead',
  component: TableHead,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableHead component wraps table header rows. It supports sticky positioning for fixed headers while scrolling.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <table className="w-full border-collapse">
        <Story />
      </table>
    ),
  ],
} satisfies Meta<typeof TableHead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic table head with header row.',
      },
    },
  },
  render: () => (
    <TableHead>
      <tr>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Email</th>
        <th className="p-3 text-left">Role</th>
        <th className="p-3 text-left">Status</th>
      </tr>
    </TableHead>
  ),
};

export const Sticky: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sticky table head that remains visible when scrolling. The `sticky` prop adds `sticky top-0 z-10` positioning.',
      },
    },
  },
  args: {
    sticky: true,
  },
  render: (args) => (
    <TableHead {...args}>
      <tr>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Email</th>
        <th className="p-3 text-left">Role</th>
      </tr>
    </TableHead>
  ),
};

export const WithCustomClassName: Story = {
  parameters: {
    docs: {
      description: {
        story: 'TableHead with custom className for additional styling.',
      },
    },
  },
  args: {
    className: 'bg-blue-50',
  },
  render: (args) => (
    <TableHead {...args}>
      <tr>
        <th className="p-3 text-left">Column 1</th>
        <th className="p-3 text-left">Column 2</th>
      </tr>
    </TableHead>
  ),
};

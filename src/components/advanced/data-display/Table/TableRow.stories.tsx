import type { Meta, StoryObj } from '@storybook/react';
import { TableRow } from './TableRow';
import { TableContext } from './TableContext';

const meta = {
  title: 'Data Display/Table/TableRow',
  component: TableRow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableRow component represents a single row in the table. It uses TableContext for variant styling.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <TableContext.Provider value={{ size: 'md', variant: context.args.variant || 'default' }}>
        <table className="w-full border-collapse">
          <tbody>
            <Story />
          </tbody>
        </table>
      </TableContext.Provider>
    ),
  ],
} satisfies Meta<typeof TableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default table row with basic styling.',
      },
    },
  },
  render: () => (
    <TableRow>
      <td className="p-3">John Doe</td>
      <td className="p-3">john@example.com</td>
      <td className="p-3">Admin</td>
    </TableRow>
  ),
};

export const WithCustomClassName: Story = {
  parameters: {
    docs: {
      description: {
        story: 'TableRow with custom className for additional styling.',
      },
    },
  },
  args: {
    className: 'bg-blue-50',
  },
  render: (args) => (
    <TableRow {...args}>
      <td className="p-3">Highlighted Row</td>
      <td className="p-3">custom@example.com</td>
      <td className="p-3">Special</td>
    </TableRow>
  ),
};

export const Clickable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Clickable table row with onClick handler.',
      },
    },
  },
  args: {
    onClick: () => alert('Row clicked'),
    style: { cursor: 'pointer' },
  },
  render: (args) => (
    <TableRow {...args}>
      <td className="p-3">Click me</td>
      <td className="p-3">Clickable row</td>
      <td className="p-3">Interactive</td>
    </TableRow>
  ),
};

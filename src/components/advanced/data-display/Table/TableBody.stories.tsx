import type { Meta, StoryObj } from '@storybook/react';
import { TableBody } from './TableBody';

const meta = {
  title: 'Data Display/Table/TableBody',
  component: TableBody,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableBody component wraps table data rows.',
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
} satisfies Meta<typeof TableBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic table body with data rows.',
      },
    },
  },
  render: () => (
    <TableBody>
      <tr>
        <td className="p-3 border-b">John Doe</td>
        <td className="p-3 border-b">john@example.com</td>
        <td className="p-3 border-b">Admin</td>
      </tr>
      <tr>
        <td className="p-3 border-b">Jane Smith</td>
        <td className="p-3 border-b">jane@example.com</td>
        <td className="p-3 border-b">Editor</td>
      </tr>
      <tr>
        <td className="p-3 border-b">Bob Johnson</td>
        <td className="p-3 border-b">bob@example.com</td>
        <td className="p-3 border-b">Viewer</td>
      </tr>
    </TableBody>
  ),
};

export const WithCustomClassName: Story = {
  parameters: {
    docs: {
      description: {
        story: 'TableBody with custom className.',
      },
    },
  },
  args: {
    className: 'bg-gray-50',
  },
  render: (args) => (
    <TableBody {...args}>
      <tr>
        <td className="p-3 border-b">Row 1</td>
        <td className="p-3 border-b">Data 1</td>
      </tr>
      <tr>
        <td className="p-3 border-b">Row 2</td>
        <td className="p-3 border-b">Data 2</td>
      </tr>
    </TableBody>
  ),
};

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'TableBody with empty state message.',
      },
    },
  },
  render: () => (
    <TableBody>
      <tr>
        <td colSpan={3} className="p-8 text-center text-gray-500">
          No data available
        </td>
      </tr>
    </TableBody>
  ),
};

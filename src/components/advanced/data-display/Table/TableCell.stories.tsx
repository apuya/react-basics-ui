import type { Meta, StoryObj } from '@storybook/react';
import { TableCell } from './TableCell';
import { TableContext } from './TableContext';
import { Badge } from '../../../basic/feedback/Badge';
import { Button } from '../../../basic/forms/Button';

const meta = {
  title: 'Data Display/Table/TableCell',
  component: TableCell,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableCell component represents individual data cells in table rows. It uses TableContext for size-based padding.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <TableContext.Provider value={{ size: context.args.size || 'md', variant: 'default' }}>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <Story />
            </tr>
          </tbody>
        </table>
      </TableContext.Provider>
    ),
  ],
} satisfies Meta<typeof TableCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic table cell with text content.',
      },
    },
  },
  render: () => <TableCell>John Doe</TableCell>,
};

export const SmallSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table cell with small padding (from Table size="sm").',
      },
    },
  },
  decorators: [
    (Story) => (
      <TableContext.Provider value={{ size: 'sm', variant: 'default' }}>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <Story />
            </tr>
          </tbody>
        </table>
      </TableContext.Provider>
    ),
  ],
  render: () => <TableCell>Small padding cell</TableCell>,
};

export const LargeSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table cell with large padding (from Table size="lg").',
      },
    },
  },
  decorators: [
    (Story) => (
      <TableContext.Provider value={{ size: 'lg', variant: 'default' }}>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <Story />
            </tr>
          </tbody>
        </table>
      </TableContext.Provider>
    ),
  ],
  render: () => <TableCell>Large padding cell</TableCell>,
};

export const WithBadge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table cell containing a Badge component.',
      },
    },
  },
  render: () => (
    <TableCell>
      <Badge color="success">Active</Badge>
    </TableCell>
  ),
};

export const WithButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table cell containing a Button component.',
      },
    },
  },
  render: () => (
    <TableCell>
      <Button variant="ghost" size="small">Edit</Button>
    </TableCell>
  ),
};

export const Colspan: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table cell spanning multiple columns.',
      },
    },
  },
  args: {
    colSpan: 3,
    style: { textAlign: 'center', fontWeight: 'bold' },
  },
  render: (args) => <TableCell {...args}>Spanning 3 columns</TableCell>,
};

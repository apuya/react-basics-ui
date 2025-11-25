import type { Meta, StoryObj } from '@storybook/react';
import { TableHeader } from './TableHeader';
import { Table } from './Table';
import { useState } from 'react';

const meta = {
  title: 'Data Display/Table/TableHeader',
  component: TableHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableHeader component represents individual header cells.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Table>
        <thead>
          <tr>
            <Story />
          </tr>
        </thead>
      </Table>
    ),
  ],
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default table header cell (empty).',
      },
    },
  },
  render: () => <TableHeader />,
};

export const CheckboxVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox variant for row selection.',
      },
    },
  },
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <TableHeader
        variant="checkbox"
        checked={checked}
        onCheckboxChange={setChecked}
      />
    );
  },
};

export const RowHeaderVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'RowHeader variant with sortable tab styling.',
      },
    },
  },
  render: () => (
    <TableHeader
      variant="rowHeader"
      sortable
      onSort={() => console.log('Sort clicked')}
    >
      Product
    </TableHeader>
  ),
};

export const RowHeaderAscending: Story = {
  parameters: {
    docs: {
      description: {
        story: 'RowHeader variant sorted in ascending order.',
      },
    },
  },
  render: () => (
    <TableHeader
      variant="rowHeader"
      sortable
      sortDirection="asc"
      onSort={() => console.log('Sort clicked')}
    >
      Product
    </TableHeader>
  ),
};

export const RowHeaderDescending: Story = {
  parameters: {
    docs: {
      description: {
        story: 'RowHeader variant sorted in descending order.',
      },
    },
  },
  render: () => (
    <TableHeader
      variant="rowHeader"
      sortable
      sortDirection="desc"
      onSort={() => console.log('Sort clicked')}
    >
      Product
    </TableHeader>
  ),
};

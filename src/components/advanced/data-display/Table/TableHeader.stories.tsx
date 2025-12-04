import type { Meta, StoryObj } from '@storybook/react';
import { TableHeader } from './TableHeader';
import { TableContext } from './TableContext';
import { useState } from 'react';

const meta = {
  title: 'Data Display/Table/TableHeader',
  component: TableHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableHeader component represents individual header cells. Supports checkbox, sortable, and default variants.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TableContext.Provider value={{ size: 'md', variant: 'default' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <Story />
            </tr>
          </thead>
        </table>
      </TableContext.Provider>
    ),
  ],
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default table header cell with text content.',
      },
    },
  },
  render: () => <TableHeader>Column Name</TableHeader>,
};

export const CheckboxVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox variant for row selection in header.',
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

export const CheckboxIndeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox variant in indeterminate state (some rows selected).',
      },
    },
  },
  args: {
    variant: 'checkbox',
    checked: false,
    indeterminate: true,
  },
  render: (args) => <TableHeader {...args} />,
};

export const Sortable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sortable header with sort icons.',
      },
    },
  },
  args: {
    sortable: true,
    onSort: () => console.log('Sort clicked'),
    children: 'Product',
  },
  render: (args) => <TableHeader {...args} />,
};

export const SortedAscending: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sortable header sorted in ascending order.',
      },
    },
  },
  args: {
    sortable: true,
    sortDirection: 'asc',
    onSort: () => console.log('Sort clicked'),
    children: 'Product',
  },
  render: (args) => <TableHeader {...args} />,
};

export const SortedDescending: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sortable header sorted in descending order.',
      },
    },
  },
  args: {
    sortable: true,
    sortDirection: 'desc',
    onSort: () => console.log('Sort clicked'),
    children: 'Product',
  },
  render: (args) => <TableHeader {...args} />,
};

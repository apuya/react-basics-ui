import type { Meta, StoryObj } from '@storybook/react';
import { TableFooter } from './TableFooter';
import { TableContext } from './TableContext';
import { useState } from 'react';

const meta = {
  title: 'Data Display/Table/TableFooter',
  component: TableFooter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableFooter component provides pagination controls and page information.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TableContext.Provider value={{ size: 'md', variant: 'default' }}>
        <table className="w-full border-collapse">
          <Story />
        </table>
      </TableContext.Provider>
    ),
  ],
} satisfies Meta<typeof TableFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic footer with pagination for 50 items.',
      },
    },
  },
  args: {
    totalItems: 50,
  },
  render: (args) => <TableFooter {...args} />,
};

export const LargeDataset: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Footer with pagination for a large dataset of 500 items.',
      },
    },
  },
  args: {
    totalItems: 500,
    totalPages: 50,
  },
  render: (args) => <TableFooter {...args} />,
};

export const SmallDataset: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Footer with single page of data (no pagination controls shown).',
      },
    },
  },
  args: {
    totalItems: 5,
    totalPages: 1,
  },
  render: (args) => <TableFooter {...args} />,
};

export const CustomContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Footer with custom children content instead of default pagination.',
      },
    },
  },
  render: () => (
    <TableFooter>
      <span className="text-sm text-gray-600">Custom footer content here</span>
    </TableFooter>
  ),
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive footer with page change callback.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <TableFooter
        currentPage={page}
        totalPages={10}
        totalItems={100}
        onPageChange={setPage}
      />
    );
  },
};

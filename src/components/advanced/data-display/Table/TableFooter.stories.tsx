import type { Meta, StoryObj } from '@storybook/react';
import { TableFooter } from './TableFooter';
import { TableContext } from './TableContext';
import { useState } from 'react';
import { Stack } from '@/components/basic/layout/Stack';
import { Text } from '@/components/basic/typography/Text';

const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <TableContext.Provider value={{ size: 'md', variant: 'default' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--component-table-border)' }}>
      {children}
    </table>
  </TableContext.Provider>
);

const meta = {
  title: 'Data Display/Table/TableFooter',
  component: TableFooter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableFooter component provides a footer row for tables with multiple variants: default (empty), navigation (prev/next arrows), and pagination (full page controls).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'navigation', 'pagination'],
      description: 'Footer variant - default (empty), navigation (prev/next arrows), or pagination (full page controls)',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    colSpan: {
      control: 'number',
      description: 'Number of columns the footer should span',
    },
    currentPage: {
      control: 'number',
      description: 'Current page number (1-indexed)',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    itemsPerPage: {
      control: 'number',
      description: 'Number of items displayed per page',
      table: {
        defaultValue: { summary: '10' },
      },
    },
    totalItems: {
      control: 'number',
      description: 'Total number of items across all pages',
    },
    showPageInfo: {
      control: 'boolean',
      description: 'Show page info text (e.g., "Showing 1-10 of 100")',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  decorators: [
    (Story) => (
      <TableWrapper>
        <Story />
      </TableWrapper>
    ),
  ],
} satisfies Meta<typeof TableFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default footer with fixed height of 44px.',
      },
    },
  },
  args: {
    colSpan: 3,
  },
};

export const Navigation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navigation variant with prev/next arrow buttons on the left and page info centered.',
      },
    },
  },
  args: {
    variant: 'navigation',
    colSpan: 3,
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 10,
    totalItems: 100,
    showPageInfo: true,
  },
};

export const NavigationWithoutPageInfo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navigation variant with only prev/next buttons, no page info.',
      },
    },
  },
  args: {
    variant: 'navigation',
    colSpan: 3,
    currentPage: 1,
    totalPages: 10,
    showPageInfo: false,
  },
};

export const Pagination: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination variant with full page controls centered.',
      },
    },
  },
  args: {
    variant: 'pagination',
    colSpan: 3,
    currentPage: 1,
    totalPages: 10,
    showPageInfo: false,
  },
};

export const PaginationWithPageInfo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination variant with page info shown below pagination controls.',
      },
    },
  },
  args: {
    variant: 'pagination',
    colSpan: 3,
    currentPage: 3,
    totalPages: 10,
    itemsPerPage: 10,
    totalItems: 100,
    showPageInfo: true,
  },
};

export const PaginationInteractive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive pagination footer with working page controls.',
      },
    },
  },
  decorators: [],
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <TableWrapper>
        <TableFooter
          variant="pagination"
          colSpan={3}
          currentPage={page}
          totalPages={10}
          itemsPerPage={10}
          totalItems={100}
          showPageInfo={true}
          onPageChange={setPage}
        />
      </TableWrapper>
    );
  },
};

export const NavigationInteractive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive navigation footer with working page controls.',
      },
    },
  },
  decorators: [],
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <TableWrapper>
        <TableFooter
          variant="navigation"
          colSpan={3}
          currentPage={page}
          totalPages={10}
          itemsPerPage={10}
          totalItems={100}
          showPageInfo={true}
          onPageChange={setPage}
        />
      </TableWrapper>
    );
  },
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All footer variants side by side.',
      },
    },
  },
  decorators: [],
  render: () => (
    <Stack spacing="lg">
      <Stack spacing="xs">
        <Text size="small" color="secondary">Variant: default</Text>
        <TableWrapper>
          <TableFooter variant="default" colSpan={3} />
        </TableWrapper>
      </Stack>
      <Stack spacing="xs">
        <Text size="small" color="secondary">Variant: navigation (with page info)</Text>
        <TableWrapper>
          <TableFooter
            variant="navigation"
            colSpan={3}
            currentPage={3}
            totalPages={10}
            itemsPerPage={10}
            totalItems={100}
            showPageInfo={true}
          />
        </TableWrapper>
      </Stack>
      <Stack spacing="xs">
        <Text size="small" color="secondary">Variant: pagination</Text>
        <TableWrapper>
          <TableFooter
            variant="pagination"
            colSpan={3}
            currentPage={3}
            totalPages={10}
          />
        </TableWrapper>
      </Stack>
      <Stack spacing="xs">
        <Text size="small" color="secondary">Variant: pagination (with page info)</Text>
        <TableWrapper>
          <TableFooter
            variant="pagination"
            colSpan={3}
            currentPage={3}
            totalPages={10}
            itemsPerPage={10}
            totalItems={100}
            showPageInfo={true}
          />
        </TableWrapper>
      </Stack>
    </Stack>
  ),
};

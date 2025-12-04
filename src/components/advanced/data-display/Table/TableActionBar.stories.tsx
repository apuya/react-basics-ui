import type { Meta, StoryObj } from '@storybook/react';
import { TableActionBar } from './TableActionBar';
import { TableContext } from './TableContext';
import { BiRefresh, BiPlus, BiFilter } from 'react-icons/bi';
import { useState } from 'react';

const meta = {
  title: 'Data Display/Table/TableActionBar',
  component: TableActionBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableActionBar component provides a header bar with actions, search, or title.',
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
} satisfies Meta<typeof TableActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default empty action bar.',
      },
    },
  },
  args: {
    colSpan: 3,
  },
  render: (args) => <TableActionBar {...args} />,
};

export const WithSearch: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action bar with search functionality.',
      },
    },
  },
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    return (
      <TableActionBar
        variant="search"
        colSpan={3}
        searchProps={{
          value: searchValue,
          onChange: (e) => setSearchValue(e.target.value),
          placeholder: 'Search users...',
        }}
      />
    );
  },
};

export const WithSearchAndDropdown: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action bar with search and dropdown filter button.',
      },
    },
  },
  args: {
    variant: 'search',
    colSpan: 3,
    searchProps: {
      placeholder: 'Search...',
    },
    dropdownTriggerLabel: 'Filter',
    dropdownTriggerIcon: BiFilter,
    dropdownMenu: (
      <div className="p-2">
        <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">Option 1</button>
        <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">Option 2</button>
      </div>
    ),
  },
  render: (args) => <TableActionBar {...args} />,
};

export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action bar with primary and secondary action buttons.',
      },
    },
  },
  args: {
    variant: 'actions',
    colSpan: 3,
    primaryAction: {
      label: 'Add User',
      icon: BiPlus,
      onClick: () => alert('Add user clicked'),
    },
    secondaryAction: {
      label: 'Refresh',
      icon: BiRefresh,
      onClick: () => alert('Refresh clicked'),
    },
    children: 'User Management',
  },
  render: (args) => <TableActionBar {...args} />,
};

export const ActionsWithDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action bar with a disabled action button.',
      },
    },
  },
  args: {
    variant: 'actions',
    colSpan: 3,
    primaryAction: {
      label: 'Add User',
      icon: BiPlus,
      onClick: () => {},
    },
    secondaryAction: {
      label: 'Refresh',
      icon: BiRefresh,
      onClick: () => {},
      disabled: true,
    },
    children: 'User Management',
  },
  render: (args) => <TableActionBar {...args} />,
};

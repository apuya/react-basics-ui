import type { Meta, StoryObj } from '@storybook/react';
import { TableActionBar } from './TableActionBar';
import { TableContext } from './TableContext';
import { BiRefresh, BiPlus, BiFilter } from 'react-icons/bi';
import { useState } from 'react';
import { Dropdown } from '@/components/overlays/Dropdown';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/typography/Text';

const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <TableContext.Provider value={{ size: 'md', variant: 'default' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--component-table-border)' }}>
      <thead>
        <tr>{children}</tr>
      </thead>
    </table>
  </TableContext.Provider>
);

const meta = {
  title: 'Data Display/Table/TableActionBar',
  component: TableActionBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableActionBar component provides a header bar with actions or search. Features min-height of 44px with content-hugging height. Padding: block 8px, inline 16px. Actions can be aligned left or right.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'search', 'actions'],
      description: 'Action bar variant - default (empty), search (with search input), or actions (with buttons)',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Alignment of action buttons (only applies to actions variant)',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
    colSpan: {
      control: 'number',
      description: 'Number of columns the action bar should span',
    },
    dropdownTriggerLabel: {
      control: 'text',
      description: 'Label for the dropdown trigger button (search variant)',
      table: {
        defaultValue: { summary: 'Actions' },
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
} satisfies Meta<typeof TableActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default action bar with action buttons aligned to the right.',
      },
    },
  },
  args: {
    variant: 'actions',
    colSpan: 3,
    primaryAction: {
      label: 'Add',
      icon: BiPlus,
      onClick: () => {},
    },
    secondaryAction: {
      label: 'Refresh',
      icon: BiRefresh,
      onClick: () => {},
    },
  },
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Empty action bar (default variant) with min-height of 44px. Useful as a spacer or placeholder.',
      },
    },
  },
  args: {
    variant: 'default',
    colSpan: 3,
  },
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
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    ),
  },
};

export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action bar with primary and secondary action buttons. Default alignment is right.',
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
  },
};

export const ActionsLeftAligned: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action bar with buttons aligned to the left.',
      },
    },
  },
  args: {
    variant: 'actions',
    align: 'left',
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
  },
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
  },
};

export const ActionsOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action bar with only a primary action button.',
      },
    },
  },
  args: {
    variant: 'actions',
    colSpan: 3,
    primaryAction: {
      label: 'Add',
      icon: BiPlus,
      onClick: () => {},
    },
  },
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All variants and alignments: default, search, actions (right), and actions (left).',
      },
    },
  },
  decorators: [],
  render: () => (
    <Stack spacing="lg">
      <Stack spacing="xs">
        <Text size="small" color="secondary">Variant: default</Text>
        <TableWrapper>
          <TableActionBar variant="default" colSpan={3} />
        </TableWrapper>
      </Stack>
      <Stack spacing="xs">
        <Text size="small" color="secondary">Variant: search</Text>
        <TableWrapper>
          <TableActionBar
            variant="search"
            colSpan={3}
            searchProps={{ placeholder: 'Search...' }}
          />
        </TableWrapper>
      </Stack>
      <Stack spacing="xs">
        <Text size="small" color="secondary">Variant: actions (align: right - default)</Text>
        <TableWrapper>
          <TableActionBar
            variant="actions"
            colSpan={3}
            primaryAction={{ label: 'Add', icon: BiPlus }}
            secondaryAction={{ label: 'Refresh', icon: BiRefresh }}
          />
        </TableWrapper>
      </Stack>
      <Stack spacing="xs">
        <Text size="small" color="secondary">Variant: actions (align: left)</Text>
        <TableWrapper>
          <TableActionBar
            variant="actions"
            align="left"
            colSpan={3}
            primaryAction={{ label: 'Add', icon: BiPlus }}
            secondaryAction={{ label: 'Refresh', icon: BiRefresh }}
          />
        </TableWrapper>
      </Stack>
    </Stack>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { BiRefresh, BiPlus } from 'react-icons/bi';

const meta = {
  title: 'Data Display/Table/TableActionBar',
  component: Table.ActionBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableActionBar component provides a header bar with actions, search, or title.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table.ActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic action bar with title text.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.ActionBar colSpan={3}>User Management</Table.ActionBar>
        </Table.Row>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
          <Table.Header>Role</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>john@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const WithSearch: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action bar with search functionality.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.ActionBar
            variant="search"
            colSpan={3}
            searchProps={{
              placeholder: 'Search users...',
              onChange: (value) => console.log('Search:', value),
            }}
          >
            Users
          </Table.ActionBar>
        </Table.Row>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
          <Table.Header>Role</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>john@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action bar with primary and secondary action buttons.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.ActionBar
            variant="actions"
            colSpan={3}
            primaryAction={{
              label: 'Add User',
              icon: BiPlus,
              onClick: () => alert('Add user clicked'),
            }}
            secondaryAction={{
              label: 'Refresh',
              icon: BiRefresh,
              onClick: () => alert('Refresh clicked'),
            }}
          >
            User Management
          </Table.ActionBar>
        </Table.Row>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
          <Table.Header>Role</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>john@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const WithDropdownMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action bar with dropdown menu using the dropdownMenu prop.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.ActionBar
            variant="search"
            colSpan={3}
            searchProps={{
              placeholder: 'Search...',
            }}
            dropdownTriggerLabel="Actions"
            dropdownMenu={
              <>
                <button onClick={() => console.log('Export')}>Export</button>
                <button onClick={() => console.log('Import')}>Import</button>
                <button onClick={() => console.log('Settings')}>Settings</button>
              </>
            }
          >
            User Management
          </Table.ActionBar>
        </Table.Row>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
          <Table.Header>Role</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>john@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

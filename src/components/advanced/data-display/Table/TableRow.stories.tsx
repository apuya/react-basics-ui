import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta = {
  title: 'Data Display/Table/TableRow',
  component: Table.Row,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableRow component represents a single row in the table.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table.Row>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic table rows with default styling.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head>
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
        <Table.Row>
          <Table.Cell>Jane Smith</Table.Cell>
          <Table.Cell>jane@example.com</Table.Cell>
          <Table.Cell>Editor</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const WithCustomStyles: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table rows with custom styling applied.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Status</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row style={{ backgroundColor: '#f0f9ff' }}>
          <Table.Cell>Active User</Table.Cell>
          <Table.Cell>
            <span className="text-green-600 font-medium">Active</span>
          </Table.Cell>
        </Table.Row>
        <Table.Row style={{ backgroundColor: '#fef2f2' }}>
          <Table.Cell>Inactive User</Table.Cell>
          <Table.Cell>
            <span className="text-red-600 font-medium">Inactive</span>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const Clickable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Clickable table rows with hover effects.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row
          onClick={() => alert('Row 1 clicked')}
          style={{ cursor: 'pointer' }}
          className="hover:bg-gray-50"
        >
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>john@example.com</Table.Cell>
        </Table.Row>
        <Table.Row
          onClick={() => alert('Row 2 clicked')}
          style={{ cursor: 'pointer' }}
          className="hover:bg-gray-50"
        >
          <Table.Cell>Jane Smith</Table.Cell>
          <Table.Cell>jane@example.com</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

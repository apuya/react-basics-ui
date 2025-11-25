import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta = {
  title: 'Data Display/Table/TableBody',
  component: Table.Body,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableBody component wraps table data rows.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table.Body>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
];

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic table body with data rows.',
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
        {sampleData.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table body with empty state message.',
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
          <Table.Cell colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            No data available
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const LargeDataset: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table body with many rows.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head sticky>
        <Table.Row>
          <Table.Header>ID</Table.Header>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Array.from({ length: 50 }, (_, i) => (
          <Table.Row key={i}>
            <Table.Cell>{i + 1}</Table.Cell>
            <Table.Cell>User {i + 1}</Table.Cell>
            <Table.Cell>user{i + 1}@example.com</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

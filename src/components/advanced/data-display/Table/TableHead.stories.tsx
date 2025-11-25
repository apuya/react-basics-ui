import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta = {
  title: 'Data Display/Table/TableHead',
  component: Table.Head,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableHead component wraps table header rows. It supports sticky positioning for fixed headers while scrolling.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table.Head>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic table head with header row.',
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
          <Table.Header>Status</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>john@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const Sticky: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sticky table head that remains visible when scrolling. Useful for long tables.',
      },
    },
  },
  render: () => (
    <div style={{ height: '300px', overflow: 'auto' }}>
      <Table>
        <Table.Head sticky>
          <Table.Row>
            <Table.Header>Name</Table.Header>
            <Table.Header>Email</Table.Header>
            <Table.Header>Role</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 20 }, (_, i) => (
            <Table.Row key={i}>
              <Table.Cell>User {i + 1}</Table.Cell>
              <Table.Cell>user{i + 1}@example.com</Table.Cell>
              <Table.Cell>{i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};

export const MultipleRows: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table head with multiple header rows, including an action bar.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.ActionBar colSpan={4}>User Management</Table.ActionBar>
        </Table.Row>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
          <Table.Header>Role</Table.Header>
          <Table.Header>Status</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>john@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

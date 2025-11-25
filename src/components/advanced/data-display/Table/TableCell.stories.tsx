import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta = {
  title: 'Data Display/Table/TableCell',
  component: Table.Cell,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableCell component represents individual data cells in table rows.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table.Cell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic table cells with text content.',
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
      </Table.Body>
    </Table>
  ),
};

export const WithComponents: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table cells containing various components like badges, buttons, and images.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>User</Table.Header>
          <Table.Header>Status</Table.Header>
          <Table.Header>Actions</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-gray-500">john@example.com</div>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>
            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </Table.Cell>
          <Table.Cell>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const WithAlignment: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table cells with different text alignments.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Product</Table.Header>
          <Table.Header style={{ textAlign: 'right' }}>Price</Table.Header>
          <Table.Header style={{ textAlign: 'center' }}>Stock</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Widget A</Table.Cell>
          <Table.Cell style={{ textAlign: 'right' }}>$29.99</Table.Cell>
          <Table.Cell style={{ textAlign: 'center' }}>42</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Widget B</Table.Cell>
          <Table.Cell style={{ textAlign: 'right' }}>$149.99</Table.Cell>
          <Table.Cell style={{ textAlign: 'center' }}>7</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const Colspan: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table cells spanning multiple columns.',
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
          <Table.Cell colSpan={3} style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f3f4f6' }}>
            User Group A
          </Table.Cell>
        </Table.Row>
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

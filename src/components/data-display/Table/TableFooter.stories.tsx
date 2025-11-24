import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta = {
  title: 'Data Display/Table/TableFooter',
  component: Table.Footer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableFooter component provides pagination controls and page information.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table.Footer>;

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
      <Table.Footer totalItems={50} />
    </Table>
  ),
};

export const LargeDataset: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Footer with pagination for a large dataset of 500 items.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>ID</Table.Header>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Array.from({ length: 10 }, (_, i) => (
          <Table.Row key={i}>
            <Table.Cell>{i + 1}</Table.Cell>
            <Table.Cell>User {i + 1}</Table.Cell>
            <Table.Cell>user{i + 1}@example.com</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer totalItems={500} />
    </Table>
  ),
};

export const SmallDataset: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Footer with single page of data (no pagination needed).',
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
        <Table.Row>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>john@example.com</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jane Smith</Table.Cell>
          <Table.Cell>jane@example.com</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer totalItems={2} />
    </Table>
  ),
};

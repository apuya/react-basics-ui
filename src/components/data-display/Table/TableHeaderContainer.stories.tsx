import type { Meta, StoryObj } from '@storybook/react';
import { TableHeaderContainer } from './TableHeaderContainer';
import { Table } from './Table';

const meta = {
  title: 'Data Display/Table/TableHeaderContainer',
  component: TableHeaderContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Semantic container (`<thead>`) for table header rows. Supports sticky positioning for scrollable tables.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    sticky: {
      control: 'boolean',
      description: 'Enable sticky positioning for the header container',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof TableHeaderContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Standard header container with sortable columns.',
      },
    },
  },
  render: () => (
    <div style={{ width: 'fit-content' }}>
      <Table>
        <Table.HeaderContainer>
          <Table.Row>
            <Table.HeaderCell variant="checkbox" checkboxAriaLabel="Select all" />
            <Table.HeaderCell sortable>Name</Table.HeaderCell>
            <Table.HeaderCell sortable sortDirection="asc">Email</Table.HeaderCell>
            <Table.HeaderCell sortable align="right">Amount</Table.HeaderCell>
          </Table.Row>
        </Table.HeaderContainer>
        <Table.Body>
          <Table.Row>
            <Table.Cell variant="checkbox" checked={false} checkboxAriaLabel="Select row" />
            <Table.Cell variant="text">John Doe</Table.Cell>
            <Table.Cell variant="text">john@example.com</Table.Cell>
            <Table.Cell variant="numeric">$1,234.56</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  ),
};

export const Sticky: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sticky header that remains visible when scrolling.',
      },
    },
  },
  render: () => (
    <div style={{ height: '200px', overflow: 'auto', width: 'fit-content' }}>
      <Table>
        <Table.HeaderContainer sticky>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.HeaderContainer>
        <Table.Body>
          {Array.from({ length: 20 }, (_, i) => (
            <Table.Row key={i}>
              <Table.Cell variant="text">User {i + 1}</Table.Cell>
              <Table.Cell variant="text">user{i + 1}@example.com</Table.Cell>
              <Table.Cell variant="text">{i % 2 === 0 ? 'Admin' : 'User'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};

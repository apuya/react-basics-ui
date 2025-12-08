import type { Meta, StoryObj } from '@storybook/react';
import { TableRowContainer } from './TableRowContainer';
import { Table } from './Table';
import { Badge } from '@/components/feedback/Badge';

const meta = {
  title: 'Data Display/Table/TableRowContainer',
  component: TableRowContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Table row component (`<tr>`) with hover state and border styling. Supports click handlers for interactive rows.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the row',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for interactive/clickable rows',
    },
  },
} satisfies Meta<typeof TableRowContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default table rows with standard styling and hover state.',
      },
    },
  },
  render: () => (
    <div style={{ width: 'fit-content' }}>
      <Table>
        <Table.HeaderContainer>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.HeaderContainer>
        <Table.Body>
          <Table.Row>
            <Table.Cell variant="text">John Doe</Table.Cell>
            <Table.Cell variant="text">john@example.com</Table.Cell>
            <Table.Cell variant="badge">
              <Badge variant="success">Active</Badge>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell variant="text">Jane Smith</Table.Cell>
            <Table.Cell variant="text">jane@example.com</Table.Cell>
            <Table.Cell variant="badge">
              <Badge variant="warning">Pending</Badge>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell variant="text">Bob Johnson</Table.Cell>
            <Table.Cell variant="text">bob@example.com</Table.Cell>
            <Table.Cell variant="badge">
              <Badge variant="error">Inactive</Badge>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  ),
};

export const Clickable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Rows with onClick handlers for navigation or selection.',
      },
    },
  },
  render: () => (
    <div style={{ width: 'fit-content' }}>
      <Table>
        <Table.HeaderContainer>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Stock</Table.HeaderCell>
          </Table.Row>
        </Table.HeaderContainer>
        <Table.Body>
          <Table.Row onClick={() => alert('Clicked Widget Pro')} style={{ cursor: 'pointer' }}>
            <Table.Cell variant="text">Widget Pro</Table.Cell>
            <Table.Cell variant="numeric">$99.99</Table.Cell>
            <Table.Cell variant="numeric">142</Table.Cell>
          </Table.Row>
          <Table.Row onClick={() => alert('Clicked Widget Basic')} style={{ cursor: 'pointer' }}>
            <Table.Cell variant="text">Widget Basic</Table.Cell>
            <Table.Cell variant="numeric">$49.99</Table.Cell>
            <Table.Cell variant="numeric">89</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  ),
};

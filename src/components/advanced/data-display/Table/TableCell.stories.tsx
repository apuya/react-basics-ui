import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { Badge } from '../../../basic/feedback/Badge';
import { Button } from '../../../basic/forms/Button';
import { Avatar } from '../../../basic/data-display/Avatar';
import { Text } from '../../../basic/typography/Text';
import { Flex } from '../../../basic/layout/Flex';
import { Stack } from '../../../basic/layout/Stack';

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
            <Flex align="center" gap="sm">
              <Avatar initials="JD" size="sm" />
              <Stack gap="none">
                <Text weight="medium">John Doe</Text>
                <Text size="xs" color="secondary">john@example.com</Text>
              </Stack>
            </Flex>
          </Table.Cell>
          <Table.Cell>
            <Badge variant="success">Active</Badge>
          </Table.Cell>
          <Table.Cell>
            <Button variant="ghost" size="small">Edit</Button>
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

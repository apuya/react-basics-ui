import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Active' },
];

export const Default: Story = {
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
        {sampleData.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  user.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {user.status}
              </span>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <Table size="sm">
      <Table.Head>
        <Table.Row>
          <Table.Header>Product</Table.Header>
          <Table.Header>Price</Table.Header>
          <Table.Header>Stock</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Widget A</Table.Cell>
          <Table.Cell>$29.99</Table.Cell>
          <Table.Cell>42</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Widget B</Table.Cell>
          <Table.Cell>$49.99</Table.Cell>
          <Table.Cell>18</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Widget C</Table.Cell>
          <Table.Cell>$79.99</Table.Cell>
          <Table.Cell>7</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <Table size="lg">
      <Table.Head>
        <Table.Row>
          <Table.Header>Project</Table.Header>
          <Table.Header>Client</Table.Header>
          <Table.Header>Deadline</Table.Header>
          <Table.Header>Progress</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Website Redesign</Table.Cell>
          <Table.Cell>Acme Corp</Table.Cell>
          <Table.Cell>Dec 31, 2025</Table.Cell>
          <Table.Cell>75%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Mobile App</Table.Cell>
          <Table.Cell>TechStart Inc</Table.Cell>
          <Table.Cell>Jan 15, 2026</Table.Cell>
          <Table.Cell>45%</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const StripedVariant: Story = {
  render: () => (
    <Table variant="striped">
      <Table.Head>
        <Table.Row>
          <Table.Header>Order ID</Table.Header>
          <Table.Header>Customer</Table.Header>
          <Table.Header>Amount</Table.Header>
          <Table.Header>Date</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>#1001</Table.Cell>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>$124.00</Table.Cell>
          <Table.Cell>Nov 20, 2025</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>#1002</Table.Cell>
          <Table.Cell>Jane Smith</Table.Cell>
          <Table.Cell>$89.50</Table.Cell>
          <Table.Cell>Nov 21, 2025</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>#1003</Table.Cell>
          <Table.Cell>Bob Wilson</Table.Cell>
          <Table.Cell>$256.75</Table.Cell>
          <Table.Cell>Nov 21, 2025</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>#1004</Table.Cell>
          <Table.Cell>Alice Brown</Table.Cell>
          <Table.Cell>$145.25</Table.Cell>
          <Table.Cell>Nov 22, 2025</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const BorderedVariant: Story = {
  render: () => (
    <Table variant="bordered">
      <Table.Head>
        <Table.Row>
          <Table.Header>Feature</Table.Header>
          <Table.Header>Basic</Table.Header>
          <Table.Header>Pro</Table.Header>
          <Table.Header>Enterprise</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Users</Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>5</Table.Cell>
          <Table.Cell>Unlimited</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Storage</Table.Cell>
          <Table.Cell>10GB</Table.Cell>
          <Table.Cell>100GB</Table.Cell>
          <Table.Cell>1TB</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Support</Table.Cell>
          <Table.Cell>Email</Table.Cell>
          <Table.Cell>Priority</Table.Cell>
          <Table.Cell>24/7 Phone</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Item</Table.Header>
          <Table.Header>Quantity</Table.Header>
          <Table.Header>Price</Table.Header>
          <Table.Header>Total</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Product A</Table.Cell>
          <Table.Cell>2</Table.Cell>
          <Table.Cell>$29.99</Table.Cell>
          <Table.Cell>$59.98</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Product B</Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>$49.99</Table.Cell>
          <Table.Cell>$49.99</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Product C</Table.Cell>
          <Table.Cell>3</Table.Cell>
          <Table.Cell>$19.99</Table.Cell>
          <Table.Cell>$59.97</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3} className="text-right font-semibold">
            Total:
          </Table.Cell>
          <Table.Cell className="font-semibold">$169.94</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <Table stickyHeader>
      <Table.Head sticky>
        <Table.Row>
          <Table.Header>ID</Table.Header>
          <Table.Header>Name</Table.Header>
          <Table.Header>Department</Table.Header>
          <Table.Header>Salary</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Array.from({ length: 20 }, (_, i) => (
          <Table.Row key={i}>
            <Table.Cell>{i + 1}</Table.Cell>
            <Table.Cell>Employee {i + 1}</Table.Cell>
            <Table.Cell>{['Engineering', 'Sales', 'Marketing', 'HR'][i % 4]}</Table.Cell>
            <Table.Cell>${50000 + i * 1000}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
          <Table.Header>Role</Table.Header>
          <Table.Header>Actions</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sampleData.slice(0, 3).map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

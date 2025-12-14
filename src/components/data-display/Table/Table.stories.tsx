import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { useState } from 'react';
import { BiFilter, BiDownload, BiRefresh, BiPlus } from 'react-icons/bi';
import { Dropdown } from '@/components/overlays/Dropdown';
import { Flex } from '@/components/layout/Flex';

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A composable table component with support for sorting, pagination, actions, and various cell variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Table size variant affecting padding and font size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'striped'],
      description: 'Table style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Enable sticky header for scrollable tables',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
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
    <Table
      actionBar={{
        variant: 'actions',
        colSpan: 5,
        primaryAction: { label: 'Add', icon: BiPlus },
        secondaryAction: { label: 'Refresh', icon: BiRefresh },
      }}
      headerCells={
        <>
          <Table.HeaderCell variant="checkbox" checkboxAriaLabel="Select all" />
          <Table.HeaderCell sortable>Name</Table.HeaderCell>
          <Table.HeaderCell sortable>Email</Table.HeaderCell>
          <Table.HeaderCell sortable>Role</Table.HeaderCell>
          <Table.HeaderCell sortable>Status</Table.HeaderCell>
        </>
      }
      footer={{
        variant: 'pagination',
        colSpan: 5,
        currentPage: 1,
        totalPages: 3,
        totalItems: 5,
        showPageInfo: true,
      }}
    >
      <Table.Body>
        {sampleData.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell variant="checkbox" checkboxAriaLabel={`Select ${user.name}`} />
            <Table.Cell variant="text">{user.name}</Table.Cell>
            <Table.Cell variant="text">{user.email}</Table.Cell>
            <Table.Cell variant="text">{user.role}</Table.Cell>
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
    <Table
      size="sm"
      actionBar={{ colSpan: 3 }}
      headerCells={
        <>
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Stock</Table.HeaderCell>
        </>
      }
      footer={{ totalItems: 3, colSpan: 3 }}
    >
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
    <Table
      size="lg"
      actionBar={{ colSpan: 4 }}
      headerCells={
        <>
          <Table.HeaderCell>Project</Table.HeaderCell>
          <Table.HeaderCell>Client</Table.HeaderCell>
          <Table.HeaderCell>Deadline</Table.HeaderCell>
          <Table.HeaderCell>Progress</Table.HeaderCell>
        </>
      }
      footer={{ totalItems: 2, colSpan: 4 }}
    >
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
    <Table
      variant="striped"
      actionBar={{ colSpan: 4 }}
      headerCells={
        <>
          <Table.HeaderCell>Order ID</Table.HeaderCell>
          <Table.HeaderCell>Customer</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
        </>
      }
      footer={{ totalItems: 4, colSpan: 4 }}
    >
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
    <Table
      variant="bordered"
      actionBar={{ colSpan: 4 }}
      headerCells={
        <>
          <Table.HeaderCell>Feature</Table.HeaderCell>
          <Table.HeaderCell>Basic</Table.HeaderCell>
          <Table.HeaderCell>Pro</Table.HeaderCell>
          <Table.HeaderCell>Enterprise</Table.HeaderCell>
        </>
      }
      footer={{ totalItems: 3, colSpan: 4 }}
    >
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
    <Table
      actionBar={{ colSpan: 4 }}
      footer={{ totalItems: 3 }}
      header={
        <>
          <Table.HeaderCell>Item</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </>
      }
    >
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
    </Table>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <Table
      stickyHeader
      actionBar={{ colSpan: 4 }}
      footer={{ totalItems: 20 }}
      header={
        <>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Department</Table.HeaderCell>
          <Table.HeaderCell>Salary</Table.HeaderCell>
        </>
      }
    >
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
    <Table
      actionBar={{ colSpan: 4 }}
      footer={{ totalItems: 3 }}
      header={
        <>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Role</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </>
      }
    >
      <Table.Body>
        {sampleData.slice(0, 3).map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>
              <Flex gap="xs">
                <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const WithSearchAndDropdown: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    
    const filteredData = sampleData.filter((user) =>
      searchValue
        ? user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase())
        : true
    );

    return (
      <Table
        actionBar={{
          variant: 'search',
          colSpan: 4,
          searchProps: {
            value: searchValue,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
            placeholder: 'Search users...',
            showClearButton: true,
          },
          dropdownTriggerLabel: 'Filter',
          dropdownTriggerIcon: BiFilter,
          dropdownMenu: (
            <Dropdown.Menu>
              <Dropdown.Item leadingIcon={<BiFilter />}>Active Users</Dropdown.Item>
              <Dropdown.Item leadingIcon={<BiFilter />}>Inactive Users</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item leadingIcon={<BiDownload />}>Export</Dropdown.Item>
            </Dropdown.Menu>
          ),
        }}
        footer={{ totalItems: filteredData.length }}
        header={
          <>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </>
        }
      >
        <Table.Body>
          {filteredData.map((user) => (
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
    );
  },
};

export const WithDualButtons: Story = {
  render: () => {
    return (
      <Table
        actionBar={{
          variant: 'actions',
          colSpan: 4,
          primaryAction: {
            label: 'Add User',
            icon: BiPlus,
            onClick: () => alert('Add user clicked'),
          },
          secondaryAction: {
            label: 'Refresh',
            icon: BiRefresh,
            onClick: () => alert('Refresh clicked'),
          },
          children: 'User Management',
        }}
        footer={{ totalItems: 5 }}
        header={
          <>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </>
        }
      >
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
    );
  },
};

export const WithCheckboxHeader: Story = {
  render: () => {
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const handleSelectAll = (checked: boolean) => {
      setSelectedAll(checked);
      setSelectedRows(checked ? sampleData.map((u) => u.id) : []);
    };

    const handleSelectRow = (id: number, checked: boolean) => {
      setSelectedRows((prev) =>
        checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
      );
    };

    return (
      <Table
        actionBar={{ colSpan: 5 }}
        footer={{ totalItems: 5 }}
        header={
          <>
            <Table.HeaderCell
              variant="checkbox"
              checked={selectedAll}
              indeterminate={selectedRows.length > 0 && selectedRows.length < sampleData.length}
              onCheckboxChange={handleSelectAll}
            />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </>
        }
      >
        <Table.Body>
          {sampleData.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell
                variant="checkbox"
                checked={selectedRows.includes(user.id)}
                onCheckboxChange={(checked) => handleSelectRow(user.id, checked)}
                checkboxAriaLabel={`Select ${user.name}`}
              />
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
    );
  },
};

export const WithSortableHeaders: Story = {
  render: () => {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

    const handleSort = (column: string) => {
      if (sortColumn === column) {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };

    return (
      <Table
        actionBar={{ colSpan: 4 }}
        footer={{ totalItems: 5 }}
        header={
          <>
            <Table.HeaderCell
              sortable
              sortDirection={sortColumn === 'name' ? sortDirection : null}
              onSort={() => handleSort('name')}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sortable
              sortDirection={sortColumn === 'email' ? sortDirection : null}
              onSort={() => handleSort('email')}
            >
              Email
            </Table.HeaderCell>
            <Table.HeaderCell
              sortable
              sortDirection={sortColumn === 'role' ? sortDirection : null}
              onSort={() => handleSort('role')}
            >
              Role
            </Table.HeaderCell>
            <Table.HeaderCell
              sortable
              sortDirection={sortColumn === 'status' ? sortDirection : null}
              onSort={() => handleSort('status')}
            >
              Status
            </Table.HeaderCell>
          </>
        }
      >
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
    );
  },
};

export const WithCheckboxAndSortable: Story = {
  render: () => {
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

    const handleSelectAll = (checked: boolean) => {
      setSelectedAll(checked);
      setSelectedRows(checked ? sampleData.map((u) => u.id) : []);
    };

    const handleSelectRow = (id: number, checked: boolean) => {
      setSelectedRows((prev) =>
        checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
      );
    };

    const handleSort = (column: string) => {
      if (sortColumn === column) {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };

    return (
      <Table
        actionBar={{ colSpan: 5 }}
        footer={{ totalItems: 5 }}
        header={
          <>
            <Table.HeaderCell
              variant="checkbox"
              checked={selectedAll}
              indeterminate={selectedRows.length > 0 && selectedRows.length < sampleData.length}
              onCheckboxChange={handleSelectAll}
            />
            <Table.HeaderCell
              sortable
              sortDirection={sortColumn === 'name' ? sortDirection : null}
              onSort={() => handleSort('name')}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sortable
              sortDirection={sortColumn === 'email' ? sortDirection : null}
              onSort={() => handleSort('email')}
            >
              Email
            </Table.HeaderCell>
            <Table.HeaderCell
              sortable
              sortDirection={sortColumn === 'role' ? sortDirection : null}
              onSort={() => handleSort('role')}
            >
              Role
            </Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </>
        }
      >
        <Table.Body>
          {sampleData.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell
                variant="checkbox"
                checked={selectedRows.includes(user.id)}
                onCheckboxChange={(checked) => handleSelectRow(user.id, checked)}
                checkboxAriaLabel={`Select ${user.name}`}
              />
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
    );
  },
};

export const WithComparisonHeaders: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Table with comparison variant headers showing dimension/comparison pairs, useful for analytics and reporting dashboards.',
      },
    },
  },
  render: () => (
    <Table
      actionBar={{ colSpan: 4 }}
      footer={{ totalItems: 3 }}
      header={
        <>
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell
            variant="comparison"
            comparisonDimension="This Week"
            comparisonLabel="vs Last Week"
          />
          <Table.HeaderCell
            variant="comparison"
            comparisonDimension="This Month"
            comparisonLabel="vs Last Month"
          />
          <Table.HeaderCell
            variant="comparison"
            comparisonDimension="YTD"
            comparisonLabel="vs Last Year"
          />
        </>
      }
    >
      <Table.Body>
        <Table.Row>
          <Table.Cell variant="text">Widget Pro</Table.Cell>
          <Table.Cell variant="comparison" comparisonPrimary="2,456" comparisonSecondary="+18%" />
          <Table.Cell variant="comparison" comparisonPrimary="10,234" comparisonSecondary="+12%" />
          <Table.Cell variant="comparison" comparisonPrimary="89,456" comparisonSecondary="+25%" />
        </Table.Row>
        <Table.Row>
          <Table.Cell variant="text">Widget Basic</Table.Cell>
          <Table.Cell variant="comparison" comparisonPrimary="1,823" comparisonSecondary="+5%" />
          <Table.Cell variant="comparison" comparisonPrimary="7,891" comparisonSecondary="-3%" />
          <Table.Cell variant="comparison" comparisonPrimary="67,234" comparisonSecondary="+8%" />
        </Table.Row>
        <Table.Row>
          <Table.Cell variant="text">Widget Elite</Table.Cell>
          <Table.Cell variant="comparison" comparisonPrimary="567" comparisonSecondary="+42%" />
          <Table.Cell variant="comparison" comparisonPrimary="2,345" comparisonSecondary="+38%" />
          <Table.Cell variant="comparison" comparisonPrimary="18,901" comparisonSecondary="+52%" />
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

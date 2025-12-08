import type { Meta, StoryObj } from '@storybook/react';
import { TableHeaderCell } from './TableHeaderCell';
import { TableCell } from './TableCell';
import { Table } from './Table';
import { useState } from 'react';
import { Badge } from '@/components/feedback/Badge';

const meta = {
  title: 'Data Display/Table/TableHeaderCell',
  component: TableHeaderCell,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Header cells (`<th>`) with multiple variants: default, checkbox, stacked, textWithBadge, and comparison. Supports sortable columns with sort icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'checkbox', 'stacked', 'textWithBadge', 'comparison'],
      description: 'Header cell variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    scope: {
      control: 'select',
      options: ['col', 'row', 'colgroup', 'rowgroup'],
      description: 'Which cells this header describes - critical for accessibility',
      table: {
        defaultValue: { summary: 'col' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Content alignment for sortable cells (only applies to scope="col")',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    sortable: {
      control: 'boolean',
      description: 'Enable sort functionality (only applies to scope="col")',
    },
    sortDirection: {
      control: 'select',
      options: [null, 'asc', 'desc'],
      description: 'Current sort direction (only applies to scope="col")',
    },
    sortAriaLabel: {
      control: 'text',
      description: 'Accessible label for sort button (sortable cells)',
    },
    checked: {
      control: 'boolean',
      description: 'Checkbox checked state (checkbox variant)',
      if: { arg: 'variant', eq: 'checkbox' },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Checkbox indeterminate state (checkbox variant)',
      if: { arg: 'variant', eq: 'checkbox' },
    },
    checkboxAriaLabel: {
      control: 'text',
      description: 'Accessible label for the checkbox (checkbox variant)',
      table: {
        defaultValue: { summary: 'Select all rows' },
      },
      if: { arg: 'variant', eq: 'checkbox' },
    },
    stackedPrimary: {
      control: 'text',
      description: 'Primary label for stacked variant (e.g., "Total Row Header")',
      if: { arg: 'variant', eq: 'stacked' },
    },
    stackedComparison: {
      control: 'text',
      description: 'Comparison label for stacked variant (e.g., "Comparison")',
      if: { arg: 'variant', eq: 'stacked' },
    },
    stackedChange: {
      control: 'text',
      description: 'Change label for stacked variant (e.g., "% Change")',
      if: { arg: 'variant', eq: 'stacked' },
    },
    badge: {
      control: false,
      description: 'Badge element for textWithBadge variant (the text content is passed as children)',
    },
    comparisonDimension: {
      control: 'text',
      description: 'Dimension label for comparison variant (top line, e.g., "Revenue")',
      if: { arg: 'variant', eq: 'comparison' },
    },
    comparisonLabel: {
      control: 'text',
      description: 'Comparison label for comparison variant (bottom line, lighter, e.g., "vs Last Year")',
      if: { arg: 'variant', eq: 'comparison' },
    },
  },
} satisfies Meta<typeof TableHeaderCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All header cell variants displayed together.',
      },
    },
  },
  render: () => (
    <div style={{ width: 'fit-content' }}>
      <Table>
        <Table.HeaderContainer>
          <Table.Row>
            <TableHeaderCell>Variant</TableHeaderCell>
            <TableHeaderCell>Example</TableHeaderCell>
            <TableHeaderCell>Notes</TableHeaderCell>
          </Table.Row>
        </Table.HeaderContainer>
        <Table.Body>
          <Table.Row>
            <TableCell variant="text">default</TableCell>
            <TableCell>
              <TableHeaderCell>Column Name</TableHeaderCell>
            </TableCell>
            <TableCell variant="text">Standard header text</TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell variant="text">checkbox</TableCell>
            <TableCell>
              <TableHeaderCell variant="checkbox" checkboxAriaLabel="Select all" />
            </TableCell>
            <TableCell variant="text">Row selection</TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell variant="text">sortable</TableCell>
            <TableCell>
              <TableHeaderCell sortable sortDirection="asc">Sorted Column</TableHeaderCell>
            </TableCell>
            <TableCell variant="text">Click to sort</TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell variant="text">stacked</TableCell>
            <TableCell>
              <TableHeaderCell
                variant="stacked"
                stackedPrimary="Total Sales"
                stackedComparison="vs Last Month"
                stackedChange="+15%"
              />
            </TableCell>
            <TableCell variant="text">Three-line display</TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell variant="text">textWithBadge</TableCell>
            <TableCell>
              <TableHeaderCell variant="textWithBadge" badge={<Badge variant="info" size="small">New</Badge>}>
                Status
              </TableHeaderCell>
            </TableCell>
            <TableCell variant="text">Label + badge</TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell variant="text">comparison</TableCell>
            <TableCell>
              <TableHeaderCell
                variant="comparison"
                comparisonDimension="This Week"
                comparisonLabel="vs Last Week"
              />
            </TableCell>
            <TableCell variant="text">Two-line dimension/label</TableCell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  ),
};

export const SortableInteractive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive sortable columns - click to cycle through sort states.',
      },
    },
  },
  render: function SortableDemo() {
    const [sortColumn, setSortColumn] = useState<string | null>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('asc');

    const handleSort = (column: string) => {
      if (sortColumn === column) {
        if (sortDirection === 'asc') setSortDirection('desc');
        else if (sortDirection === 'desc') {
          setSortColumn(null);
          setSortDirection(null);
        }
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };

    return (
      <div style={{ width: 'fit-content' }}>
        <Table>
          <Table.HeaderContainer>
            <Table.Row>
              <TableHeaderCell
                sortable
                sortDirection={sortColumn === 'name' ? sortDirection : null}
                onSort={() => handleSort('name')}
              >
                Name
              </TableHeaderCell>
              <TableHeaderCell
                sortable
                sortDirection={sortColumn === 'email' ? sortDirection : null}
                onSort={() => handleSort('email')}
              >
                Email
              </TableHeaderCell>
              <TableHeaderCell
                sortable
                align="right"
                sortDirection={sortColumn === 'amount' ? sortDirection : null}
                onSort={() => handleSort('amount')}
              >
                Amount
              </TableHeaderCell>
            </Table.Row>
          </Table.HeaderContainer>
          <Table.Body>
            <Table.Row>
              <TableCell variant="text">John Doe</TableCell>
              <TableCell variant="text">john@example.com</TableCell>
              <TableCell variant="numeric">$1,234.56</TableCell>
            </Table.Row>
            <Table.Row>
              <TableCell variant="text">Jane Smith</TableCell>
              <TableCell variant="text">jane@example.com</TableCell>
              <TableCell variant="numeric">$2,567.89</TableCell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  },
};

export const InContext: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple header variants in a realistic table.',
      },
    },
  },
  render: () => (
    <div style={{ width: 'fit-content' }}>
      <Table>
        <Table.HeaderContainer>
          <Table.Row>
            <TableHeaderCell variant="checkbox" checkboxAriaLabel="Select all" />
            <TableHeaderCell sortable>Product</TableHeaderCell>
            <TableHeaderCell variant="textWithBadge" badge={<Badge variant="info" size="small">Live</Badge>}>
              Status
            </TableHeaderCell>
            <TableHeaderCell
              variant="comparison"
              comparisonDimension="Sales"
              comparisonLabel="vs Last Week"
            />
          </Table.Row>
        </Table.HeaderContainer>
        <Table.Body>
          <Table.Row>
            <TableCell variant="checkbox" checked={true} checkboxAriaLabel="Select Widget Pro" />
            <TableCell variant="text">Widget Pro</TableCell>
            <TableCell variant="badge">
              <Badge variant="success">Active</Badge>
            </TableCell>
            <TableCell variant="comparison" comparisonPrimary="2,456" comparisonSecondary="+18%" />
          </Table.Row>
          <Table.Row>
            <TableCell variant="checkbox" checked={false} checkboxAriaLabel="Select Widget Basic" />
            <TableCell variant="text">Widget Basic</TableCell>
            <TableCell variant="badge">
              <Badge variant="warning">Pending</Badge>
            </TableCell>
            <TableCell variant="comparison" comparisonPrimary="1,823" comparisonSecondary="-3%" />
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  ),
};

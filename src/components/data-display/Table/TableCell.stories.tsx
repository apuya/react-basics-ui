import type { Meta, StoryObj } from '@storybook/react';
import { TableCell } from './TableCell';
import { Table } from './Table';
import { Badge } from '@/components/feedback/Badge';

const meta = {
  title: 'Data Display/Table/TableCell',
  component: TableCell,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A table data cell (`<td>`) with multiple variants for different content types. Uses min-width: 120px and min-height: 40px for consistent table layout.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'text', 'checkbox', 'numeric', 'badge', 'input', 'comparison'],
      description: 'Cell variant - default for any content, text for simple text, checkbox for row selection, numeric for right-aligned numbers, badge for one or more badges, input for inline editing, comparison for two-line primary/secondary display',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Checkbox checked state (checkbox variant)',
      if: { arg: 'variant', eq: 'checkbox' },
    },
    checkboxAriaLabel: {
      control: 'text',
      description: 'Accessible label for the checkbox (checkbox variant)',
      table: {
        defaultValue: { summary: 'Select row' },
      },
      if: { arg: 'variant', eq: 'checkbox' },
    },
    inputValue: {
      control: 'text',
      description: 'Input value (input variant)',
      if: { arg: 'variant', eq: 'input' },
    },
    inputSuffix: {
      control: 'text',
      description: 'Input suffix text (input variant) - e.g., "kg", "cm", "$"',
      if: { arg: 'variant', eq: 'input' },
    },
    inputPlaceholder: {
      control: 'text',
      description: 'Input placeholder text (input variant)',
      if: { arg: 'variant', eq: 'input' },
    },
    inputAriaLabel: {
      control: 'text',
      description: 'Input aria-label (input variant)',
      table: {
        defaultValue: { summary: 'Edit cell value' },
      },
      if: { arg: 'variant', eq: 'input' },
    },
    comparisonPrimary: {
      control: 'text',
      description: 'Primary value for comparison variant (top line, e.g., "$1,234.56")',
      if: { arg: 'variant', eq: 'comparison' },
    },
    comparisonSecondary: {
      control: 'text',
      description: 'Secondary value for comparison variant (bottom line, lighter, e.g., "+12%")',
      if: { arg: 'variant', eq: 'comparison' },
    },
  },
} satisfies Meta<typeof TableCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All cell variants displayed together showing their different use cases.',
      },
    },
  },
  render: () => (
    <div style={{ width: 'fit-content' }}>
      <Table>
        <Table.HeaderContainer>
          <Table.Row>
            <Table.HeaderCell>Variant</Table.HeaderCell>
            <Table.HeaderCell>Example</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.HeaderContainer>
        <Table.Body>
          <Table.Row>
            <TableCell variant="text">default</TableCell>
            <TableCell>Any content here</TableCell>
            <TableCell variant="text">For custom components, buttons, etc.</TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell variant="text">text</TableCell>
            <TableCell variant="text">Simple text content</TableCell>
            <TableCell variant="text">Consistent typography</TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell variant="text">checkbox</TableCell>
            <TableCell variant="checkbox" checked={false} checkboxAriaLabel="Example checkbox" />
            <TableCell variant="text">Row selection</TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell variant="text">numeric</TableCell>
            <TableCell variant="numeric">$1,234.56</TableCell>
            <TableCell variant="text">Right-aligned, tabular numbers</TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell variant="text">badge</TableCell>
            <TableCell variant="badge">
              <Badge variant="info">Active</Badge>
              <Badge variant="success">Verified</Badge>
            </TableCell>
            <TableCell variant="text">Flex container with gap</TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell variant="text">input</TableCell>
            <TableCell 
              variant="input" 
              inputValue="100" 
              inputSuffix="kg" 
              inputAriaLabel="Weight"
            />
            <TableCell variant="text">Inline editing with suffix</TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell variant="text">comparison</TableCell>
            <TableCell 
              variant="comparison" 
              comparisonPrimary="1,234" 
              comparisonSecondary="+12%"
            />
            <TableCell variant="text">Primary + secondary stacked</TableCell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  ),
};

export const InContext: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple variants working together in a realistic table.',
      },
    },
  },
  render: () => (
    <div style={{ width: 'fit-content' }}>
      <Table>
        <Table.HeaderContainer>
          <Table.Row>
            <Table.HeaderCell variant="checkbox" checkboxAriaLabel="Select all" />
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Stock</Table.HeaderCell>
            <Table.HeaderCell
              variant="comparison"
              comparisonDimension="Sales"
              comparisonLabel="vs Last Month"
            />
          </Table.Row>
        </Table.HeaderContainer>
        <Table.Body>
          <Table.Row>
            <TableCell variant="checkbox" checked={true} checkboxAriaLabel="Select Widget Pro" />
            <TableCell variant="text">Widget Pro</TableCell>
            <TableCell variant="badge">
              <Badge variant="success">In Stock</Badge>
            </TableCell>
            <TableCell 
              variant="input" 
              inputValue="142" 
              inputSuffix="pcs" 
              inputAriaLabel="Stock quantity"
            />
            <TableCell variant="comparison" comparisonPrimary="2,456" comparisonSecondary="+18%" />
          </Table.Row>
          <Table.Row>
            <TableCell variant="checkbox" checked={false} checkboxAriaLabel="Select Widget Basic" />
            <TableCell variant="text">Widget Basic</TableCell>
            <TableCell variant="badge">
              <Badge variant="warning">Low Stock</Badge>
            </TableCell>
            <TableCell 
              variant="input" 
              inputValue="23" 
              inputSuffix="pcs" 
              inputAriaLabel="Stock quantity"
            />
            <TableCell variant="comparison" comparisonPrimary="1,823" comparisonSecondary="-3%" />
          </Table.Row>
          <Table.Row>
            <TableCell variant="checkbox" checked={false} checkboxAriaLabel="Select Widget Elite" />
            <TableCell variant="text">Widget Elite</TableCell>
            <TableCell variant="badge">
              <Badge variant="error">Out of Stock</Badge>
            </TableCell>
            <TableCell 
              variant="input" 
              inputValue="0" 
              inputSuffix="pcs" 
              inputAriaLabel="Stock quantity"
            />
            <TableCell variant="comparison" comparisonPrimary="567" comparisonSecondary="+42%" />
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  ),
};

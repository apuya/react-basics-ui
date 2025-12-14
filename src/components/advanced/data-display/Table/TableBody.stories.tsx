import type { Meta, StoryObj } from '@storybook/react';
import { TableBody } from './TableBody';
import { TableRowContainer } from './TableRowContainer';
import { TableCell } from './TableCell';
import { TableContext } from './TableContext';

const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <TableContext.Provider value={{ size: 'md', variant: 'default' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--component-table-border)' }}>
      {children}
    </table>
  </TableContext.Provider>
);

const meta = {
  title: 'Data Display/Table/TableBody',
  component: TableBody,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The TableBody component wraps table data rows. It serves as the semantic `<tbody>` container for TableRow and TableCell components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the tbody element',
    },
  },
  decorators: [
    (Story) => (
      <TableWrapper>
        <Story />
      </TableWrapper>
    ),
  ],
} satisfies Meta<typeof TableBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic table body with data rows using TableRow and TableCell components.',
      },
    },
  },
  render: () => (
    <TableBody>
      <TableRowContainer>
        <TableCell variant="text">John Doe</TableCell>
        <TableCell variant="text">john@example.com</TableCell>
        <TableCell variant="text">Admin</TableCell>
      </TableRowContainer>
      <TableRowContainer>
        <TableCell variant="text">Jane Smith</TableCell>
        <TableCell variant="text">jane@example.com</TableCell>
        <TableCell variant="text">Editor</TableCell>
      </TableRowContainer>
      <TableRowContainer>
        <TableCell variant="text">Bob Johnson</TableCell>
        <TableCell variant="text">bob@example.com</TableCell>
        <TableCell variant="text">Viewer</TableCell>
      </TableRowContainer>
    </TableBody>
  ),
};

export const WithCustomClassName: Story = {
  parameters: {
    docs: {
      description: {
        story: 'TableBody with custom className.',
      },
    },
  },
  render: () => (
    <TableBody className="bg-gray-50">
      <TableRowContainer>
        <TableCell variant="text">Row 1</TableCell>
        <TableCell variant="text">Data 1</TableCell>
      </TableRowContainer>
      <TableRowContainer>
        <TableCell variant="text">Row 2</TableCell>
        <TableCell variant="text">Data 2</TableCell>
      </TableRowContainer>
    </TableBody>
  ),
};

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'TableBody with empty state message.',
      },
    },
  },
  render: () => (
    <TableBody>
      <TableRowContainer>
        <TableCell colSpan={3} className="text-center text-gray-500 py-8">
          No data available
        </TableCell>
      </TableRowContainer>
    </TableBody>
  ),
};

export const WithCheckboxCells: Story = {
  parameters: {
    docs: {
      description: {
        story: 'TableBody with checkbox cells for row selection.',
      },
    },
  },
  render: () => (
    <TableBody>
      <TableRowContainer>
        <TableCell variant="checkbox" checked={true} checkboxAriaLabel="Select John Doe" />
        <TableCell variant="text">John Doe</TableCell>
        <TableCell variant="text">john@example.com</TableCell>
      </TableRowContainer>
      <TableRowContainer>
        <TableCell variant="checkbox" checked={false} checkboxAriaLabel="Select Jane Smith" />
        <TableCell variant="text">Jane Smith</TableCell>
        <TableCell variant="text">jane@example.com</TableCell>
      </TableRowContainer>
      <TableRowContainer>
        <TableCell variant="checkbox" checked={false} checkboxAriaLabel="Select Bob Johnson" />
        <TableCell variant="text">Bob Johnson</TableCell>
        <TableCell variant="text">bob@example.com</TableCell>
      </TableRowContainer>
    </TableBody>
  ),
};

export const WithNumericCells: Story = {
  parameters: {
    docs: {
      description: {
        story: 'TableBody with numeric cells for right-aligned values.',
      },
    },
  },
  render: () => (
    <TableBody>
      <TableRowContainer>
        <TableCell variant="text">Product A</TableCell>
        <TableCell variant="numeric">$29.99</TableCell>
        <TableCell variant="numeric">42</TableCell>
      </TableRowContainer>
      <TableRowContainer>
        <TableCell variant="text">Product B</TableCell>
        <TableCell variant="numeric">$49.99</TableCell>
        <TableCell variant="numeric">18</TableCell>
      </TableRowContainer>
      <TableRowContainer>
        <TableCell variant="text">Product C</TableCell>
        <TableCell variant="numeric">$79.99</TableCell>
        <TableCell variant="numeric">7</TableCell>
      </TableRowContainer>
    </TableBody>
  ),
};


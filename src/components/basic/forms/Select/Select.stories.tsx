import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom select component with compound pattern: Select.Trigger, Select.Menu, Select.Option. Supports controlled/uncontrolled modes, sizes, error states, and full keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the select trigger',
    },
    error: {
      control: 'boolean',
      description: 'Whether the select is in an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the select',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the select',
    },
  },
  decorators: [(Story) => <div style={{ width: '280px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Select>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Select an option..." />
      <Select.Menu>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const Small: Story = {
  args: {
    size: 'small',
  },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger placeholder="Small select..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const DefaultSize: Story = {
  args: {
    size: 'default',
  },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger placeholder="Default select..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger placeholder="Large select..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger placeholder="Disabled select..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const Error: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger placeholder="Select with error..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// WITH LABEL & HELPER TEXT
// =============================================================================

export const WithLabel: Story = {
  args: {
    label: 'Country',
  },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger placeholder="Select a country..." />
      <Select.Menu>
        <Select.Option value="us">United States</Select.Option>
        <Select.Option value="ca">Canada</Select.Option>
        <Select.Option value="uk">United Kingdom</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: 'Plan',
    helperText: 'Choose the plan that works best for you',
  },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger placeholder="Select a plan..." />
      <Select.Menu>
        <Select.Option value="free">Free</Select.Option>
        <Select.Option value="pro">Pro</Select.Option>
        <Select.Option value="enterprise">Enterprise</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const WithErrorMessage: Story = {
  args: {
    label: 'Category',
    error: true,
    helperText: 'This field is required',
  },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger placeholder="Select a category..." />
      <Select.Menu>
        <Select.Option value="tech">Technology</Select.Option>
        <Select.Option value="design">Design</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// DEFAULT VALUE
// =============================================================================

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'banana',
    label: 'Fruit',
  },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger placeholder="Select a fruit..." />
      <Select.Menu>
        <Select.Option value="apple">Apple</Select.Option>
        <Select.Option value="banana">Banana</Select.Option>
        <Select.Option value="cherry">Cherry</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// CONTROLLED
// =============================================================================

export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = useState('');
    return (
      <Select
        label="Fruit"
        value={value}
        onChange={setValue}
        helperText={value ? `Selected: ${value}` : 'No selection'}
      >
        <Select.Trigger placeholder="Select a fruit..." />
        <Select.Menu>
          <Select.Option value="apple">Apple</Select.Option>
          <Select.Option value="banana">Banana</Select.Option>
          <Select.Option value="cherry">Cherry</Select.Option>
        </Select.Menu>
      </Select>
    );
  },
};

// =============================================================================
// WITH DISABLED OPTIONS
// =============================================================================

export const WithDisabledOptions: Story = {
  args: {
    label: 'Status',
  },
  decorators: [(Story) => <div style={{ width: '280px', minHeight: '220px' }}><Story /></div>],
  render: (args) => (
    <Select {...args}>
      <Select.Trigger placeholder="Select status..." />
      <Select.Menu>
        <Select.Option value="active">Active</Select.Option>
        <Select.Option value="pending" disabled>Pending (unavailable)</Select.Option>
        <Select.Option value="inactive">Inactive</Select.Option>
        <Select.Option value="archived" disabled>Archived (unavailable)</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// ALL SIZES COMPARISON
// =============================================================================

export const AllSizes: Story = {
  decorators: [(Story) => <div style={{ width: '280px' }}><Story /></div>],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select size="small" label="Small">
        <Select.Trigger placeholder="Small..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
      </Select>
      <Select size="default" label="Default">
        <Select.Trigger placeholder="Default..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
      </Select>
      <Select size="large" label="Large">
        <Select.Trigger placeholder="Large..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
      </Select>
    </div>
  ),
};

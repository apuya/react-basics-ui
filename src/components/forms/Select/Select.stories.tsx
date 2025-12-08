import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';
import { Stack } from '../../layout/Stack';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Custom select with compound pattern: Select.Trigger, Select.Menu, Select.Option. Supports controlled/uncontrolled modes, sizes, and error states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
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
// ALL SIZES
// =============================================================================

export const AllSizes: Story = {
  render: () => (
    <Stack gap="md">
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
    </Stack>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const States: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack gap="xs">
        <Heading level={6}>Disabled</Heading>
        <Select disabled>
          <Select.Trigger placeholder="Disabled select..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      </Stack>
      <Stack gap="xs">
        <Heading level={6}>Error</Heading>
        <Select error label="Category" helperText="This field is required">
          <Select.Trigger placeholder="Select a category..." />
          <Select.Menu>
            <Select.Option value="tech">Technology</Select.Option>
            <Select.Option value="design">Design</Select.Option>
          </Select.Menu>
        </Select>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// WITH LABEL & HELPER
// =============================================================================

export const WithLabelAndHelper: Story = {
  render: () => (
    <Stack gap="md">
      <Select label="Country">
        <Select.Trigger placeholder="Select a country..." />
        <Select.Menu>
          <Select.Option value="us">United States</Select.Option>
          <Select.Option value="ca">Canada</Select.Option>
          <Select.Option value="uk">United Kingdom</Select.Option>
        </Select.Menu>
      </Select>
      <Select label="Plan" helperText="Choose the plan that works best for you">
        <Select.Trigger placeholder="Select a plan..." />
        <Select.Menu>
          <Select.Option value="free">Free</Select.Option>
          <Select.Option value="pro">Pro</Select.Option>
          <Select.Option value="enterprise">Enterprise</Select.Option>
        </Select.Menu>
      </Select>
    </Stack>
  ),
};

// =============================================================================
// CONTROLLED
// =============================================================================

export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = useState('');
    return (
      <Stack gap="sm">
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
        {value && (
          <Text size="small" color="secondary">
            Current value: <Text as="span" weight="semibold">{value}</Text>
          </Text>
        )}
      </Stack>
    );
  },
};

// =============================================================================
// WITH DISABLED OPTIONS
// =============================================================================

export const WithDisabledOptions: Story = {
  decorators: [(Story) => <div style={{ width: '280px', minHeight: '220px' }}><Story /></div>],
  render: () => (
    <Select label="Status">
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
